import styled from "styled-components";
import Link from "next/link";
import Head from "next/head";
import { Container, Stack, Typography, Button, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import prisma from "lib/prisma";
import { Flashcard } from ".prisma/client";
import FlashcardComponent from "components/Flashcard";
import { LoadingButton } from "@mui/lab";
import useSWR from "swr";
import fetcher from "src/fetcher";
import unionBy from "lodash-es/unionBy";

const StyledContainer = styled(Container)`
  padding: 3rem;
`;

const FlashcardsContainer = styled(Stack)`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
`;

const FlashcardContainer = styled(Box)`
  margin: 1rem;
`;

const limit = 12;

export const getStaticProps: GetServerSideProps = async () => {
  const flashcards = await prisma.$transaction([
    prisma.flashcard.count(),
    prisma.flashcard.findMany({
      take: limit,
      orderBy: {
        id: "desc",
      },
    }),
  ]);
  return {
    props: { count: flashcards[0], initFlashcards: flashcards[1] },
    revalidate: 10,
  };
};

export default function Index({
  count,
  initFlashcards,
}: {
  count: number;
  initFlashcards: Flashcard[];
}) {
  const [page, setPage] = useState(1);
  const [flashcards, setFlashcards] = useState(initFlashcards);
  const { data, error } = useSWR(
    `/api/feed?page=${page}&limit=${limit}`,
    fetcher
  );
  const [canLoadMore, setCanLoadMore] = useState(true);

  useEffect(() => {
    setCanLoadMore(flashcards.length < count);
  }, [count, flashcards]);

  useEffect(() => {
    if (data?.length) {
      setCanLoadMore(true);
      setFlashcards((state) => {
        const newFlashcards = unionBy(state, data, "id").sort(
          (a, b) => b.id - a.id
        );
        return newFlashcards;
      });
    } else {
      setCanLoadMore(false);
    }
  }, [page, data]);

  return (
    <StyledContainer>
      <Head>
        <title>Flashcards</title>
      </Head>
      <Stack spacing={2} alignItems="center">
        <Typography variant="h2" textAlign="center">
          Flashcards
        </Typography>
        <FlashcardsContainer flexDirection="row">
          {flashcards.map((flashcard) => (
            <FlashcardContainer key={flashcard.id}>
              <FlashcardComponent flashcard={flashcard} />
            </FlashcardContainer>
          ))}
        </FlashcardsContainer>
        <LoadingButton
          variant="outlined"
          style={{ width: "fit-content", pointerEvents: "auto" }}
          onClick={() => setPage((state) => state + 1)}
          disabled={!canLoadMore}
          title={
            canLoadMore ? "Load more flashcards" : "No more flashcards to load"
          }
        >
          Load more
        </LoadingButton>
        <Link href="/flashcard/create" passHref>
          <Button variant="contained" style={{ width: "fit-content" }}>
            Create your own
          </Button>
        </Link>
      </Stack>
    </StyledContainer>
  );
}

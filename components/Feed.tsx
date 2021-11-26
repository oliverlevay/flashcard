import styled from "styled-components";
import Link from "next/link";
import { Container, Stack, Button, Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import FlashcardComponent from "components/Flashcard";
import { LoadingButton } from "@mui/lab";
import useSWR from "swr";
import fetcher from "src/fetcher";
import unionBy from "lodash-es/unionBy";
import { useUser } from "@auth0/nextjs-auth0";
import { Flashcard } from "lib/types";

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

export default function Feed({
  count,
  initFlashcards,
}: {
  count: number;
  initFlashcards: Flashcard[];
}) {
  const [page, setPage] = useState(1);
  const [flashcards, setFlashcards] = useState(initFlashcards);
  const { data, error } = useSWR<Flashcard[]>(
    `/api/feed?page=${page}&limit=${limit}`,
    fetcher
  );
  const [canLoadMore, setCanLoadMore] = useState(true);
  const { user } = useUser();

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
    <Stack padding="1rem" spacing={2} alignItems="center">
      {user && (
        <Link href="/flashcard/create" passHref>
          <Button variant="contained" style={{ width: "fit-content" }}>
            Create your own
          </Button>
        </Link>
      )}
      {!user && <Typography>Login to create your own</Typography>}
      <FlashcardsContainer flexDirection="row">
        {flashcards.map((flashcard) => (
          <FlashcardContainer key={flashcard.id}>
            <FlashcardComponent flashcard={flashcard} />
          </FlashcardContainer>
        ))}
      </FlashcardsContainer>
      {canLoadMore && (
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
      )}
    </Stack>
  );
}

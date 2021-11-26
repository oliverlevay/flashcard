import styled from "styled-components";
import Link from "next/link";
import { Container, Stack, Typography, Button } from "@mui/material";
import React from "react";
import { GetServerSideProps } from "next";
import prisma from "lib/prisma";
import { Flashcard } from ".prisma/client";
import FlashcardComponent from "components/Flashcard";

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

export const getServerSideProps: GetServerSideProps = async () => {
  const flashcards = await prisma.flashcard.findMany({
    take: 10,
  });
  return { props: { flashcards } };
};

export default function Index({ flashcards }: { flashcards: Flashcard[] }) {
  return (
    <StyledContainer>
      <Stack spacing={2} alignItems="center">
        <Typography variant="h2" textAlign="center">
          Flashcards
        </Typography>
        <FlashcardsContainer flexDirection="row">
          {flashcards.map((flashcard) => (
            <FlashcardComponent key={flashcard.id} flashcard={flashcard} />
          ))}
        </FlashcardsContainer>
        <Link href="/flashcard/create" passHref>
          <Button variant="contained" style={{ width: "fit-content" }}>
            Create your own
          </Button>
        </Link>
      </Stack>
    </StyledContainer>
  );
}

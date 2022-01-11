import styled from 'styled-components';
import Head from 'next/head';
import { Container, Stack, Typography, Box, Button } from '@mui/material';
import React from 'react';
import { GetServerSideProps } from 'next';
import prisma from 'lib/prisma';
import TopBar from 'components/TopBar';
import useUserData from 'hooks/useUserData';
import { useRouter } from 'next/router';
import type { User, Flashcard, Deck } from '@prisma/client';
import FlashcardSet from 'components/FlashcardSet';
import useMe from 'hooks/me/useMe';
import Link from 'next/link';
import CreateButtons from 'components/CreateButtons';
import DeckComponent from 'components/Deck';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const userId = Number(params?.id);
  const userData = await prisma.user
    .findUnique({
      where: {
        id: userId,
      },
      include: {
        flashcards: {
          where: {
            deleted: false,
          },
        },
        decks: {
          where: {
            deleted: false,
          },
        },
      },
    })
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
  return {
    props: {
      userData,
    },
  };
};

export default function UserProfile({
  userData,
}: {
  userData: User & {
    flashcards: Flashcard[];
    decks: Deck[];
  };
}) {
  const me = useMe();
  const flashcards = userData.flashcards?.map((flashcard) => {
    return {
      ...flashcard,
      author: userData,
    };
  });
  return (
    <Container>
      <Head>
        <title>{`${userData?.name}'s Flashcards`}</title>
      </Head>
      <TopBar />
      <Typography variant="h2">{userData?.name}</Typography>
      <Stack marginTop="1rem" spacing={2}>
        {me.data?.id === userData.id && <CreateButtons />}
        <Typography variant="h4">Decks</Typography>
        {userData.decks.map((deck) => (
          <DeckComponent deck={deck} key={deck.id + deck.name} />
        ))}
        <Typography variant="h4">Cards</Typography>
        <FlashcardSet flashcards={flashcards} />
      </Stack>
    </Container>
  );
}

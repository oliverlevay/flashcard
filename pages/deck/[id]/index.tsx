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
  const deckId = Number(params?.id);
  const deckData = await prisma.deck
    .findUnique({
      where: {
        id: deckId,
      },
      include: {
        flashcards: {
          where: {
            deleted: false,
          },
          include: {
            author: true,
          },
        },
        author: true,
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
      deckData,
    },
  };
};

export default function DeckInformation({
  deckData,
}: {
  deckData:
    | (Deck & {
        flashcards: (Flashcard & {
          author: User;
        })[];
        author: User;
      })
    | null;
}) {
  const me = useMe();
  return (
    <Container>
      <Head>
        <title>{`${deckData?.name} deck`}</title>
      </Head>
      <TopBar />
      <Typography variant="h2">{deckData?.name}</Typography>
      <Stack marginTop="1rem" spacing={2}>
        <Typography variant="h4">Cards</Typography>
        {me.data?.id === deckData?.authorId && (
          <Link href={`/deck/${deckData?.id}/add-cards`} passHref>
            <Button style={{ width: 'fit-content' }}>Add cards</Button>
          </Link>
        )}
        {deckData?.flashcards && (
          <FlashcardSet flashcards={deckData?.flashcards} />
        )}
      </Stack>
    </Container>
  );
}

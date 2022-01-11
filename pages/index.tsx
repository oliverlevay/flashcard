import styled from 'styled-components';
import Link from 'next/link';
import Head from 'next/head';
import { Container, Stack, Typography, Box } from '@mui/material';
import React from 'react';
import { GetServerSideProps } from 'next';
import prisma from 'lib/prisma';
import Feed from 'components/Feed';
import TopBar from 'components/TopBar';
import { Flashcard } from 'lib/types';

const limit = 12;

export const getStaticProps: GetServerSideProps = async () => {
  const flashcards = await prisma
    .$transaction([
      prisma.flashcard.count(),
      prisma.flashcard.findMany({
        take: limit,
        orderBy: {
          id: 'desc',
        },
        include: {
          author: true,
        },
        where: {
          deleted: false,
        },
      }),
    ])
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

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
  return (
    <Container>
      <Head>
        <title>Flashcards</title>
      </Head>
      <TopBar />
      <Typography variant="h2">Latest cards</Typography>
      <Feed initFlashcards={initFlashcards} count={count} />
    </Container>
  );
}

import styled from 'styled-components';
import Head from 'next/head';
import {
  Container,
  Stack,
  Typography,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import prisma from 'lib/prisma';
import TopBar from 'components/TopBar';
import type { User, Flashcard, Deck } from '@prisma/client';
import useMe from 'hooks/me/useMe';
import Flipcard from 'components/Flashcard/Flipcard';
import { LoadingButton } from '@mui/lab';
import { useRouter } from 'next/router';

const FlashcardsContainer = styled(Stack)`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  flex-direction: row;
  margin: 0 -1rem !important;
`;

const FlashcardContainer = styled(Box)`
  margin: 1rem 1rem;
`;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const deckId = Number(params?.id);
  const deckData = await prisma.deck
    .findUnique({
      where: {
        id: deckId,
      },
      include: {
        author: {
          include: {
            flashcards: {
              include: {
                author: true,
              },
              where: {
                deleted: false,
              },
            },
          },
        },
        flashcards: {
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
      deckData,
    },
  };
};

export default function DeckInformation({
  deckData,
}: {
  deckData:
    | (Deck & {
        author: User & {
          flashcards: (Flashcard & {
            author: User;
          })[];
        };
        flashcards: Flashcard[];
      })
    | null;
}) {
  const me = useMe();
  const [loading, setLoading] = useState(false);
  const [flashcardsMap, setFlashcardsMap] = useState<Map<number, Flashcard>>(
    new Map()
  );
  const router = useRouter();

  useEffect(() => {
    const map = new Map<number, Flashcard>();
    deckData?.flashcards.forEach((flashcard) => {
      map.set(flashcard.id, flashcard);
    });
    setFlashcardsMap(map);
  }, [deckData]);

  const addCardsToDeck = useCallback(async () => {
    setLoading(true);
    const data = {
      flashcardIds: Array.from(flashcardsMap.keys()),
    };
    const response = await fetch(`/api/deck/${deckData?.id}/add-cards`, {
      body: JSON.stringify(data),
      method: 'post',
    });
    const updatedDeck = await response.json();
    setLoading(false);
    router.push(`/deck/${updatedDeck.id}`);
  }, [flashcardsMap, router, deckData]);

  return (
    <Container>
      <Head>
        <title>{`Add cards to ${deckData?.name}`}</title>
      </Head>
      <TopBar />
      <Stack marginTop="1rem" spacing={2}>
        <Typography variant="h4">
          {' '}
          Add cards to &quot;{deckData?.name}&quot;
        </Typography>
        {deckData?.author.flashcards && (
          <FlashcardsContainer>
            {deckData?.author.flashcards.map((flashcard) => (
              <FlashcardContainer key={flashcard.title + flashcard.id}>
                <FormControlLabel
                  control={
                    <Checkbox
                      defaultChecked={deckData?.flashcards
                        ?.map((flashcard) => flashcard.id)
                        .includes(flashcard.id)}
                      onChange={(_event, gettingChecked) => {
                        setFlashcardsMap((state) => {
                          if (gettingChecked) {
                            state.set(flashcard.id, flashcard);
                          } else {
                            state.delete(flashcard.id);
                          }
                          return state;
                        });
                      }}
                    />
                  }
                  label={flashcard.title}
                />
                <Flipcard flashcard={flashcard} />
              </FlashcardContainer>
            ))}
          </FlashcardsContainer>
        )}
        <LoadingButton
          loading={loading}
          variant="contained"
          style={{ width: 'fit-content' }}
          onClick={addCardsToDeck}
        >
          Add to deck
        </LoadingButton>
      </Stack>
    </Container>
  );
}

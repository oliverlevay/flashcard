import styled from 'styled-components';
import Link from 'next/link';
import { Stack, Button, Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import useSWR from 'swr';
import fetcher from 'src/fetcher';
import unionBy from 'lodash-es/unionBy';
import { useUser } from '@auth0/nextjs-auth0';
import { Flashcard } from 'lib/types';
import FlashcardSet from './FlashcardSet';
import CreateButtons from './CreateButtons';

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
        const newFlashcards = unionBy(state, data, 'id').sort(
          (a, b) => b.id - a.id
        );
        return newFlashcards;
      });
    } else {
      setCanLoadMore(false);
    }
  }, [page, data]);

  return (
    <Stack marginTop="1rem">
      {user && <CreateButtons />}
      {!user && <Typography>Login to create your own</Typography>}
      <FlashcardSet flashcards={flashcards} />
      {canLoadMore && (
        <LoadingButton
          variant="outlined"
          style={{ width: 'fit-content', pointerEvents: 'auto' }}
          onClick={() => setPage((state) => state + 1)}
          disabled={!canLoadMore}
          title={
            canLoadMore ? 'Load more flashcards' : 'No more flashcards to load'
          }
        >
          Load more
        </LoadingButton>
      )}
    </Stack>
  );
}

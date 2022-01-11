import React, { useCallback, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import styled from 'styled-components';
import { Flashcard } from 'lib/types';
import { TABLET_MQ } from 'lib/mediaQueries';
import useMe from 'hooks/me/useMe';
import { LoadingButton } from '@mui/lab';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router';
import Flipcard from './Flipcard';
import Link from 'next/link';

const Container = styled(Stack)`
  display: flex;
  align-items: center;
`;

const FlashcardComponent = ({ flashcard }: { flashcard: Flashcard }) => {
  const [flipped, setFlipped] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();
  const deleteFlashcard = useCallback(async () => {
    const yesClick = window.confirm(
      `Do you really want to delete ${flashcard.title}?`
    );
    if (yesClick) {
      setDeleting(true);
      await fetch(`/api/flashcard/${flashcard.id}/delete`);
      setDeleting(false);
      router.push(router.asPath);
    }
  }, [flashcard, router]);

  const me = useMe();
  return (
    <Container>
      <Stack direction="row">
        <Typography fontSize={24}>{flashcard.title}</Typography>
        {me?.data?.id === flashcard.authorId && (
          <LoadingButton loading={deleting} onClick={() => deleteFlashcard()}>
            <DeleteIcon />
          </LoadingButton>
        )}
      </Stack>
      <Flipcard flashcard={flashcard} />
      <Typography>
        Created by{' '}
        <Link href={`/user/${flashcard.authorId}`}>
          {flashcard.author.name}
        </Link>
      </Typography>
    </Container>
  );
};

export default FlashcardComponent;

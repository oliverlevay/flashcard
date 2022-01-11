import styled from 'styled-components';
import {
  Checkbox,
  FormControlLabel,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import useMyFlashcards from 'hooks/me/useMyFlashcards';
import { Flashcard } from '@prisma/client';
import { LoadingButton } from '@mui/lab';

const StyledPaper = styled(Paper)``;

const StyledStack = styled(Stack)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledBox = styled(Stack)`
  padding: 2rem;
  margin-bottom: 2rem;
  width: 100%;
`;

export default function CreateDeck() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [flashcardsMap, setFlashcardsMap] = useState<Map<number, Flashcard>>(
    new Map()
  );
  const disabled = !name;

  const router = useRouter();

  const { data: flashcards } = useMyFlashcards();

  const uploadDeck = useCallback(async () => {
    setLoading(true);
    const data = {
      name,
      flashcardIds: Array.from(flashcardsMap.keys()),
    };
    const response = await fetch('/api/deck/create', {
      body: JSON.stringify(data),
      method: 'post',
    });
    const createdDeck = await response.json();
    setLoading(false);
    router.push(`/deck/${createdDeck.id}`);
  }, [flashcardsMap, name, router]);

  return (
    <StyledPaper>
      <StyledStack>
        <StyledBox spacing={2}>
          <TextField
            label="Name"
            inputProps={{ maxLength: 20 }}
            variant="standard"
            fullWidth
            value={name}
            onChange={(evt) => setName(evt.target.value)}
          />
          <Stack>
            <Typography variant="h4">Include flashcards:</Typography>
            {flashcards?.map((flashcard) => (
              <FormControlLabel
                key={flashcard.title + flashcard.id}
                control={
                  <Checkbox
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
            ))}
          </Stack>
          <LoadingButton
            loading={loading}
            variant="contained"
            style={{ margin: '2rem 0.5rem', marginBottom: 0 }}
            onClick={uploadDeck}
            disabled={disabled}
            fullWidth
          >
            Save
          </LoadingButton>
        </StyledBox>
      </StyledStack>
    </StyledPaper>
  );
}

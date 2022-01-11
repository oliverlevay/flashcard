import styled from 'styled-components';
import { Stack, Box } from '@mui/material';
import React from 'react';
import FlashcardComponent from 'components/Flashcard';
import { Flashcard } from 'lib/types';

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

export default function FlashcardSet({
  flashcards,
}: {
  flashcards: Flashcard[];
}) {
  return (
    <FlashcardsContainer flexDirection="row">
      {flashcards?.map((flashcard) => (
        <FlashcardContainer key={flashcard.id}>
          <FlashcardComponent flashcard={flashcard} />
        </FlashcardContainer>
      ))}
    </FlashcardsContainer>
  );
}

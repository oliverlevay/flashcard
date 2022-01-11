import Link from 'next/link';
import React from 'react';
import { Stack, Button } from '@mui/material';
import { Flashcard } from 'lib/types';

export default function CreateButtons() {
  return (
    <Stack direction="row" spacing={2}>
      <Link href="/flashcard/create" passHref>
        <Button variant="contained" style={{ width: 'fit-content' }}>
          Create Flashcard
        </Button>
      </Link>
      <Link href="/deck/create" passHref>
        <Button variant="contained" style={{ width: 'fit-content' }}>
          Create deck
        </Button>
      </Link>
    </Stack>
  );
}

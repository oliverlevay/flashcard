import { LoadingButton } from '@mui/lab';
import { Button, Stack } from '@mui/material';
import type { Deck } from '@prisma/client';
import useMe from 'hooks/me/useMe';
import Link from 'next/link';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';

const DeckComponent = ({ deck }: { deck: Deck }) => {
  const [deleting, setDeleting] = useState(false);
  const me = useMe();
  const router = useRouter();
  const deleteDeck = useCallback(async () => {
    const yesClick = window.confirm(
      `Do you really want to delete ${deck.name}?`
    );
    if (yesClick) {
      setDeleting(true);
      await fetch(`/api/deck/${deck.id}/delete`);
      setDeleting(false);
      router.push(router.asPath);
    }
  }, [deck, router]);

  return (
    <Stack direction="row">
      <Link href={`/deck/${deck.id}`} passHref>
        <Button style={{ width: 'fit-content' }}>{deck.name}</Button>
      </Link>
      {me?.data?.id === deck.authorId && (
        <LoadingButton loading={deleting} onClick={() => deleteDeck()}>
          <DeleteIcon />
        </LoadingButton>
      )}
    </Stack>
  );
};

export default DeckComponent;

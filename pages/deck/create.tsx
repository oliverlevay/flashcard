import styled from 'styled-components';
import { Container, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import Head from 'next/head';
import { useUser } from '@auth0/nextjs-auth0';
import { goToLogin } from 'lib/authUtils';
import CreateDeck from 'components/CreateDeck';

const StyledContainer = styled(Container)`
  padding: 3rem;
`;

export default function Create() {
  const { user, error } = useUser();
  useEffect(() => {
    if (error) {
      goToLogin();
    }
  }, [error]);
  return (
    <StyledContainer maxWidth="sm">
      <Head>
        <title>Create deck</title>
      </Head>
      <Stack spacing={2}>
        <Typography variant="h2">Create a deck</Typography>
        <CreateDeck />
      </Stack>
    </StyledContainer>
  );
}

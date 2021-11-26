import styled from "styled-components";
import { Container, Stack, Typography } from "@mui/material";
import CreateFlashcard from "components/CreateFlashcard";
import React from "react";
import Head from "next/head";

const StyledContainer = styled(Container)`
  padding: 3rem;
`;

export default function Index() {
  return (
    <StyledContainer maxWidth="sm">
      <Head>
        <title>Create flashcard</title>
      </Head>
      <Stack spacing={2}>
        <Typography variant="h2">Create a flashcard</Typography>
        <CreateFlashcard />
      </Stack>
    </StyledContainer>
  );
}

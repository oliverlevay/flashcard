import styled from "styled-components";
import { Container, Stack, Typography } from "@mui/material";
import CreateFlashcard from "components/CreateFlashcard";
import React from "react";
import Head from "next/head";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { GetServerSideProps } from "next";

const StyledContainer = styled(Container)`
  padding: 3rem;
`;

export const getServerSideProps: GetServerSideProps = (ctx) => {
  return withPageAuthRequired({ returnTo: "/flashcard/create" })(ctx);
};

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

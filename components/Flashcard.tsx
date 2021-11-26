import { Flashcard } from ".prisma/client";
import React, { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import styled from "styled-components";

const Container = styled(Stack)`
  display: flex;
  align-items: center;
  margin-right: 1rem;
  margin-bottom: 1rem;
`;

const Flipcard = styled(Box)`
  width: 243px;
  height: 137px;
  perspective: 1000px;
`;

const FlipcardInner = styled(Box)`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  ${Flipcard}:hover & {
    transform: rotateY(-180deg);
  }
`;

const Card = styled(Box)`
  display: flex;
  width: fit-content;
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
`;

const Front = styled(Card)``;

const Back = styled(Card)`
  transform: rotateY(-180deg);
`;

const FlashcardComponent = ({ flashcard }: { flashcard: Flashcard }) => {
  return (
    <Container>
      <Typography fontSize={24}>{flashcard.title}</Typography>
      <Flipcard>
        <FlipcardInner>
          <Front border={1}>
            <img src={flashcard.frontImageUrl} />
          </Front>
          <Back border={1}>
            <img src={flashcard.backImageUrl} />
          </Back>
        </FlipcardInner>
      </Flipcard>
    </Container>
  );
};

export default FlashcardComponent;

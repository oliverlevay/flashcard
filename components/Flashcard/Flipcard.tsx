/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { Box, Stack } from '@mui/material';
import styled from 'styled-components';
import { Flashcard } from 'lib/types';
import { TABLET_MQ } from 'lib/mediaQueries';

const FlipcardContainer = styled(Box)`
  width: 243px;
  height: 137px;
  perspective: 1000px;
`;

interface PropsFlipcardInner {
  readonly flipped: boolean;
}

const FlipcardInner = styled(Box)<PropsFlipcardInner>`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  ${TABLET_MQ} {
    ${FlipcardContainer}:hover & {
      transform: rotateY(-180deg);
    }
  }
  @media (max-width: 768px) {
    ${({ flipped }) => flipped && 'transform: rotateY(-180deg);'}
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

const Flipcard = ({ flashcard }: { flashcard: Flashcard }) => {
  const [flipped, setFlipped] = useState(false);
  return (
    <FlipcardContainer onClick={() => setFlipped((state) => !state)}>
      <FlipcardInner flipped={flipped}>
        <Front>
          <img
            style={{ border: '1px solid black', borderRadius: '10px' }}
            src={flashcard.frontImageUrl}
            alt={flashcard.title}
            width={243}
            height={137}
          />
        </Front>
        <Back>
          <img
            style={{ border: '2px solid black', borderRadius: '10px' }}
            src={flashcard.backImageUrl}
            alt={flashcard.title}
            width={243}
            height={137}
          />
        </Back>
      </FlipcardInner>
    </FlipcardContainer>
  );
};

export default Flipcard;

import type { User, Flashcard as BaseFlashcard } from ".prisma/client";
import { Prisma } from "@prisma/client";

export type Flashcard = BaseFlashcard & {
  author: User;
};

export type CreateFlashcardInput = {
  title: string;
  frontImageUrl: string;
  backImageUrl: string;
  createdAt?: string | Date | undefined;
  updatedAt?: string | Date | undefined;
};

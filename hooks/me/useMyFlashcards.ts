import type { Flashcard } from '@prisma/client';
import useSWR from "swr";
import fetcher from "src/fetcher";

const useMyFlashcards = () => {
  return useSWR<Flashcard[] | undefined>('/api/me/flashcards', fetcher);
}

export default useMyFlashcards;
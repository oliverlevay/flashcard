import prisma from "lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

const defaultInput = { limit: 12, page: 1 };

// GET /api/feed
// Optional fields in body: page, limit
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let data = req.query;
  const limit = data?.limit ? Number(data.limit) : defaultInput.limit;
  const page = data?.page ? Number(data.page) : defaultInput.page;

  const flashcards = await prisma.flashcard.findMany({
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      id: "desc",
    },
    include: {
      author: true,
    },
  });

  res.json(flashcards);
}

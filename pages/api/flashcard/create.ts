import prisma from "lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

// POST /api/flashcard/create
// Required fields in body: title, frontImageUrl, backImageUrl
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, frontImageUrl, backImageUrl } = JSON.parse(req.body);

  const flashcard = await prisma.flashcard.create({
    data: {
      title,
      frontImageUrl,
      backImageUrl,
    },
  });

  res.json(flashcard);
}

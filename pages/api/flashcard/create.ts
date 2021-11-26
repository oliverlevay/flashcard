import prisma from "lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    title,
    frontImageUrl,
    backImageUrl,
  }: { title: string; frontImageUrl: string; backImageUrl: string } =
    JSON.parse(req.body);
  const Flashcard = await prisma.flashcard.create({
    data: {
      title,
      frontImageUrl,
      backImageUrl,
    },
  });

  res.json(Flashcard);
}

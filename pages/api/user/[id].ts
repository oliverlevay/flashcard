import prisma from "lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

// POST /api/flashcard/create
// Required fields in body: title, frontImageUrl, backImageUrl
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userId = Number(req.query.id)
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    },
  }).catch((e) => {
    throw e
  })
    .finally(async () => {
      await prisma.$disconnect()
    })
  res.json(user);
};

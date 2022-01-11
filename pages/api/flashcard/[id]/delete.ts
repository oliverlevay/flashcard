import prisma from "lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";

// POST /api/flashcard/create
// Required fields in body: title, frontImageUrl, backImageUrl
export default withApiAuthRequired(async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = Number(req.query.id);
  const session = await getSession(req, res);
  let flashcard = await prisma.flashcard.findUnique({ where: { id }, include: { author: true } }).catch((e) => {
    throw e
  })
    .finally(async () => {
      await prisma.$disconnect()
    });
  if (flashcard?.author.email === session?.user.email) {
    flashcard = await prisma.flashcard.update({ where: { id: id }, data: { deleted: true }, include: { author: true } }).catch((e) => {
      throw e
    })
      .finally(async () => {
        await prisma.$disconnect()
      })
  }
  res.json(flashcard);
});

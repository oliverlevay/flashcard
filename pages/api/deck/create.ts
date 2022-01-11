import prisma from "lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";

// POST /api/flashcard/create
// Required fields in body: title, frontImageUrl, backImageUrl
export default withApiAuthRequired(async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, flashcardIds }: { name: string, flashcardIds: number[] } = JSON.parse(req.body);
  const idsConnector = flashcardIds.map((id) => ({ id: id }));
  const session = await getSession(req, res);
  const deck = await prisma.deck.create({
    data: {
      name,
      author: { connect: { email: session?.user?.email } },
      flashcards: { connect: idsConnector }
    }
  })
    .catch((e) => {
      throw e
    })
    .finally(async () => {
      await prisma.$disconnect()
    });

  res.json(deck);
});

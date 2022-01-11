import prisma from "lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";

// POST /api/flashcard/create
// Required fields in body: title, frontImageUrl, backImageUrl
export default withApiAuthRequired(async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession(req, res);
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email
    },
    include: {
      flashcards: {
        where: {
          deleted: false,
        }
      },
    }
  })
    .catch((e) => {
      throw e
    })
    .finally(async () => {
      await prisma.$disconnect()
    });
  res.json(user?.flashcards);
});

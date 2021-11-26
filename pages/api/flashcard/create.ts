import prisma from "lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";

// POST /api/flashcard/create
// Required fields in body: title, frontImageUrl, backImageUrl
export default withApiAuthRequired(async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, frontImageUrl, backImageUrl } = JSON.parse(req.body);
  const session = await getSession(req, res);
  const flashcard = await prisma.flashcard.create({
    data: {
      title,
      frontImageUrl,
      backImageUrl,
      author: { connect: { email: session?.user?.email } },
    },
  });

  res.json(flashcard);
});

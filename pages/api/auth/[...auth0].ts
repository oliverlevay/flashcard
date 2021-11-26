import { handleAuth, handleCallback, AfterCallback } from "@auth0/nextjs-auth0";
import prisma from "lib/prisma";

const afterCallback: AfterCallback = async (req, res, session, state) => {
  try {
    await prisma.user.create({
      data: { email: session.user.email, name: session.user.name },
    });
  } catch (err) {
    console.error(err);
  }

  return session;
};

export default handleAuth({
  async callback(req, res) {
    try {
      await handleCallback(req, res, { afterCallback });
    } catch (error: any) {
      res.status(error.status || 500).end(error.message);
    }
  },
});

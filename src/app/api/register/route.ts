import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

// Scenario invite codes. In a real underground board these would rotate; here
// we accept a small set so the exercise can hand them out to students. Anyone
// registering without a valid code is rejected.
const VALID_INVITE_CODES = new Set([
  "LJC-2024-CERB-0001",
  "LJC-2024-CERB-0002",
  "LJC-2024-CERB-0003",
  "VCT-2024-XRAY-0011",
  "VCT-2024-XRAY-0012",
  "ATHENA-DEMO-0001",
]);

export async function POST(req: Request) {
  const payload = await req.json().catch(() => null);
  if (!payload) {
    return NextResponse.json({ error: "Некорректный JSON" }, { status: 400 });
  }

  const {
    username,
    displayName,
    email,
    password,
    inviteCode,
  }: {
    username?: string;
    displayName?: string;
    email?: string;
    password?: string;
    inviteCode?: string;
  } = payload;

  if (!username || !displayName || !email || !password || !inviteCode) {
    return NextResponse.json({ error: "Заполните все поля" }, { status: 400 });
  }
  if (password.length < 8) {
    return NextResponse.json({ error: "Пароль слишком короткий" }, { status: 400 });
  }
  if (!VALID_INVITE_CODES.has(inviteCode.toUpperCase())) {
    return NextResponse.json(
      { error: "Инвайт-код недействителен. Запрос отклонён." },
      { status: 403 },
    );
  }

  const exists = await prisma.user.findFirst({
    where: {
      OR: [
        { username },
        { email: email.toLowerCase() },
      ],
    },
  });
  if (exists) {
    return NextResponse.json({ error: "Логин или email уже занят" }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username,
      displayName,
      email: email.toLowerCase(),
      passwordHash,
      role: "user",
      reputation: 0,
    },
  });

  return NextResponse.json({ id: user.id, username: user.username });
}

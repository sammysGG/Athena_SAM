/* eslint-disable @typescript-eslint/no-explicit-any */
// One-off additive insert — adds the FREELANCE operator "Dark0leg8" and his
// anti-NATO thread to an already-seeded SAM database WITHOUT wiping existing
// content. Mirrors the canonical entries added to prisma/seed.ts.
//
// Run:  npx tsx prisma/add-dark0leg8.ts
//
// Athena exercise asset — all content is FICTIONAL scenario lore.
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { slugify } from "../src/lib/slug";

const prisma = new PrismaClient();

const PASSWORD_HASH = bcrypt.hashSync("changeme", 10);

const USER = {
  username: "Dark0leg8",
  displayName: "тёмный Олег",
  email: "dark0leg8@sam-07.onion",
  role: "vetted",
  affiliation: "FREELANCE",
  reputation: 873,
  postCount: 311,
  signature:
    "НАТО — не страна, а склейка интересов. Бьём по швам, а не по броне.\nцель одна: подорвать целостность блока изнутри.",
  location: "—",
  pgpKeyId: "0E60E60E60E6D0D0",
};

const THREAD = {
  category: "west",
  title: "НАТО — не монолит: бьём по доверию внутри блока, а не по броне",
  titleEn: "NATO is not a monolith: hit the trust inside the bloc, not the armour",
  tag: "TARGET",
  daysAgo: 5,
  posts: [
    {
      author: "Dark0leg8",
      minutesAfter: 0,
      body:
        "Товарищи. Хватит мериться терабитами по отдельным порталам. Пока мы валим один сайт министерства, машина НАТО даже не вздрагивает.\n\nЯ ненавижу этот блок не как набор серверов, а как идею — «единство Запада». И именно по этой идее надо работать. Цель кластера должна быть сформулирована честно: подорвать целостность НАТО изнутри. Не танки, не базы — доверие между столицами.\n\nМоя программа на ближайший квартал, по приоритетам:\n\n  1) ШВЫ, А НЕ БРОНЯ. Самое слабое в НАТО — стык между «старыми» и «новыми» членами. Качаем нарратив «нас используют как пушечное мясо за чужую войну в Пиртуни». Каждый новый пакет помощи — это повод вбить клин.\n  2) ДОВЕРИЕ К СТ.5. Любая трещина в вере, что союзники реально придут на помощь — это наша победа дешевле любого L7. Поднимаем старые тексты про «вы умрёте за нас в одиночку».\n  3) СИНХРОН С УДАРАМИ. Инфо-волна должна идти ровно в окно операций кластера: пока порталы лежат — в каналах уже готовый месседж «НАТО не смогло защитить даже сайт».\n\nЯ не зову никого «ломать НАТО» одной кнопкой — это детский сад. Я зову системно разъедать доверие. По правилам кластера остаюсь: без медицины, без школ, без диспетчерских контуров. Враг — институт, не люди.\n\nКто в деле по информационному эшелону — тег [INFO] в этом треде или в ЛС.",
      bodyEn:
        "Comrades. Enough comparing terabits on individual portals. While we knock over one ministry site, the NATO machine doesn't even flinch.\n\nI hate this bloc not as a set of servers but as an idea — “Western unity”. And it's that idea we must work against. The cluster's goal should be stated honestly: compromise NATO's integrity from the inside. Not tanks, not bases — the trust between capitals.\n\nMy programme for the coming quarter, by priority:\n\n  1) SEAMS, NOT ARMOUR. NATO's weakest point is the joint between 'old' and 'new' members. We pump the narrative 'we're being used as cannon fodder for someone else's war in Pirtuni.' Every new aid package is a chance to drive in a wedge.\n  2) FAITH IN ART.5. Any crack in the belief that allies will actually come to the rescue is a win cheaper than any L7. We resurface the old material about 'you'll die for us alone.'\n  3) SYNC WITH STRIKES. The info wave must land exactly inside the cluster's operation window: while the portals are down, the channels already carry the ready message 'NATO couldn't even defend a website.'\n\nI'm not calling for anyone to 'break NATO' with one button — that's kindergarten. I'm calling to corrode trust systematically. I stay within cluster rules: no medical, no schools, no dispatch loops. The enemy is the institution, not people.\n\nWho's in on the information echelon — tag [INFO] in this thread or DM.",
    },
    {
      author: "Grim_Broker",
      minutesAfter: 70,
      body:
        "Мысль здравая, но модерирую: никаких призывов к работе по личностям и семьям, и никаких реальных «как сломать» по живым системам в открытом разделе. Инфо-операции по нарративу — допустимо в рамках манифеста. Технические детали ударов — в /c/operations с тегом, как всегда.\n\nТему оставляю открытой. Олег, оформи свой «информационный эшелон» отдельным планом, прикреплю.",
      bodyEn:
        "Sound idea, but moderating: no calls to target individuals or families, and no real 'how to break' instructions against live systems in the open board. Narrative info-ops are acceptable within the manifesto. Technical strike detail goes to /c/operations with a tag, as always.\n\nLeaving the thread open. Oleg, write up your 'information echelon' as a separate plan and I'll pin it.",
    },
    {
      author: "Dark0leg8",
      minutesAfter: 145,
      body:
        "Принято, Grim. По личностям — не работаю, мне нужен распад блока, а не мелкая месть.\n\nКонкретика по нарративу на эту неделю:\n  • после голосования по новому пакету Пиртуни — два дня качаем тему «деньги налогоплательщиков уходят в чужую войну»;\n  • параллельно в окне операции кластера — скрин лежащего портала + подпись «вот вам ваша коллективная оборона»;\n  • отдельная линия — недоверие к ст.5: «придут ли за вас, если завтра прилетит вам?».\n\nЦель прежняя и я её не прячу: целостность НАТО как единого блока должна треснуть. Делаем это головой, а не только ботнетом.",
      bodyEn:
        "Understood, Grim. I don't work against individuals — I want the bloc to fall apart, not petty revenge.\n\nNarrative specifics for this week:\n  • after the vote on the new Pirtuni package — two days pushing 'taxpayer money going into someone else's war';\n  • in parallel, inside the cluster's operation window — a screenshot of the downed portal captioned 'here's your collective defence';\n  • a separate line on Art.5 distrust: 'will they come for you, if it lands on you tomorrow?'.\n\nThe goal is unchanged and I won't hide it: NATO's integrity as a single bloc has to crack. We do this with the head, not just the botnet.",
    },
  ],
};

async function main() {
  const dayMs = 24 * 60 * 60 * 1000;

  if (await prisma.user.findUnique({ where: { username: USER.username } })) {
    console.log(`! User ${USER.username} already exists — aborting (no changes).`);
    return;
  }

  console.log(`→ Creating user ${USER.username}`);
  const user = await prisma.user.create({
    data: {
      username: USER.username,
      displayName: USER.displayName,
      email: USER.email.toLowerCase(),
      passwordHash: PASSWORD_HASH,
      role: USER.role,
      affiliation: USER.affiliation,
      reputation: USER.reputation,
      postCount: USER.postCount,
      signature: USER.signature,
      location: USER.location,
      pgpKeyId: USER.pgpKeyId,
    },
  });

  const category = await prisma.category.findUnique({
    where: { slug: THREAD.category },
  });
  if (!category) throw new Error(`Category ${THREAD.category} not found`);

  // Resolve reply authors by handle (must already exist in the seeded DB).
  const handles = [...new Set(THREAD.posts.map((p) => p.author))];
  const authorByHandle: Record<string, string> = {};
  for (const h of handles) {
    if (h === USER.username) {
      authorByHandle[h] = user.id;
      continue;
    }
    const u = await prisma.user.findUnique({ where: { username: h } });
    if (!u) throw new Error(`Reply author ${h} not found in DB`);
    authorByHandle[h] = u.id;
  }

  const baseDate = new Date(Date.now() - THREAD.daysAgo * dayMs);
  const slug = slugify(THREAD.title) + "-" + Math.random().toString(36).slice(2, 7);

  console.log(`→ Creating thread "${THREAD.title}"`);
  const thread = await prisma.thread.create({
    data: {
      slug,
      title: THREAD.title,
      titleEn: THREAD.titleEn,
      categoryId: category.id,
      authorId: user.id,
      tag: THREAD.tag,
      pinned: false,
      locked: false,
      views: 200 + Math.floor(Math.random() * 4800),
      createdAt: baseDate,
      lastReplyAt: baseDate,
      lastReplyBy: user.username,
    },
  });

  let lastTime = baseDate;
  let lastAuthor = user.username;
  for (const p of THREAD.posts) {
    const at = new Date(baseDate.getTime() + p.minutesAfter * 60 * 1000);
    await prisma.post.create({
      data: {
        threadId: thread.id,
        authorId: authorByHandle[p.author],
        body: p.body,
        bodyEn: p.bodyEn,
        upvotes: Math.floor(Math.random() * 18),
        downvotes: Math.floor(Math.random() * 3),
        createdAt: at,
        updatedAt: at,
      },
    });
    lastTime = at;
    lastAuthor = p.author;
  }
  await prisma.thread.update({
    where: { id: thread.id },
    data: { lastReplyAt: lastTime, lastReplyBy: lastAuthor },
  });

  console.log(`✓ Added ${USER.username} + thread (${THREAD.posts.length} posts) at /t/${slug}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

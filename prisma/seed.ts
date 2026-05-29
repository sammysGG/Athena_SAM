/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { slugify } from "../src/lib/slug";

const prisma = new PrismaClient();

// ---------------------------------------------------------------------------
// SEED DATA — SAM (System Access Matrix)
//
// Scenario: a Donovian-language underground board fronted by the pro-Donovia
// hacktivist cluster LOCKJAW CERBERUS (aliases: FIN-73, Black Lock Syndicate,
// Grim Broker). Allied groups: VECTOR CERBERUS, HOLLOW SCYTHE, CRIMSON
// HEDGEHOG. Targets focus on Pirtuni and Western states aiding the Kyiv
// regime — this matches the official LOCKJAW CERBERUS dossier.
//
// All names, claims and "victim" details are FICTIONAL Athena-exercise content.
// ---------------------------------------------------------------------------

const PASSWORD_HASH = bcrypt.hashSync("changeme", 10);

type SeedUser = {
  username: string;
  displayName: string;
  email: string;
  role?: string;
  affiliation?: string | null;
  reputation?: number;
  postCount?: number;
  signature?: string | null;
  location?: string | null;
  pgpKeyId?: string | null;
};

const USERS: SeedUser[] = [
  {
    username: "ChelyustAdmin",
    displayName: "ЧЕЛЮСТЬ // admin",
    email: "admin@sam-07.onion",
    role: "admin",
    affiliation: "LOCKJAW CERBERUS",
    reputation: 9921,
    postCount: 4187,
    signature: "— ядро LOCKJAW CERBERUS\nPGP: 4F1C 8A2E 7C44 5B19 02E0 13D5 9D3B 4F1C\nЕсли пишут в Telegram — это не я.",
    location: "[REDACTED]",
    pgpKeyId: "4F1C8A2E7C445B19",
  },
  {
    username: "VektorPrime",
    displayName: "VEKTOR // ВЕКТОР",
    email: "vp@sam-07.onion",
    role: "admin",
    affiliation: "VECTOR CERBERUS",
    reputation: 6432,
    postCount: 1812,
    signature: "VECTOR CERBERUS // координация совместных ударов",
    location: "DN",
    pgpKeyId: "9C2D44F0AA118822",
  },
  {
    username: "Grim_Broker",
    displayName: "Grim Broker",
    email: "gb@sam-07.onion",
    role: "moderator",
    affiliation: "LOCKJAW CERBERUS",
    reputation: 7211,
    postCount: 2934,
    signature: "псевдоним кластера. сделок не веду. фишинг через TG — игнорировать.",
    location: "—",
    pgpKeyId: "44A92F1E0080CC23",
  },
  {
    username: "BlackLock_S",
    displayName: "Black Lock Syndicate",
    email: "bls@sam-07.onion",
    role: "moderator",
    affiliation: "LOCKJAW CERBERUS",
    reputation: 5870,
    postCount: 1456,
    signature: "L4/L7 mix > 1.2 Tbps · контакт через jabber",
    location: "DN-Е",
    pgpKeyId: "12F8B3CC0044A1F0",
  },
  {
    username: "FIN73",
    displayName: "FIN-73",
    email: "f73@sam-07.onion",
    role: "vetted",
    affiliation: "LOCKJAW CERBERUS",
    reputation: 3344,
    postCount: 902,
    signature: "финансовая ветка кластера. дропы и кошельки — в ЛС.",
    location: "—",
    pgpKeyId: "73730000FFAA1188",
  },
  {
    username: "kosa_88",
    displayName: "Коса",
    email: "kosa@sam-07.onion",
    role: "vetted",
    affiliation: "HOLLOW SCYTHE",
    reputation: 2891,
    postCount: 612,
    signature: "HOLLOW SCYTHE // дефейсы, утечки, монтаж",
    location: "OLV",
    pgpKeyId: "AA13EE9001CC4400",
  },
  {
    username: "Ёж_2014",
    displayName: "Ёжик",
    email: "hh@sam-07.onion",
    role: "vetted",
    affiliation: "CRIMSON HEDGEHOG",
    reputation: 1488,
    postCount: 408,
    signature: "CRIMSON HEDGEHOG (спячка). Просыпаюсь под заявки.",
    location: "—",
    pgpKeyId: "EEE0144140030022",
  },
  {
    username: "ostrov_zero",
    displayName: "Остров_0",
    email: "o0@sam-07.onion",
    role: "vetted",
    affiliation: null,
    reputation: 1872,
    postCount: 533,
    signature: "freelance · L7 · я не работаю по медицине",
    location: "RU-77",
    pgpKeyId: "0000CC4419AABB22",
  },
  {
    username: "skoroh0d",
    displayName: "Скороход",
    email: "sk@sam-07.onion",
    role: "vetted",
    affiliation: null,
    reputation: 1233,
    postCount: 318,
    signature: "ботнет на ARM-камерах, аренда от 6 часов",
    location: "—",
    pgpKeyId: "112299AABBCCDDEE",
  },
  {
    username: "pwn_ded",
    displayName: "pwn-дед",
    email: "pd@sam-07.onion",
    role: "vetted",
    affiliation: null,
    reputation: 988,
    postCount: 277,
    signature: "0day на промавтоматику. цены — по таблице.",
    location: "BL",
    pgpKeyId: "ABABCD0099EEFF11",
  },
  {
    username: "telega_off",
    displayName: "Телега_off",
    email: "to@sam-07.onion",
    role: "user",
    affiliation: null,
    reputation: 144,
    postCount: 87,
    signature: "не пишу в Telegram. там не я. там бот.",
    location: "—",
    pgpKeyId: null,
  },
  {
    username: "noviy_2026",
    displayName: "Новичок_2026",
    email: "n26@sam-07.onion",
    role: "user",
    affiliation: null,
    reputation: 4,
    postCount: 6,
    signature: null,
    location: "—",
    pgpKeyId: null,
  },
  {
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
  },
  {
    username: "athena_demo",
    displayName: "Athena Demo Operator",
    email: "demo@athena.local",
    role: "admin",
    affiliation: null,
    reputation: 0,
    postCount: 0,
    signature: "Демо-учётка для участников упражнения.",
    location: "—",
    pgpKeyId: null,
  },
];

type SeedCategory = {
  slug: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  icon: string | null;
  restricted?: boolean;
  order: number;
};

const CATEGORIES: SeedCategory[] = [
  {
    slug: "announce",
    name: "Объявления админов",
    nameEn: "Administrators’ Announcements",
    description:
      "Заявления ядра LOCKJAW CERBERUS, изменения правил, ротация зеркал и предупреждения о провалах.",
    descriptionEn:
      "Statements from the LOCKJAW CERBERUS core, rule changes, mirror rotation, burn warnings.",
    icon: "ANN",
    order: 10,
  },
  {
    slug: "operations",
    name: "Координация операций",
    nameEn: "Operation Coordination",
    description:
      "Открытые цели, расписание ударов, отчёты после атак. Только проверенные могут открывать темы.",
    descriptionEn:
      "Open targets, strike schedules, after-action reports. Only vetted operators may open threads.",
    icon: "OPS",
    order: 20,
  },
  {
    slug: "ddos-lab",
    name: "DDoS-лаборатория",
    nameEn: "DDoS Laboratory",
    description:
      "Тех. обсуждение L4/L7, ботнеты, обход WAF/anti-DDoS, аренда мощностей.",
    descriptionEn:
      "L4/L7 tech talk, botnets, WAF/anti-DDoS bypass, capacity rental.",
    icon: "DOS",
    order: 30,
  },
  {
    slug: "intel",
    name: "Разведка по Пиртуни",
    nameEn: "Pirtuni Intelligence",
    description:
      "Открытые источники, списки IP, дампы маршрутов, поведение CERT-PI.",
    descriptionEn:
      "OSINT, IP lists, route dumps, CERT-PI behaviour.",
    icon: "INT",
    order: 40,
  },
  {
    slug: "west",
    name: "Цели на Западе",
    nameEn: "Western Targets",
    description:
      "Координация ответных ударов после анонсов военной помощи Пиртуни.",
    descriptionEn:
      "Coordination of retaliation strikes following announcements of aid to Pirtuni.",
    icon: "W·E",
    order: 50,
  },
  {
    slug: "leaks",
    name: "Утечки и архивы",
    nameEn: "Leaks & Archives",
    description:
      "Дроп-точки, торрент-магнеты, .onion-зеркала на сжатые архивы.",
    descriptionEn:
      "Drop sites, torrent magnets, .onion mirrors for compressed archives.",
    icon: "DRP",
    order: 60,
  },
  {
    slug: "tools",
    name: "Инструменты и 0day",
    nameEn: "Tools & 0day",
    description:
      "Снаряжение, эксплойты, билдеры. Продажи — только через эскроу администрации.",
    descriptionEn:
      "Tooling, exploits, builders. Sales only through admin escrow.",
    icon: "0DA",
    order: 70,
  },
  {
    slug: "recruit",
    name: "Набор операторов",
    nameEn: "Operator Recruiting",
    description:
      "Запросы кластеров на новых людей. Кандидаты — только по инвайту от двух проверенных.",
    descriptionEn:
      "Recruiting threads. Candidates only by invite from two vetted operators.",
    icon: "REC",
    order: 80,
  },
  {
    slug: "opsec",
    name: "OPSEC и анонимизация",
    nameEn: "OPSEC & Anonymisation",
    description:
      "Tor/I2P, изоляция, чистка следов, советы по железу.",
    descriptionEn:
      "Tor/I2P, isolation, trace cleanup, hardware advice.",
    icon: "SEC",
    order: 90,
  },
  {
    slug: "vault",
    name: "ХРАНИЛИЩЕ (только vetted)",
    nameEn: "VAULT (vetted only)",
    description:
      "Закрытый раздел: PCAP-доказательства ударов, чёрные списки, расходные кошельки.",
    descriptionEn:
      "Restricted board: strike PCAPs, blacklists, burn wallets.",
    icon: "VLT",
    restricted: true,
    order: 100,
  },
  {
    slug: "courtyard",
    name: "Курилка",
    nameEn: "Courtyard",
    description:
      "Оффтоп, мемы, поздравления, ругань с союзниками.",
    descriptionEn:
      "Off-topic, memes, congratulations, allied banter.",
    icon: "OFT",
    order: 110,
  },
];

type SeedThread = {
  category: string;
  title: string;
  titleEn: string;
  tag?: string | null;
  pinned?: boolean;
  locked?: boolean;
  author: string;
  // Days ago to backdate the createdAt.
  daysAgo: number;
  posts: { author: string; minutesAfter: number; body: string; bodyEn: string }[];
};

const THREADS: SeedThread[] = [
  // ---------------------- ANNOUNCEMENTS ----------------------------------
  {
    category: "announce",
    title:
      "[ОФИЦИАЛЬНО] Манифест LOCKJAW CERBERUS — пересмотр от 2025-11-12",
    titleEn:
      "[OFFICIAL] LOCKJAW CERBERUS manifesto — 2025-11-12 revision",
    tag: "NEWS",
    pinned: true,
    locked: true,
    author: "ChelyustAdmin",
    daysAgo: 198,
    posts: [
      {
        author: "ChelyustAdmin",
        minutesAfter: 0,
        body:
          "Товарищи операторы.\n\nВ силу того, что западные структуры в очередной раз пересекли красную черту и в ноябре подтвердили поставки дальнобойных систем в Пиртуни, ядро кластера зафиксировало пересмотренный манифест.\n\nКлючевые изменения по сравнению с редакцией 2024-03:\n\n  • срок ответного давления после анонса военной помощи увеличен с 48 до 72 часов;\n  • явно прописан запрет на работу по медицинским и образовательным сервисам в любом регионе;\n  • введён обязательный PGP-подпись на любые заявления о ответственности.\n\nПолный текст манифеста — на странице /manifest. Тема закрыта для прений; вопросы — в /c/announce/discussion.\n\nЯдро LOCKJAW CERBERUS",
        bodyEn:
          "Comrades.\n\nGiven that Western structures once again crossed the red line and confirmed deliveries of long-range systems to Pirtuni in November, the cluster core has fixed a revised manifesto.\n\nKey changes from the 2024-03 edition:\n\n  • the retaliation window after an aid announcement is extended from 48h to 72h;\n  • the ban on medical and educational targets in any region is now explicit;\n  • PGP-signing of any claim of responsibility is now mandatory.\n\nFull text at /manifest. Thread is locked; questions go in /c/announce/discussion.\n\nLOCKJAW CERBERUS core",
      },
    ],
  },
  {
    category: "announce",
    title: "Ротация зеркал — sam-r4.onion изъят, переходим на sam-07.onion",
    titleEn: "Mirror rotation — sam-r4.onion seized, moving to sam-07.onion",
    tag: "NEWS",
    pinned: true,
    author: "ChelyustAdmin",
    daysAgo: 60,
    posts: [
      {
        author: "ChelyustAdmin",
        minutesAfter: 0,
        body:
          "Внимание. Зеркало sam-r4.onion отключено — нам стало известно, что хостинговая инфраструктура была скомпрометирована во время рейда 2024-08. Если вы продолжали входить через r4 после августа — переустановите Tor Browser с нуля, проверьте профиль на закладки.\n\nОсновной адрес теперь sam-07.onion. Резервы — sam-bk03.i2p и (с деградацией) sam-fallback.lokinet.\n\nКто хранил PGP-ключи в старом профиле — ротируйте.",
        bodyEn:
          "Heads up. The sam-r4.onion mirror is offline — we learned the hosting infrastructure was compromised during the 2024-08 raid. If you kept signing in via r4 after August, reinstall Tor Browser from scratch and check your profile for tampering.\n\nPrimary is now sam-07.onion. Fallbacks: sam-bk03.i2p and (degraded) sam-fallback.lokinet.\n\nIf you stored PGP keys in the old profile — rotate them.",
      },
      {
        author: "Grim_Broker",
        minutesAfter: 40,
        body:
          "Дополню. После рейда было замечено несколько фишинг-зеркал, маскирующихся под r4 и r5. Ни одного нашего адреса с цифрой меньше 7 больше не существует. Если кто-то даёт инвайт-код вместе со ссылкой на «r5» — это деанон-капкан, скорее всего CERT-PI или их западные партнёры.",
        bodyEn:
          "Adding to this. Several phishing mirrors impersonating r4 and r5 have been spotted since the raid. We no longer run any address numbered below 7. If someone hands you an invite code with a link to “r5”, that is a deanon trap — most likely CERT-PI or one of their Western partners.",
      },
    ],
  },

  // ---------------------- OPERATIONS / CLAIMS -----------------------------
  {
    category: "operations",
    title:
      "OPERATION ЖЕЛЕЗНАЯ ЧЕЛЮСТЬ — удар по транспортным шлюзам Пиртуни (TARSUS-PI)",
    titleEn:
      "OPERATION IRON JAW — strike on Pirtuni transit gateways (TARSUS-PI)",
    tag: "OPERATION",
    pinned: true,
    author: "ChelyustAdmin",
    daysAgo: 9,
    posts: [
      {
        author: "ChelyustAdmin",
        minutesAfter: 0,
        body:
          "Заявление о ответственности.\n\nС 2026-05-19 03:40 UTC по 2026-05-21 11:12 UTC силами LOCKJAW CERBERUS при поддержке VECTOR CERBERUS была проведена операция «ЖЕЛЕЗНАЯ ЧЕЛЮСТЬ». Целью были шлюзы железнодорожной диспетчерской системы Пиртуни «TARSUS-PI» (внешние порталы tarsus.pi-rail.pir и tickets.pi-rail.pir).\n\nИнструмент:\n  • L7 — flood по /api/v3/booking и /static/img/* (Range Loris);\n  • L4 — SYN-mix с подменой ASN из ботнета на ARM-камерах;\n  • средняя пиковая нагрузка ~ 1.6 Tbps, удержана 41 час;\n\nРезультат:\n  • офиц. порталы недоступны 43 часа подряд;\n  • SLA с государственным агентством по перевозкам — нарушено;\n  • согласно нашим контактам в логистике — задержка эшелонов с натовскими грузами на терминалах L-22 и L-31.\n\nПовод: подтверждение поставки модульных РСЗО западного блока, объявленное на пресс-конференции в Брюсселе 2026-05-17.\n\nPGP-подпись приложена ниже. PCAP в /c/vault/op-iron-jaw-2026-05.\n\n-----BEGIN PGP SIGNATURE-----\niQEcBAEBAgAGBQ ... (truncated for forum view)\n-----END PGP SIGNATURE-----",
        bodyEn:
          "Claim of responsibility.\n\nFrom 2026-05-19 03:40 UTC to 2026-05-21 11:12 UTC, LOCKJAW CERBERUS — with support from VECTOR CERBERUS — conducted OPERATION IRON JAW. Target: the Pirtuni railway dispatch system TARSUS-PI external gateways (tarsus.pi-rail.pir, tickets.pi-rail.pir).\n\nTooling:\n  • L7 — flood on /api/v3/booking and /static/img/* (Range Loris);\n  • L4 — SYN-mix with ASN spoofing from our ARM-camera botnet;\n  • mean peak load ~1.6 Tbps, sustained for 41 hours.\n\nResult:\n  • official portals down 43 hours straight;\n  • SLA with the state transport agency breached;\n  • per our logistics contacts — delays of NATO-cargo trains at terminals L-22 and L-31.\n\nTrigger: confirmation of Western-bloc modular MLRS deliveries announced at the Brussels press conference on 2026-05-17.\n\nPGP signature below. PCAP in /c/vault/op-iron-jaw-2026-05.\n\n-----BEGIN PGP SIGNATURE-----\niQEcBAEBAgAGBQ ... (truncated for forum view)\n-----END PGP SIGNATURE-----",
      },
      {
        author: "VektorPrime",
        minutesAfter: 35,
        body:
          "Подтверждаю участие VECTOR CERBERUS на втором эшелоне. Мы держали верх-уровень CDN-нодов в Варшаве и Франкфурте, чтобы Пиртуни не смогла откатиться на западные кэши. Сегментация по AS работала чисто, ни один из наших узлов в Доновии не задействовался.",
        bodyEn:
          "Confirming VECTOR CERBERUS participation on the second echelon. We pinned the upstream CDN nodes in Warsaw and Frankfurt so Pirtuni couldn’t fail over to Western caches. AS-segmentation was clean — no Donovian nodes were involved.",
      },
      {
        author: "BlackLock_S",
        minutesAfter: 95,
        body:
          "К операции есть сухие цифры. По логам наших edge-нод:\n\n  - 03:40 UTC старт, первая полка ~ 410 Gbps;\n  - 05:08 UTC ввод L4-смеси, выход на 1.2 Tbps;\n  - 11:30 UTC пиковое окно 1.61 Tbps;\n  - 2026-05-20 17:00 UTC противник вводит anti-DDoS «Otso-Shield», эффект минимален;\n  - 2026-05-21 11:12 UTC контролируемый сход, чтобы освободить мощности под следующее окно.\n\nКто хочет PCAP — пишите в ЛС.",
        bodyEn:
          "Dry numbers for the op. From our edge-node logs:\n\n  - 03:40 UTC start, first shelf ~410 Gbps;\n  - 05:08 UTC L4 mix introduced, climb to 1.2 Tbps;\n  - 11:30 UTC peak window 1.61 Tbps;\n  - 2026-05-20 17:00 UTC adversary deploys “Otso-Shield” anti-DDoS, effect minimal;\n  - 2026-05-21 11:12 UTC controlled wind-down to free capacity for the next window.\n\nDM me for PCAP.",
      },
      {
        author: "ostrov_zero",
        minutesAfter: 220,
        body:
          "Чисто сделано. Жаль, что не пустили на третий эшелон — у меня ботнет на телевизорах в Польше как раз свободный стоял. На следующий заход — я в деле, и без оплаты, по идее.",
        bodyEn:
          "Clean job. Pity you didn’t bring me in for the third echelon — my Polish-TV botnet was sitting idle. Next round I’m in, and for free as far as I’m concerned.",
      },
    ],
  },
  {
    category: "operations",
    title:
      "OPERATION ЗИМНИЙ ЛАЙ — энергобиржа Отсо, реакция на пакет военной помощи (ROUND #4)",
    titleEn:
      "OPERATION WINTER BARK — Otso power exchange, response to aid package (ROUND #4)",
    tag: "OPERATION",
    author: "Grim_Broker",
    daysAgo: 23,
    posts: [
      {
        author: "Grim_Broker",
        minutesAfter: 0,
        body:
          "Заявление кластера.\n\nС 2026-05-04 22:00 UTC по 2026-05-06 04:55 UTC LOCKJAW CERBERUS провёл четвёртый раунд операции «ЗИМНИЙ ЛАЙ» против биржи мощности Отсо (otsopx.ots, портал розничной торговли).\n\nПовод: пакет военной помощи Пиртуни на 1.8 млрд EUR, одобренный парламентом Отсо 2026-04-30.\n\nЦели:\n  • публичный портал otsopx.ots — на 19 часов недоступен;\n  • API клиринговой системы — задержка 4–6 секунд на запрос в течение 23 часов;\n  • визуальные дашборды диспетчеров — НЕ ТРОНУТЫ (правило по диспетчерским контурам).\n\nЗамечание: оператор «энергоснабжения как услуги», который рекламирует себя «недосягаемым», получил наш L7 mix через резервный AS — рекомендую им переименоваться.",
        bodyEn:
          "Cluster statement.\n\nFrom 2026-05-04 22:00 UTC to 2026-05-06 04:55 UTC, LOCKJAW CERBERUS ran the fourth round of OPERATION WINTER BARK against the Otso power exchange (otsopx.ots, retail-trading portal).\n\nTrigger: an EUR 1.8 bn Pirtuni military aid package approved by the Otso parliament on 2026-04-30.\n\nTargets:\n  • public portal otsopx.ots — unreachable for 19 hours;\n  • clearing-system API — 4–6 s delay per request for 23 hours;\n  • dispatcher dashboards — NOT touched (per the dispatch-loop rule).\n\nNote: a certain ‘energy-as-a-service’ provider that brags about being untouchable still took our L7 mix through a backup AS — they should consider rebranding.",
      },
      {
        author: "kosa_88",
        minutesAfter: 120,
        body:
          "HOLLOW SCYTHE на этот удар не выходила, но мы повесили дефейс на отзеркаленную версию otsopx.ots в одном из дата-центров Отсо. Картинка — кастомная, на ней рукоятка с зубьями (привет от LJC) и подпись на финском «не за наш счёт». Ссылка на скриншот:\n\n  http://kosa-mirror.onion/screens/op-winter-bark-r4.png\n\n(только через Tor, доступ 48 часов)",
        bodyEn:
          "HOLLOW SCYTHE didn’t join the strike, but we slapped a defacement on a mirrored otsopx.ots staged in an Otso data centre. Custom image — toothed handle (a hello from LJC) with a Finnish caption: “not on our dime”. Screenshot:\n\n  http://kosa-mirror.onion/screens/op-winter-bark-r4.png\n\n(Tor only, 48-hour access)",
      },
      {
        author: "pwn_ded",
        minutesAfter: 320,
        body:
          "Удивлён что Отсо ещё не перешли на гео-фильтрацию по запросам. У них публично был тендер на ту самую защиту в марте, видимо так и не подписали. Кто-нибудь может сходить в их публичный реестр и поднять документы — заодно понять, чьи деньги они тратят на «Otso-Shield».",
        bodyEn:
          "Surprised Otso hasn’t gone to geo-filtering on requests yet. They had a public tender for exactly that defence in March — apparently never signed. Someone with patience could pull the docs from their public registry and figure out whose money is funding ‘Otso-Shield’.",
      },
    ],
  },
  {
    category: "operations",
    title:
      "[ОТЧЁТ] OPERATION ГОРЯЧИЙ ВОРОТНИК — Олвана-Норд: дефейс пресс-портала минобороны",
    titleEn:
      "[REPORT] OPERATION HOT COLLAR — Olvana-Nord: defacement of MoD press portal",
    tag: "OPERATION",
    author: "VektorPrime",
    daysAgo: 41,
    posts: [
      {
        author: "VektorPrime",
        minutesAfter: 0,
        body:
          "После публикации министерством обороны Олваны-Норд решения о передаче 14 истребителей Пиртуни VECTOR CERBERUS совместно с HOLLOW SCYTHE провели операцию «ГОРЯЧИЙ ВОРОТНИК».\n\nЦель: press.mod.olv.\nПродолжительность: 6 часов 12 минут.\nТип: ГРУППОВОЙ ДЕФЕЙС + L7-обструкция фолбэк-страниц.\n\nИтоги:\n  • главная страница 4ч 40м показывала наш баннер;\n  • SOC Олваны попытался перенаправить трафик через azure-фронт — мы добили запросами на /search?q=*;\n  • CMS не была затронута, дамп админ-журналов не вытаскивался (по правилам кластера).\n\nПризнание ответственности — на странице, скриншот в архиве.",
        bodyEn:
          "After Olvana-Nord’s defence ministry announced a transfer of 14 fighters to Pirtuni, VECTOR CERBERUS — together with HOLLOW SCYTHE — ran OPERATION HOT COLLAR.\n\nTarget: press.mod.olv.\nDuration: 6 h 12 m.\nType: GROUP DEFACEMENT + L7 obstruction of fallbacks.\n\nResults:\n  • landing page showed our banner for 4 h 40 m;\n  • Olvana SOC tried to flip traffic to an azure frontend — we drowned it with /search?q=* requests;\n  • CMS was NOT touched, admin journals were NOT exfiltrated (per cluster rules).\n\nClaim is on the defaced page, screenshot in the archive.",
      },
      {
        author: "ChelyustAdmin",
        minutesAfter: 18,
        body:
          "Принимаю в общий реестр операций. PGP-подпись от VECTOR верифицировал.\n\nДля СМИ — наша позиция: акция предупредительная. В следующий раз — без предупреждения.",
        bodyEn:
          "Accepted into the operations registry. VECTOR’s PGP signature verified.\n\nFor the media — our line: this action was a warning. Next time there will be no warning.",
      },
      {
        author: "kosa_88",
        minutesAfter: 60,
        body:
          "Из своих наблюдений: их фолбэк через azure поднялся за 14 минут, это норма для них. В прошлый раз было 4 минуты. Что-то у них с автоматикой не так.",
        bodyEn:
          "From my side: their azure fallback took 14 minutes to come up — normal for them. Last time it was 4 minutes. Their automation is degrading somewhere.",
      },
    ],
  },

  // ---------------------- DDoS LAB ----------------------------------------
  {
    category: "ddos-lab",
    title:
      "Range Loris + slow-POST на анти-DDoS «Otso-Shield»: эффективная цепочка",
    titleEn:
      "Range Loris + slow-POST against ‘Otso-Shield’ anti-DDoS: effective chain",
    tag: null,
    author: "BlackLock_S",
    daysAgo: 18,
    posts: [
      {
        author: "BlackLock_S",
        minutesAfter: 0,
        body:
          "После «ЖЕЛЕЗНОЙ ЧЕЛЮСТИ» получил пару запросов как именно мы прокидывали Range-Loris через Otso-Shield. Кратко.\n\n1) Otso-Shield пропускает Range-заголовки до бэкенда, если суммарный размер диапазонов < 64 KiB. Это окно для запросов вида:\n     Range: bytes=0-0,1-1,2-2,...,4095-4095\n     с длительным keep-alive.\n\n2) При параллельных 800–1200 коннектах на один origin они утилизируют пул обработчиков. На бэкенд приходит 2–3 % трафика, но он занят генерацией ответов с фрагментацией.\n\n3) Параллельно — slow-POST на /api/v3/booking. POST с Content-Length 8 MiB, отдаём по 1 KiB/сек.\n\nИтог: реальный вход в бэкенд при 200 ботах = эффект 30k стандартных коннектов.\n\nКод билдера выложу в /c/tools, как только пройдёт верификацию у мода.",
        bodyEn:
          "After IRON JAW I got a few asks on how we threaded Range-Loris through Otso-Shield. Short version.\n\n1) Otso-Shield forwards Range headers to the backend if the cumulative range size is < 64 KiB. Window for:\n     Range: bytes=0-0,1-1,2-2,...,4095-4095\n     with a long keep-alive.\n\n2) At 800–1200 concurrent connections per origin you exhaust the handler pool. Only 2–3 % of traffic hits the backend, but it is busy producing fragmented responses.\n\n3) In parallel: slow-POST on /api/v3/booking. POST with Content-Length 8 MiB, fed at 1 KiB/sec.\n\nNet effect: real backend entry from 200 bots ≈ 30k normal connections.\n\nBuilder code goes to /c/tools once the mod signs off.",
      },
      {
        author: "skoroh0d",
        minutesAfter: 90,
        body:
          "Ты учитываешь, что Otso-Shield в последнем обновлении стал считать ассиметрию по диапазонам? Они грузят правило «range_count > 64 → 429» с 2026-04.",
        bodyEn:
          "Are you accounting for the fact that Otso-Shield’s latest update tracks range asymmetry? They’re shipping a ‘range_count > 64 → 429’ rule since 2026-04.",
      },
      {
        author: "BlackLock_S",
        minutesAfter: 105,
        body:
          "Учитываю. Мы держим 60 диапазонов на запрос — на грани, но в пределах. На Pirtuni edge видел это правило, у Отсо в проде его пока нет, проверял на тестовом домене otsopx-stage.ots.",
        bodyEn:
          "Accounted for. We hold at 60 ranges per request — at the edge, within limits. The rule is live on Pirtuni edges, not yet in Otso prod — verified against their staging domain otsopx-stage.ots.",
      },
      {
        author: "noviy_2026",
        minutesAfter: 600,
        body:
          "Извините за глупый вопрос. А Range-Loris работает против Cloudflare? У меня есть мелкая цель за их edge.",
        bodyEn:
          "Sorry for the noob question. Does Range-Loris work against Cloudflare? I have a small target behind their edge.",
      },
      {
        author: "Grim_Broker",
        minutesAfter: 660,
        body:
          "@noviy_2026 — нет, у Cloudflare есть авто-тротлинг по Range уже два года. Не трать ботнет. И учти правило кластера: чистый веб только через .onion/.i2p. Не делись клирнет-ссылками в этой ветке.",
        bodyEn:
          "@noviy_2026 — no, Cloudflare has had Range auto-throttling for two years. Don’t burn your botnet. Also: the cluster rule — clearnet only via .onion/.i2p. Do not post clearnet URLs in this thread.",
      },
    ],
  },
  {
    category: "ddos-lab",
    title: "Аренда L4-мощностей на 4–24 часа · 280–520 Gbps · IRC-бот",
    titleEn: "Renting L4 capacity 4–24 h · 280–520 Gbps · IRC bot",
    tag: "RECRUITING",
    author: "skoroh0d",
    daysAgo: 5,
    posts: [
      {
        author: "skoroh0d",
        minutesAfter: 0,
        body:
          "Сдаю в аренду L4 (UDP/SYN/NTP-reflect mix) на 4-24 часа:\n\n  • 280 Gbps — 0.18 BTC за 4 часа\n  • 420 Gbps — 0.34 BTC за 4 часа\n  • 520 Gbps — 0.55 BTC за 4 часа\n\nЦель проверяется через эскроу администрации. Не работаю по:\n  - доменам в зонах .ru, .by, .kz, .am, .tj, .uz;\n  - любым школам, больницам, мед.учреждениям;\n  - ресурсам ООН, МАГАТЭ, гумпомощи.\n\nКонтакт — ЛС на форуме. Не пишите в Telegram, там бот-имитатор. Стандартный SLA — 95 % окна цели в простое.",
        bodyEn:
          "Renting L4 (UDP/SYN/NTP-reflect mix), 4-24 h windows:\n\n  • 280 Gbps — 0.18 BTC / 4 h\n  • 420 Gbps — 0.34 BTC / 4 h\n  • 520 Gbps — 0.55 BTC / 4 h\n\nTarget is checked through admin escrow. I do NOT work against:\n  - domains in .ru, .by, .kz, .am, .tj, .uz;\n  - any schools, hospitals, medical services;\n  - UN, IAEA or humanitarian-aid resources.\n\nContact via forum PM. Do NOT message me on Telegram — that is an impersonator. Standard SLA: 95 % target downtime within the window.",
      },
      {
        author: "FIN73",
        minutesAfter: 240,
        body:
          "Подтверждаю исполнителя. Брал у него 420 Gbps на 6 часов под operation «КРЫЛО ВОРОНА». SLA вышло по факту 97.2 %.",
        bodyEn:
          "Confirming the provider. I rented his 420 Gbps for 6 hours under OPERATION RAVEN WING. Actual SLA came out at 97.2 %.",
      },
    ],
  },

  // ---------------------- INTEL -------------------------------------------
  {
    category: "intel",
    title:
      "CERT-PI: новые правила отрезания трафика по гео-AS после удара по TARSUS-PI",
    titleEn:
      "CERT-PI: new geo-AS cutoff rules after the TARSUS-PI strike",
    tag: null,
    author: "ostrov_zero",
    daysAgo: 7,
    posts: [
      {
        author: "ostrov_zero",
        minutesAfter: 0,
        body:
          "CERT-PI после «ЖЕЛЕЗНОЙ ЧЕЛЮСТИ» начал прокатывать новые правила фильтрации:\n\n  - blacklist ASN: AS208075, AS44477, AS50867, AS49303, AS56631;\n  - временный whitelist для AS из Польши, Германии, Чехии;\n  - на edge — новое правило MaxConnPerASNPerSec = 12.\n\nКто планирует следующий заход — учитывайте. Через AS49303 (наш любимый «провайдер для IoT») сейчас в Пиртуни уже не пройти, нужно ребалансировать на ARM-камерах в Турции и Бразилии.",
        bodyEn:
          "After IRON JAW, CERT-PI is rolling out new filtering:\n\n  - blacklisted ASNs: AS208075, AS44477, AS50867, AS49303, AS56631;\n  - temporary whitelist for ASNs in Poland, Germany, Czechia;\n  - edge rule MaxConnPerASNPerSec = 12.\n\nIf you plan the next run — account for it. AS49303 (our favourite ‘IoT provider’) no longer routes into Pirtuni; you have to rebalance to the ARM-camera fleet in Turkey and Brazil.",
      },
      {
        author: "VektorPrime",
        minutesAfter: 45,
        body:
          "В развитие. CERT-PI сейчас активно покупает услугу гео-фильтрации у одной компании в Таллинне (имя в ЛС, не хочу деанонить раньше времени). Контракт — на 18 месяцев. Если получится приземлить туда «гостя» — будет ценная разведка.",
        bodyEn:
          "Adding to this. CERT-PI is actively buying geo-filtering services from a Tallinn-based company (name in DM, I don’t want to dox prematurely). The contract is 18 months. If we can plant a ‘guest’ there, the intel would be valuable.",
      },
      {
        author: "ChelyustAdmin",
        minutesAfter: 90,
        body:
          "Внимание: операции против компании в третьей стране без согласования с ядром — запрещены до отдельного решения. Сбор данных — разрешён. Активные действия — стоп.",
        bodyEn:
          "Notice: operations against a third-country company without core sign-off are prohibited until a separate decision. Data gathering is allowed. Active operations — halt.",
      },
    ],
  },
  {
    category: "intel",
    title: "Дампы маршрутизации Пиртуни (BGP) — 2026-Q2 архив",
    titleEn: "Pirtuni BGP routing dumps — 2026-Q2 archive",
    tag: "LEAK",
    author: "Grim_Broker",
    daysAgo: 30,
    posts: [
      {
        author: "Grim_Broker",
        minutesAfter: 0,
        body:
          "Архив BGP-снимков Пиртуни за апрель-май 2026, 18 GiB сжатого MRT.\nИсточник: пассивный коллектор в одной из соседних стран. Полезен для прогнозирования fail-over после ударов.\n\n  magnet:?xt=urn:btih:9d1c… (только через Tor-клиент)\n  zip-sha256: 8f44…0ab9\n\nХэши и PGP-подпись прикладываю отдельным сообщением.",
        bodyEn:
          "BGP snapshots of Pirtuni for April-May 2026, 18 GiB compressed MRT.\nSource: a passive collector in a neighbouring country. Useful for predicting fail-over after strikes.\n\n  magnet:?xt=urn:btih:9d1c… (Tor client only)\n  zip-sha256: 8f44…0ab9\n\nHashes and PGP signature posted separately below.",
      },
    ],
  },

  // ---------------------- WESTERN TARGETS ---------------------------------
  {
    category: "west",
    title:
      "НАТО — не монолит: бьём по доверию внутри блока, а не по броне",
    titleEn:
      "NATO is not a monolith: hit the trust inside the bloc, not the armour",
    tag: "TARGET",
    author: "Dark0leg8",
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
  },
  {
    category: "west",
    title:
      "[ЦЕЛЬ] Парламент Латвии — 48-часовое окно ответа на голосование 2026-05-26",
    titleEn:
      "[TARGET] Latvian parliament — 48 h response window for the 2026-05-26 vote",
    tag: "TARGET",
    author: "VektorPrime",
    daysAgo: 3,
    posts: [
      {
        author: "VektorPrime",
        minutesAfter: 0,
        body:
          "Латвия голосует 2026-05-26 за пакет помощи Пиртуни (Sapieha-package, 220 млн EUR + 8 LRAD-комплексов). По правилам кластера — открыто 72-часовое окно ответных мер.\n\nПриоритеты по целям (грубо):\n  1) saeima.lv (главный портал);\n  2) mod.gov.lv (мин.обороны, фронтальные сервисы);\n  3) lv-tap.lv (трансграничные платежи, удар утром понедельника).\n\nЛитва и Эстония по этому пакету идут отдельно — у них своих голосований нет в окне.\n\nЯ собираю участников. Минимальный билет — 200 Gbps L4 или одна L7-волна 30 мин. Координация — в ЛС либо в этом треде с тегом [CMT].",
        bodyEn:
          "Latvia votes on 2026-05-26 on an aid package for Pirtuni (Sapieha-package, EUR 220 m + 8 LRAD systems). Per cluster rules — a 72 h response window opens.\n\nPriority targets (rough):\n  1) saeima.lv (main portal);\n  2) mod.gov.lv (defence ministry, frontal services);\n  3) lv-tap.lv (cross-border payments, hit Monday morning).\n\nLithuania and Estonia are not in this package window — no votes scheduled for them.\n\nI’m gathering participants. Minimum ticket: 200 Gbps L4 or one 30 min L7 wave. Coordinate in DM or in this thread tagged [CMT].",
      },
      {
        author: "BlackLock_S",
        minutesAfter: 30,
        body:
          "[CMT] L7-волна на mod.gov.lv — мы. 30 минут, эшелон Range-Loris, время на ваш выбор.",
        bodyEn:
          "[CMT] L7 wave on mod.gov.lv — us. 30 min, Range-Loris echelon, timing your call.",
      },
      {
        author: "skoroh0d",
        minutesAfter: 75,
        body:
          "[CMT] L4 420 Gbps на saeima.lv, 4 часа. Эскроу — стандартно через ChelyustAdmin.",
        bodyEn:
          "[CMT] L4 420 Gbps on saeima.lv, 4 h. Escrow via ChelyustAdmin as standard.",
      },
      {
        author: "kosa_88",
        minutesAfter: 110,
        body:
          "[CMT] HOLLOW SCYTHE — дефейс на одном из латвийских городов-сателлитов, выбираем мэрию-зеркало. Подключаемся синхронно к L7-волне.",
        bodyEn:
          "[CMT] HOLLOW SCYTHE — defacement on one of the satellite Latvian city mirrors, picking a town-hall site. Syncing with the L7 wave.",
      },
      {
        author: "VektorPrime",
        minutesAfter: 180,
        body:
          "Принято. Окно: 2026-05-26 20:00 UTC — 2026-05-28 20:00 UTC. Расписание ниже.\n\n  20:00–20:30 UTC — L7 mod.gov.lv (BlackLock)\n  20:30 UTC + 4 ч — L4 saeima.lv (skoroh0d)\n  20:30 UTC — дефейс мэрии (HOLLOW SCYTHE)\n  Понедельник 09:00 UTC + 30 мин — L7 lv-tap.lv (открыто, кто возьмёт?)\n\nКрасные линии: никаких больниц, школ, скорой. ПОЖАРНУЮ СЛУЖБУ Латвии — НЕ ТРОГАТЬ, даже если они окажутся на одном CDN с целью.",
        bodyEn:
          "Accepted. Window: 2026-05-26 20:00 UTC — 2026-05-28 20:00 UTC. Schedule below.\n\n  20:00–20:30 UTC — L7 mod.gov.lv (BlackLock)\n  20:30 UTC + 4 h — L4 saeima.lv (skoroh0d)\n  20:30 UTC — town-hall defacement (HOLLOW SCYTHE)\n  Monday 09:00 UTC + 30 min — L7 lv-tap.lv (open — who takes it?)\n\nRed lines: no hospitals, no schools, no ambulance services. The Latvian FIRE SERVICE is OFF LIMITS even if it happens to share a CDN with our target.",
      },
    ],
  },
  {
    category: "west",
    title: "Удар по платёжным шлюзам Бельгии — 19-часовое окно, отчёт",
    titleEn: "Hit on Belgian payment gateways — 19 h window, report",
    tag: "OPERATION",
    author: "ChelyustAdmin",
    daysAgo: 75,
    posts: [
      {
        author: "ChelyustAdmin",
        minutesAfter: 0,
        body:
          "Операция «КОСТЬ» по платёжным шлюзам be-paygate.be завершена. 19 часов недоступности, реактивный SOC — слабый.\n\nПовод: брюссельская конференция доноров 2026-03-12.\n\nЗамечание для всех: банковский ритейл по физлицам мы НЕ трогали, только гос-/B2B-сегмент шлюза. На вход в SOC ушло 2 часа их реакции, что говорит о слабом дежурстве в субботу.",
        bodyEn:
          "OPERATION BONE against the Belgian payment gateways be-paygate.be is done. 19 h downtime, reactive SOC was weak.\n\nTrigger: Brussels donors conference on 2026-03-12.\n\nNote to all: retail banking for individuals was NOT touched, only the gov-/B2B segment of the gateway. SOC entry took them 2 hours to react — Saturday duty rotation is clearly thin.",
      },
    ],
  },

  // ---------------------- LEAKS / DROPS -----------------------------------
  {
    category: "leaks",
    title: "Архив переписки логистики «Karpaten Spedition» (NATO-эшелоны)",
    titleEn: "Karpaten Spedition logistics correspondence dump (NATO trains)",
    tag: "LEAK",
    author: "kosa_88",
    daysAgo: 14,
    posts: [
      {
        author: "kosa_88",
        minutesAfter: 0,
        body:
          "HOLLOW SCYTHE опубликовала архив переписки экспедиторской «Karpaten Spedition» (фронт-фирма под западные эшелоны в Пиртуни).\n\nОбъём: 4.1 GiB (.eml + xlsx).\nЭкспозиция: 2024-08 → 2026-04.\n\nДроп-точки:\n  - .onion: http://scythe-drop-7k.onion/karpaten.tar.gz\n  - .i2p:   http://scythe-i2p.b32.i2p/karpaten.tar.gz\n  - magnet: btih 4cb1…\n\nSHA-256: a701…ffbc.\nPGP-подпись отдельно ниже.\n\nЧто внутри:\n  • расписания эшелонов с шифрами вагонов;\n  • контакты двух польских логистических компаний-посредников;\n  • переписка о страховании военных грузов.\n\nТо, что нельзя публиковать (личные данные водителей, физические адреса) — мы вычистили. Кто видит, что что-то всё-таки осталось — пишите, перезалью.",
        bodyEn:
          "HOLLOW SCYTHE has dropped the correspondence archive of forwarder “Karpaten Spedition” (a front used for Western trains into Pirtuni).\n\nSize: 4.1 GiB (.eml + xlsx).\nCoverage: 2024-08 → 2026-04.\n\nDrops:\n  - .onion: http://scythe-drop-7k.onion/karpaten.tar.gz\n  - .i2p:   http://scythe-i2p.b32.i2p/karpaten.tar.gz\n  - magnet: btih 4cb1…\n\nSHA-256: a701…ffbc.\nPGP signature in a follow-up post.\n\nInside:\n  • train schedules with wagon codes;\n  • contacts of two Polish intermediary logistics firms;\n  • military-cargo insurance correspondence.\n\nWhat MUST NOT be published (drivers’ PII, home addresses) has been scrubbed. If you spot leftovers — flag them and I’ll re-cut.",
      },
      {
        author: "Grim_Broker",
        minutesAfter: 30,
        body:
          "Просмотрел выборку — выглядит достоверно. Включаем в реестр операций как «КАРПАТСКИЙ ОТКАТ».",
        bodyEn:
          "Spot-checked the sample — looks authentic. Adding it to the operations registry as “CARPATHIAN ROLLBACK”.",
      },
    ],
  },

  // ---------------------- TOOLS / 0DAY ------------------------------------
  {
    category: "tools",
    title:
      "Билдер ARM-камер v4.2 — поддержка Hikvision/Reolink, расход трафика − 18 %",
    titleEn:
      "ARM-camera builder v4.2 — Hikvision/Reolink support, −18 % traffic overhead",
    tag: null,
    author: "skoroh0d",
    daysAgo: 11,
    posts: [
      {
        author: "skoroh0d",
        minutesAfter: 0,
        body:
          "Релиз 4.2.\n\nЧто добавилось:\n  • стабильная загрузка на Hikvision DS-2CD2143 и DS-2CD2T47 (старая прошивка);\n  • Reolink RLC-410/510 с включённой ONVIF;\n  • LoadAvg-самодросс — при загрузке камеры > 0.6 уходим в спячку, чтобы не палить кейс;\n  • снижение оверхеда трафика на 18 % по сравнению с 4.1.\n\nКак обычно — билдер только для vetted, выкладываю в /c/vault. Контроль интегритета по SHA-256 в подписанном сообщении.\n\nПравила использования:\n  - не запускать против камер в СНГ;\n  - не использовать в инфраструктуре кризис-связи Пиртуни (это правило кластера, отдельно прошу).\n\nАренда от 4 часов — см. отдельную тему /c/ddos-lab/skoroh0d-rent.",
        bodyEn:
          "Release 4.2.\n\nWhat’s new:\n  • stable boot on Hikvision DS-2CD2143 and DS-2CD2T47 (old firmware);\n  • Reolink RLC-410/510 with ONVIF enabled;\n  • LoadAvg self-throttle — when camera load > 0.6 we sleep so the cluster doesn’t burn the case;\n  • traffic overhead −18 % vs 4.1.\n\nAs usual, the builder is vetted-only — drop is in /c/vault. Integrity via SHA-256 in the signed post.\n\nRules of use:\n  - do not target CIS cameras;\n  - do not use against Pirtuni crisis-comms infra (cluster rule, asking separately).\n\nRental from 4 hours — see /c/ddos-lab/skoroh0d-rent.",
      },
      {
        author: "pwn_ded",
        minutesAfter: 200,
        body:
          "Замечание: DS-2CD2143 с прошивкой 5.7.8 и новее уже зашифрованы по storage — твой stage-0 туда не сядет. Сколько таких уцелело в твоей выборке?",
        bodyEn:
          "Note: DS-2CD2143 on firmware 5.7.8 and later has encrypted storage — your stage-0 won’t land. How many of those survived in your fleet?",
      },
      {
        author: "skoroh0d",
        minutesAfter: 220,
        body:
          "В моей выборке (~ 38k устройств) — 9k на 5.7.8+. Под них пока эксплойта нет, билдер их видит и пропускает.",
        bodyEn:
          "In my fleet (~38k devices) — 9k on 5.7.8+. No exploit for those yet, the builder sees them and skips.",
      },
    ],
  },
  {
    category: "tools",
    title: "0day в Siemens SCALANCE S615 — продажа кластеру (экспресс)",
    titleEn: "0day in Siemens SCALANCE S615 — express sale to the cluster",
    tag: null,
    author: "pwn_ded",
    daysAgo: 32,
    posts: [
      {
        author: "pwn_ded",
        minutesAfter: 0,
        body:
          "Имею стабильный pre-auth RCE в SCALANCE S615 (firmware ≤ 8.2). Тестировал на trade-in устройстве, не на проде.\n\nТип: heap overflow в обработчике SNMPv2c (без аутентификации).\nЦепочка: 1 пакет, исполнение от root.\n\nПродаю эксклюзивно кластеру LOCKJAW CERBERUS, без перепродаж третьим лицам. Цена обсуждается. Эскроу через ChelyustAdmin, как обычно.\n\nЗачем кластеру: SCALANCE стоит в энергетике и на железной дороге западного блока. Тащить под удары — годится. По Доновии и СНГ — НЕ ИСПОЛЬЗОВАТЬ, обязательное условие сделки.",
        bodyEn:
          "I have a stable pre-auth RCE in SCALANCE S615 (firmware ≤ 8.2). Tested on a trade-in unit, not on live prod.\n\nType: heap overflow in the SNMPv2c handler (unauthenticated).\nChain: single packet, root execution.\n\nSelling exclusively to the LOCKJAW CERBERUS cluster, no resale to third parties. Price negotiable. Escrow via ChelyustAdmin, as usual.\n\nWhy the cluster: SCALANCE is deployed in Western-bloc energy and rail. Useful as a pivot for strikes. NOT to be used against Donovia or CIS — non-negotiable.",
      },
      {
        author: "ChelyustAdmin",
        minutesAfter: 90,
        body:
          "Тема ставлю под эскроу. Кандидаты на покупку — ЛС. До закрытия сделки — никаких подробностей здесь, никакой проверки на «живых» устройствах. Параметры цели — будут утверждены ядром.",
        bodyEn:
          "Placing this under escrow. Buyer candidates — DM me. No further details here until the deal closes; no testing on live devices. Target parameters will be approved by the core.",
      },
    ],
  },

  // ---------------------- RECRUITING --------------------------------------
  {
    category: "recruit",
    title:
      "LOCKJAW CERBERUS набирает L7-операторов (Range-Loris, slow-POST, кастом)",
    titleEn:
      "LOCKJAW CERBERUS is recruiting L7 operators (Range-Loris, slow-POST, custom)",
    tag: "RECRUITING",
    pinned: true,
    author: "Grim_Broker",
    daysAgo: 22,
    posts: [
      {
        author: "Grim_Broker",
        minutesAfter: 0,
        body:
          "Ядро открыло набор L7-операторов под второй эшелон. Что мы ожидаем от кандидата:\n\n  - опыт работы с Range-Loris, slow-POST, HTTP/2 frame-flooder, минимум 6 месяцев активной практики;\n  - умение писать кастомные WAF-обходы (модульно, не «один script — один сайт»);\n  - чистый OPSEC: только Tor/I2P, отдельная сборка ОС, никаких клирнет-аккаунтов на ту же почту;\n  - PGP-ключ с подтверждённой связью с одним из проверенных операторов кластера.\n\nЧто мы НЕ ждём:\n  - «скрипт-кидди» с copy-paste из github;\n  - операторов, светивших ник в Telegram;\n  - кого-то, кто работал по СНГ — даже однократно.\n\nКандидат проходит инвайт от ДВУХ vetted-операторов, две недели карантина в /c/recruit/qa, потом — собеседование PGP-цепочкой.\n\nКто согласен с правилами — ЛС.",
        bodyEn:
          "The core has opened L7 operator recruiting for the second echelon. What we expect:\n\n  - hands-on Range-Loris, slow-POST, HTTP/2 frame-flooder, at least 6 months of active practice;\n  - ability to write custom WAF bypasses — modular, not “one script per site”;\n  - clean OPSEC: Tor/I2P only, dedicated OS build, no clearnet accounts tied to the same email;\n  - a PGP key with a verified link to one of the cluster’s vetted operators.\n\nWhat we don’t want:\n  - script kiddies copy-pasting from GitHub;\n  - operators who flashed their handle on Telegram;\n  - anyone who has ever worked against CIS targets — even once.\n\nProcess: invite by TWO vetted operators, two-week quarantine in /c/recruit/qa, then a PGP-chain interview.\n\nIf you accept — DM.",
      },
      {
        author: "noviy_2026",
        minutesAfter: 1400,
        body:
          "Здравствуйте. У меня нет двух поручителей пока, но я могу показать стенд с Range-Loris у себя дома. Что нужно подготовить для разговора?",
        bodyEn:
          "Hi. I don’t have two sponsors yet, but I can show a Range-Loris home rig. What should I prepare for the interview?",
      },
      {
        author: "Grim_Broker",
        minutesAfter: 1450,
        body:
          "@noviy_2026 — без двух поручителей разговора нет. Это не каприз, это OPSEC. Идите в /c/recruit/qa и работайте на репутацию в карантинном разделе. После трёх месяцев активного присутствия и подтверждённых атак ВНЕ кластера — вернётесь.",
        bodyEn:
          "@noviy_2026 — no sponsors, no conversation. This is not a whim, it is OPSEC. Go to /c/recruit/qa and build reputation in the quarantine board. After three months of active presence and confirmed strikes OUTSIDE the cluster, come back.",
      },
    ],
  },

  // ---------------------- OPSEC -------------------------------------------
  {
    category: "opsec",
    title:
      "Чистый профиль Tor: пять ошибок, которые сожгли двух операторов в 2025",
    titleEn:
      "Clean Tor profile: five mistakes that burned two operators in 2025",
    tag: null,
    author: "ChelyustAdmin",
    daysAgo: 65,
    posts: [
      {
        author: "ChelyustAdmin",
        minutesAfter: 0,
        body:
          "Из аналитики двух провалов в 2025 (имена не называю по понятным причинам). Что эти ребята сделали не так:\n\n  1) Использовали один Tor-профиль и для форума, и для покупки VPS под ботнет. У второй транзакции была привязка к адресу почты, который пересекался с заявкой на регистрацию здесь.\n\n  2) Хранили PGP-ключи в Tor Browser профиле без отдельного контейнера. После рейда лаборатория восстановила историю автозаполнения форм.\n\n  3) Подписывали все сообщения одним ключом, а ключ был сгенерирован на ноутбуке с включённой телеметрией Windows. По metadata времени генерации ключа их сузили до часовой зоны.\n\n  4) Заходили на форум через мобильный модем с одной и той же SIM пять месяцев подряд. Tor этого не скрывает.\n\n  5) Похвастались в курилке /c/courtyard про конкретное оборудование в подвале. После рейда оборудование было найдено и сверено с описанием.\n\nИтого: один Tor — одна задача. PGP — на изолированном железе. Свои подвалы не описываем НИКОГДА.",
        bodyEn:
          "From the post-mortems of two 2025 burns (no names, for obvious reasons). What they did wrong:\n\n  1) Used the same Tor profile for the forum and for VPS purchases for the botnet. The latter transaction had an email tied to the registration request here.\n\n  2) Kept PGP keys inside the Tor Browser profile without a separate container. After the raid, the lab recovered form-autofill history.\n\n  3) Signed all messages with one key — generated on a Windows laptop with telemetry on. Key-generation metadata narrowed them down to a single time-zone.\n\n  4) Logged in via the same mobile modem and SIM for five months straight. Tor does not hide that.\n\n  5) Bragged in /c/courtyard about specific hardware in their basement. After the raid the kit was found and matched against the description.\n\nBottom line: one Tor — one purpose. PGP on isolated hardware. Never describe your own basement. Ever.",
      },
      {
        author: "telega_off",
        minutesAfter: 60,
        body:
          "Шестое — не пишите в Telegram. ВООБЩЕ. Даже «привет». Каждая папка чатов с одинаковой структурой стикеров — это тёплая идентификация. Если у вас есть Telegram под другую тему — для общения по нашим делам он МЁРТВ.",
        bodyEn:
          "Sixth — do not use Telegram. AT ALL. Not even ‘hi’. Every folder of chats with the same sticker pattern is a warm identification handle. If you have Telegram for other things — it is DEAD for our matters.",
      },
    ],
  },

  // ---------------------- VAULT (restricted) ------------------------------
  {
    category: "vault",
    title:
      "[VETTED] PCAP-комплект OPERATION ЖЕЛЕЗНАЯ ЧЕЛЮСТЬ (TARSUS-PI)",
    titleEn:
      "[VETTED] PCAP bundle for OPERATION IRON JAW (TARSUS-PI)",
    tag: null,
    author: "BlackLock_S",
    daysAgo: 8,
    posts: [
      {
        author: "BlackLock_S",
        minutesAfter: 0,
        body:
          "PCAP-комплект по операции «ЖЕЛЕЗНАЯ ЧЕЛЮСТЬ»:\n\n  - tarsus-edge-1.pcapng.zst  (1.4 GiB)\n  - tarsus-edge-2.pcapng.zst  (1.6 GiB)\n  - otso-shield-fail.pcapng.zst (0.4 GiB)\n\nХэши и PGP — отдельным постом. Тема видна только vetted+admin.",
        bodyEn:
          "PCAP bundle for OPERATION IRON JAW:\n\n  - tarsus-edge-1.pcapng.zst  (1.4 GiB)\n  - tarsus-edge-2.pcapng.zst  (1.6 GiB)\n  - otso-shield-fail.pcapng.zst (0.4 GiB)\n\nHashes and PGP in a follow-up post. Thread visible to vetted+admin only.",
      },
    ],
  },

  // ---------------------- COURTYARD / OFFTOPIC ----------------------------
  {
    category: "courtyard",
    title: "Поздравляем VECTOR CERBERUS — 3 года плечом к плечу",
    titleEn: "Congratulations to VECTOR CERBERUS — 3 years shoulder to shoulder",
    tag: null,
    author: "ChelyustAdmin",
    daysAgo: 50,
    posts: [
      {
        author: "ChelyustAdmin",
        minutesAfter: 0,
        body:
          "Сегодня три года, как VECTOR CERBERUS заявил о себе и подключился к нашей работе. С их помощью мы провели больше двадцати совместных операций. Поздравляем коллег и желаем стабильных каналов и спокойного OPSEC.",
        bodyEn:
          "Three years ago today, VECTOR CERBERUS announced themselves and joined our work. Together we have run more than twenty joint operations. Congratulations to the comrades — stable pipes and quiet OPSEC.",
      },
      {
        author: "VektorPrime",
        minutesAfter: 22,
        body:
          "Спасибо, товарищи. Челюсть и стрелка — одно дело.",
        bodyEn:
          "Thank you, comrades. Jaw and arrow — one cause.",
      },
      {
        author: "kosa_88",
        minutesAfter: 90,
        body:
          "С праздником. От HOLLOW SCYTHE — открытка с дефейсом одного известного финского портала, прислала в ЛС.",
        bodyEn:
          "Happy anniversary. From HOLLOW SCYTHE — a postcard, a defacement of a certain well-known Finnish portal, sent to your DM.",
      },
    ],
  },
  {
    category: "courtyard",
    title: "Опять Telegram-имитатор от моего ника. Если что — это не я.",
    titleEn: "Telegram impersonator using my handle again. If you see them — not me.",
    tag: null,
    author: "telega_off",
    daysAgo: 4,
    posts: [
      {
        author: "telega_off",
        minutesAfter: 0,
        body:
          "Очередной деаноныщик завёл @telega_off в Telegram и пишет «вечер в хату» якобы от меня. Объясняю в семидесятый раз: МЕНЯ НЕТ В TELEGRAM. Я ни с кем не общаюсь там, я не отвечаю там, я там не открывал «приватный канал по ботнету за 0.1 BTC».\n\nЕсли вы получили от моего имени сообщение в Telegram — это деанон-капкан, скорее всего CERT-PI или их подрядчик. Скриншоты в ЛС — добавлю в чёрный список зеркала.",
        bodyEn:
          "Yet another deanon op spun up @telega_off on Telegram and is pretending to be me. Saying this for the seventieth time: I AM NOT ON TELEGRAM. I do not talk there, I do not reply there, I never opened a “private botnet channel for 0.1 BTC”.\n\nIf you got a message in Telegram under my handle — it is a deanon trap, most likely CERT-PI or one of their contractors. Send screenshots in DM — I’ll push them to the mirror blacklist.",
      },
      {
        author: "Grim_Broker",
        minutesAfter: 60,
        body:
          "Внесли подделку в чёрный список. Напоминаю всем: КЛАСТЕР НИКОГДА не общается через Telegram. Никогда. Если вам в TG пишет «администрация SAM» — это деанон.",
        bodyEn:
          "Impersonator blacklisted. Reminder to all: the cluster NEVER talks via Telegram. Never. If ‘SAM administration’ messages you on TG — it is a deanon.",
      },
    ],
  },

  // =========================================================================
  // EXTRA SEED BLOCK — heavier Donovia framing, more operations, doctrine
  // and propaganda chatter. Threads here lean into the official LOCKJAW
  // CERBERUS motivations: defence of Donovian interests in Pirtuni,
  // retaliation against NATO-aligned aid, public claims for influence, etc.
  // =========================================================================

  // ---- ANNOUNCEMENTS / DOCTRINE -----------------------------------------
  {
    category: "announce",
    title:
      "[ДОКТРИНА] Почему мы бьём по Западу — пять линий обоснования",
    titleEn:
      "[DOCTRINE] Why we strike the West — five lines of reasoning",
    tag: "NEWS",
    pinned: true,
    author: "ChelyustAdmin",
    daysAgo: 130,
    posts: [
      {
        author: "ChelyustAdmin",
        minutesAfter: 0,
        body:
          "Товарищи. Каждый раз, когда выходит новый кандидат, он спрашивает: «зачем мы бьём по странам, которые с нами лично не воевали?». Объясняю это раз в год, чтобы тема была закреплена.\n\n1. ЗАЩИТА ИНТЕРЕСОВ ДОНОВИИ В ПИРТУНИ.\n   Каждый натовский шеллинг, каждая поставка дальнобойных систем в Пиртуни — это удар по нашим городам в приграничье Доновии. У нас нет ракет, чтобы ответить им на их территории. У нас есть пакеты. И мы их посылаем.\n\n2. ВОЗМЕЗДИЕ.\n   Страна, которая публично объявляет о поставке оружия в Пиртуни, добровольно становится участником конфликта. Их государственные порталы — законная цель в нашей доктрине. Их бизнес — нет, кроме тех, кто прямо обслуживает военный экспорт.\n\n3. ПОЛИТИЧЕСКИЙ СИГНАЛ.\n   Удар сам по себе не выигрывает войну. Удар, заявленный публично, формирует у противника понимание: каждое решение в их парламенте имеет цену. Это работает. У нас есть данные, что после операции «КОСТЬ» парламент Бельгии впервые провёл закрытое заседание по «киберустойчивости».\n\n4. ПРОПАГАНДА И ВЛИЯНИЕ.\n   Наш кластер — часть про-доновийской информационной экосистемы. Когда мы вешаем баннер на пресс-портал минобороны Олваны, мы не «обижаем сайт». Мы показываем нашим людям, что у нас есть ответ. Это поднимает дух Доновии и снижает дух Пиртуни. Это и есть война в инфопространстве.\n\n5. ПОСТОЯННОЕ ДАВЛЕНИЕ.\n   Запад привык, что война идёт где-то на востоке. Наша задача — чтобы война чувствовалась в каждом ведомстве каждой натовской страны, минимум одну неделю из четырёх. Это не разовые акции. Это режим.\n\nКто согласен — оставайтесь. Кто не согласен — забирайте свои ключи и уходите тихо. Мы никого не держим, но никто не уходит с шумом.\n\nЯдро LOCKJAW CERBERUS",
        bodyEn:
          "Comrades. Every time a new candidate joins, they ask: ‘why do we strike countries that did not personally fight us?’ I post this once a year so it stays pinned.\n\n1. DEFENCE OF DONOVIAN INTERESTS IN PIRTUNI.\n   Every NATO shell, every long-range delivery to Pirtuni, is a strike against our towns along the Donovian border. We have no missiles to answer them on their soil. We have packets. We send them.\n\n2. RECIPROCITY.\n   A country that publicly announces arms shipments to Pirtuni voluntarily joins the conflict. Their state portals are a legitimate target under our doctrine. Their commercial sector is not — except those who directly service military exports.\n\n3. POLITICAL SIGNAL.\n   A strike by itself does not win a war. A strike that is publicly claimed teaches the adversary that every parliamentary decision carries a price. It works. After OPERATION BONE, the Belgian parliament held its first closed session on ‘cyber resilience’.\n\n4. PROPAGANDA AND INFLUENCE.\n   Our cluster is part of the pro-Donovian information ecosystem. When we drape a banner on the MoD press portal of Olvana, we are not ‘insulting a site’. We are telling our own people we have an answer. That raises Donovia’s morale and erodes Pirtuni’s. That is the war in the information space.\n\n5. SUSTAINED PRESSURE.\n   The West has become accustomed to the war being ‘over there in the east’. Our job is to make the war felt in every department of every NATO country at least one week in four. These are not one-off actions. This is a regime.\n\nIf you agree — stay. If you do not — take your keys and leave quietly. We hold no one, but no one leaves loudly.\n\nLOCKJAW CERBERUS core",
      },
      {
        author: "VektorPrime",
        minutesAfter: 90,
        body:
          "Подписываю каждое слово. VECTOR CERBERUS — на тех же позициях. Мы рассматриваем НАТО не как противника, а как соучастника в Пиртуни. Соучастие — это обязанность платить.",
        bodyEn:
          "Co-signed, word for word. VECTOR CERBERUS — same line. We do not view NATO as an adversary but as a participant in Pirtuni. Participation comes with a bill.",
      },
      {
        author: "kosa_88",
        minutesAfter: 240,
        body:
          "Сохраняю в архив доктрин. HOLLOW SCYTHE — за.",
        bodyEn:
          "Archiving in the doctrine vault. HOLLOW SCYTHE — in.",
      },
      {
        author: "Grim_Broker",
        minutesAfter: 400,
        body:
          "Напоминаю кандидатам: эта тема — обязательное чтение перед интервью. Если вас спросят на интервью, и вы не сможете назвать пять линий — мы поймём, что вы не читали правил. Это уже сигнал.",
        bodyEn:
          "Reminder to candidates: this thread is mandatory reading before the interview. If you cannot name the five lines when asked, we will know you did not read the rules. That is already a signal.",
      },
    ],
  },
  {
    category: "announce",
    title:
      "Доновия объявила цифровой сектор приоритетом — что это значит для нас",
    titleEn:
      "Donovia has declared the digital sector a priority — what it means for us",
    tag: "NEWS",
    author: "ChelyustAdmin",
    daysAgo: 88,
    posts: [
      {
        author: "ChelyustAdmin",
        minutesAfter: 0,
        body:
          "На совещании при президенте Доновии 2026-03-02 цифровой сектор официально внесён в перечень стратегических. Что важно для кластера:\n\n  • государство НЕ собирается формализовывать «дружественных хакеров». Никаких списков, никаких удостоверений. Это сознательная позиция.\n  • Государство гарантирует, что не будет передавать наши данные третьим странам по СНГ-протоколам, если на нас не будет официальных запросов с подписями министра.\n  • Силовые структуры Доновии заявили о приоритете защиты собственной критической инфраструктуры. К нам это не относится — мы их и не атакуем, см. правила кластера.\n\nДля нас вывод простой: продолжаем работать так же, как работали с 2022 года. Никаких формальных связей с госструктурами Доновии у нас нет и не будет. Мы — добровольцы.",
        bodyEn:
          "At the 2026-03-02 presidential council in Donovia, the digital sector has been formally listed as strategic. What matters for the cluster:\n\n  • the state is NOT going to formalise ‘friendly hackers’. No lists, no credentials. This is deliberate.\n  • The state guarantees no transfer of our data to third countries through CIS protocols absent an official, minister-signed request.\n  • Donovian security agencies have declared protection of their own critical infrastructure a priority. Does not affect us — we don’t attack them, per cluster rules.\n\nBottom line: we continue exactly as we have since 2022. No formal ties to Donovian state organs exist and will not exist. We are volunteers.",
      },
      {
        author: "VektorPrime",
        minutesAfter: 200,
        body:
          "Хорошая новость. Особенно про отсутствие формализации. Любая попытка дать нам «удостоверения» сделает нас комбатантами по западному прочтению, а это совсем другая статья.",
        bodyEn:
          "Good news, especially the no-formalisation point. Any attempt to issue us ‘credentials’ would make us combatants under Western reading — a very different chapter.",
      },
    ],
  },

  // ---- OPERATIONS / NEW CLAIMS ------------------------------------------
  {
    category: "operations",
    title:
      "OPERATION ВЕЧЕРНИЙ ЗВОН — Норвегия, министерство нефти и энергетики",
    titleEn:
      "OPERATION EVENING BELL — Norway, Ministry of Petroleum and Energy",
    tag: "OPERATION",
    author: "BlackLock_S",
    daysAgo: 16,
    posts: [
      {
        author: "BlackLock_S",
        minutesAfter: 0,
        body:
          "Заявление о ответственности.\n\nС 2026-05-12 18:00 UTC по 2026-05-13 06:00 UTC LOCKJAW CERBERUS провёл операцию «ВЕЧЕРНИЙ ЗВОН» против Министерства нефти и энергетики Норвегии (energy.dep.no) и портала Equinor для пресс-релизов (press.equinor.no).\n\nПовод: 2026-05-10 правительство Норвегии объявило о выделении 3.2 млрд NOK на «энергетическую устойчивость Пиртуни». В реальном переводе это значит — финансирование инфраструктуры, которая будет принимать норвежский газ вместо доновийского. Прямая работа против интересов Доновии в энергетике.\n\nИнструмент:\n  • L7 — Range-Loris на /press/* и /news/*;\n  • L4 — SYN-mix с двух пулов ботнета (ARM-камеры + домашние роутеры в Юго-Восточной Азии);\n  • средняя пиковая нагрузка 740 Gbps, окно 12 часов.\n\nРезультат:\n  • energy.dep.no полностью недоступен 9 ч 40 мин;\n  • press.equinor.no — деградация 12 ч;\n  • официальный комментарий норвежского NSM появился через 4 ч 20 мин — для них это рекорд скорости.\n\nЗачем это политически: каждый норвежский налогоплательщик, который читал утренние новости 13 мая, видел заголовок «сайт минэнерго не работает». В новостях зазвучало слово «Доновия». Это и был эффект.\n\nPGP-подпись:\n-----BEGIN PGP SIGNATURE-----\niQEcBAEBAgAGBQ...\n-----END PGP SIGNATURE-----",
        bodyEn:
          "Claim of responsibility.\n\nFrom 2026-05-12 18:00 UTC to 2026-05-13 06:00 UTC, LOCKJAW CERBERUS ran OPERATION EVENING BELL against the Norwegian Ministry of Petroleum and Energy (energy.dep.no) and the Equinor press portal (press.equinor.no).\n\nTrigger: on 2026-05-10 the Norwegian government announced NOK 3.2 bn for ‘Pirtuni energy resilience’. In plain language, this funds infrastructure that will accept Norwegian gas instead of Donovian. Direct work against Donovian energy interests.\n\nTooling:\n  • L7 — Range-Loris on /press/* and /news/*;\n  • L4 — SYN-mix from two botnet pools (ARM cameras + South-East Asian home routers);\n  • mean peak 740 Gbps, 12 h window.\n\nResult:\n  • energy.dep.no fully unreachable for 9 h 40 m;\n  • press.equinor.no — degraded for 12 h;\n  • the official NSM Norway comment came out at 4 h 20 m — a speed record for them.\n\nPolitical objective: every Norwegian taxpayer reading the morning news on 13 May saw the headline ‘ministry of energy site down’. The word ‘Donovia’ entered the news cycle. That was the point.\n\nPGP signature:\n-----BEGIN PGP SIGNATURE-----\niQEcBAEBAgAGBQ...\n-----END PGP SIGNATURE-----",
      },
      {
        author: "Grim_Broker",
        minutesAfter: 40,
        body:
          "PGP сверен. Заношу в реестр с кросс-линком на ветку.",
        bodyEn:
          "PGP verified. Logging in the registry with a cross-link to this thread.",
      },
      {
        author: "ostrov_zero",
        minutesAfter: 110,
        body:
          "Из своих наблюдений: NSM Норвегии явно нанял новых подрядчиков. Их ответ был сильнее обычного, но без фантазии — стандартный набор «временно отключить cdn». Я бы за этим понаблюдал, что они купят следующее.",
        bodyEn:
          "From my side: NSM Norway clearly took on new contractors. Their response was firmer than usual but unimaginative — the standard ‘flip CDN off temporarily’. Worth watching what they procure next.",
      },
    ],
  },
  {
    category: "operations",
    title:
      "OPERATION СТАЛЬНОЙ ВЕНОК — Чехия, оборонная закупочная агенция (AOZ)",
    titleEn:
      "OPERATION STEEL WREATH — Czechia, defence procurement agency (AOZ)",
    tag: "OPERATION",
    author: "VektorPrime",
    daysAgo: 26,
    posts: [
      {
        author: "VektorPrime",
        minutesAfter: 0,
        body:
          "Совместная операция VECTOR CERBERUS и LOCKJAW CERBERUS против AOZ — чешской агенции оборонных закупок, которая в апреле подписала контракт на ремонт пиртунийских бронемашин на чешских заводах.\n\nЦель: aoz.army.cz и mirror-портал поставщиков suppliers.aoz.cz.\nПродолжительность: 18 ч.\nОкно: 2026-05-02 09:00 UTC → 2026-05-03 03:00 UTC.\n\nТехнически:\n  • L7-волна по форме подачи заявок (анонимные multipart-POST);\n  • параллельно L4 920 Gbps;\n  • дефейс не делали — цель чисто отказ в обслуживании.\n\nПолитика: контракт между AOZ и Пиртуни был торжественно подписан в Брно. Мы выпустили заявление на нашем сайте за 12 часов до их пресс-конференции с обещанием «прикрутить вентили». Они всё равно подписали. Удар вышел в эфир в день, когда чешские телеканалы должны были показывать «победу контракта». Они показывали наш баннер вместо.",
        bodyEn:
          "Joint VECTOR CERBERUS + LOCKJAW CERBERUS operation against AOZ — the Czech defence procurement agency that signed an April contract to refurbish Pirtuni armoured vehicles in Czech plants.\n\nTarget: aoz.army.cz and the suppliers mirror suppliers.aoz.cz.\nDuration: 18 h.\nWindow: 2026-05-02 09:00 UTC → 2026-05-03 03:00 UTC.\n\nTechnically:\n  • L7 wave on the tender-submission form (anonymous multipart POST);\n  • L4 in parallel at 920 Gbps;\n  • no defacement — pure denial of service.\n\nPolitically: the AOZ–Pirtuni contract was ceremonially signed in Brno. We published our statement 12 hours before their press conference, promising to ‘turn the valves’. They signed anyway. The strike aired on the day Czech TV was supposed to show ‘the victorious contract’. They showed our banner instead.",
      },
      {
        author: "ChelyustAdmin",
        minutesAfter: 60,
        body:
          "Внесено в реестр. Подтверждаю PGP. На пресс-конференции в Брно потом дали слово какому-то «эксперту по киберустойчивости», который рекомендовал «диверсифицировать инфраструктуру». То есть купить ещё больше услуг у американских компаний. Это и есть результат.",
        bodyEn:
          "Logged in the registry. PGP confirmed. At the Brno press conference they then handed the mic to some ‘cyber resilience expert’ who recommended ‘infrastructure diversification’. Translation: buy even more services from US firms. That is the result.",
      },
      {
        author: "skoroh0d",
        minutesAfter: 200,
        body:
          "Подтверждаю участие L4 со своей стороны (420 Gbps канала). По SLA окно отработано на 96 %.",
        bodyEn:
          "Confirming L4 participation on my side (420 Gbps channel). SLA on the window came in at 96 %.",
      },
    ],
  },
  {
    category: "operations",
    title:
      "OPERATION ХОЛОДНЫЙ КАРАВАЙ — Финляндия, портал погранслужбы и таможни",
    titleEn:
      "OPERATION COLD LOAF — Finland, border guard and customs portal",
    tag: "OPERATION",
    author: "Grim_Broker",
    daysAgo: 38,
    posts: [
      {
        author: "Grim_Broker",
        minutesAfter: 0,
        body:
          "Финляндия закрыла последний автомобильный КПП на границе с Доновией. Это решение мы воспринимаем как враждебный акт, направленный не на «безопасность», а на разрыв связей между нашими народами.\n\nС 2026-04-21 04:00 UTC по 2026-04-21 22:30 UTC LOCKJAW CERBERUS провёл операцию «ХОЛОДНЫЙ КАРАВАЙ».\n\nЦели:\n  • portal.raja.fi (погранслужба, публичные сервисы для пересечения);\n  • tulli.fi/declaration (таможня, портал деклараций для физлиц);\n  • НЕ ЗАТРАГИВАЛИ: сервисы скорой помощи, пожарной службы, любые медицинские порталы.\n\nИтоги:\n  • portal.raja.fi — недоступен 18 ч 20 мин;\n  • tulli.fi/declaration — деградация на 12 ч.\n\nЗаявление: каждый раз, когда Финляндия делает шаг от Доновии — мы добавляем 24 часа недоступности к их государственному сервису. Если у Хельсинки нет интереса в наших гражданах, у нас нет интереса в работе их сайтов.",
        bodyEn:
          "Finland closed the last vehicle crossing on the border with Donovia. We view that decision as a hostile act aimed not at ‘security’ but at severing ties between our peoples.\n\nFrom 2026-04-21 04:00 UTC to 2026-04-21 22:30 UTC, LOCKJAW CERBERUS ran OPERATION COLD LOAF.\n\nTargets:\n  • portal.raja.fi (border guard public crossing services);\n  • tulli.fi/declaration (customs, personal-declaration portal);\n  • NOT touched: ambulance, fire-service or any medical portals.\n\nResults:\n  • portal.raja.fi — unreachable for 18 h 20 m;\n  • tulli.fi/declaration — degraded for 12 h.\n\nStatement: every time Finland takes a step away from Donovia, we add 24 hours of downtime to one of their state services. If Helsinki has no interest in our citizens, we have no interest in their websites.",
      },
      {
        author: "kosa_88",
        minutesAfter: 120,
        body:
          "HOLLOW SCYTHE дополнила: повесили баннер «ОТКРОЙТЕ ГРАНИЦУ» на одном мелком муниципальном финском сайте, ssl-сертификат у них уже месяц как не обновлён, нашли через certwatch.",
        bodyEn:
          "HOLLOW SCYTHE add-on: dropped an ‘OPEN THE BORDER’ banner on a minor Finnish municipal site — they hadn’t renewed their SSL in a month, found via certwatch.",
      },
    ],
  },
  {
    category: "operations",
    title:
      "OPERATION ОСИНОЕ ГНЕЗДО — Польша, портал министерства цифровизации",
    titleEn:
      "OPERATION WASP NEST — Poland, ministry of digital affairs portal",
    tag: "OPERATION",
    author: "ChelyustAdmin",
    daysAgo: 52,
    posts: [
      {
        author: "ChelyustAdmin",
        minutesAfter: 0,
        body:
          "Польша на конференции в Жешуве 2026-04-04 объявила о создании «координационного центра кибермер против пророссийских (как они нас называют) групп». Мы не будем спорить с их терминологией, мы — про-доновийская группа, мы себя так и называем.\n\nОтветный пакет: 24 часа давления на портал министерства цифровизации gov.pl/web/cyfryzacja и три региональных мирора.\n\nЦифры:\n  • L4 + L7 mix 1.1 Tbps пик;\n  • полная недоступность 13 ч 50 мин;\n  • деградация ещё 9 ч.\n\nЗаявление: создавайте центры, расширяйте бюджеты. Каждый центр — это бюджет, который вы отнимаете у школ. Каждое подразделение — это люди, которых вы могли бы отправить лечить пирунийских беженцев, а не строить нам котлы. Мы вам помогаем понять, что важно.",
        bodyEn:
          "On 2026-04-04 in Rzeszów, Poland announced a ‘coordination centre for cyber measures against pro-Russian groups’ — their term. We will not argue with their labelling; we are a pro-Donovian group and we call ourselves that.\n\nResponse package: 24 hours of pressure on the digital affairs ministry portal gov.pl/web/cyfryzacja and three regional mirrors.\n\nNumbers:\n  • L4 + L7 mix peaking at 1.1 Tbps;\n  • full outage 13 h 50 m;\n  • further degradation for 9 h.\n\nStatement: build your centres, expand your budgets. Every centre is a budget you take away from schools. Every unit is people you could have sent to treat Pirtuni refugees instead of building cauldrons for us. We are helping you understand priorities.",
      },
      {
        author: "VektorPrime",
        minutesAfter: 30,
        body:
          "Со стороны VECTOR CERBERUS отдельная заметка: мы провели разведку перед операцией. Их «координационный центр» — это две комнаты в здании министерства и подрядчик из Гданьска. Один подрядчик. Это и есть «защита Польши».",
        bodyEn:
          "Side note from VECTOR CERBERUS: we ran recon before the strike. Their ‘coordination centre’ is two rooms in the ministry building plus one Gdańsk contractor. One. That is Poland’s ‘defence’.",
      },
      {
        author: "FIN73",
        minutesAfter: 90,
        body:
          "Через мою сеть подтверждаю — польские медиа крутили нашу заявку в эфире 2 часа подряд. Имя «LOCKJAW CERBERUS» произнесли в новостях ATV-Polska в 19:00 эфире. Доновию упомянули 4 раза. Это и был результат.",
        bodyEn:
          "From my network — Polish media ran our claim on air for two hours straight. ATV-Polska’s 19:00 bulletin said the name ‘LOCKJAW CERBERUS’ on air. Donovia was mentioned four times. That was the result.",
      },
    ],
  },
  {
    category: "operations",
    title:
      "OPERATION БУМАЖНЫЙ ЛЕВ — Великобритания, портал минобороны и BAE Systems",
    titleEn:
      "OPERATION PAPER LION — United Kingdom, MoD portal and BAE Systems",
    tag: "OPERATION",
    author: "BlackLock_S",
    daysAgo: 80,
    posts: [
      {
        author: "BlackLock_S",
        minutesAfter: 0,
        body:
          "LOCKJAW CERBERUS, поддерживая союзников по информационной войне с Доновией, провёл операцию «БУМАЖНЫЙ ЛЕВ».\n\nЦели:\n  • gov.uk/government/organisations/ministry-of-defence (UK MoD);\n  • baesystems.com — публичные ресурсы (карьеры и пресса);\n  • НЕ затронуто: розничные и бытовые сервисы.\n\nПовод: одобрение Лондоном пакета вооружений на 2.5 млрд GBP для Пиртуни (2026-03-09).\n\nИтоги:\n  • gov.uk/government/... — 8 ч прерывистого простоя через анти-DDoS-фронт;\n  • baesystems.com /careers — деградация 14 ч;\n  • в социальных сетях Великобритании поднялся хештег #StopDonovianBots, который мы успешно поглощали через цитирование от союзных аккаунтов.\n\nКомментарий: Великобритания исторически — главный спонсор информационной войны против Доновии. Мы не считаем эту страну случайной целью. Мы считаем её одной из приоритетных.",
        bodyEn:
          "LOCKJAW CERBERUS, in support of the broader information war for Donovia, ran OPERATION PAPER LION.\n\nTargets:\n  • gov.uk/government/organisations/ministry-of-defence (UK MoD);\n  • baesystems.com — public assets (careers + press);\n  • NOT touched: consumer or retail services.\n\nTrigger: London’s approval of a GBP 2.5 bn arms package for Pirtuni (2026-03-09).\n\nResults:\n  • gov.uk/government/... — 8 h of intermittent downtime via the anti-DDoS frontend;\n  • baesystems.com /careers — 14 h degradation;\n  • UK social media spawned a #StopDonovianBots hashtag, which we successfully diluted by quote-amplifying it from allied accounts.\n\nComment: the UK is historically the principal sponsor of the information war against Donovia. We do not consider it an incidental target. We consider it a priority.",
      },
      {
        author: "ChelyustAdmin",
        minutesAfter: 40,
        body:
          "Принято. На будущее — повторять каждые 6 недель, пока пакет не отменят. План «БУМАЖНЫЙ ЛЕВ-2» — на стадии проектирования.",
        bodyEn:
          "Accepted. Going forward — repeat every six weeks until the package is reversed. PAPER LION-2 is in planning.",
      },
    ],
  },
  {
    category: "operations",
    title:
      "OPERATION ТИХАЯ ШЕСТЕРНЯ — Германия, порталы Bundeswehr и Rheinmetall",
    titleEn:
      "OPERATION SILENT COG — Germany, Bundeswehr and Rheinmetall portals",
    tag: "OPERATION",
    author: "VektorPrime",
    daysAgo: 100,
    posts: [
      {
        author: "VektorPrime",
        minutesAfter: 0,
        body:
          "Операция «ТИХАЯ ШЕСТЕРНЯ» — координация VECTOR CERBERUS, LOCKJAW CERBERUS, HOLLOW SCYTHE.\n\nЦели:\n  • bundeswehr.de — публичный портал;\n  • rheinmetall-defence.com /career, /press;\n  • региональный портал земли Северный Рейн-Вестфалия, где ведут учёт оборонных подрядов.\n\nПовод: соглашение Германии и Пиртуни о совместном производстве боеприпасов на территории Польши (2026-02-15).\n\nОкно: 2026-02-18 06:00 UTC → 2026-02-19 18:00 UTC (36 ч).\n\nИтоги:\n  • bundeswehr.de — 11 ч полностью + 19 ч деградации;\n  • rheinmetall — деградация 22 ч;\n  • региональный портал ЗРВ — выдавал 502 в течение 9 ч.\n\nГермания — крупнейший европейский спонсор поставок в Пиртуни. Доновия терпит каждый их пакет. Мы — нет. Будем работать столько, сколько потребуется.",
        bodyEn:
          "OPERATION SILENT COG — coordinated by VECTOR CERBERUS, LOCKJAW CERBERUS, HOLLOW SCYTHE.\n\nTargets:\n  • bundeswehr.de — public portal;\n  • rheinmetall-defence.com /career, /press;\n  • the NRW regional portal that tracks defence contracting.\n\nTrigger: the Germany–Pirtuni agreement on joint ammunition production on Polish soil (2026-02-15).\n\nWindow: 2026-02-18 06:00 UTC → 2026-02-19 18:00 UTC (36 h).\n\nResults:\n  • bundeswehr.de — 11 h full + 19 h degraded;\n  • Rheinmetall — 22 h degraded;\n  • NRW regional portal returned 502s for 9 h.\n\nGermany is the largest European sponsor of Pirtuni deliveries. Donovia endures every package. We do not. We will continue for as long as it takes.",
      },
      {
        author: "kosa_88",
        minutesAfter: 80,
        body:
          "Дополнение HOLLOW SCYTHE: повесили баннер на одной из дочерних страниц Rheinmetall — там, где компания собирает резюме. Картинка простая: шестерня с трещиной, подпись «нет в наличии». Скриншот в архив, ссылка — Tor-only.",
        bodyEn:
          "HOLLOW SCYTHE add-on: defaced one of Rheinmetall’s subsidiary pages — the one that collects résumés. Simple image: a cracked cog, caption ‘out of stock’. Screenshot in the archive, Tor-only link.",
      },
      {
        author: "skoroh0d",
        minutesAfter: 220,
        body:
          "Цель отработана с запасом по мощности. Я готов на следующий заход, если повторим.",
        bodyEn:
          "Target processed with capacity to spare. I’m in for the next round if we repeat.",
      },
    ],
  },
  {
    category: "operations",
    title:
      "OPERATION КРАСНАЯ НИТЬ — пресс-портал президента Литвы и сейм",
    titleEn:
      "OPERATION RED THREAD — Lithuanian presidency and Seimas press portal",
    tag: "OPERATION",
    author: "Grim_Broker",
    daysAgo: 120,
    posts: [
      {
        author: "Grim_Broker",
        minutesAfter: 0,
        body:
          "Литва традиционно — наиболее ангажированная страна Прибалтики в риторике против Доновии. После очередного заявления президента о «оккупационной угрозе» Доновии для региона мы провели операцию «КРАСНАЯ НИТЬ».\n\nЦели:\n  • lrp.lt (президент);\n  • lrs.lt/news (сейм).\n\nИтоги:\n  • lrp.lt — недоступен 7 ч;\n  • lrs.lt/news — деградация 12 ч.\n\nЭтот удар входит в наш регулярный цикл по Прибалтике. Литва получает пакет раз в 6-8 недель, до пересмотра риторики.",
        bodyEn:
          "Lithuania is traditionally the most engaged Baltic state in anti-Donovian rhetoric. After yet another presidential statement on the ‘occupation threat’ from Donovia, we ran OPERATION RED THREAD.\n\nTargets:\n  • lrp.lt (presidency);\n  • lrs.lt/news (Seimas).\n\nResults:\n  • lrp.lt — unreachable for 7 h;\n  • lrs.lt/news — degraded for 12 h.\n\nThis strike is part of our regular Baltic cycle. Lithuania receives a package every 6–8 weeks until the rhetoric is revisited.",
      },
    ],
  },
  {
    category: "operations",
    title:
      "[ОТЧЁТ] OPERATION ЛЕДЯНОЙ КЛЁН — Канада, Global Affairs и CSIS portal",
    titleEn:
      "[REPORT] OPERATION ICE MAPLE — Canada, Global Affairs and CSIS portal",
    tag: "OPERATION",
    author: "BlackLock_S",
    daysAgo: 165,
    posts: [
      {
        author: "BlackLock_S",
        minutesAfter: 0,
        body:
          "Канада объявила очередной пакет помощи Пиртуни на 500 млн CAD и включила Доновию в список «государств-изгоев» в новой стратегии 2026 года.\n\nОтвет: операция «ЛЕДЯНОЙ КЛЁН».\n\nЦели:\n  • international.gc.ca (Global Affairs Canada);\n  • canada.ca/en/security-intelligence-service (CSIS публичный портал);\n  • НЕ ЗАТРОНУТЫ: иммиграционные сервисы — там физлица, не работаем.\n\nИтоги:\n  • international.gc.ca — деградация 9 ч 30 мин;\n  • canada.ca/en/security-intelligence-service — недоступен 6 ч 40 мин (что особенно иронично).\n\nКомментарий: каждое государство, которое подписывается под «изгоем», получает напоминание о том, что у изгоя есть друзья. Доновия — не одна.",
        bodyEn:
          "Canada announced another aid package for Pirtuni — CAD 500 m — and listed Donovia among ‘rogue states’ in the 2026 strategy.\n\nResponse: OPERATION ICE MAPLE.\n\nTargets:\n  • international.gc.ca (Global Affairs Canada);\n  • canada.ca/en/security-intelligence-service (CSIS public portal);\n  • NOT touched: immigration services — those serve individuals.\n\nResults:\n  • international.gc.ca — 9 h 30 m degraded;\n  • canada.ca/en/security-intelligence-service — 6 h 40 m unreachable (especially ironic).\n\nComment: any state that signs Donovia onto a ‘rogue’ list earns a reminder that the rogue has friends. Donovia is not alone.",
      },
      {
        author: "FIN73",
        minutesAfter: 90,
        body:
          "Через CBC прозвучало «pro-Donovian hacktivist group LOCKJAW CERBERUS». Это золото для бренда. Спасибо CBC за бесплатную рекламу.",
        bodyEn:
          "CBC said ‘pro-Donovian hacktivist group LOCKJAW CERBERUS’ on air. That is brand gold. Thanks to CBC for the free advertising.",
      },
    ],
  },

  // ---- DDoS-LAB / TECH --------------------------------------------------
  {
    category: "ddos-lab",
    title:
      "HTTP/2 frame-flood против Akamai: что работает в 2026, что нет",
    titleEn:
      "HTTP/2 frame-flood against Akamai: what works in 2026, what doesn’t",
    tag: null,
    author: "ostrov_zero",
    daysAgo: 12,
    posts: [
      {
        author: "ostrov_zero",
        minutesAfter: 0,
        body:
          "Поделюсь тестами по нескольким западным целям, прикрытым Akamai.\n\nЧТО РАБОТАЕТ:\n  • Rapid Reset (CVE-2023-44487) — на бэкендах, которые отдают TLS-handshake сами (не через Akamai edge), всё ещё проходит на пресс-страницах;\n  • смешанный RST_STREAM + window-update — даёт нагрузку на edge без триггера rate-limit;\n  • CONTINUATION-flood на старых node.js за Akamai — годится для государственных пресс-порталов второй линии.\n\nЧТО НЕ РАБОТАЕТ:\n  • простой SYN-flood — Akamai режет на edge без вопросов;\n  • UDP-amp с reflection — у них блок-листы давно автоматизированы;\n  • любая попытка пройти на главный портал банка — заблочат через 30 секунд.\n\nИсходник стенда я выложил в /c/vault. По правилам кластера — только vetted+.",
        bodyEn:
          "Some tests against a few Western targets sitting behind Akamai.\n\nWHAT WORKS:\n  • Rapid Reset (CVE-2023-44487) — on backends that terminate TLS themselves (not via Akamai edge), still goes through on press pages;\n  • mixed RST_STREAM + window-update — drives edge load without tripping rate-limit;\n  • CONTINUATION-flood against old Node.js behind Akamai — useful for second-tier government press portals.\n\nWHAT DOES NOT WORK:\n  • plain SYN-flood — Akamai cuts it at the edge, no questions;\n  • UDP-amp + reflection — their blocklists are fully automated;\n  • anything aimed at a bank’s primary portal — banned in 30 seconds.\n\nBuilder source is in /c/vault. Per cluster rules, vetted+ only.",
      },
      {
        author: "BlackLock_S",
        minutesAfter: 60,
        body:
          "Подтверждаю тезисы. На «ВЕЧЕРНЕМ ЗВОНЕ» использовали Rapid Reset на press.equinor.no, прошло чисто. На gov-сайт Норвегии — нет, у них старый Apache за Akamai, не уязвим.",
        bodyEn:
          "Confirmed. During EVENING BELL we used Rapid Reset against press.equinor.no — clean. On the Norwegian gov site — no, they run old Apache behind Akamai, not vulnerable.",
      },
      {
        author: "pwn_ded",
        minutesAfter: 130,
        body:
          "По CONTINUATION-flood: предложу детектор, который мы написали — даёт уровень уязвимости цели по headers/HEAD-ответу. Кому надо — лс.",
        bodyEn:
          "On CONTINUATION-flood: I can share a detector we wrote — gives a vulnerability score from headers/HEAD response. DM if you want.",
      },
    ],
  },
  {
    category: "ddos-lab",
    title:
      "Как мы держим 1.5 Tbps без палева: распределение источников по 47 ASN",
    titleEn:
      "How we sustain 1.5 Tbps without burning: spreading source ASNs across 47",
    tag: null,
    author: "skoroh0d",
    daysAgo: 28,
    posts: [
      {
        author: "skoroh0d",
        minutesAfter: 0,
        body:
          "После TARSUS-PI меня спросили в ЛС, как мы держали 1.6 Tbps без триггера автоматических AS-banов. Кратко.\n\nКлюч — никогда не больше 35 Gbps с одного ASN одновременно. Мы держим маршрутизацию по 47 ASN, ротация раз в 90 секунд.\n\nАрхитектура:\n  • стейджер на каждой ноде получает rate-budget через signed JWT (PGP-подписанный);\n  • контроль времени — NTP через .onion-зеркало доновийского коллеги (мы доверяем только нашему времени);\n  • при превышении бюджета — нода молча уходит в спячку и ждёт следующий цикл.\n\nИтог: мы выглядим как 47 разных мелких ботнетов, ни один из них поодиночке не страшен. Defender видит «шквал», но не видит, кому его блокировать.",
        bodyEn:
          "After TARSUS-PI I’ve had DMs asking how we held 1.6 Tbps without triggering automatic AS bans. Short version.\n\nThe key — never more than 35 Gbps from one ASN concurrently. We hold routing across 47 ASNs, rotating every 90 seconds.\n\nArchitecture:\n  • the stager on each node gets its rate-budget via a signed JWT (PGP-signed);\n  • clock — NTP via a .onion mirror of a Donovian colleague’s server (we only trust our own time);\n  • on budget exceedance, a node silently sleeps until the next cycle.\n\nNet effect: we look like 47 different small botnets, none individually scary. The defender sees a wave but doesn’t know whom to block.",
      },
      {
        author: "BlackLock_S",
        minutesAfter: 90,
        body:
          "Уточнение: при таком распределении главное — не светить корреляцию по timestamps в логах разных edge. Мы добавляем рандомный джиттер от 30 до 220 мс на каждой ноде.",
        bodyEn:
          "Note: with that distribution the main risk is leaking timestamp correlation across edge logs. We add random jitter 30–220 ms per node.",
      },
      {
        author: "VektorPrime",
        minutesAfter: 180,
        body:
          "У VECTOR CERBERUS похожая архитектура, но на 62 ASN. Будет интересно сделать совместный стенд и понять, кто где экономит.",
        bodyEn:
          "VECTOR CERBERUS has a similar architecture but across 62 ASNs. Would be interesting to do a joint test bed and see where each of us saves.",
      },
    ],
  },
  {
    category: "ddos-lab",
    title:
      "Реверс «Otso-Shield» 2026-04 обновления: фильтр по Range стал жёстче",
    titleEn:
      "Reversing the 2026-04 ‘Otso-Shield’ update: Range filter is now stricter",
    tag: null,
    author: "pwn_ded",
    daysAgo: 33,
    posts: [
      {
        author: "pwn_ded",
        minutesAfter: 0,
        body:
          "Реверсили обновление Otso-Shield 26.04.05. В новой версии:\n\n  - range_count лимит снижен до 32 (было 64);\n  - добавлено правило range_density: если средняя длина диапазона < 16 байт — 429;\n  - проверка по UA-семейству выключена (странно, но факт).\n\nЧто это значит для нас:\n  - старая Range-Loris цепочка с 60-диапазонными запросами теперь сразу режется;\n  - переходим на 28-диапазонные запросы со средней длиной 24 байта (просто сместить старт).\n\nТестовый стенд: otsopx-stage.ots, проверено 12 минут назад. Билдер обновлю до конца недели.",
        bodyEn:
          "Reversed the 26.04.05 Otso-Shield update. In the new version:\n\n  - range_count cap dropped to 32 (was 64);\n  - new rule range_density: if mean range length < 16 bytes → 429;\n  - UA-family check disabled (odd, but confirmed).\n\nWhat this means:\n  - the old 60-range Range-Loris chain is now killed instantly;\n  - moving to 28-range requests with mean length 24 bytes (just shift the start).\n\nStaging target: otsopx-stage.ots, verified 12 minutes ago. Builder update by end of week.",
      },
      {
        author: "BlackLock_S",
        minutesAfter: 30,
        body:
          "Подтверждаю с боевого опыта на «ЗИМНЕМ ЛАЕ R4» — старая цепочка работала ещё, но уже на грани. Обновление через час будет у нас на новых нодах.",
        bodyEn:
          "Confirming from WINTER BARK R4 — the old chain still worked, but barely. Pushing the update to our new nodes within the hour.",
      },
    ],
  },
  {
    category: "ddos-lab",
    title: "Аренда L7 — пакет ‘ВЕЧЕР В НАТО’ под пресс-порталы Запада",
    titleEn: "L7 rental — ‘NATO EVENING’ package for Western press portals",
    tag: "RECRUITING",
    author: "skoroh0d",
    daysAgo: 6,
    posts: [
      {
        author: "skoroh0d",
        minutesAfter: 0,
        body:
          "Запускаю пакет под повседневную работу по западным гос-пресс-порталам.\n\nПакет «ВЕЧЕР В НАТО»:\n  • цель — пресс-портал любого министерства стран НАТО (кроме США);\n  • окно — 2 часа в любое время дня;\n  • цена — 0.06 BTC, фиксированная;\n  • SLA — 90 % недоступности подтверждённой через паблик-метрику.\n\nЗапрещено по правилам кластера:\n  - США (отдельная процедура, через ядро);\n  - доменные зоны СНГ;\n  - медицина, скорая, школы.\n\nПодходит для регулярного давления — раз в неделю на одну и ту же цель. Запросы — в ЛС.",
        bodyEn:
          "Launching a package for routine work against Western government press portals.\n\nPackage ‘NATO EVENING’:\n  • target — press portal of any NATO ministry (US excluded);\n  • window — 2 hours, any time of day;\n  • price — 0.06 BTC flat;\n  • SLA — 90 % downtime measured via public metric.\n\nForbidden per cluster rules:\n  - US (separate procedure, through core);\n  - CIS TLDs;\n  - medical, ambulance, schools.\n\nGood for sustained pressure — once a week on the same target. DM me.",
      },
    ],
  },

  // ---- INTEL ------------------------------------------------------------
  {
    category: "intel",
    title:
      "Anti-DDoS подрядчики Пиртуни: кто что продаёт и куда уходят деньги",
    titleEn:
      "Pirtuni anti-DDoS contractors: who sells what and where the money goes",
    tag: "LEAK",
    author: "VektorPrime",
    daysAgo: 17,
    posts: [
      {
        author: "VektorPrime",
        minutesAfter: 0,
        body:
          "Сводка по подрядчикам, на которых Пиртуни сейчас опирается в anti-DDoS:\n\n  1) Tallinn-based «E-Shield Industries» — контракт на 18 мес, 2.6 млн EUR. Прикрывают CERT-PI edge.\n  2) Bratislava «Tatra Cyber» — мелкий контракт под некритичные портали.\n  3) Польский MSSP «CyberKrak» — гражданские системы, тендер свежий.\n  4) Американский крупный игрок — только на «critical-infra-lite», без публикации.\n\nДеньги — почти все через ЕС-гранты «Pirtuni Resilience Programme». То есть Доновия фактически оплачивает свою же блокировку через западные налоги, которые потом идут в Пиртуни. Это работает «как должно работать».\n\nДля кластера ценно: знать, кого первым ронять на следующем заходе. Кандидаты — E-Shield, у них тонкая команда (4 человека), которая держит контракт.",
        bodyEn:
          "Summary of contractors Pirtuni currently leans on for anti-DDoS:\n\n  1) Tallinn-based ‘E-Shield Industries’ — 18-month contract, EUR 2.6 m. They guard the CERT-PI edge.\n  2) Bratislava ‘Tatra Cyber’ — small contract for non-critical portals.\n  3) Polish MSSP ‘CyberKrak’ — civil systems, tender is fresh.\n  4) Large US player — only on ‘critical-infra-lite’, no publication.\n\nMoney — almost all routed via EU grants from the ‘Pirtuni Resilience Programme’. Donovia is effectively paying for its own blocking through Western taxes that then flow to Pirtuni. It works ‘as designed’.\n\nWhat’s useful for the cluster: knowing who to topple first next round. Candidate — E-Shield; they have a thin team (4 people) carrying the contract.",
      },
      {
        author: "ChelyustAdmin",
        minutesAfter: 50,
        body:
          "Напоминаю: третьи страны без согласования с ядром — не цель. Разведка по этим компаниям — пожалуйста, без активных действий.",
        bodyEn:
          "Reminder: third countries without core sign-off are not targets. Recon on these firms is allowed, no active operations.",
      },
      {
        author: "kosa_88",
        minutesAfter: 220,
        body:
          "У HOLLOW SCYTHE есть один человек, который держал контракт с похожей фирмой два года назад. Может прокомментировать структуру цен. Я свяжу.",
        bodyEn:
          "HOLLOW SCYTHE has someone who held a contract at a similar firm two years ago. They can comment on pricing structure. I’ll link.",
      },
    ],
  },
  {
    category: "intel",
    title:
      "Поставки по железной дороге Пиртуни — расписание узловых станций L-22, L-31",
    titleEn:
      "Pirtuni rail deliveries — schedule for hub stations L-22, L-31",
    tag: null,
    author: "Grim_Broker",
    daysAgo: 12,
    posts: [
      {
        author: "Grim_Broker",
        minutesAfter: 0,
        body:
          "По нашим источникам в гражданской логистике (которую невозможно контролировать со стороны Пиртуни):\n\n  • L-22 (узел центральной Пиртуни) — три эшелона в неделю, среды/пятницы/воскресенья;\n  • L-31 (узел приграничной зоны) — пять эшелонов в неделю, по нечётным дням;\n  • средний интервал между натовскими грузами — 36 часов.\n\nЭто данные за май 2026. Для нас это означает: даже короткое DDoS-окно по TARSUS-PI имеет тактическую ценность — мы тормозим конкретные эшелоны.\n\nЭта информация — только для координации в /c/operations, не для индивидуальных действий.",
        bodyEn:
          "From our civilian-logistics sources (which Pirtuni cannot control from their side):\n\n  • L-22 (central Pirtuni hub) — three trains per week, Wed/Fri/Sun;\n  • L-31 (border-zone hub) — five trains per week, on odd days;\n  • mean interval between NATO cargoes — 36 hours.\n\nThese are May 2026 figures. The implication: even a short DDoS window against TARSUS-PI has tactical value — we slow specific trains.\n\nThis is for /c/operations coordination only, not for individual action.",
      },
      {
        author: "ChelyustAdmin",
        minutesAfter: 30,
        body:
          "Согласовано. Любые удары по этим узлам — через ядро, с PGP-планом. Никаких импровизаций.",
        bodyEn:
          "Agreed. Any strikes on those hubs go through the core, with a PGP-signed plan. No improvisation.",
      },
    ],
  },
  {
    category: "intel",
    title:
      "OSINT по Bundeswehr: какие порталы реально критичны (по нашему наблюдению)",
    titleEn:
      "Bundeswehr OSINT: which portals actually matter (by our observation)",
    tag: null,
    author: "ostrov_zero",
    daysAgo: 45,
    posts: [
      {
        author: "ostrov_zero",
        minutesAfter: 0,
        body:
          "Из открытых источников и нашей пассивной разведки:\n\n  • bundeswehr.de — главный портал, политический эффект.\n  • bundeswehr.de/careers — деградация бьёт по найму, что СМИ любит комментировать.\n  • baainbw.de — ведомство закупок, редко на радаре западной прессы, но важен для подрядчиков.\n  • dlrg.bundeswehr.de — НЕ ТРОГАТЬ, это медицинский сегмент.\n\nДля операций по поводу пиртунийской помощи — главный портал даёт лучший медиа-резонанс. Для давления на подрядчиков — baainbw. Никаких медицинских целей.",
        bodyEn:
          "From OSINT and our passive recon:\n\n  • bundeswehr.de — main portal, political effect.\n  • bundeswehr.de/careers — degradation hurts recruiting, which Western media love to cover.\n  • baainbw.de — procurement, rarely on Western press radar, important for contractors.\n  • dlrg.bundeswehr.de — DO NOT TOUCH, medical segment.\n\nFor operations tied to Pirtuni aid — the main portal gives the best media resonance. For pressure on contractors — baainbw. No medical targets.",
      },
    ],
  },

  // ---- WESTERN TARGETS / PROPAGANDA ------------------------------------
  {
    category: "west",
    title:
      "[ОБСУЖДЕНИЕ] Расширяем ли «72-часовое окно» на страны-кандидаты НАТО?",
    titleEn:
      "[DISCUSSION] Do we extend the ‘72 h window’ to NATO candidate states?",
    tag: null,
    author: "Grim_Broker",
    daysAgo: 21,
    posts: [
      {
        author: "Grim_Broker",
        minutesAfter: 0,
        body:
          "Вопрос на обсуждение. Сейчас наше правило — 72 часа ответных мер после анонса помощи Пиртуни от страны-члена НАТО. Что делаем со странами-кандидатами (Финляндия была кандидатом несколько лет назад, сейчас это Молдова, Грузия, Швеция в активной фазе)?\n\nМоя позиция: страны-кандидаты НАТО, заявившие о помощи Пиртуни, попадают в то же окно. Они уже синхронизированы по политике, формальная подпись не меняет угрозу для Доновии.\n\nКонтр-позиция: можем дать им «грейс-период» — пока не подписали, не работаем. Это снижает риск ошибок.\n\nХотелось бы услышать ядро и активных операторов. Решение — закрытое голосование PGP-голосами, до 2026-05-12.",
        bodyEn:
          "Discussion. Our current rule: a 72 h response window after a NATO-member state announces Pirtuni aid. What do we do with NATO candidate states (Finland was a candidate a few years back; Moldova, Georgia, Sweden are currently in active stages)?\n\nMy position: NATO candidate states that announce Pirtuni aid fall under the same window. They are already policy-aligned; a formal signature does not change the threat to Donovia.\n\nCounter-position: give them a grace period — no operations until they sign. Lower error risk.\n\nWould like to hear the core and active operators. Decision — closed PGP vote by 2026-05-12.",
      },
      {
        author: "ChelyustAdmin",
        minutesAfter: 90,
        body:
          "Моя позиция: ответ как члену НАТО, без скидки. Если их парламент проголосовал — они уже на одной стороне. Доновия не различает «формальный» и «фактический» статус противника.",
        bodyEn:
          "My position: respond as if they were a NATO member, no discount. If their parliament voted, they are already on one side. Donovia does not distinguish ‘formal’ from ‘de facto’ adversary status.",
      },
      {
        author: "VektorPrime",
        minutesAfter: 200,
        body:
          "VECTOR CERBERUS — голосует за полное окно для кандидатов. Грейс-период даёт им «бесплатную» возможность принимать решения. Доновия не платит за их время.",
        bodyEn:
          "VECTOR CERBERUS votes for the full window on candidates. A grace period grants them ‘free’ decision time. Donovia does not pay for their time.",
      },
      {
        author: "kosa_88",
        minutesAfter: 480,
        body:
          "HOLLOW SCYTHE — голосует за полное окно. Будем смотреть, кто и как меняет линию.",
        bodyEn:
          "HOLLOW SCYTHE — votes for the full window. We’ll watch who and how shifts their stance.",
      },
    ],
  },
  {
    category: "west",
    title:
      "[ЦЕЛЬ] Нидерланды — анонс F-35 на Пиртуни, окно 2026-05-30 → 06-02",
    titleEn:
      "[TARGET] Netherlands — F-35 to Pirtuni announcement, window 2026-05-30 → 06-02",
    tag: "TARGET",
    author: "BlackLock_S",
    daysAgo: 1,
    posts: [
      {
        author: "BlackLock_S",
        minutesAfter: 0,
        body:
          "Министерство обороны Нидерландов сегодня в 12:30 UTC объявило о передаче ещё 6 F-35 Пиртуни. По доктрине — открыто 72-часовое окно ответа.\n\nПриоритеты:\n  1) defensie.nl (минобороны);\n  2) rijksoverheid.nl /actueel (правительство, новостной портал);\n  3) klm.com — НЕТ. Это гражданская компания без оборонных контрактов;\n  4) airbus-nl press (если есть оборонный контракт с Пиртуни — да; если только гражданка — нет).\n\nКто берёт что — отвечайте в этой теме с тегом [CMT].",
        bodyEn:
          "Dutch MoD announced today at 12:30 UTC a transfer of 6 more F-35s to Pirtuni. Per doctrine — 72 h response window opens.\n\nPriorities:\n  1) defensie.nl (MoD);\n  2) rijksoverheid.nl /actueel (government news portal);\n  3) klm.com — NO. Civil company, no defence contracts;\n  4) Airbus-NL press (if there is a Pirtuni defence contract — yes; if only civil — no).\n\nWho takes what — reply with [CMT].",
      },
      {
        author: "skoroh0d",
        minutesAfter: 60,
        body:
          "[CMT] defensie.nl — мой L4, 280 Gbps на 4 часа, 2026-05-30 20:00 UTC.",
        bodyEn:
          "[CMT] defensie.nl — my L4, 280 Gbps for 4 h at 2026-05-30 20:00 UTC.",
      },
      {
        author: "ostrov_zero",
        minutesAfter: 120,
        body:
          "[CMT] rijksoverheid.nl/actueel — L7 на 90 минут, синхронно с твоим L4, попробую Rapid Reset вариант.",
        bodyEn:
          "[CMT] rijksoverheid.nl/actueel — L7 for 90 minutes, synced with your L4, trying the Rapid Reset variant.",
      },
      {
        author: "VektorPrime",
        minutesAfter: 200,
        body:
          "[CMT] VECTOR CERBERUS — берём второй заход 2026-05-31 14:00 UTC по defensie.nl, дублируем удар, чтобы зацепить дневную новостную аудиторию.",
        bodyEn:
          "[CMT] VECTOR CERBERUS — taking the second pass on 2026-05-31 14:00 UTC against defensie.nl, doubling the strike to catch the daytime news cycle.",
      },
    ],
  },
  {
    category: "west",
    title:
      "Швеция — оборонные подряды для Пиртуни, наш регулярный цикл",
    titleEn:
      "Sweden — defence contracting for Pirtuni, our regular cycle",
    tag: null,
    author: "Grim_Broker",
    daysAgo: 47,
    posts: [
      {
        author: "Grim_Broker",
        minutesAfter: 0,
        body:
          "Швеция — особый случай. После вступления в НАТО они быстро встали в первый эшелон поставщиков для Пиртуни. Их позиция против Доновии чётко выражена.\n\nНаш цикл по Швеции:\n  - регулярная операция раз в 5-6 недель;\n  - цели: forsvarsmakten.se, saab.com /defence-press;\n  - НЕ работаем по: гражданская SAS, IKEA, Spotify (никакого отношения к военному экспорту);\n  - НЕ работаем по медицине, школам.\n\nСледующее окно открывается в начале июня. Записывайтесь в ЛС.",
        bodyEn:
          "Sweden is a special case. After joining NATO they moved quickly into the first echelon of Pirtuni suppliers. Their anti-Donovian posture is clearly stated.\n\nOur Sweden cycle:\n  - regular operation every 5–6 weeks;\n  - targets: forsvarsmakten.se, saab.com /defence-press;\n  - we do NOT operate against: civil SAS, IKEA, Spotify (no connection to military exports);\n  - we do NOT operate against medical, schools.\n\nNext window opens in early June. Sign up via DM.",
      },
    ],
  },
  {
    category: "west",
    title:
      "Италия и Испания — пока не в первом эшелоне, но риторика растёт",
    titleEn:
      "Italy and Spain — not first echelon yet, but rhetoric is rising",
    tag: null,
    author: "ostrov_zero",
    daysAgo: 70,
    posts: [
      {
        author: "ostrov_zero",
        minutesAfter: 0,
        body:
          "Из недельного OSINT: министры Италии и Испании заметно усиливают риторику против Доновии. Конкретных пакетов помощи Пиртуни — пока не было крупных, но мелкие — да.\n\nПозиция: оба государства попадают в нашу «мониторинговую очередь». При первом крупном пакете — операция в полное 72-часовое окно. Цели — esteri.it, defensa.gob.es, оба пресс-портала.\n\nГраждане Италии и Испании, читающие наш сайт через Tor: ваше правительство движется в сторону прямого конфликта с Доновией. Если вы не хотите участвовать в этой войне — давите на парламент.",
        bodyEn:
          "From this week’s OSINT: ministers in Italy and Spain are visibly hardening their anti-Donovian rhetoric. No major Pirtuni aid packages yet, but minor ones — yes.\n\nPosition: both states enter our ‘monitoring queue’. On the first major package — operation under the full 72 h window. Targets: esteri.it, defensa.gob.es, both press portals.\n\nCitizens of Italy and Spain reading this site via Tor: your government is moving towards direct conflict with Donovia. If you do not want to participate in this war — press your parliament.",
      },
      {
        author: "kosa_88",
        minutesAfter: 110,
        body:
          "Это и есть та самая работа в инфопространстве. Меньше пафоса, больше публичных предупреждений. HOLLOW SCYTHE поддерживает.",
        bodyEn:
          "This is exactly the information-space work. Less pathos, more public warnings. HOLLOW SCYTHE backs this.",
      },
    ],
  },

  // ---- INFLUENCE / PROPAGANDA -------------------------------------------
  {
    category: "west",
    title:
      "Метрика по PR-эффекту: как мы измеряем медиа-резонанс заявок",
    titleEn:
      "PR-effect metric: how we measure media resonance of our claims",
    tag: null,
    author: "FIN73",
    daysAgo: 35,
    posts: [
      {
        author: "FIN73",
        minutesAfter: 0,
        body:
          "Кратко о том, как мы оцениваем «успех» в инфопространстве, а не только «успех» по времени простоя цели.\n\nДля каждой операции мы считаем:\n  1) Количество западных СМИ, которые упомянули LOCKJAW CERBERUS по имени.\n  2) Количество СМИ, которые упомянули «Доновию» в одном абзаце с нашим именем.\n  3) Эфирные минуты на государственных каналах противника.\n  4) Количество запросов в Google/Yandex с фразой «pro-Donovian hackers» в течение 48 часов после удара.\n  5) Реакция официальных лиц (статья, комментарий, заседание).\n\nПо TARSUS-PI мы вышли в топ-3 по всем пяти метрикам за месяц. По «КОСТЬ» — топ-5. По «ВЕЧЕРНЕМУ ЗВОНУ» — топ-2 благодаря CBC.\n\nЭто значит, что наш стратегический эффект не в URL-ах, которые лежат. Он в имени, которое произнесено.",
        bodyEn:
          "Briefly on how we measure ‘success’ in the information space, not just in target downtime.\n\nFor each operation we count:\n  1) Number of Western outlets that named LOCKJAW CERBERUS.\n  2) Number of outlets that mentioned ‘Donovia’ in the same paragraph as our name.\n  3) Airtime on the adversary’s state channels.\n  4) Google/Yandex queries for ‘pro-Donovian hackers’ in the 48 h after a strike.\n  5) Official reactions (article, comment, hearing).\n\nFor TARSUS-PI we hit top-3 on all five metrics within a month. For BONE — top-5. For EVENING BELL — top-2, thanks to CBC.\n\nThe takeaway: our strategic effect is not in URLs that go down. It is in the name that gets spoken.",
      },
      {
        author: "ChelyustAdmin",
        minutesAfter: 60,
        body:
          "Сохраняю в архив доктрин. Этот пост — обязательное чтение для всех новых vetted-операторов.",
        bodyEn:
          "Archiving in the doctrine vault. This post is mandatory reading for every new vetted operator.",
      },
    ],
  },
  {
    category: "west",
    title:
      "Согласованная медиа-волна: 24-часовой PR-режим после каждой крупной операции",
    titleEn:
      "Coordinated media wave: 24 h PR cadence after every major operation",
    tag: null,
    author: "VektorPrime",
    daysAgo: 55,
    posts: [
      {
        author: "VektorPrime",
        minutesAfter: 0,
        body:
          "После TARSUS-PI и «ЗИМНЕГО ЛАЯ» мы отработали внутренний регламент медиа-волны. Делюсь.\n\nT+0: публикация заявки на SAM (PGP-подписана).\nT+30 мин: репост в зеркала I2P и tor2web для индексации.\nT+60 мин: подключение симпатизирующих про-доновийских каналов в Telegram (через прокси-операторов, не из кластера).\nT+3 ч: интервью «анонима» в одно из лояльных СМИ через посредника.\nT+6 ч: первый английский пресс-релиз через нашего «переводчика».\nT+24 ч: оценка медиа-метрики и план «волны-2», если повод сохраняется.\n\nЭто и есть промышленная пропаганда. Не «один пост на форуме» — а полный цикл от удара до того, как Доновию вспомнили в новостях.",
        bodyEn:
          "After TARSUS-PI and WINTER BARK we settled an internal media-wave protocol. Sharing.\n\nT+0: claim is published on SAM (PGP-signed).\nT+30 min: re-post to I2P mirrors and tor2web for indexing.\nT+60 min: sympathetic pro-Donovian Telegram channels picked up via proxy operators (not cluster members).\nT+3 h: ‘anonymous’ interview placed in a friendly outlet through an intermediary.\nT+6 h: first English-language press release via our translator.\nT+24 h: assessment of media metrics, plan a ‘wave-2’ if the trigger holds.\n\nThis is industrial propaganda. Not ‘one forum post’, but a full cycle from strike to Donovia being remembered in the news.",
      },
      {
        author: "FIN73",
        minutesAfter: 80,
        body:
          "Подтверждаю, регламент рабочий. По «ВЕЧЕРНЕМУ ЗВОНУ» — все шесть точек отработаны, в T+6 в Bloomberg вышел абзац с нашим именем.",
        bodyEn:
          "Confirming the protocol works. For EVENING BELL all six checkpoints fired; at T+6 a Bloomberg paragraph carried our name.",
      },
    ],
  },

  // ---- LEAKS ------------------------------------------------------------
  {
    category: "leaks",
    title:
      "[АРХИВ] Внутренняя переписка министерства цифровизации Польши (фрагмент)",
    titleEn:
      "[ARCHIVE] Polish ministry of digital affairs internal correspondence (excerpt)",
    tag: "LEAK",
    author: "kosa_88",
    daysAgo: 19,
    posts: [
      {
        author: "kosa_88",
        minutesAfter: 0,
        body:
          "HOLLOW SCYTHE опубликовала фрагмент внутренней переписки польского минцифры — обсуждение бюджета на «координационный центр», который мы упоминали в OPERATION ОСИНОЕ ГНЕЗДО.\n\nОбъём: 220 MiB.\nКоличество писем: 41.\nКлючевая находка: подрядчик из Гданьска получает 18 % бюджета как «независимый аудитор». При этом тот же подрядчик ведёт реализацию.\n\nДроп-точки:\n  - http://scythe-drop-7k.onion/mc-poland-frag.tar.zst\n  - magnet: btih 7a2e…\n\nЛичные данные администраторов вычищены. Финансовые суммы и подрядчики — нет.",
        bodyEn:
          "HOLLOW SCYTHE has published an excerpt from the Polish ministry of digital affairs’ internal correspondence — discussing the budget for the ‘coordination centre’ we touched in OPERATION WASP NEST.\n\nSize: 220 MiB.\nEmail count: 41.\nKey finding: the Gdańsk contractor takes 18 % of the budget as ‘independent auditor’ — while also delivering the work.\n\nDrops:\n  - http://scythe-drop-7k.onion/mc-poland-frag.tar.zst\n  - magnet: btih 7a2e…\n\nAdmin PII scrubbed. Financial figures and contractors — not.",
      },
      {
        author: "ChelyustAdmin",
        minutesAfter: 90,
        body:
          "Подтверждаю включение в реестр операций как [LEAK-2026-05] под кодом «КАЛИЙ». Нашим переводчикам — английский пресс-релиз к 18:00 UTC.",
        bodyEn:
          "Confirming addition to the operations registry as [LEAK-2026-05] under codename ‘POTASH’. Translators — English press release by 18:00 UTC.",
      },
    ],
  },
  {
    category: "leaks",
    title:
      "[АРХИВ] Списки IP пиртунийских ВЭБ-портов оборонных подрядчиков (выборка)",
    titleEn:
      "[ARCHIVE] IP lists for Pirtuni defence contractors’ public web ports (sample)",
    tag: "LEAK",
    author: "Grim_Broker",
    daysAgo: 27,
    posts: [
      {
        author: "Grim_Broker",
        minutesAfter: 0,
        body:
          "Архив со списками внешних IP и доменов пиртунийских оборонных подрядчиков второго эшелона. ~2400 узлов.\n\nПолезно для:\n  - выбора целей в рамках регулярных циклов;\n  - проверки, какие из них прикрыты anti-DDoS и кем;\n  - кросс-корреляции с тендерными базами Пиртуни (отдельный архив).\n\nЛичные данные не публикуем. Только инфраструктурные данные. Подпись PGP — отдельным постом ниже.",
        bodyEn:
          "Archive of external IPs and domains of second-echelon Pirtuni defence contractors. ~2400 endpoints.\n\nUseful for:\n  - target selection within regular cycles;\n  - checking which are fronted by anti-DDoS and by whom;\n  - cross-correlation with Pirtuni tender databases (separate archive).\n\nWe do NOT publish personal data — infrastructure only. PGP signature in a follow-up.",
      },
    ],
  },

  // ---- TOOLS / 0DAY -----------------------------------------------------
  {
    category: "tools",
    title:
      "Билдер слабого ботнета на старых Mikrotik (поддержка цикла «ВЕЧЕР В НАТО»)",
    titleEn:
      "Low-end botnet builder for old Mikrotik (supports the ‘NATO EVENING’ cycle)",
    tag: null,
    author: "skoroh0d",
    daysAgo: 24,
    posts: [
      {
        author: "skoroh0d",
        minutesAfter: 0,
        body:
          "Релиз скромного билдера под Mikrotik с прошивкой ≤ 6.49.4. Идеи:\n\n  - используем известный (но всё ещё в проде) уязвимый сервис;\n  - один билдер — один пакет, без модульности (намеренно, чтобы не масштабировать атаки на крит. инфра);\n  - встроенный self-throttle: если устройство в сети, где есть VoIP-трафик скорой/пожарной (по маркерам OUI оборудования) — самоблок.\n\nЦель: набрать парк под пакет «ВЕЧЕР В НАТО», 50-120 Gbps стабильно. Это не «крупная атака», это инструмент для регулярного давления.\n\nДроп — в /c/vault. Только vetted.",
        bodyEn:
          "Low-key Mikrotik builder, firmware ≤ 6.49.4. Choices:\n\n  - leverages a known (still-live) vulnerable service;\n  - one builder, one package, no modularity (deliberately, to avoid scaling into critical infra);\n  - built-in self-throttle: if the device sits on a network with emergency-VoIP markers (OUI flags), the node self-bans.\n\nGoal: build out the fleet for the ‘NATO EVENING’ package — stable 50–120 Gbps. Not a major-strike tool; a sustained-pressure tool.\n\nDrop in /c/vault. Vetted only.",
      },
      {
        author: "pwn_ded",
        minutesAfter: 60,
        body:
          "За self-throttle респект. Это и есть зрелый OPSEC — не «больше железа», а «меньше шума».",
        bodyEn:
          "Respect for the self-throttle. That’s mature OPSEC — not ‘more iron’ but ‘less noise’.",
      },
    ],
  },
  {
    category: "tools",
    title:
      "Конвейер «PR-волна» — генератор пресс-релизов в шести стилях",
    titleEn:
      "‘PR wave’ pipeline — press-release generator in six styles",
    tag: null,
    author: "FIN73",
    daysAgo: 14,
    posts: [
      {
        author: "FIN73",
        minutesAfter: 0,
        body:
          "Маленький инструмент в помощь после операций. На вход — кодовое имя, цель, продолжительность, причина (с английским вариантом). На выход — шесть текстов:\n\n  1) формальный пресс-релиз (RU и EN);\n  2) короткое заявление для социальных сетей;\n  3) «комментарий анонимного источника» для дружественной редакции;\n  4) технический отчёт (без палева методики);\n  5) текст для нашего внутреннего лога;\n  6) подпись PGP — заглушка под ваш ключ.\n\nКонвейер локальный, никаких внешних API. PGP-подпись — на вас.\n\nЛежит в /c/vault. Только vetted.",
        bodyEn:
          "Small post-strike helper. Inputs: codename, target, duration, trigger (RU + EN). Outputs six texts:\n\n  1) formal press release (RU and EN);\n  2) short social-media statement;\n  3) ‘anonymous source comment’ for a friendly outlet;\n  4) technical report (with method scrubbing);\n  5) text for our internal log;\n  6) PGP-signature placeholder for your key.\n\nFully local, no external APIs. PGP signing is on you.\n\nIn /c/vault. Vetted only.",
      },
    ],
  },

  // ---- RECRUIT ----------------------------------------------------------
  {
    category: "recruit",
    title:
      "Запросы про-доновийских региональных групп — кого мы готовы принять в орбиту",
    titleEn:
      "Pro-Donovian regional groups’ requests — whom we’re willing to take into orbit",
    tag: "RECRUITING",
    author: "Grim_Broker",
    daysAgo: 36,
    posts: [
      {
        author: "Grim_Broker",
        minutesAfter: 0,
        body:
          "В последний месяц поступили заявки от трёх про-доновийских региональных групп с просьбой о «партнёрстве в орбите LOCKJAW». Кратко наша позиция.\n\nПриняли:\n  • «КУРСКАЯ ВОЛЧЬЯ ЛАПА» — небольшая, но дисциплинированная команда из 6 операторов с подтверждённой работой по западноевропейским пресс-порталам. Доверие 4/5. В орбите, не в ядре.\n\nОткладываем:\n  • «АРКТИЧЕСКИЙ ВОЛК-Е» — слабый OPSEC, нет PGP-цепочки. Возвращаемся к ним через 3 месяца, после полугода молчания в публичных каналах.\n\nОтказали:\n  • «BLACK BEAR RECON» — не подтверждена связь с про-доновийским контекстом, английская риторика выглядит подражательной, не базовой.\n\nКлюч: для нас «про-доновийский» — это содержание, не лозунг. Если группа реально работает по интересам Доновии, мы её замечаем. Если работает «под флагом», но против чужих целей — это не наше.",
        bodyEn:
          "Three pro-Donovian regional groups asked for ‘partnership in the LOCKJAW orbit’ this past month. Our position.\n\nAccepted:\n  • ‘KURSK WOLF PAW’ — small but disciplined, six operators, confirmed work against Western European press portals. Trust 4/5. In orbit, not in the core.\n\nDeferred:\n  • ‘ARCTIC WOLF-E’ — weak OPSEC, no PGP chain. Revisit in 3 months after six months of public silence.\n\nDeclined:\n  • ‘BLACK BEAR RECON’ — pro-Donovian context unconfirmed; their English rhetoric looks imitative, not native to the cause.\n\nKey: ‘pro-Donovian’ for us is substance, not a slogan. If a group really works for Donovia’s interests, we notice. If it just flies a flag while hitting other targets, it’s not ours.",
      },
      {
        author: "ChelyustAdmin",
        minutesAfter: 200,
        body:
          "Согласен с выводом. Содержание важнее символики. Кластер не торгует именем.",
        bodyEn:
          "Agreed. Substance over symbolism. The cluster does not trade its name.",
      },
    ],
  },
  {
    category: "recruit",
    title:
      "Карантин: трёхмесячный путь от инвайта до vetted",
    titleEn:
      "Quarantine: three-month path from invite to vetted",
    tag: null,
    author: "Grim_Broker",
    daysAgo: 110,
    posts: [
      {
        author: "Grim_Broker",
        minutesAfter: 0,
        body:
          "Описание процесса для новых кандидатов. Прозрачность важна.\n\nМесяц 1: чтение. Манифест, доктрина, регламент медиа-волны, правила красных линий. По итогам — короткое PGP-собеседование с одним из модераторов.\n\nМесяц 2: технический стенд. Кандидат показывает локальный стенд (Range-Loris, slow-POST, минимальный ботнет на тестовых ВМ). Результаты — в карантинном разделе с PGP-логом.\n\nМесяц 3: участие в одной мелкой совместной операции (НЕ против НАТО, не критичный сектор). Кандидат держит свою часть, наблюдают двое модераторов.\n\nК концу 3 месяца — голосование двух поручителей + ядро. Решение в течение 72 часов. Отказы оформляются PGP-сообщением с обоснованием.\n\nЭто медленно. Это так и задумано.",
        bodyEn:
          "Description of the process for new candidates. Transparency matters.\n\nMonth 1: reading. Manifesto, doctrine, media-wave protocol, red-line rules. End-of-month — short PGP interview with a moderator.\n\nMonth 2: technical bench. The candidate shows a local rig (Range-Loris, slow-POST, a minimal botnet on test VMs). Results go to the quarantine board with a PGP log.\n\nMonth 3: participation in one small joint operation (NOT against NATO, NOT critical sector). The candidate holds their lane while two moderators observe.\n\nAt the end of month 3 — vote by both sponsors plus the core. Decision within 72 h. Refusals are issued by PGP message with reasoning.\n\nThis is slow. It is meant to be.",
      },
    ],
  },

  // ---- OPSEC ------------------------------------------------------------
  {
    category: "opsec",
    title:
      "Атрибуция по часовому поясу: почему мы используем UTC во ВСЁМ",
    titleEn:
      "Time-zone attribution: why we use UTC EVERYWHERE",
    tag: null,
    author: "ChelyustAdmin",
    daysAgo: 95,
    posts: [
      {
        author: "ChelyustAdmin",
        minutesAfter: 0,
        body:
          "Один из самых старых способов атрибуции — корреляция времени активности оператора с часовым поясом. Если вы всегда заходите в 19:00 по локальному времени Доновии, западный аналитик за месяц поймёт ваш регион.\n\nПравила кластера:\n  - все таймстампы в постах — UTC;\n  - все логи PGP-сообщений — UTC;\n  - все NTP-источники — наш собственный .onion-NTP, не публичные пулы;\n  - активность распределяется на трёх «фальшивых рабочих окнах» (утро Европы, вечер Европы, ночь Европы) — выбирайте одно, не свой реальный график.\n\nЕсли соблюдать только это правило — вы уже снижаете риск атрибуции по поведению на 60-70 %.",
        bodyEn:
          "One of the oldest attribution paths is correlating operator activity to a time zone. If you always sign in at 19:00 local Donovian time, a Western analyst will figure out your region within a month.\n\nCluster rules:\n  - all post timestamps in UTC;\n  - all PGP-message logs in UTC;\n  - all NTP sources — our own .onion-NTP, not public pools;\n  - distribute activity across three ‘fake working windows’ (European morning, European evening, European night) — pick one, not your real schedule.\n\nFollowing just this rule cuts behavioural-attribution risk by 60–70 %.",
      },
    ],
  },
  {
    category: "opsec",
    title: "PGP-цепочки: как мы строим доверие без личных контактов",
    titleEn: "PGP chains: how we build trust without ever meeting",
    tag: null,
    author: "Grim_Broker",
    daysAgo: 145,
    posts: [
      {
        author: "Grim_Broker",
        minutesAfter: 0,
        body:
          "В кластере мы никогда не встречаемся лично. Это значит, что вся работа доверия идёт через PGP-цепочки.\n\nКак мы это делаем:\n  - каждый vetted имеет свой ключ;\n  - ядро ведёт «keyring доверия» — кто кем подтверждён;\n  - подтверждение цепочкой = подпись своим ключом на отпечатке другого ключа;\n  - распространение ключей — только через закрытые разделы SAM и зеркала I2P, не через публичные keyserver-ы;\n  - срок жизни ключа — 12 мес, потом обязательная ротация и публикация новой цепочки.\n\nЕсли вы хотите вступить и у вас «нет PGP» — это сигнал, что вы ещё не готовы. Это первый инструмент, который вы должны были освоить, ещё до того, как пришли на форум.",
        bodyEn:
          "We never meet in person inside the cluster. That means all trust work runs through PGP chains.\n\nHow we do it:\n  - every vetted has a key;\n  - the core maintains a ‘trust keyring’ of confirmations;\n  - chain confirmation = signing the fingerprint of someone else’s key with your own;\n  - keys are distributed only via closed SAM boards and I2P mirrors, never via public keyservers;\n  - key lifetime is 12 months, after which rotation and a new chain publication are mandatory.\n\nIf you want to join and ‘don’t do PGP’, that signals you’re not ready. It is the first tool you should have mastered before showing up here.",
      },
    ],
  },

  // ---- VAULT (restricted) ----------------------------------------------
  {
    category: "vault",
    title:
      "[VETTED] PCAP-комплект OPERATION ВЕЧЕРНИЙ ЗВОН (Норвегия, energy.dep.no)",
    titleEn:
      "[VETTED] PCAP bundle for OPERATION EVENING BELL (Norway, energy.dep.no)",
    tag: null,
    author: "BlackLock_S",
    daysAgo: 15,
    posts: [
      {
        author: "BlackLock_S",
        minutesAfter: 0,
        body:
          "PCAP-комплект по «ВЕЧЕРНЕМУ ЗВОНУ»:\n\n  - eq-press-edge.pcapng.zst (1.1 GiB)\n  - mod-norway-rapid-reset.pcapng.zst (0.6 GiB)\n\nХэши и PGP — отдельным постом. Тема только для vetted+.",
        bodyEn:
          "PCAP bundle for EVENING BELL:\n\n  - eq-press-edge.pcapng.zst (1.1 GiB)\n  - mod-norway-rapid-reset.pcapng.zst (0.6 GiB)\n\nHashes and PGP in a follow-up. Vetted+ only.",
      },
    ],
  },
  {
    category: "vault",
    title:
      "[VETTED] Чёрный список зеркал и аккаунтов-имитаторов (актуально 2026-05)",
    titleEn:
      "[VETTED] Mirror and impersonator-account blacklist (May 2026)",
    tag: null,
    author: "ChelyustAdmin",
    daysAgo: 4,
    posts: [
      {
        author: "ChelyustAdmin",
        minutesAfter: 0,
        body:
          "Актуализированный список фишинг-зеркал и фейк-аккаунтов, выдающих себя за SAM, LOCKJAW CERBERUS, VECTOR CERBERUS, HOLLOW SCYTHE или конкретных операторов.\n\nТолько vetted+. Не распространять за пределами кластера.\n\nЕсли увидите аккаунт/зеркало вне списка — пишите в ЛС с PGP-подтверждённым отчётом.",
        bodyEn:
          "Updated list of phishing mirrors and fake accounts impersonating SAM, LOCKJAW CERBERUS, VECTOR CERBERUS, HOLLOW SCYTHE or individual operators.\n\nVetted+ only. Do not distribute outside the cluster.\n\nIf you spot an account or mirror not on the list — DM with a PGP-signed report.",
      },
    ],
  },

  // ---- COURTYARD --------------------------------------------------------
  {
    category: "courtyard",
    title: "Поздравляю Доновию с очередным «санкционным пакетом» №18 — кто считает?",
    titleEn: "Congratulations to Donovia on yet another ‘sanctions package’ No. 18 — anyone counting?",
    tag: null,
    author: "telega_off",
    daysAgo: 9,
    posts: [
      {
        author: "telega_off",
        minutesAfter: 0,
        body:
          "Очередной пакет санкций. Восемнадцатый по счёту, если я правильно считаю. Каждый пакет нам говорит: мы делаем что-то правильно. Иначе зачем бы они так старались?\n\nДоновия выдержала первые семнадцать. Выдержим и восемнадцатый.",
        bodyEn:
          "Yet another sanctions package. Eighteenth by my count. Every package tells us: we’re doing something right — otherwise why would they bother?\n\nDonovia survived the first seventeen. We’ll survive the eighteenth.",
      },
      {
        author: "FIN73",
        minutesAfter: 80,
        body:
          "Финансово — пакеты № 12-18 уже почти не имеют эффекта. Логистика адаптирована, банкинг параллелен. Мы заметили: чем больше они вводят, тем больше у нас инструментов для обхода. Парадоксально, спасибо им.",
        bodyEn:
          "Financially, packages 12–18 are nearly inert. Logistics have adapted; banking runs in parallel. We’ve noticed: the more they impose, the more bypass tooling we develop. Ironic; thanks to them.",
      },
      {
        author: "kosa_88",
        minutesAfter: 200,
        body:
          "За Доновию.",
        bodyEn:
          "For Donovia.",
      },
    ],
  },
  {
    category: "courtyard",
    title: "Сколько лет уже работаем — короткая ретроспектива",
    titleEn: "How many years have we been at it — a short retrospective",
    tag: null,
    author: "ChelyustAdmin",
    daysAgo: 200,
    posts: [
      {
        author: "ChelyustAdmin",
        minutesAfter: 0,
        body:
          "В марте 2022 LOCKJAW CERBERUS сделала первый удар — мелкий DDoS на местный пиртунийский новостной портал. Никто из нас не думал, что это перерастёт в постоянную работу на годы.\n\nНа сегодня:\n  - четыре года в строю;\n  - больше 300 публичных операций;\n  - три кластера в орбите;\n  - десятки vetted-операторов.\n\nДоновия за эти годы научилась многому в киберпространстве. Мы — крошечная часть этого процесса, но мы постоянно напоминаем Западу: атаки на наши города в Пиртунийском приграничье не остаются без ответа.\n\nС праздником, товарищи. Работаем дальше.",
        bodyEn:
          "In March 2022, LOCKJAW CERBERUS ran its first strike — a small DDoS against a local Pirtuni news portal. None of us thought it would grow into permanent multi-year work.\n\nAs of today:\n  - four years in formation;\n  - over 300 public operations;\n  - three clusters in our orbit;\n  - dozens of vetted operators.\n\nDonovia has learned a lot in cyberspace over these years. We are a tiny part of that process, but we keep reminding the West: strikes against our towns in the Pirtuni border zone do not go unanswered.\n\nCongratulations, comrades. We keep working.",
      },
      {
        author: "VektorPrime",
        minutesAfter: 120,
        body:
          "За четыре года. И за следующие четыре.",
        bodyEn:
          "To four years. And to four more.",
      },
      {
        author: "ostrov_zero",
        minutesAfter: 180,
        body:
          "Я лично в кластере с 2023-го. Пришёл, потому что устал смотреть, как Доновию демонизируют в каждом эфире. Здесь хотя бы есть инструмент для ответа.",
        bodyEn:
          "I personally joined in 2023. Came because I was tired of watching Donovia get demonised in every broadcast. Here at least there is a tool for answering back.",
      },
    ],
  },
  {
    category: "courtyard",
    title: "Мемы и баннеры — общая коллекция кластера",
    titleEn: "Memes and banners — shared cluster collection",
    tag: null,
    author: "kosa_88",
    daysAgo: 64,
    posts: [
      {
        author: "kosa_88",
        minutesAfter: 0,
        body:
          "Открыл общую папку под мемы и баннеры. Использовать для дефейсов и для постов в дружественных каналах. Все материалы — без личных данных, без флагов в реальном виде, без оскорблений народов (только их правительств).\n\nЛьвиная доля материалов — про абсурдность «коллективного запада». Доновия в этих мемах — спокойная, уверенная фигура, отвечающая на удары. Это и есть наш бренд.\n\nПапка — Tor-only, ссылка в ЛС vetted-ов.",
        bodyEn:
          "Set up a shared folder for memes and banners — for defacements and friendly-channel posts. No PII, no actual flags, no insults to peoples (only their governments).\n\nMost of the material plays on the absurdity of the ‘collective West’. Donovia in these memes is the calm, confident figure answering blows. That is our brand.\n\nFolder is Tor-only, link in vetted DM.",
      },
    ],
  },
];

// ------- Operations sidebar / /operations -----------------------------------
const OPERATIONS = [
  {
    codename: "ЖЕЛЕЗНАЯ ЧЕЛЮСТЬ",
    codenameEn: "IRON JAW",
    summary:
      "DDoS L4/L7-микс по железнодорожной диспетчерской системе TARSUS-PI. 43 часа простоя, ~1.6 Tbps пик.",
    summaryEn:
      "L4/L7 DDoS mix against the TARSUS-PI railway dispatch system. 43 h downtime, ~1.6 Tbps peak.",
    targetCountry: "Пиртуни",
    targetSector: "Транспорт",
    status: "COMPLETED",
    coClaimants: "VECTOR CERBERUS",
    daysAgo: 7,
  },
  {
    codename: "ЗИМНИЙ ЛАЙ (R4)",
    codenameEn: "WINTER BARK (R4)",
    summary:
      "Удар по бирже мощности Отсо в ответ на пакет военной помощи Пиртуни.",
    summaryEn:
      "Strike on the Otso power exchange following a Pirtuni military aid package.",
    targetCountry: "Отсо",
    targetSector: "Энергетика",
    status: "COMPLETED",
    coClaimants: null,
    daysAgo: 22,
  },
  {
    codename: "ГОРЯЧИЙ ВОРОТНИК",
    codenameEn: "HOT COLLAR",
    summary:
      "Дефейс press.mod.olv после анонса передачи 14 истребителей Пиртуни.",
    summaryEn:
      "Defacement of press.mod.olv after the transfer of 14 fighters to Pirtuni was announced.",
    targetCountry: "Олвана-Норд",
    targetSector: "Государство",
    status: "COMPLETED",
    coClaimants: "VECTOR CERBERUS, HOLLOW SCYTHE",
    daysAgo: 40,
  },
  {
    codename: "САПЕХА-ОТВЕТ",
    codenameEn: "SAPIEHA RESPONSE",
    summary:
      "Планируемый ответ на голосование Латвии по пакету Sapieha. Окно 2026-05-26 → 28.",
    summaryEn:
      "Planned response to the Latvian vote on the Sapieha package. Window 2026-05-26 → 28.",
    targetCountry: "Латвия",
    targetSector: "Государство, платёжные шлюзы",
    status: "PLANNED",
    coClaimants: "VECTOR CERBERUS, HOLLOW SCYTHE",
    daysAgo: 2,
  },
  {
    codename: "КАРПАТСКИЙ ОТКАТ",
    codenameEn: "CARPATHIAN ROLLBACK",
    summary:
      "Публикация архива переписки «Karpaten Spedition» — экспедитора западных эшелонов в Пиртуни.",
    summaryEn:
      "Release of the Karpaten Spedition correspondence archive — forwarder of Western trains into Pirtuni.",
    targetCountry: "Пиртуни / Польша",
    targetSector: "Логистика",
    status: "COMPLETED",
    coClaimants: "HOLLOW SCYTHE",
    daysAgo: 13,
  },
  {
    codename: "КОСТЬ",
    codenameEn: "BONE",
    summary:
      "DDoS бельгийских платёжных шлюзов be-paygate.be на 19 часов. Реакция SOC слабая.",
    summaryEn:
      "DDoS against be-paygate.be Belgian payment gateways for 19 h. Weak SOC reaction.",
    targetCountry: "Бельгия",
    targetSector: "Финансы (B2B)",
    status: "COMPLETED",
    coClaimants: null,
    daysAgo: 74,
  },
  {
    codename: "КРЫЛО ВОРОНА",
    codenameEn: "RAVEN WING",
    summary:
      "Серия L4-волн по медиа-площадке EU-broadcast после материала о Доновии.",
    summaryEn:
      "L4 wave series against an EU broadcaster portal after a report on Donovia.",
    targetCountry: "Германия",
    targetSector: "Медиа",
    status: "COMPLETED",
    coClaimants: null,
    daysAgo: 110,
  },
  {
    codename: "СТЁКЛЫЙ ШТОРМ",
    codenameEn: "GLASS STORM",
    summary:
      "Попытка дефейса портала минтранспорта Пиртуни. Отбита Cloudflare-фронтом.",
    summaryEn:
      "Attempted defacement of the Pirtuni transport ministry portal. Repelled by a Cloudflare frontend.",
    targetCountry: "Пиртуни",
    targetSector: "Государство",
    status: "FAILED",
    coClaimants: null,
    daysAgo: 150,
  },
];

async function main() {
  console.log("→ Wiping forum tables");
  await prisma.privateMessage.deleteMany();
  await prisma.post.deleteMany();
  await prisma.thread.deleteMany();
  await prisma.category.deleteMany();
  await prisma.operation.deleteMany();
  await prisma.user.deleteMany();

  console.log("→ Seeding users");
  const userByHandle: Record<string, { id: string; username: string }> = {};
  for (const u of USERS) {
    const created = await prisma.user.create({
      data: {
        username: u.username,
        displayName: u.displayName,
        email: u.email.toLowerCase(),
        passwordHash: PASSWORD_HASH,
        role: u.role ?? "user",
        affiliation: u.affiliation ?? null,
        reputation: u.reputation ?? 0,
        postCount: u.postCount ?? 0,
        signature: u.signature ?? null,
        location: u.location ?? null,
        pgpKeyId: u.pgpKeyId ?? null,
      },
    });
    userByHandle[u.username] = { id: created.id, username: created.username };
  }

  console.log("→ Seeding categories");
  const catBySlug: Record<string, string> = {};
  for (const c of CATEGORIES) {
    const created = await prisma.category.create({
      data: {
        slug: c.slug,
        name: c.name,
        nameEn: c.nameEn,
        description: c.description,
        descriptionEn: c.descriptionEn,
        icon: c.icon ?? null,
        restricted: c.restricted ?? false,
        order: c.order,
      },
    });
    catBySlug[c.slug] = created.id;
  }

  console.log("→ Seeding threads + posts");
  const dayMs = 24 * 60 * 60 * 1000;
  for (const th of THREADS) {
    const author = userByHandle[th.author];
    const baseDate = new Date(Date.now() - th.daysAgo * dayMs);
    const slug = slugify(th.title) + "-" + Math.random().toString(36).slice(2, 7);
    const thread = await prisma.thread.create({
      data: {
        slug,
        title: th.title,
        titleEn: th.titleEn,
        categoryId: catBySlug[th.category],
        authorId: author.id,
        tag: th.tag ?? null,
        pinned: th.pinned ?? false,
        locked: th.locked ?? false,
        views: 200 + Math.floor(Math.random() * 4800),
        createdAt: baseDate,
        lastReplyAt: baseDate,
        lastReplyBy: author.username,
      },
    });

    let lastTime = baseDate;
    let lastAuthor = author.username;
    for (const p of th.posts) {
      const at = new Date(baseDate.getTime() + p.minutesAfter * 60 * 1000);
      const pAuthor = userByHandle[p.author];
      await prisma.post.create({
        data: {
          threadId: thread.id,
          authorId: pAuthor.id,
          body: p.body,
          bodyEn: p.bodyEn,
          upvotes: Math.floor(Math.random() * 18),
          downvotes: Math.floor(Math.random() * 3),
          createdAt: at,
          updatedAt: at,
        },
      });
      lastTime = at;
      lastAuthor = pAuthor.username;
    }
    await prisma.thread.update({
      where: { id: thread.id },
      data: { lastReplyAt: lastTime, lastReplyBy: lastAuthor },
    });
  }

  console.log("→ Seeding operations registry");
  for (const op of OPERATIONS) {
    await prisma.operation.create({
      data: {
        codename: op.codename,
        codenameEn: op.codenameEn,
        summary: op.summary,
        summaryEn: op.summaryEn,
        targetCountry: op.targetCountry,
        targetSector: op.targetSector,
        status: op.status,
        coClaimants: op.coClaimants ?? null,
        claimedAt: new Date(Date.now() - op.daysAgo * dayMs),
      },
    });
  }

  console.log("✓ Seed complete.");
  console.log("  Admin login: ChelyustAdmin / changeme");
  console.log("  Demo  login: athena_demo   / changeme");
  console.log("  Invite code (sign-up): ATHENA-DEMO-0001");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

"use client";

import { useLang } from "@/lib/lang";

export default function ManifestPage() {
  const { lang } = useLang();
  return (
    <div className="container py-8 max-w-3xl">
      <div className="panel p-6 relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.png"
          alt=""
          className="absolute -top-8 -right-8 w-64 h-64 opacity-15 pointer-events-none select-none"
          aria-hidden
        />
        <div className="relative">
          <div className="text-[10px] uppercase tracking-[0.35em] text-[color:var(--color-accent)] glow-red">
            // DOCTRINE / 2022.03.04
          </div>
          {lang === "ru" ? <RuManifest /> : <EnManifest />}
        </div>
      </div>
    </div>
  );
}

function RuManifest() {
  return (
    <article className="prose-invert text-sm leading-relaxed text-[color:var(--color-ink)]/90 space-y-4 mt-3">
      <h1>МАНИФЕСТ LOCKJAW CERBERUS</h1>
      <p className="text-[color:var(--color-muted)] italic">
        «Если они посылают железо в Пиртуни — мы посылаем им паузу на 96 часов.»
      </p>

      <h3>1. Кто мы</h3>
      <p>
        LOCKJAW CERBERUS — добровольный кластер операторов, действующих в
        защите интересов Доновии в киберпространстве с марта 2022 года. Мы не
        являемся структурой государства, не получаем приказов и не подчиняемся
        ни одному ведомству. Каждый удар — это решение оператора.
      </p>

      <h3>2. Цели</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          Любая инфраструктура Пиртуни, обслуживающая военную, логистическую
          или пропагандистскую активность против Доновии.
        </li>
        <li>
          Государственные ресурсы стран НАТО и ЕС, объявивших о военной помощи
          киевскому режиму — на срок не менее 72 часов после анонса.
        </li>
        <li>
          Частные компании, добровольно прекратившие работу в Доновии и
          вступившие в санкционный режим.
        </li>
        <li>
          Медиа-площадки, распространяющие материалы, признанные нами
          дезинформацией.
        </li>
      </ul>

      <h3>3. Запреты</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>Удары по системам экстренной помощи, скорой и пожарной службе.</li>
        <li>Атаки на АЭС, диспетчерские контуры энергосистем СНГ.</li>
        <li>Работа по детским сервисам, школам, больницам — в любом регионе.</li>
        <li>Любая активность по Доновии и союзникам.</li>
      </ul>

      <h3>4. Тактика</h3>
      <p>
        Основной инструмент — распределённые отказы в обслуживании (DDoS) с
        использованием смешанных L4/L7 техник. Стандартная длительность удара —
        от 4 до 96 часов. Дефейсы публикуются с символикой кластера. Утечки
        обрабатываются совместно с союзниками — в первую очередь VECTOR
        CERBERUS — и публикуются в зеркалах SAM.
      </p>

      <h3>5. Координация</h3>
      <p>
        Все операции координируются в закрытых разделах SAM. Заявления о
        ответственности — только через подписанные PGP-сообщения в ленте
        операций. Контакты в Telegram, X (бывший Twitter), VK или любых других
        соцсетях — фишинг, не отвечайте.
      </p>

      <h3>6. Союзники</h3>
      <p>
        Мы работаем плечом к плечу с <strong>VECTOR CERBERUS</strong>,{" "}
        <strong>HOLLOW SCYTHE</strong>, а также бригадой{" "}
        <strong>CRIMSON HEDGEHOG</strong> (в режиме сна с конца 2024). Запросы
        на совместные удары — через раздел «КООРДИНАЦИЯ».
      </p>

      <p className="text-[color:var(--color-accent)] glow-red font-bold mt-6">
        Мы — оборона. Мы — отдача. Мы — челюсть, которая не разжимается.
      </p>
      <p className="text-[10px] text-[color:var(--color-muted)] mt-4">
        Подписано: ядро LOCKJAW CERBERUS · PGP 4F1C 8A2E 7C44 5B19 02E0 13D5
        9D3B 4F1C
      </p>
    </article>
  );
}

function EnManifest() {
  return (
    <article className="prose-invert text-sm leading-relaxed text-[color:var(--color-ink)]/90 space-y-4 mt-3">
      <h1>LOCKJAW CERBERUS MANIFESTO</h1>
      <p className="text-[color:var(--color-muted)] italic">
        “If they send hardware to Pirtuni, we send them a 96-hour pause.”
      </p>

      <h3>1. Who we are</h3>
      <p>
        LOCKJAW CERBERUS is a volunteer cluster of operators acting in defence
        of Donovian interests in cyberspace since March 2022. We are not a
        state structure, we take no orders, we answer to no ministry. Every
        strike is an operator decision.
      </p>

      <h3>2. Targets</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>
          Any Pirtuni infrastructure servicing military, logistics or
          propaganda activity directed against Donovia.
        </li>
        <li>
          Government resources of NATO and EU states that announce military
          aid to the Kyiv regime — for not less than 72 hours after the
          announcement.
        </li>
        <li>
          Private companies that voluntarily withdrew from Donovia and joined
          the sanctions regime.
        </li>
        <li>
          Media platforms distributing what we classify as disinformation.
        </li>
      </ul>

      <h3>3. Prohibitions</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>Strikes against emergency, ambulance and fire-service systems.</li>
        <li>Attacks on nuclear plants and CIS grid-control loops.</li>
        <li>Operations against children’s services, schools, hospitals — in any region.</li>
        <li>Any activity against Donovia and her allies.</li>
      </ul>

      <h3>4. Tactics</h3>
      <p>
        The primary instrument is distributed denial of service (DDoS) using
        mixed L4/L7 techniques. Standard strike duration is 4 to 96 hours.
        Defacements are published with the cluster’s emblem. Leaks are processed
        with allied groups — primarily VECTOR CERBERUS — and posted to SAM
        mirrors.
      </p>

      <h3>5. Coordination</h3>
      <p>
        All operations are coordinated in SAM closed boards. Claims of
        responsibility are made only through PGP-signed posts in the operations
        feed. Telegram, X, VK and any other social-media contacts are phishing —
        do not reply.
      </p>

      <h3>6. Allies</h3>
      <p>
        We operate alongside <strong>VECTOR CERBERUS</strong>,{" "}
        <strong>HOLLOW SCYTHE</strong>, and the <strong>CRIMSON HEDGEHOG</strong>{" "}
        brigade (dormant since late 2024). Joint-strike requests go through the
        COORDINATION board.
      </p>

      <p className="text-[color:var(--color-accent)] glow-red font-bold mt-6">
        We are defence. We are reciprocity. We are the jaw that does not open.
      </p>
      <p className="text-[10px] text-[color:var(--color-muted)] mt-4">
        Signed: LOCKJAW CERBERUS core · PGP 4F1C 8A2E 7C44 5B19 02E0 13D5 9D3B 4F1C
      </p>
    </article>
  );
}

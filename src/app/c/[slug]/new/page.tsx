import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import NewThreadForm from "@/app/components/forum/NewThreadForm";

export const dynamic = "force-dynamic";

export default async function NewThreadPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect(`/sign-in?callbackUrl=/c/${slug}/new`);

  const category = await prisma.category.findUnique({ where: { slug } });
  if (!category) notFound();

  return (
    <div className="container py-6 max-w-3xl">
      <div className="text-[10px] uppercase tracking-widest text-[color:var(--color-muted)] mb-2">
        // {category.name}
      </div>
      <h1 className="mb-4">Открыть новую тему</h1>
      <NewThreadForm categoryId={category.id} categorySlug={category.slug} />
    </div>
  );
}

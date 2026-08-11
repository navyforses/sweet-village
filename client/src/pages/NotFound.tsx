import { Link } from "wouter";
import { Borjgali } from "@/components/Ornaments";
import { useI18n } from "@/i18n";

export default function NotFound() {
  const { t } = useI18n();
  return (
    <div className="container flex min-h-[62vh] items-center justify-center py-20">
      <div className="max-w-md text-center">
        <Borjgali size={28} className="mx-auto" />
        <p className="sv-eyebrow mt-7">404</p>
        <h1 className="mt-4 text-[1.75rem] text-ink">{t.notFound.title}</h1>
        <p className="mt-4 text-[0.9375rem] text-muted-foreground">{t.notFound.body}</p>
        <Link
          href="/"
          data-press
          className="mt-8 inline-flex min-h-12 items-center bg-turquoise px-7 text-[0.875rem] text-white transition-colors hover:bg-deep">
          {t.notFound.cta}
        </Link>
      </div>
    </div>
  );
}


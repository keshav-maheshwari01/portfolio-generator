import Link from "next/link";
import { demoPortfolios } from "@/data/demoPortfolios";

export default function DemoPortfoliosPage() {
  return (
    <main className="min-h-screen bg-[#F6F3EE] text-[#191816] font-sans">
      {/* NAVBAR */}
      <header className="border-b border-[#DDD8D0]/70 bg-[#F6F3EE]/70 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-6 sm:px-10 lg:px-14">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-[10px] bg-[#191816] text-sm font-bold text-white shadow-sm">
              P
            </div>
            <span className="text-sm font-semibold tracking-[-0.035em]">
              PortfolioAI
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden text-xs font-semibold text-[#514B45] transition hover:text-[#191816] sm:block"
            >
              Sign in
            </Link>
            <Link
              href="/login"
              className="rounded-full bg-[#191816] px-4 py-2.5 text-xs font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#302E2A]"
            >
              Get started
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="mx-auto max-w-7xl px-6 pb-4 pt-16 sm:px-10 sm:pt-20 lg:px-14">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#D9D2C9] bg-white/65 px-3.5 py-2 shadow-sm backdrop-blur-xl">
          <span className="size-2 rounded-full bg-[#A45C43]" />
          <span className="text-[10px] font-semibold uppercase tracking-[.16em] text-[#6D665E]">
            Demo gallery
          </span>
        </div>

        <h1 className="mt-5 max-w-xl text-4xl font-semibold leading-[1.05] tracking-[-0.05em] sm:text-5xl">
          See what PortfolioAI can build.
        </h1>

        <p className="mt-4 max-w-lg text-sm leading-7 text-[#777168] sm:text-base">
          Browse sample portfolios generated for different roles. Sign up to generate and customize your own.
        </p>
      </section>

      {/* GALLERY */}
      <section className="mx-auto max-w-7xl px-6 py-12 sm:px-10 lg:px-14">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {demoPortfolios.map((portfolio) => (
            <Link
              key={portfolio.slug}
              href={`/demos/${portfolio.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[#E3DED6] bg-white transition hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Preview swatch */}
              <div
                className="relative flex h-40 flex-col justify-between p-5"
                style={{ backgroundColor: portfolio.accentSubtle }}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="flex size-9 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: portfolio.accent }}
                  >
                    {portfolio.initials}
                  </span>

                  <span className="rounded-full bg-white/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[.1em] text-black/50 backdrop-blur">
                    {portfolio.category}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <div
                    className="h-1.5 w-3/4 rounded-full opacity-70"
                    style={{ backgroundColor: portfolio.accent }}
                  />
                  <div className="h-1 w-1/2 rounded-full bg-black/15" />
                </div>
              </div>

              {/* Info */}
              <div className="flex flex-1 flex-col gap-2 p-5">
                <p className="text-sm font-semibold text-[#191816]">
                  {portfolio.name}
                </p>
                <p className="text-xs font-medium text-[#8B847B]">
                  {portfolio.role}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-[#777168]">
                  {portfolio.tagline}
                </p>

                <span className="mt-auto pt-4 text-xs font-semibold text-[#A45C43] transition group-hover:underline">
                  View portfolio →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-24 sm:px-10 lg:px-14">
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-[#E3DED6] bg-white px-8 py-10 sm:flex-row sm:items-center">
          <div>
            <p className="text-lg font-semibold tracking-[-0.02em] text-[#191816]">
              Ready to build your own?
            </p>
            <p className="mt-1 text-sm text-[#777168]">
              Generate a portfolio like these in minutes with AI.
            </p>
          </div>

          <Link
            href="/login"
            className="rounded-full bg-[#191816] px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5"
          >
            Create my portfolio →
          </Link>
        </div>
      </section>
    </main>
  );
}

import Link from "next/link";
import { redirect } from "next/navigation";
import { getDemoPortfolio } from "@/data/demoPortfolios";

export default async function DemoPortfolioViewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const portfolio = getDemoPortfolio(slug);

  if (!portfolio) {
    redirect("/demos");
  }

  const {
    name,
    role,
    tagline,
    about,
    skills,
    projects,
    accent,
    accentSubtle,
    initials,
    location,
    email,
  } = portfolio;

  return (
    <main className="min-h-screen bg-[#FAFAF8] text-[#111111] font-sans">
      {/* Demo banner */}
      <div className="sticky top-0 z-50 flex flex-wrap items-center justify-between gap-3 border-b border-black/10 bg-[#191816] px-6 py-3 text-white sm:px-10">
        <div className="flex items-center gap-2 text-xs">
          <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[.1em]">
            Demo
          </span>
          <span className="text-white/70">
            This is a sample portfolio — view only
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold">
          <Link href="/demos" className="text-white/70 transition hover:text-white">
            ← All demos
          </Link>
          <Link
            href="/login"
            className="rounded-full bg-white px-4 py-2 text-[#191816] transition hover:-translate-y-0.5"
          >
            Create your own
          </Link>
        </div>
      </div>

      {/* Portfolio nav */}
      <div className="border-b border-black/10 bg-white px-6 py-4 sm:px-10">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <span className="text-sm font-bold tracking-[-0.03em]">
            {name.split(" ")[0].toUpperCase()}.
          </span>
          <nav className="hidden items-center gap-6 text-xs font-medium text-black/45 sm:flex">
            <span className="text-[#111111]">Home</span>
            <span>Work</span>
            <span>About</span>
            <span>Contact</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 py-16 sm:px-10 sm:py-24">
        <span
          className="flex size-16 items-center justify-center rounded-full text-lg font-bold text-white shadow-md"
          style={{ backgroundColor: accent }}
        >
          {initials}
        </span>

        <p
          className="mt-6 text-xs font-semibold uppercase tracking-[.2em]"
          style={{ color: accent }}
        >
          {role}
        </p>

        <h1 className="mt-3 max-w-2xl text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl">
          {name}
        </h1>

        <p className="mt-5 max-w-xl text-sm leading-7 text-black/55 sm:text-base">
          {tagline}
        </p>

        <div className="mt-6 flex flex-wrap gap-4 text-xs text-black/40">
          <span>{location}</span>
          <span>·</span>
          <span>{email}</span>
        </div>
      </section>

      {/* About */}
      <section className="mx-auto max-w-4xl px-6 pb-16 sm:px-10">
        <div className="rounded-2xl border border-black/8 bg-white p-8 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-black/40">
            About
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-black/65 sm:text-base">
            {about}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full px-3 py-1.5 text-[11px] font-medium"
                style={{ backgroundColor: accentSubtle, color: accent }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="mx-auto max-w-4xl px-6 pb-24 sm:px-10">
        <p className="mb-6 text-xs font-semibold uppercase tracking-[.18em] text-black/40">
          Selected work
        </p>

        <div className="grid gap-5 sm:grid-cols-3">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="overflow-hidden rounded-xl border border-black/8 bg-white shadow-sm transition hover:-translate-y-1"
            >
              <div
                className="flex aspect-[4/3] flex-col justify-between p-4"
                style={{ backgroundColor: accentSubtle }}
              >
                <span className="text-xs font-semibold text-black/40">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="w-fit rounded-full bg-white/70 px-2.5 py-1 text-[10px] font-semibold text-black/55 backdrop-blur">
                  {project.tag}
                </span>
              </div>

              <div className="p-4">
                <p className="text-sm font-semibold text-[#111111]">
                  {project.title}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-black/55">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-black/8 bg-white px-6 py-16 sm:px-10">
        <div className="mx-auto flex max-w-4xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-lg font-semibold tracking-[-0.02em] text-[#191816]">
              Like this style?
            </p>
            <p className="mt-1 text-sm text-black/55">
              Generate a portfolio like {name.split(" ")[0]}&apos;s with your own projects and skills.
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

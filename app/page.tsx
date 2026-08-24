import Link from "next/link";
import { PortfolioPreviewMock } from "@/components/PortfolioPreviewMock";

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#F6F3EE] text-[#191816] font-sans">
      {/* NAVBAR */}
      <header className="relative z-50 border-b border-[#DDD8D0]/70 bg-[#F6F3EE]/70 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-6 sm:px-10 lg:px-14">
          <Link href="/" className="flex items-center gap-2.5 text-decoration-none">
            <div className="flex size-8 items-center justify-center rounded-[10px] bg-[#191816] text-sm font-bold text-white shadow-sm">
              P
            </div>
            <span className="text-sm font-semibold tracking-[-0.035em] text-[#191816]">
              PortfolioAI
            </span>
          </Link>

          <nav className="hidden items-center gap-8 text-xs font-medium text-[#777168] md:flex">
            <a href="#how-it-works" className="transition hover:text-[#191816]">
              How it works
            </a>
            <a href="#features" className="transition hover:text-[#191816]">
              Features
            </a>
            <Link href="/demos" className="transition hover:text-[#191816]">
              Demos
            </Link>
          </nav>

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

      {/* HERO SECTION */}
      <section className="relative isolate min-h-[calc(100vh-76px)] overflow-hidden">
        {/* VIDEO BACKGROUND */}
        <video
          className="absolute inset-0 -z-20 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source
            src="/videos/hero-particles.mp4"
            type="video/mp4"
          />
        </video>

        {/* Video readability overlay */}
        <div className="absolute inset-0 -z-10 bg-[#F6F3EE]/[0.84]" />

        {/* Soft white center */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,.9),transparent_55%)]" />

        {/* Animated ambient glows */}
        <div className="pointer-events-none absolute -left-40 top-24 -z-10 size-[420px] rounded-full bg-[#A45C43]/[0.07] blur-[100px]" />
        <div
          className="pointer-events-none absolute -right-40 bottom-10 -z-10 size-[480px] rounded-full bg-violet-400/[0.06] blur-[110px]"
          style={{ animationDelay: '2s' }}
        />

        <div className="mx-auto flex min-h-[calc(100vh-76px)] max-w-7xl items-center px-6 py-16 sm:px-10 lg:px-14">
          <div className="grid w-full items-center gap-14 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
            {/* LEFT HERO TEXT */}
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D9D2C9] bg-white/65 px-3.5 py-2 shadow-sm backdrop-blur-xl">
                <span className="relative flex size-2">
                  <span className="absolute inset-0 animate-ping rounded-full bg-[#A45C43]/50" />
                  <span className="relative size-2 rounded-full bg-[#A45C43]" />
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[.16em] text-[#6D665E]">
                  AI-powered portfolio generator
                </span>
              </div>

              <h1 className="max-w-[650px] text-5xl font-semibold leading-[.94] tracking-[-.06em] sm:text-6xl lg:text-[4.8rem]">
                Your work deserves
                <br />
                a better
                <span className="text-[#A45C43]"> first impression.</span>
              </h1>

              <p className="mt-7 max-w-[500px] text-sm leading-7 text-[#777168] sm:text-base">
                Turn your projects, skills, and resume into a polished, professional portfolio — without spending hours coding or designing from scratch.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/login"
                  className="rounded-full bg-[#191816] px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5"
                >
                  Create my portfolio →
                </Link>
                <a
                  href="#how-it-works"
                  className="rounded-full border border-[#D7D0C7] bg-white/65 px-6 py-3.5 text-sm font-medium text-[#514B45] backdrop-blur-md transition hover:bg-white"
                >
                  See how it works
                </a>
                <Link
                  href="/demos"
                  className="rounded-full border border-[#D7D0C7] bg-white/65 px-6 py-3.5 text-sm font-medium text-[#514B45] backdrop-blur-md transition hover:bg-white"
                >
                  Browse demo portfolios
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-[11px] text-[#777168]">
                <span className="flex items-center gap-1.5">
                  <span className="text-[#A45C43]">✦</span> AI generated & polished
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-[#A45C43]">↗</span> Live preview & custom slug
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-[#A45C43]">📄</span> Print-ready PDF export
                </span>
              </div>
            </div>

            {/* RIGHT INTERACTIVE PREVIEW */}
            <div className="relative">
              <PortfolioPreviewMock />
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="border-t border-[#DDD8D0] bg-[#FAF9F7] px-6 py-24 sm:px-10 lg:px-14">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[.18em] text-[#A45C43]">
              How it works
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-.045em] sm:text-4xl">
              From PDF resume to
              <br />
              <span className="text-[#A45C43]">published portfolio in minutes.</span>
            </h2>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {[
              {
                number: "01",
                title: "Upload Resume or Enter Details",
                text: "Upload your PDF resume or fill in your background, projects, and skills into our guided editor.",
              },
              {
                number: "02",
                title: "Gemini AI Enhancements",
                text: "AI parses your resume, polishes your bio, and formats experience bullets and project write-ups.",
              },
              {
                number: "03",
                title: "Publish & Export PDF",
                text: "Publish your live shareable link (/p/your-slug) and generate matching print-ready PDF portfolios.",
              },
            ].map((item) => (
              <div key={item.number} className="rounded-2xl border border-[#E0DBD4] bg-white p-6 shadow-sm">
                <span className="text-xs font-semibold text-[#A45C43]">{item.number}</span>
                <h3 className="mt-8 text-lg font-semibold tracking-[-.025em]">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#777168]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="bg-[#F6F3EE] px-6 py-24 sm:px-10 lg:px-14">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[.18em] text-[#A45C43]">
                Built for professionals
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-.045em] sm:text-4xl">
                Everything you need
                <br />
                to showcase your work.
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["✦", "Gemini AI Writing", "Auto-extract resumes and rewrite project bullet points."],
                ["📄", "PDF Export Engine", "Server-rendered A4 PDFs created from your single source of truth."],
                ["🎨", "Multi-Template System", "Choose between Modern Tech Lead, Creative Glass, and Minimalist."],
                ["🌐", "Hosted Custom Slugs", "Share your portfolio link publicly or keep it private."],
              ].map(([icon, title, text]) => (
                <div key={title} className="rounded-2xl border border-[#DDD8D0] bg-white p-6 shadow-sm">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-[#F1EDE7] text-sm text-[#A45C43]">
                    {icon}
                  </div>
                  <h3 className="mt-5 text-sm font-semibold">{title}</h3>
                  <p className="mt-2 text-xs leading-5 text-[#777168]">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden bg-[#191816] px-6 py-24 text-white sm:px-10 lg:px-14">
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[.18em] text-[#C9A18F]">
            Ready to build?
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-.05em] sm:text-5xl">
            Your next opportunity
            <br />
            starts with your portfolio.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-sm leading-6 text-white/55">
            Create a high-impact portfolio website and downloadable PDF in minutes.
          </p>
          <Link
            href="/login"
            className="mt-8 inline-flex rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#191816] transition hover:-translate-y-1"
          >
            Get started now →
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#191816] px-6 pb-8 sm:px-10 lg:px-14">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 border-t border-white/10 pt-6 text-[11px] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} PortfolioAI</span>
          <div className="flex gap-5">
            <span>Privacy</span>
            <span>Terms</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
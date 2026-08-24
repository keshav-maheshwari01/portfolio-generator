"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface PortfolioItem {
  id: string;
  title: string;
  slug: string;
  template: string;
  is_published: boolean;
  updated_at: string;
}

export default function Dashboard() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [portfolios, setPortfolios] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserAndPortfolios();
  }, []);

  async function loadUserAndPortfolios() {
    setLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    setEmail(user.email || "");

    const { data } = await supabase
      .from("portfolios")
      .select("id, title, slug, template, is_published, updated_at")
      .eq("owner_id", user.id)
      .order("updated_at", { ascending: false });

    setPortfolios(data || []);
    setLoading(false);
  }

  async function createPortfolio() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const newSlug = `portfolio-${Date.now().toString(36)}`;

    const { data, error } = await supabase
      .from("portfolios")
      .insert({
        owner_id: user.id,
        title: "My New Portfolio",
        slug: newSlug,
        template: "modern-tech",
        theme: { accentColor: "#3b82f6" },
        content: {
          profile: { bio: "" },
          skills: ["React", "TypeScript"],
          projects: [],
          experience: [],
          education: [],
        },
        is_published: false,
      })
      .select()
      .single();

    if (error) {
      alert(error.message);
      return;
    }

    router.push(`/editor/${data.id}`);
  }

  async function deletePortfolio(id: string) {
    if (!confirm("Are you sure you want to delete this portfolio?")) return;
    const { error } = await supabase.from("portfolios").delete().eq("id", id);
    if (error) {
      alert(error.message);
    } else {
      setPortfolios(portfolios.filter((p) => p.id !== id));
    }
  }

  async function logout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <main className="min-h-screen bg-[#F6F3EE] text-[#191816] font-sans">
      {/* NAVBAR */}
      <header className="border-b border-[#DDD8D0]/70 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-6 sm:px-10 lg:px-14">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-[10px] bg-[#191816] text-sm font-bold text-white shadow-sm">
              P
            </div>
            <span className="text-sm font-semibold tracking-[-0.035em]">
              PortfolioAI Dashboard
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <span className="text-xs text-[#777168]">
              Logged in as <strong className="text-[#191816]">{email}</strong>
            </span>
            <button
              onClick={logout}
              className="rounded-full border border-[#D7D0C7] bg-white px-4 py-2 text-xs font-semibold text-[#514B45] transition hover:bg-[#191816] hover:text-white"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      {/* DASHBOARD CONTAINER */}
      <section className="mx-auto max-w-7xl px-6 py-12 sm:px-10 lg:px-14">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
              Your Portfolios
            </h1>
            <p className="text-sm text-[#777168] mt-1">
              Create, edit, publish, and export your portfolio websites.
            </p>
          </div>

          <button
            onClick={createPortfolio}
            className="rounded-full bg-[#191816] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5"
          >
            + Create New Portfolio
          </button>
        </div>

        {/* PORTFOLIO GRID */}
        {loading ? (
          <div className="py-20 text-center text-sm text-[#777168]">
            Loading your portfolios...
          </div>
        ) : portfolios.length === 0 ? (
          <div className="rounded-2xl border border-[#DDD8D0] bg-white p-12 text-center shadow-sm">
            <h3 className="text-xl font-semibold mb-2">No portfolios created yet</h3>
            <p className="text-sm text-[#777168] mb-6">
              Start by creating your first portfolio or importing your resume PDF with AI.
            </p>
            <button
              onClick={createPortfolio}
              className="rounded-full bg-[#191816] px-6 py-3 text-sm font-semibold text-white shadow-lg"
            >
              Build My First Portfolio →
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {portfolios.map((portfolio) => (
              <div
                key={portfolio.id}
                className="flex flex-col justify-between overflow-hidden rounded-2xl border border-[#E3DED6] bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider ${
                        portfolio.is_published
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {portfolio.is_published ? "Published" : "Draft"}
                    </span>
                    <span className="text-[11px] text-[#8B847B]">
                      {portfolio.template || "modern-tech"}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#191816] mb-2">
                    {portfolio.title}
                  </h3>

                  <p className="text-xs text-[#777168] mb-4">
                    Public Link:{" "}
                    <Link
                      href={`/p/${portfolio.slug}`}
                      target="_blank"
                      className="font-semibold text-blue-600 hover:underline"
                    >
                      /p/{portfolio.slug}
                    </Link>
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F0EBE1] flex flex-col gap-2">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => router.push(`/editor/${portfolio.id}`)}
                      className="rounded-lg bg-[#191816] py-2 text-xs font-semibold text-white text-center transition hover:bg-[#302E2A]"
                    >
                      Edit Portfolio
                    </button>
                    <Link
                      href={`/portfolio/${portfolio.id}`}
                      className="rounded-lg border border-[#D7D0C7] py-2 text-xs font-semibold text-[#514B45] text-center transition hover:bg-slate-100"
                    >
                      Preview
                    </Link>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={`/api/export-pdf/${portfolio.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg border border-[#D7D0C7] py-2 text-xs font-semibold text-[#514B45] text-center transition hover:bg-slate-100"
                    >
                      Download PDF
                    </a>
                    <button
                      onClick={() => deletePortfolio(portfolio.id)}
                      className="rounded-lg border border-red-200 text-red-600 py-2 text-xs font-semibold text-center transition hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
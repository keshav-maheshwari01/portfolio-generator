"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { PortfolioPreviewMock } from "@/components/PortfolioPreviewMock";

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  async function handleAuth(e: FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    setIsSigningIn(true);
    try {
      if (isSignUpMode) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        alert("Account created successfully! Logging you in...");
      }

      const { error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) throw loginError;

      router.push("/dashboard");
    } catch (error: any) {
      alert(error.message || "Authentication failed.");
    } finally {
      setIsSigningIn(false);
    }
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#F7F4EF] text-[#191816] font-sans">
      {/* HEADER */}
      <header className="relative z-50 flex items-center justify-between px-6 py-6 sm:px-10 lg:px-14">
        <Link href="/" className="group flex items-center gap-2 text-sm font-semibold tracking-[-.02em]">
          <span className="flex size-8 items-center justify-center rounded-xl bg-[#191816] text-[11px] font-bold text-white transition duration-300 group-hover:rotate-6">
            P
          </span>
          <span>PortfolioAI</span>
        </Link>

        <div className="flex items-center gap-3">
          <span className="hidden text-xs text-[#817A71] sm:block">
            {isSignUpMode ? "Already have an account?" : "New here?"}
          </span>
          <button
            onClick={() => setIsSignUpMode(!isSignUpMode)}
            className="rounded-full border border-[#D3CCC3] bg-white/70 px-4 py-2 text-xs font-semibold text-[#292722] backdrop-blur-md transition hover:bg-white"
          >
            {isSignUpMode ? "Sign in" : "Create account"}
          </button>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <section className="relative mx-auto flex min-h-[calc(100vh-89px)] max-w-[1500px] items-center px-6 pb-14 sm:px-10 lg:px-14">
        <div className="grid w-full items-center gap-20 lg:grid-cols-[1.25fr_.75fr] xl:gap-28">
          {/* LEFT PREVIEW */}
          <div className="relative hidden lg:block">
            <h1 className="max-w-[690px] text-6xl font-semibold leading-[.91] tracking-[-.06em] text-[#191816] xl:text-7xl">
              Your work
              <br />
              deserves a
              <br />
              <span className="text-[#A45C43]"> better stage.</span>
            </h1>
            <p className="mt-7 max-w-[500px] text-sm leading-6 text-[#777168]">
              Turn your projects, skills, and resume into a portfolio website that truly reflects your capabilities.
            </p>

            <div className="mt-10">
              <PortfolioPreviewMock />
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="mx-auto w-full max-w-[430px]">
            <div className="mb-8">
              <p className="text-[11px] font-semibold uppercase tracking-[.2em] text-[#A45C43]">
                {isSignUpMode ? "Get started free" : "Welcome back"}
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-.05em] sm:text-4xl">
                {isSignUpMode ? "Create your workspace." : "Continue building."}
              </h2>
              <p className="mt-2 text-xs text-[#777168]">
                {isSignUpMode
                  ? "Sign up to generate and publish your personal portfolio."
                  : "Your portfolios and resume AI tools are waiting for you."}
              </p>
            </div>

            <form onSubmit={handleAuth} className="flex flex-col gap-4 border-y border-[#DDD7CE] py-8">
              <div>
                <label className="block text-xs font-semibold text-[#514B45] mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-xl border border-[#D3CCC3] bg-white px-4 py-3 text-sm text-[#191816] outline-none transition focus:border-[#A45C43] focus:ring-2 focus:ring-[#A45C43]/10"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#514B45] mb-1.5">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full rounded-xl border border-[#D3CCC3] bg-white px-4 py-3 text-sm text-[#191816] outline-none transition focus:border-[#A45C43] focus:ring-2 focus:ring-[#A45C43]/10"
                />
              </div>

              <button
                type="submit"
                disabled={isSigningIn}
                className="mt-2 w-full rounded-xl bg-[#191816] py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#302E2A] active:scale-[.99] disabled:opacity-50"
              >
                {isSigningIn
                  ? isSignUpMode
                    ? "Creating Account..."
                    : "Signing In..."
                  : isSignUpMode
                  ? "Create Free Account →"
                  : "Sign In to Workspace →"}
              </button>
            </form>

            <div className="mt-6 text-center text-xs text-[#777168]">
              {isSignUpMode ? "Already have an account? " : "Don't have an account? "}
              <button
                onClick={() => setIsSignUpMode(!isSignUpMode)}
                className="font-semibold text-[#A45C43] hover:underline"
              >
                {isSignUpMode ? "Sign in" : "Create one"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
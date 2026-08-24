"use client";

import { useEffect, useState } from 'react';
import { cn } from '@/lib/cn';

interface PortfolioPreviewMockProps {
  className?: string;
}

const projects = [
  {
    number: '01',
    title: 'Featured Project',
    category: 'Project Showcase',
    className: 'bg-[#E8E5FF]',
  },
  {
    number: '02',
    title: 'Case Study',
    category: 'Work & Experience',
    className: 'bg-[#EDEBE6]',
  },
  {
    number: '03',
    title: 'Latest Work',
    category: 'Personal Project',
    className: 'bg-[#E7EFEA]',
  },
];

const screens = ['home', 'work', 'about'] as const;
type Screen = (typeof screens)[number];

export function PortfolioPreviewMock({ className }: PortfolioPreviewMockProps) {
  const [screenIndex, setScreenIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);

  const screen: Screen = screens[screenIndex];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setIsChanging(true);
      window.setTimeout(() => {
        setScreenIndex((current) => (current + 1) % screens.length);
        setIsChanging(false);
      }, 350);
    }, 3500);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div
      className={cn('relative w-full max-w-[650px] overflow-visible', className)}
      aria-hidden="true"
    >
      {/* AI status badge */}
      <div className="absolute -top-5 left-4 z-30 flex items-center gap-2 rounded-full border border-[#DDD8D0] bg-white/95 px-3.5 py-2 shadow-lg backdrop-blur-md">
        <span className="relative flex size-2.5">
          <span className="absolute inset-0 animate-ping rounded-full bg-[#A45C43]" />
          <span className="relative size-2.5 rounded-full bg-[#A45C43]" />
        </span>
        <span className="text-[11px] font-semibold tracking-wide text-[#514B45]">
          AI is building your portfolio
        </span>
      </div>

      {/* Main browser card */}
      <div className="relative overflow-hidden rounded-[22px] border border-[#D8D3CC] bg-white shadow-[0_30px_80px_rgba(60,50,40,.15)]">
        {/* Browser header */}
        <div className="flex items-center gap-2 border-b border-black/10 bg-white px-4 py-3">
          <span className="size-2.5 rounded-full bg-[#FF6B6B]" />
          <span className="size-2.5 rounded-full bg-[#FFD166]" />
          <span className="size-2.5 rounded-full bg-[#06D6A0]" />
          <div className="mx-auto flex h-6 w-[46%] items-center justify-center rounded-md bg-[#F4F2EF]">
            <span className="text-[10px] font-medium text-black/40">
              portfolio.ai
            </span>
          </div>
          <div className="w-10" />
        </div>

        {/* Portfolio website display */}
        <div className="relative min-h-[390px] overflow-hidden bg-[#FAFAF8] px-6 py-7 sm:px-9 sm:py-9">
          {/* Navigation */}
          <div className="mb-10 flex items-center justify-between">
            <div className="text-xs font-bold tracking-[-0.03em] text-[#111111]">
              PORTFOLIO.
            </div>
            <div className="hidden items-center gap-6 text-[10px] font-medium text-black/45 sm:flex">
              <span className={cn('transition-colors duration-300', screen === 'home' && 'text-[#111111]')}>
                Home
              </span>
              <span className={cn('transition-colors duration-300', screen === 'work' && 'text-[#111111]')}>
                Work
              </span>
              <span className={cn('transition-colors duration-300', screen === 'about' && 'text-[#111111]')}>
                About
              </span>
              <span>Contact</span>
            </div>
            <div className="rounded-full bg-[#111111] px-3 py-1.5 text-[9px] font-medium text-white">
              Publish
            </div>
          </div>

          {/* Screen content */}
          <div className={cn('transition-all duration-500', isChanging ? 'translate-x-4 opacity-0' : 'translate-x-0 opacity-100')}>
            {screen === 'home' && (
              <div>
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A45C43]">
                  PortfolioAI
                </p>
                <h2 className="max-w-[450px] text-3xl font-semibold leading-[1.02] tracking-[-0.045em] text-[#111111] sm:text-4xl">
                  Your portfolio,
                  <br />
                  beautifully generated.
                </h2>
                <p className="mt-4 max-w-[340px] text-[11px] leading-relaxed text-black/50">
                  Turn your experience, skills, and projects into a polished portfolio with AI.
                </p>
                <div className="mt-5 flex gap-2">
                  <span className="relative overflow-hidden rounded-full bg-[#111111] px-4 py-2 text-[9px] font-medium text-white">
                    Generate portfolio →
                  </span>
                  <span className="rounded-full border border-black/10 bg-white px-4 py-2 text-[9px] font-medium text-black/60">
                    Customize
                  </span>
                </div>
                <div className="mt-9 flex gap-8">
                  <div>
                    <p className="text-lg font-semibold text-[#111111]">AI</p>
                    <p className="text-[8px] text-black/40">Powered</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-[#111111]">01</p>
                    <p className="text-[8px] text-black/40">Portfolio</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-[#111111]">∞</p>
                    <p className="text-[8px] text-black/40">Possibilities</p>
                  </div>
                </div>
              </div>
            )}

            {screen === 'work' && (
              <div>
                <p className="text-[9px] uppercase tracking-[0.18em] text-black/40">
                  Your projects
                </p>
                <div className="mt-1 flex items-end justify-between">
                  <h2 className="text-2xl font-semibold tracking-[-0.04em] text-[#111111] sm:text-3xl">
                    Projects, organized.
                  </h2>
                  <span className="text-[9px] text-black/40">AI structured</span>
                </div>
                <div className="mt-7 grid grid-cols-3 gap-3">
                  {projects.map((project) => (
                    <div key={project.number} className="overflow-hidden rounded-xl border border-black/8 bg-white">
                      <div className={cn('relative aspect-[4/3] overflow-hidden p-3', project.className)}>
                        <span className="text-[9px] font-semibold text-black/40">{project.number}</span>
                        <div className="absolute right-3 top-3 flex size-5 items-center justify-center rounded-full bg-white/70 text-[9px] text-black/50">
                          ↗
                        </div>
                      </div>
                      <div className="p-2.5">
                        <p className="text-[9px] font-semibold text-[#111111]">{project.title}</p>
                        <p className="mt-1 text-[8px] text-black/40">{project.category}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {screen === 'about' && (
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A45C43]">
                  Your story
                </p>
                <h2 className="mt-3 max-w-[430px] text-3xl font-semibold leading-[1.05] tracking-[-0.04em] text-[#111111] sm:text-4xl">
                  Everything you are,
                  <br />
                  beautifully presented.
                </h2>
                <p className="mt-5 max-w-[390px] text-[11px] leading-relaxed text-black/50">
                  Your skills, experience, achievements, and ideas come together in one polished personal website.
                </p>
                <div className="mt-7 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {['Skills', 'Experience', 'Projects', 'About'].map((item) => (
                    <div key={item} className="rounded-xl border border-black/8 bg-white px-3 py-3 text-center">
                      <p className="text-[9px] font-semibold text-[#111111]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Progress indicator */}
          <div className="absolute bottom-4 left-6 right-6 sm:left-9 sm:right-9">
            <div className="h-[2px] overflow-hidden rounded-full bg-black/5">
              <div key={screenIndex} className="h-full bg-[#A45C43] transition-all duration-300" style={{ width: `${((screenIndex + 1) / 3) * 100}%` }} />
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-[9px] text-black/45">Live portfolio preview</span>
              <span className="text-[9px] font-medium text-black/50">{screenIndex + 1} / 3</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import ResumeUpload from "./ResumeUpload";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useParams, useRouter } from "next/navigation";

export default function Editor() {
  const supabase = createClient();
  const router = useRouter();

  const params = useParams();
  const id = params.id as string;

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [template, setTemplate] = useState("modern-tech");
  const [accentColor, setAccentColor] = useState("#3b82f6");
  const [isPublished, setIsPublished] = useState(false);
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState("");

  const [projects, setProjects] = useState<Array<{ title: string; description: string; link: string }>>([
    { title: "", description: "", link: "" },
  ]);

  const [experience, setExperience] = useState<Array<{ company: string; role: string; duration: string; description: string }>>([
    { company: "", role: "", duration: "", description: "" },
  ]);

  const [education, setEducation] = useState<Array<{ school: string; degree: string; year: string }>>([
    { school: "", degree: "", year: "" },
  ]);

  const [loadingAi, setLoadingAi] = useState<string | null>(null);

  useEffect(() => {
    loadPortfolio();
  }, []);

  async function loadPortfolio() {
    const { data, error } = await supabase
      .from("portfolios")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      alert(error.message);
      return;
    }

    setTitle(data.title || "");
    setSlug(data.slug || id);
    setTemplate(data.template || "modern-tech");
    setAccentColor(data.theme?.accentColor || "#3b82f6");
    setIsPublished(data.is_published || false);
    setBio(data.content?.profile?.bio || "");
    setSkills(data.content?.skills?.join(", ") || "");

    setProjects(
      data.content?.projects?.length > 0
        ? data.content.projects
        : [{ title: "", description: "", link: "" }]
    );

    setExperience(
      data.content?.experience?.length > 0
        ? data.content.experience
        : [{ company: "", role: "", duration: "", description: "" }]
    );

    setEducation(
      data.content?.education?.length > 0
        ? data.content.education
        : [{ school: "", degree: "", year: "" }]
    );
  }

  function handleDataParsed(updatedContent: any) {
    if (updatedContent.profile?.bio) {
      setBio(updatedContent.profile.bio);
    }
    if (updatedContent.skills) {
      setSkills(updatedContent.skills.join(", "));
    }
    if (updatedContent.projects) {
      setProjects(updatedContent.projects);
    }
    if (updatedContent.experience) {
      setExperience(updatedContent.experience);
    }
    if (updatedContent.education) {
      setEducation(updatedContent.education);
    }
  }

  async function savePortfolio(shouldPublish = isPublished) {
    const { data: current, error: loadError } = await supabase
      .from("portfolios")
      .select("content")
      .eq("id", id)
      .single();

    if (loadError) {
      alert(loadError.message);
      return;
    }

    const currentContent = current?.content ?? {};

    const updatedContent = {
      ...currentContent,
      profile: {
        ...(currentContent.profile ?? {}),
        bio,
      },
      skills: skills
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean),
      projects: projects.filter((project) => project.title.trim() !== ""),
      experience: experience.filter((item) => item.company.trim() !== ""),
      education: education.filter((item) => item.school.trim() !== ""),
    };

    const cleanSlug = (slug || id)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9-]/g, "-");

    const { error } = await supabase
      .from("portfolios")
      .update({
        title,
        slug: cleanSlug,
        template,
        theme: { accentColor },
        is_published: shouldPublish,
        content: updatedContent,
      })
      .eq("id", id);

    if (error) {
      alert(error.message);
    } else {
      setIsPublished(shouldPublish);
      alert(shouldPublish ? "Portfolio saved & Published!" : "Portfolio saved as draft!");
    }
  }

  // AI Helpers
  async function polishBio() {
    if (!bio.trim()) {
      alert("Please enter a few lines in your bio first for AI to polish.");
      return;
    }

    setLoadingAi("bio");
    try {
      const res = await fetch("/api/ai/enhance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "enhance-bio", text: bio }),
      });
      const data = await res.json();
      if (data.enhancedText) {
        setBio(data.enhancedText);
      } else {
        alert(data.error || "Failed to polish bio.");
      }
    } catch (e: any) {
      alert(e.message || "AI polish failed.");
    } finally {
      setLoadingAi(null);
    }
  }

  async function enhanceProject(index: number) {
    const proj = projects[index];
    if (!proj.description.trim() && !proj.title.trim()) {
      alert("Please enter project title or description first.");
      return;
    }

    setLoadingAi(`proj-${index}`);
    try {
      const res = await fetch("/api/ai/enhance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "enhance-project",
          title: proj.title,
          text: proj.description,
        }),
      });
      const data = await res.json();
      if (data.enhancedText) {
        const copy = [...projects];
        copy[index].description = data.enhancedText;
        setProjects(copy);
      } else {
        alert(data.error || "Failed to enhance project.");
      }
    } catch (e: any) {
      alert(e.message || "AI enhancement failed.");
    } finally {
      setLoadingAi(null);
    }
  }

  async function enhanceExperience(index: number) {
    const exp = experience[index];
    if (!exp.description.trim() && !exp.role.trim()) {
      alert("Please enter role or description first.");
      return;
    }

    setLoadingAi(`exp-${index}`);
    try {
      const res = await fetch("/api/ai/enhance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "enhance-experience",
          role: exp.role,
          company: exp.company,
          text: exp.description,
        }),
      });
      const data = await res.json();
      if (data.enhancedText) {
        const copy = [...experience];
        copy[index].description = data.enhancedText;
        setExperience(copy);
      } else {
        alert(data.error || "Failed to enhance experience.");
      }
    } catch (e: any) {
      alert(e.message || "AI enhancement failed.");
    } finally {
      setLoadingAi(null);
    }
  }

  async function suggestSkills() {
    setLoadingAi("skills");
    try {
      const existing = skills.split(",").map((s) => s.trim()).filter(Boolean);
      const res = await fetch("/api/ai/enhance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "suggest-skills",
          text: bio,
          existingSkills: existing,
        }),
      });
      const data = await res.json();
      if (data.skills && Array.isArray(data.skills)) {
        const merged = Array.from(new Set([...existing, ...data.skills]));
        setSkills(merged.join(", "));
      } else {
        alert(data.error || "Failed to suggest skills.");
      }
    } catch (e: any) {
      alert(e.message || "AI skills suggestion failed.");
    } finally {
      setLoadingAi(null);
    }
  }

  return (
    <main style={{ padding: "40px 20px", maxWidth: 960, margin: "0 auto", fontFamily: "system-ui" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 30 }}>
        <h1>Portfolio Builder & Editor</h1>
        <div style={{ display: "flex", gap: 10 }}>
          <a
            href={`/api/export-pdf/${id}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "10px 18px",
              background: "#475569",
              color: "white",
              textDecoration: "none",
              borderRadius: 6,
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            Export PDF
          </a>
          <button
            onClick={() => router.push(`/portfolio/${id}`)}
            style={{
              padding: "10px 18px",
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: 6,
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Live Preview
          </button>
        </div>
      </div>

      {/* TEMPLATE & THEME SELECTOR */}
      <div style={{ background: "#f8fafc", padding: 24, borderRadius: 12, border: "1px solid #e2e8f0", marginBottom: 30 }}>
        <h3 style={{ marginTop: 0, marginBottom: 16 }}>🎨 Template & Theme Design</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 700, display: "block", marginBottom: 6 }}>Select Visual Template</label>
            <select
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #cbd5e1", fontSize: 15, background: "white" }}
            >
              <option value="modern-tech">⚡ Modern Tech Lead (Dark Mode & Cyber Accent)</option>
              <option value="creative-glass">✨ Creative Glass (Translucent & Vibrant Gradients)</option>
              <option value="minimal">📜 Minimalist Executive (Editorial Light Mode)</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 700, display: "block", marginBottom: 6 }}>Accent Color Theme</label>
            <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
              {[
                { name: "Electric Blue", color: "#3b82f6" },
                { name: "Cyber Emerald", color: "#10b981" },
                { name: "Neon Purple", color: "#8b5cf6" },
                { name: "Sunset Rose", color: "#f43f5e" },
              ].map((item) => (
                <button
                  key={item.color}
                  onClick={() => setAccentColor(item.color)}
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    background: item.color,
                    border: accentColor === item.color ? "3px solid #0f172a" : "2px solid transparent",
                    cursor: "pointer",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                  }}
                  title={item.name}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* PUBLISHING CONTROLS */}
      <div
        style={{
          background: isPublished ? "#ecfdf5" : "#fef2f2",
          border: `1px solid ${isPublished ? "#a7f3d0" : "#fecaca"}`,
          padding: 20,
          borderRadius: 12,
          marginBottom: 30,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h3 style={{ margin: "0 0 6px", color: isPublished ? "#065f46" : "#991b1b" }}>
              Status: {isPublished ? "Published (Live Public Webpage)" : "Draft (Private)"}
            </h3>
            <p style={{ margin: 0, fontSize: 14, color: "#475569" }}>
              Public Share Link:{" "}
              {slug ? (
                <a href={`/p/${slug}`} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 700, color: "#2563eb" }}>
                  /p/{slug}
                </a>
              ) : (
                "Not set"
              )}
            </p>
          </div>
          <button
            onClick={() => savePortfolio(!isPublished)}
            style={{
              padding: "10px 20px",
              background: isPublished ? "#dc2626" : "#16a34a",
              color: "white",
              border: "none",
              borderRadius: 6,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {isPublished ? "Unpublish" : "Publish Portfolio"}
          </button>
        </div>

        <div style={{ marginTop: 16 }}>
          <label style={{ fontSize: 13, fontWeight: 700, color: "#334155" }}>Custom Public URL Slug</label>
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="e.g. john-doe-developer"
            style={{ width: "100%", marginTop: 4, padding: "10px 12px", borderRadius: 6, border: "1px solid #cbd5e1" }}
          />
        </div>
      </div>

      {/* PORTFOLIO TITLE */}
      <section style={{ marginBottom: 30 }}>
        <h3>Portfolio Title / Name</h3>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Alex Rivera - Senior Full Stack Engineer"
          style={{ width: "100%", padding: 12, fontSize: 16, borderRadius: 6, border: "1px solid #cbd5e1" }}
        />
      </section>

      {/* BIO / ABOUT */}
      <section style={{ marginBottom: 30 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <h3 style={{ margin: 0 }}>About You</h3>
          <button
            onClick={polishBio}
            disabled={loadingAi === "bio"}
            style={{
              padding: "6px 14px",
              background: "#7c3aed",
              color: "white",
              border: "none",
              borderRadius: 6,
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {loadingAi === "bio" ? "Polishing..." : "✨ Polish with AI"}
          </button>
        </div>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Describe your background, expertise, and passion..."
          rows={6}
          style={{ width: "100%", padding: 12, fontSize: 15, borderRadius: 6, border: "1px solid #cbd5e1" }}
        />
      </section>

      {/* SKILLS */}
      <section style={{ marginBottom: 30 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <h3 style={{ margin: 0 }}>Skills & Technologies (Comma Separated)</h3>
          <button
            onClick={suggestSkills}
            disabled={loadingAi === "skills"}
            style={{
              padding: "6px 14px",
              background: "#7c3aed",
              color: "white",
              border: "none",
              borderRadius: 6,
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {loadingAi === "skills" ? "Analyzing..." : "✨ Suggest AI Skills"}
          </button>
        </div>
        <input
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder="React, TypeScript, Next.js, Node.js, GraphQL, PostgreSQL"
          style={{ width: "100%", padding: 12, fontSize: 15, borderRadius: 6, border: "1px solid #cbd5e1" }}
        />
      </section>

      {/* RESUME UPLOAD */}
      <ResumeUpload portfolioId={id} onDataParsed={handleDataParsed} />

      <hr style={{ margin: "40px 0", borderColor: "#e2e8f0" }} />

      {/* WORK EXPERIENCE */}
      <section style={{ marginBottom: 30 }}>
        <h2>Work Experience</h2>
        {experience.map((item, idx) => (
          <div key={idx} style={{ background: "#f8fafc", padding: 20, borderRadius: 8, marginBottom: 16, border: "1px solid #e2e8f0" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
              <input
                placeholder="Company"
                value={item.company}
                onChange={(e) => {
                  const copy = [...experience];
                  copy[idx].company = e.target.value;
                  setExperience(copy);
                }}
                style={{ padding: 10, borderRadius: 6, border: "1px solid #cbd5e1" }}
              />
              <input
                placeholder="Role / Title"
                value={item.role}
                onChange={(e) => {
                  const copy = [...experience];
                  copy[idx].role = e.target.value;
                  setExperience(copy);
                }}
                style={{ padding: 10, borderRadius: 6, border: "1px solid #cbd5e1" }}
              />
            </div>
            <input
              placeholder="Duration (e.g. 2022 - Present)"
              value={item.duration}
              onChange={(e) => {
                const copy = [...experience];
                copy[idx].duration = e.target.value;
                setExperience(copy);
              }}
              style={{ width: "100%", padding: 10, marginBottom: 10, borderRadius: 6, border: "1px solid #cbd5e1" }}
            />
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 6 }}>
              <button
                onClick={() => enhanceExperience(idx)}
                disabled={loadingAi === `exp-${idx}`}
                style={{
                  padding: "5px 12px",
                  background: "#7c3aed",
                  color: "white",
                  border: "none",
                  borderRadius: 4,
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                {loadingAi === `exp-${idx}` ? "Enhancing..." : "✨ Enhance Bullets"}
              </button>
            </div>
            <textarea
              placeholder="Key responsibilities and achievements..."
              value={item.description}
              onChange={(e) => {
                const copy = [...experience];
                copy[idx].description = e.target.value;
                setExperience(copy);
              }}
              rows={3}
              style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #cbd5e1" }}
            />
          </div>
        ))}
        <button
          onClick={() => setExperience([...experience, { company: "", role: "", duration: "", description: "" }])}
          style={{ padding: "8px 16px", background: "#f1f5f9", border: "1px solid #cbd5e1", borderRadius: 6, cursor: "pointer" }}
        >
          + Add Experience
        </button>
      </section>

      <hr style={{ margin: "40px 0", borderColor: "#e2e8f0" }} />

      {/* PROJECTS */}
      <section style={{ marginBottom: 30 }}>
        <h2>Featured Projects</h2>
        {projects.map((project, idx) => (
          <div key={idx} style={{ background: "#f8fafc", padding: 20, borderRadius: 8, marginBottom: 16, border: "1px solid #e2e8f0" }}>
            <input
              placeholder="Project title"
              value={project.title}
              onChange={(e) => {
                const copy = [...projects];
                copy[idx].title = e.target.value;
                setProjects(copy);
              }}
              style={{ width: "100%", padding: 10, marginBottom: 10, borderRadius: 6, border: "1px solid #cbd5e1" }}
            />
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 6 }}>
              <button
                onClick={() => enhanceProject(idx)}
                disabled={loadingAi === `proj-${idx}`}
                style={{
                  padding: "5px 12px",
                  background: "#7c3aed",
                  color: "white",
                  border: "none",
                  borderRadius: 4,
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                {loadingAi === `proj-${idx}` ? "Enhancing..." : "✨ Enhance Description"}
              </button>
            </div>
            <textarea
              placeholder="Project summary, technologies, and features..."
              value={project.description}
              onChange={(e) => {
                const copy = [...projects];
                copy[idx].description = e.target.value;
                setProjects(copy);
              }}
              rows={3}
              style={{ width: "100%", padding: 10, marginBottom: 10, borderRadius: 6, border: "1px solid #cbd5e1" }}
            />
            <input
              placeholder="Project live link (optional)"
              value={project.link}
              onChange={(e) => {
                const copy = [...projects];
                copy[idx].link = e.target.value;
                setProjects(copy);
              }}
              style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #cbd5e1" }}
            />
          </div>
        ))}
        <button
          onClick={() => setProjects([...projects, { title: "", description: "", link: "" }])}
          style={{ padding: "8px 16px", background: "#f1f5f9", border: "1px solid #cbd5e1", borderRadius: 6, cursor: "pointer" }}
        >
          + Add Project
        </button>
      </section>

      {/* BOTTOM FLOATING SAVE BAR */}
      <div style={{ position: "sticky", bottom: 20, background: "white", padding: 16, borderRadius: 12, boxShadow: "0 10px 30px rgba(0,0,0,0.15)", border: "1px solid #cbd5e1", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button
          onClick={() => savePortfolio(isPublished)}
          style={{ padding: "12px 28px", fontSize: 16, fontWeight: 700, background: "#059669", color: "white", border: "none", borderRadius: 8, cursor: "pointer" }}
        >
          Save Portfolio
        </button>

        <div style={{ display: "flex", gap: 12 }}>
          <a
            href={`/api/export-pdf/${id}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ padding: "12px 20px", fontSize: 15, fontWeight: 700, background: "#475569", color: "white", textDecoration: "none", borderRadius: 8 }}
          >
            Export PDF
          </a>
          {slug && (
            <a
              href={`/p/${slug}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ padding: "12px 20px", fontSize: 15, fontWeight: 700, background: "#2563eb", color: "white", textDecoration: "none", borderRadius: 8 }}
            >
              View Public Website →
            </a>
          )}
        </div>
      </div>
    </main>
  );
}
import React from "react";

interface PortfolioData {
  id: string;
  title: string;
  template?: string;
  theme?: {
    accentColor?: string;
    mode?: string;
  };
  content?: {
    profile?: {
      bio?: string;
      photoUrl?: string;
      headline?: string;
    };
    skills?: string[];
    projects?: Array<{ title: string; description: string; link?: string }>;
    experience?: Array<{ company: string; role: string; duration: string; description: string }>;
    education?: Array<{ school: string; degree: string; year: string }>;
    media?: {
      resumeUrl?: string;
      resumeName?: string;
    };
  };
}

export default function ModernPortfolio({ data }: { data: PortfolioData }) {
  const template = data.template || "modern-tech";
  const content = data.content ?? {};
  const profile = content.profile ?? {};
  const skills = content.skills ?? [];
  const projects = content.projects ?? [];
  const experience = content.experience ?? [];
  const education = content.education ?? [];
  const media = content.media ?? {};

  const photoUrl = profile.photoUrl;
  const resumeUrl = media.resumeUrl;
  const accentColor = data.theme?.accentColor || "#3b82f6";

  // ----------------------------------------------------
  // TEMPLATE 1: MODERN TECH LEAD (DARK MODE & CYBER GLOW)
  // ----------------------------------------------------
  if (template === "modern-tech") {
    return (
      <div style={{ minHeight: "100vh", background: "#090d16", color: "#f8fafc", fontFamily: "'Inter', system-ui, sans-serif" }}>
        {/* NAV */}
        <nav style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 30px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#10b981", display: "inline-block", boxShadow: "0 0 10px #10b981" }} />
            <span style={{ fontWeight: 700, fontSize: 18, letterSpacing: "-0.5px" }}>{data.title}</span>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <a
              href={`/api/export-pdf/${data.id}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ padding: "8px 16px", borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)", color: "white", textDecoration: "none", fontSize: 13, fontWeight: 600 }}
            >
              📄 PDF Export
            </a>
            {resumeUrl && (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ padding: "8px 16px", borderRadius: 8, background: accentColor, color: "white", textDecoration: "none", fontSize: 13, fontWeight: 600 }}
              >
                View Resume
              </a>
            )}
          </div>
        </nav>

        {/* HERO */}
        <section style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 30px 60px", display: "grid", gridTemplateColumns: photoUrl ? "1fr 280px" : "1fr", gap: 40, alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 999, background: "rgba(59, 130, 246, 0.1)", border: `1px solid ${accentColor}40`, color: accentColor, fontSize: 13, fontWeight: 600, marginBottom: 20 }}>
              <span>🚀 TECH & SOFTWARE PROFESSIONAL</span>
            </div>
            <h1 style={{ fontSize: "clamp(40px, 6vw, 68px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-2px", margin: "0 0 24px" }}>
              {data.title}
            </h1>
            <p style={{ fontSize: 20, lineHeight: 1.7, color: "#94a3b8", maxWidth: 720, marginBottom: 32 }}>
              {profile.bio || "Building next-generation web applications, resilient backend architectures, and high-impact digital products."}
            </p>

            {/* SKILLS CHIPS */}
            {skills.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 36 }}>
                {skills.map((skill) => (
                  <span key={skill} style={{ padding: "6px 14px", borderRadius: 6, background: "#1e293b", border: "1px solid rgba(255,255,255,0.08)", fontSize: 13, fontWeight: 600, color: "#cbd5e1" }}>
                    {skill}
                  </span>
                ))}
              </div>
            )}

            <div style={{ display: "flex", gap: 14 }}>
              <a href={`/api/export-pdf/${data.id}`} target="_blank" rel="noopener noreferrer" style={{ padding: "14px 28px", borderRadius: 10, background: accentColor, color: "white", fontWeight: 700, textDecoration: "none", fontSize: 15, boxShadow: `0 10px 25px ${accentColor}40` }}>
                Download PDF Resume
              </a>
            </div>
          </div>

          {photoUrl && (
            <div style={{ textAlign: "center" }}>
              <img
                src={photoUrl}
                alt="Profile"
                style={{ width: 240, height: 240, borderRadius: 24, objectFit: "cover", border: `3px solid ${accentColor}`, boxShadow: `0 20px 50px ${accentColor}30` }}
              />
            </div>
          )}
        </section>

        {/* WORK EXPERIENCE TIMELINE */}
        {experience.length > 0 && (
          <section style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 30px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 32, letterSpacing: "-1px" }}>
              Work Experience
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {experience.map((item, idx) => (
                <div key={idx} style={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.08)", padding: 28, borderRadius: 16, transition: "transform 0.2s ease" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10, marginBottom: 12 }}>
                    <div>
                      <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#f8fafc" }}>{item.role}</h3>
                      <span style={{ color: accentColor, fontWeight: 600, fontSize: 15 }}>{item.company}</span>
                    </div>
                    <span style={{ fontSize: 13, background: "rgba(255,255,255,0.05)", padding: "4px 12px", borderRadius: 999, color: "#94a3b8", height: "fit-content" }}>
                      {item.duration}
                    </span>
                  </div>
                  <p style={{ margin: 0, color: "#94a3b8", fontSize: 15, lineHeight: 1.6, whiteSpace: "pre-line" }}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FEATURED PROJECTS GRID */}
        {projects.length > 0 && (
          <section style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 30px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 32, letterSpacing: "-1px" }}>
              Featured Projects
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
              {projects.map((project, idx) => (
                <div key={idx} style={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.08)", padding: 28, borderRadius: 16, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <h3 style={{ margin: "0 0 12px", fontSize: 20, fontWeight: 700, color: "#f8fafc" }}>{project.title}</h3>
                    <p style={{ color: "#94a3b8", fontSize: 15, lineHeight: 1.6, marginBottom: 20 }}>{project.description}</p>
                  </div>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: accentColor, fontWeight: 700, textDecoration: "none", fontSize: 14, display: "inline-flex", alignItems: "center", gap: 6 }}
                    >
                      View Live Project →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* EDUCATION */}
        {education.length > 0 && (
          <section style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 30px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
            <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 32, letterSpacing: "-1px" }}>
              Education & Certifications
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
              {education.map((item, idx) => (
                <div key={idx} style={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.08)", padding: 24, borderRadius: 14 }}>
                  <h3 style={{ margin: "0 0 6px", fontSize: 18, fontWeight: 700, color: "#f8fafc" }}>{item.school}</h3>
                  <p style={{ margin: "0 0 4px", color: accentColor, fontWeight: 600, fontSize: 14 }}>{item.degree}</p>
                  <span style={{ fontSize: 13, color: "#64748b" }}>{item.year}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FOOTER */}
        <footer style={{ borderTop: "1px solid rgba(255,255,255,0.08)", padding: "40px 30px", textAlign: "center", color: "#64748b", fontSize: 13 }}>
          <p>© {new Date().getFullYear()} {data.title}. Built with AI Portfolio Generator.</p>
        </footer>
      </div>
    );
  }

  // ----------------------------------------------------
  // TEMPLATE 2: CREATIVE GLASS (VIBRANT GRADIENT & GLASSMORPHISM)
  // ----------------------------------------------------
  if (template === "creative-glass") {
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)", color: "#f8fafc", fontFamily: "'Inter', system-ui, sans-serif", padding: "20px" }}>
        <div style={{ maxWidth: 1000, margin: "40px auto", background: "rgba(255, 255, 255, 0.03)", backdropFilter: "blur(16px)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: 24, padding: "40px 40px" }}>
          {/* HEADER */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255, 255, 255, 0.1)", paddingBottom: 24, marginBottom: 36 }}>
            <div>
              <h1 style={{ fontSize: 36, fontWeight: 800, background: `linear-gradient(90deg, #ffffff, ${accentColor})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", margin: 0 }}>
                {data.title}
              </h1>
            </div>
            <a href={`/api/export-pdf/${data.id}`} target="_blank" rel="noopener noreferrer" style={{ padding: "10px 20px", borderRadius: 999, background: accentColor, color: "white", textDecoration: "none", fontWeight: 700, fontSize: 13 }}>
              Download PDF
            </a>
          </div>

          {/* BIO */}
          <div style={{ marginBottom: 40 }}>
            <p style={{ fontSize: 18, lineHeight: 1.8, color: "#cbd5e1" }}>
              {profile.bio || "Welcome to my interactive portfolio."}
            </p>
          </div>

          {/* SKILLS */}
          {skills.length > 0 && (
            <div style={{ marginBottom: 40 }}>
              <h3 style={{ fontSize: 14, letterSpacing: 2, textTransform: "uppercase", color: accentColor, marginBottom: 16 }}>Skills</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {skills.map((skill) => (
                  <span key={skill} style={{ padding: "8px 16px", borderRadius: 999, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", fontSize: 13, fontWeight: 600 }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* EXPERIENCE */}
          {experience.length > 0 && (
            <div style={{ marginBottom: 40 }}>
              <h3 style={{ fontSize: 14, letterSpacing: 2, textTransform: "uppercase", color: accentColor, marginBottom: 20 }}>Experience</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {experience.map((item, idx) => (
                  <div key={idx} style={{ background: "rgba(0,0,0,0.2)", padding: 24, borderRadius: 16, border: "1px solid rgba(255,255,255,0.05)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                      <h4 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>{item.role} @ {item.company}</h4>
                      <span style={{ fontSize: 13, color: "#94a3b8" }}>{item.duration}</span>
                    </div>
                    <p style={{ margin: 0, color: "#cbd5e1", fontSize: 14, lineHeight: 1.6 }}>{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PROJECTS */}
          {projects.length > 0 && (
            <div>
              <h3 style={{ fontSize: 14, letterSpacing: 2, textTransform: "uppercase", color: accentColor, marginBottom: 20 }}>Projects</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
                {projects.map((project, idx) => (
                  <div key={idx} style={{ background: "rgba(0,0,0,0.2)", padding: 24, borderRadius: 16, border: "1px solid rgba(255,255,255,0.05)" }}>
                    <h4 style={{ margin: "0 0 10px", fontSize: 18, fontWeight: 700 }}>{project.title}</h4>
                    <p style={{ color: "#cbd5e1", fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>{project.description}</p>
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ color: accentColor, textDecoration: "none", fontWeight: 700, fontSize: 13 }}>
                        Visit Link →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // TEMPLATE 3: MINIMAL EXECUTIVE (LIGHT MODE EDITORIAL)
  // ----------------------------------------------------
  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", color: "#0f172a", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <nav style={{ maxWidth: 1000, margin: "0 auto", padding: "24px 30px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #e2e8f0" }}>
        <span style={{ fontWeight: 800, fontSize: 20 }}>{data.title}</span>
        <a href={`/api/export-pdf/${data.id}`} target="_blank" rel="noopener noreferrer" style={{ padding: "10px 18px", borderRadius: 8, background: "#0f172a", color: "white", textDecoration: "none", fontWeight: 600, fontSize: 14 }}>
          Export PDF
        </a>
      </nav>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "60px 30px" }}>
        {photoUrl && (
          <img src={photoUrl} alt="Profile" style={{ width: 120, height: 120, borderRadius: "50%", objectFit: "cover", marginBottom: 24, border: "4px solid white", boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }} />
        )}
        <h1 style={{ fontSize: 48, fontWeight: 800, letterSpacing: "-1.5px", margin: "0 0 16px" }}>{data.title}</h1>
        <p style={{ fontSize: 20, color: "#475569", lineHeight: 1.7, maxWidth: 700, marginBottom: 32 }}>{profile.bio || "Professional Portfolio"}</p>

        {skills.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 48 }}>
            {skills.map((skill) => (
              <span key={skill} style={{ padding: "6px 14px", borderRadius: 999, background: "#e2e8f0", fontSize: 14, fontWeight: 600 }}>{skill}</span>
            ))}
          </div>
        )}

        {experience.length > 0 && (
          <div style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Experience</h2>
            {experience.map((item, idx) => (
              <div key={idx} style={{ padding: 24, background: "white", border: "1px solid #e2e8f0", borderRadius: 12, marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <h3 style={{ margin: 0, fontSize: 18 }}>{item.role} @ {item.company}</h3>
                  <span style={{ fontSize: 14, color: "#64748b" }}>{item.duration}</span>
                </div>
                <p style={{ margin: 0, color: "#475569", fontSize: 15, lineHeight: 1.6 }}>{item.description}</p>
              </div>
            ))}
          </div>
        )}

        {projects.length > 0 && (
          <div>
            <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Projects</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
              {projects.map((project, idx) => (
                <div key={idx} style={{ padding: 24, background: "white", border: "1px solid #e2e8f0", borderRadius: 12 }}>
                  <h3 style={{ margin: "0 0 8px", fontSize: 18 }}>{project.title}</h3>
                  <p style={{ color: "#475569", fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>{project.description}</p>
                  {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ color: "#2563eb", fontWeight: 600 }}>View Project →</a>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

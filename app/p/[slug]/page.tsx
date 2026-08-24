import { createClient } from "@/lib/supabase/server";
import ModernPortfolio from "@/components/templates/ModernPortfolio";
import Link from "next/link";

export default async function PublicSlugPortfolioPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  // Try matching by slug first, fallback to id
  let { data } = await supabase
    .from("portfolios")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (!data) {
    const { data: byId } = await supabase
      .from("portfolios")
      .select("*")
      .eq("id", slug)
      .eq("is_published", true)
      .maybeSingle();
    data = byId;
  }

  if (!data) {
    return (
      <main style={styles.errorPage}>
        <div style={styles.errorCard}>
          <h1>Portfolio Unavailable</h1>
          <p>
            This portfolio is either private, unpublished, or the link is invalid.
          </p>
          <Link href="/" style={styles.primaryButton}>
            Return Home
          </Link>
        </div>
      </main>
    );
  }

  return <ModernPortfolio data={data} />;
}

const styles: Record<string, React.CSSProperties> = {
  errorPage: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#0f172a",
    color: "white",
    padding: 20,
    fontFamily: "system-ui",
  },
  errorCard: {
    background: "#1e293b",
    padding: 40,
    borderRadius: 16,
    border: "1px solid rgba(255,255,255,0.1)",
    textAlign: "center",
    maxWidth: 450,
  },
  primaryButton: {
    display: "inline-block",
    marginTop: 20,
    textDecoration: "none",
    padding: "12px 24px",
    borderRadius: 8,
    background: "#2563eb",
    color: "white",
    fontWeight: 600,
  },
};

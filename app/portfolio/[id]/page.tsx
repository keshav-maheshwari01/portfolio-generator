import { createClient } from "@/lib/supabase/server";
import ModernPortfolio from "@/components/templates/ModernPortfolio";

export default async function PortfolioPreviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("portfolios")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    return (
      <main style={styles.errorPage}>
        <h1>Portfolio not found</h1>
        <p>{error?.message || "Unable to load portfolio details."}</p>
      </main>
    );
  }

  return <ModernPortfolio data={data} />;
}

const styles: Record<string, React.CSSProperties> = {
  errorPage: {
    padding: 60,
    background: "#0f172a",
    color: "white",
    minHeight: "100vh",
    fontFamily: "system-ui",
  },
};
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  renderToStream,
} from "@react-pdf/renderer";

// Define PDF styles
const pdfStyles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#1e293b",
  },
  header: {
    borderBottomWidth: 2,
    borderBottomColor: "#2563eb",
    paddingBottom: 15,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0f172a",
  },
  title: {
    fontSize: 12,
    color: "#2563eb",
    marginTop: 4,
  },
  bio: {
    fontSize: 10,
    color: "#475569",
    marginTop: 8,
    lineHeight: 1.4,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#0f172a",
    borderBottomWidth: 1,
    borderBottomColor: "#cbd5e1",
    paddingBottom: 4,
    marginBottom: 8,
    textTransform: "uppercase",
  },
  skillBadge: {
    backgroundColor: "#f1f5f9",
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 4,
    marginRight: 6,
    marginBottom: 6,
    fontSize: 9,
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  itemGroup: {
    marginBottom: 10,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  itemTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#0f172a",
  },
  itemSub: {
    fontSize: 9,
    color: "#64748b",
  },
  itemDesc: {
    fontSize: 9.5,
    color: "#334155",
    marginTop: 3,
    lineHeight: 1.3,
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 40,
    right: 40,
    fontSize: 8,
    textAlign: "center",
    color: "#94a3b8",
  },
});

// React PDF Document Component
function PortfolioPdfDocument({ data }: { data: any }) {
  const content = data.content ?? {};
  const profile = content.profile ?? {};
  const skills: string[] = content.skills ?? [];
  const projects = content.projects ?? [];
  const experience = content.experience ?? [];
  const education = content.education ?? [];

  return (
    <Document title={data.title || "Portfolio PDF"}>
      <Page size="A4" style={pdfStyles.page}>
        {/* Header */}
        <View style={pdfStyles.header}>
          <Text style={pdfStyles.name}>{data.title}</Text>
          {profile.bio && <Text style={pdfStyles.bio}>{profile.bio}</Text>}
        </View>

        {/* Skills */}
        {skills.length > 0 && (
          <View style={pdfStyles.section}>
            <Text style={pdfStyles.sectionTitle}>Skills & Expertise</Text>
            <View style={pdfStyles.skillsContainer}>
              {skills.map((skill: string, index: number) => (
                <Text key={index} style={pdfStyles.skillBadge}>
                  {skill}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <View style={pdfStyles.section}>
            <Text style={pdfStyles.sectionTitle}>Work Experience</Text>
            {experience.map((item: any, index: number) => (
              <View key={index} style={pdfStyles.itemGroup}>
                <View style={pdfStyles.itemHeader}>
                  <Text style={pdfStyles.itemTitle}>{item.role || "Role"}</Text>
                  <Text style={pdfStyles.itemSub}>
                    {item.company} {item.duration ? `| ${item.duration}` : ""}
                  </Text>
                </View>
                {item.description && (
                  <Text style={pdfStyles.itemDesc}>{item.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <View style={pdfStyles.section}>
            <Text style={pdfStyles.sectionTitle}>Key Projects</Text>
            {projects.map((project: any, index: number) => (
              <View key={index} style={pdfStyles.itemGroup}>
                <Text style={pdfStyles.itemTitle}>{project.title}</Text>
                {project.description && (
                  <Text style={pdfStyles.itemDesc}>{project.description}</Text>
                )}
                {project.link && (
                  <Text style={[pdfStyles.itemSub, { marginTop: 2, color: "#2563eb" }]}>
                    {project.link}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {education.length > 0 && (
          <View style={pdfStyles.section}>
            <Text style={pdfStyles.sectionTitle}>Education</Text>
            {education.map((item: any, index: number) => (
              <View key={index} style={pdfStyles.itemGroup}>
                <View style={pdfStyles.itemHeader}>
                  <Text style={pdfStyles.itemTitle}>{item.school}</Text>
                  <Text style={pdfStyles.itemSub}>
                    {item.degree} {item.year ? `(${item.year})` : ""}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Footer */}
        <Text style={pdfStyles.footer}>
          Generated with Portfolio Generator
        </Text>
      </Page>
    </Document>
  );
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("portfolios")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: "Portfolio not found" },
        { status: 404 }
      );
    }

    const stream = await renderToStream(
      React.createElement(PortfolioPdfDocument, { data }) as any
    );

    const chunks: Uint8Array[] = [];
    for await (const chunk of stream) {
      chunks.push(chunk as Uint8Array);
    }
    const pdfBuffer = Buffer.concat(chunks);

    const safeTitle = (data.title || "portfolio")
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-");

    return new Response(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${safeTitle}-portfolio.pdf"`,
      },
    });
  } catch (error: any) {
    console.error("PDF GENERATION ERROR:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate PDF" },
      { status: 500 }
    );
  }
}

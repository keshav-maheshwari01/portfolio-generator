import { NextResponse } from "next/server";
import { generateGeminiContent } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, text, title, role, company, existingSkills } = body;

    let prompt = "";

    if (action === "enhance-bio") {
      prompt = `
You are an expert executive resume writer and career strategist.
Rewrite the following user bio/about statement into a compelling, polished, professional 2-3 paragraph portfolio bio summary.
Focus on achievements, skills, and key value proposition while keeping an inviting tone.
Do not use markdown wrappers, quotes, or markdown backticks in the response. Return raw text only.

Original text:
${text}
`;
    } else if (action === "enhance-project") {
      prompt = `
You are an expert portfolio editor.
Enhance the following project description for a professional portfolio.
Project Title: ${title || "Untitled Project"}
Rough Details / Notes:
${text}

Instructions:
Write a clear, impactful 2-4 sentence project overview highlighting key features, technologies used, and measurable results or outcomes where possible.
Return raw text only without markdown formatting, backticks, or extra commentary.
`;
    } else if (action === "enhance-experience") {
      prompt = `
You are a career consultant.
Enhance the description for this work experience item:
Role: ${role || "Role"} at ${company || "Company"}
Notes / Description:
${text}

Instructions:
Rewrite into 2-3 professional bullet points (using standard bullet character •) focusing on active verbs, responsibilities, and key achievements.
Return raw text only.
`;
    } else if (action === "suggest-skills") {
      prompt = `
You are a technical career coach.
Analyze the following portfolio context and suggest a list of 6 to 12 relevant technical and professional skills as a clean JSON array of strings.
Context:
Bio: ${text || ""}
Existing Skills: ${(existingSkills || []).join(", ")}

IMPORTANT RULES:
- Return ONLY valid JSON format: ["Skill 1", "Skill 2", "Skill 3"]
- Do NOT use markdown code blocks or backticks.
- Return raw JSON array only.
`;
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    const outputRaw = await generateGeminiContent(prompt);
    let outputText = outputRaw.trim();

    if (action === "suggest-skills") {
      outputText = outputText
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
      const start = outputText.indexOf("[");
      const end = outputText.lastIndexOf("]");
      if (start !== -1 && end !== -1) {
        outputText = outputText.substring(start, end + 1);
      }
      try {
        const skillsArray = JSON.parse(outputText);
        return NextResponse.json({ success: true, skills: skillsArray });
      } catch (err) {
        return NextResponse.json({ success: true, skills: [] });
      }
    }

    // Return enhanced text
    return NextResponse.json({
      success: true,
      enhancedText: outputText.replace(/^"|"$/g, ""),
    });
  } catch (error: any) {
    console.error("AI ENHANCE ERROR:", error);
    return NextResponse.json(
      { error: error.message || "AI enhancement failed" },
      { status: 500 }
    );
  }
}

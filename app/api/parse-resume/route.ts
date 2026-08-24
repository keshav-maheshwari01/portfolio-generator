import { NextResponse } from "next/server";
import { generateGeminiContent } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { resumeText, portfolioId } = body;

    if (!resumeText) {
      return NextResponse.json(
        { error: "No resume text provided" },
        { status: 400 }
      );
    }

    const prompt = `
You are a resume parser.
Extract structured portfolio information from the resume text provided below.

IMPORTANT RULES:
- Return ONLY valid JSON format.
- Do NOT include markdown blocks or backticks.
- Do NOT include extra conversational text before or after the JSON.

Use this exact JSON structure:
{
  "profile": {
    "bio": "A professional summary bio based on the resume."
  },
  "skills": ["Skill 1", "Skill 2"],
  "experience": [
    {
      "company": "Company Name",
      "role": "Job Title",
      "duration": "Date Range",
      "description": "Description of responsibilities and achievements"
    }
  ],
  "education": [
    {
      "school": "Institution Name",
      "degree": "Degree/Field of study",
      "year": "Graduation Year"
    }
  ],
  "projects": [
    {
      "title": "Project Name",
      "description": "Project summary",
      "link": ""
    }
  ]
}

Resume Text:
${resumeText}
`;

    let text = await generateGeminiContent(prompt);
    text = text.trim();

    // Clean JSON formatting
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");

    if (start === -1 || end === -1) {
      throw new Error("Gemini did not return valid JSON bounds");
    }

    text = text.substring(start, end + 1);

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (error) {
      console.error("JSON parse failed on response:", text);
      return NextResponse.json(
        { error: "Invalid JSON returned by AI model", raw: text },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      portfolioId,
      data: parsed,
    });
  } catch (error: any) {
    console.error("PARSE ERROR:", error);
    return NextResponse.json(
      { error: error.message || "Resume parsing failed" },
      { status: 500 }
    );
  }
}
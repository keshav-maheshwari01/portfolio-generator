import { NextResponse } from "next/server";
import OpenAI from "openai";


export async function GET(){
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ message: "OPENAI_API_KEY not configured" }, { status: 400 });
  }
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  console.log(
    process.env.OPENAI_API_KEY
    ? "API KEY FOUND"
    : "NO KEY"
  );


  const response =
    await openai.chat.completions.create({

      model:"gpt-4.1-mini",

      messages:[
        {
          role:"user",
          content:"Say hello"
        }
      ]

    });


  return NextResponse.json({
    message:
    response.choices[0].message.content
  });

}
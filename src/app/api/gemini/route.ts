import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { message: "Prompt is required" },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(
      process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""
    );
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text }, { status: 200 });
  } catch (error: unknown) {
    console.error("Error calling Gemini API:", error);

    if (error instanceof Error) {
      return NextResponse.json(
        { message: "Something went wrong", error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Something went wrong", error: "Unknown error" },
      { status: 500 }
    );
  }
}

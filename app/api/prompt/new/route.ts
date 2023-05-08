import { connectToDatabase } from "@config/database.config";
import Prompt from "@models/Prompt.model";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req:NextRequest) => {
  const { userId, prompt, tag } = await req.json();

  try {
    await connectToDatabase();
    const newPrompt = await Prompt.create({
      creator: userId,
      prompt,
      tag,
    });

    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), {status: 201})

  } catch (error) {
    console.log(error);
    return new Response("Failed to create a new prompt", {status: 500})
  }

  
}
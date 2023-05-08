import { connectToDatabase } from "@config/database.config"
import Prompt from "@models/Prompt.model";


export const GET = async () => {
  try {
    await connectToDatabase();

    const prompts = await Prompt.find({}).populate("creator");
    return new Response(JSON.stringify(prompts), {status: 200});

  } catch (error) {
    return new Response(JSON.stringify("Failed to fetch all prompts"), {status: 200});
  }
}
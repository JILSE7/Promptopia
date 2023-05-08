import { connectToDatabase } from "@config/database.config"
import Prompt from "@models/Prompt.model";

interface ParamsProps {
  params: {
    id: string;
  };
}

export const GET = async (req: Request, { params }: ParamsProps) => {
  try {
    const { id } = params;
console.log(params);
    await connectToDatabase();

    const data = await Prompt.find({ creater: id }).populate("creator");
  
    return new Response(JSON.stringify(data), {status: 200});

  } catch (error) {
    return new Response(JSON.stringify("Failed to fetch all prompts"), {status: 200});
  }
}
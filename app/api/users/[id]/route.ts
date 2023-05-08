import { connectToDatabase } from "@config/database.config";
import Prompt from "@models/Prompt.model";



interface ParamsProps {
  params: {
    id: string;
  };
}

export const GET = async (req: Request, { params }: ParamsProps) => {
  try {
    await connectToDatabase();
    const { id } = params;

    const data = await Prompt.findById(id)
      .populate("creater")
      .sort({ createdAt: -1 });

    if (!data) {
      return new Response(JSON.stringify({ message: "Prompt not found." }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (e: any) {
    return new Response(JSON.stringify({ message: "Something Broke!" }), {
      status: 500,
    });
  }
};

export const PATCH = async (req: Request, { params }: ParamsProps) => {
  try {
    const { id } = params;
    await connectToDatabase();
    const { prompt, tag } = await req.json();

    if (!prompt) {
      return new Response(JSON.stringify({ message: "Prompt required!" }), {
        status: 400,
      });
    }
    if (!tag) {
      return new Response(JSON.stringify({ message: "Tag required!" }), {
        status: 400,
      });
    }

    const newPrompt = await Prompt.findByIdAndUpdate(
      { _id: id },
      { prompt, tag }
    );
    return new Response(JSON.stringify(newPrompt), { status: 200 });
  } catch (e: any) {
    return new Response(JSON.stringify({ message: "Something Broke!" }), {
      status: 500,
    });
  }
};

export const DELETE = async (req: Request, { params }: ParamsProps) => {
  try {
    const { id } = params;
    await connectToDatabase();

    await Prompt.findByIdAndDelete(id);

    return new Response(JSON.stringify({ message: "Deleted!" }), {
      status: 200,
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ message: "Something Broke!" }), {
      status: 500,
    });
  }
};
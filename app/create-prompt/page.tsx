'use client'
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/forms/Form.component";


const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>();
  console.log({session});
  const submit = async(prompt: string, tags: string) => {
    if (prompt.trim().length === 0 || tags.trim().length === 0) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch("/api/prompt", {
        method: "POST",
        body: JSON.stringify({
          prompt: prompt,
          userId: session?.user?.id,
          tag: tags,
        }),
      });

      if (response.ok) {
        console.log("success");
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form isLoading={isLoading} type="Create" submit={submit} />
  )
}

export default CreatePrompt;
'use client'
import { FormEvent, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/forms/Form.component";
import Link from "next/link";
import { Metadata, ResolvingMetadata } from "next";

const Update = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });
  const promptId = useSearchParams().get("id")
  const userId = useSearchParams().get("userid");
  console.log({post});
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      if (response.status === 200) {
        // toast.success("Successfully updated!");
      }
      setTimeout(() => router.push("/"), 1500);
    } catch (e: any) {
      console.log(e.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  useEffect(() => {
    const getPrompts = async () => {
      try {
        setIsSubmitting(true);
        const res = await fetch(`/api/prompt/${promptId}`);
        const prompt = await res.json();
        setPost({ prompt: prompt.prompt, tag: prompt.tag });
      } catch (e: any) {
        throw new Error(e.message);
      } finally {
        setIsSubmitting(false);
      }
    };
    if (promptId) {
      getPrompts();
    }
  }, [promptId]);

  if (status === "authenticated" && session?.user?.id !== userId) {
    return (
      <div className=" !text-xl md:!text-2xl font-semibold orange_gradient  ">
        You are not the owner of this post.{" "}
        <Link href="/" className="!underline !text-base !text-slate-800">
          back to home
        </Link>
      </div>
    );
  }

  return (
    <Form
      type='Create'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={handleSubmit}
    />
  );
}

export default Update
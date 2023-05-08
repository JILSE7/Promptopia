"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FC, useState } from "react";



const PromptCard: FC<{ post: any, handleTagClick?: () => void, handleEdit?: (post: any) => void, handleDelete?: (prompt: any) => Promise<any> }> = ({ post, handleTagClick, handleDelete, handleEdit }) => {
  const [copied, setCopied] = useState('');

  const { data: session }: any = useSession();
  const pathname = usePathname();

  const handleCopy = (post: any) => {
    navigator.clipboard.writeText(post.prompt);
    setCopied(post.prompt)
    const id = setTimeout(() => {
      setCopied('')
      clearTimeout(id)
    }, 3000);
  }

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post.creator.image}
            alt="Profile Image"
            width={40}
            height={40}
            className="rounded-full object-container"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">{post.creator.username}</h3>
            <p>{post.creator.username}</p>
          </div>
        </div>

        <div className="copy_btn" onClick={() => { }}>
          <Image
            src={copied === post.prompt ? "/assets/icons/tick.svg" : "/assets/icons/copy.svg"}
            alt="Copy Image"
            width={12}
            height={12}
            onClick={() => handleCopy(post)}
          />
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick()}
        >
          #{post.tag}
      </p>

      {session?.user?.id === post?.creator._id && pathname === "/profile" ? (
        <div className="gap-4 pt-3 mt-5 border-t border-gray-100 flex-center">
          <button
            className="text-sm cursor-pointer font-inter green_gradient"
            onClick={() => handleEdit && handleEdit(post)}
          >
            Edit
          </button>
          <button
            className="text-sm cursor-pointer font-inter orange_gradient"
            onClick={() => handleDelete && handleDelete(post)}
          >
            Delete
          </button>
        </div>
      ) : null}
    </div>
  )
}

export default PromptCard
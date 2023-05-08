'use client'
import { Profile } from "@components";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const myPost = async () => {
  const response = await fetch('/api/prompt', {cache: "no-cache"});
  const data = await response.json();
}

const MyProfile = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [post, setPost] = useState([])
  
  const handleEdit = (post: any) => {
    console.log("EDITANDO", post);
    router.push(`/update-prompt?id=${post._id}`);

  }
  const handleDelete = async (prompt: any) => {
    try {
      const response = await fetch(`/api/prompt/${prompt._id}`, {
        method: "DELETE",
      });
      if (response.status === 200) {
        setPost((prev) => {
          return prev.filter(({ _id }) => _id !== prompt._id);
        });
      }
    } catch (e: any) {
      console.log(e.message);
    }
  };

  useEffect(() => {  
    const fetchPost = async () => {
      const response = await fetch(`/api/users/${session?.user?.id}/post`, {cache: "no-cache"});
      const data = await response.json();
      setPost(data);
    }

    fetchPost();
  }, [session?.user])

  return (
    <Profile 
      username="My"
      desc="Welcome to your personalized profile page"
      data={post}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default MyProfile;
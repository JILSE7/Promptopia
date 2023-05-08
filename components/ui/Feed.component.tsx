'use client';
import React, { FC, useEffect, useRef, useState } from 'react'
import PromptCard from '@components/cards/Prompt.component'

/* const getAllFeeds = async () => {
  const response = await fetch('/api/prompt');
  const data = await response.json();
  console.log({data});
  return data;
} */

const Feed = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  // const prompts = await getAllFeeds();
  const [post, setPost] = useState([])
  
  useEffect(() => {  
    const fetchPost = async () => {
      const response = await fetch('/api/prompt', {cache: "no-cache"});
      const data = await response.json();
      setPost(data);
    }

    fetchPost();
  }, [])
  
  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input 
          type="text"
          placeholder='Search for prompts'
          ref={searchRef}
          className='search_input peer'
        />
      </form>

      <PromptCardList data={post} handleTagClick={() => {}} />
    </section>
  )
}

export const PromptCardList: FC<{data: any[], handleTagClick?: () => void, handleEdit?: (post: any) => void, handleDelete?: (prompt: any) => Promise<any> }> = ({ data, handleTagClick, handleEdit, handleDelete }) => (
  <div className='mt-16 promp_layout'>
    {
      data.map((prompt: any) => (
        <PromptCard
          key={Date.now()}
          post={prompt}
          handleTagClick={handleTagClick}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          />
      ))
    }
  </div>
)

export default Feed;
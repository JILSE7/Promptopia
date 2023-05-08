import React, { FC } from 'react'
import { PromptCardList } from './Feed.component'

const Profile: FC<{username: string, desc: string, data: any[], handleEdit: (post: any) => void, handleDelete: (prompt: any) => Promise<void>}> = (
  {
    username,
    desc,
    data,
    handleEdit,
    handleDelete,
  }
) => {
  return (
    <section className='w-full'>
      <h1 className='head_text text-left'>{username} profile</h1>

      <p className='desc text-left'>{desc}</p>

      <PromptCardList handleEdit={handleEdit} handleDelete={handleDelete} data={data} handleTagClick={() => {}} />
    </section>
  )
}

export default Profile
import Link from "next/link"
import { FC } from "react"

interface IProps {
  type: string,
  submit: (prompt: string, tags: string) => void
  isLoading?: boolean
}

const Form: FC<IProps> = ({
  type,
  submit,
  isLoading,
}) => {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const s = Object.fromEntries(new FormData(e.target as HTMLFormElement));
    submit(s["new-promt"] as string, s["tag"] as string);
  }

  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text_center"><span className="blue_gradient">{type} Prompt</span></h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world. and let your imagination run wild with any AI-powered platform.
      </p>

      <form onSubmit={handleSubmit} action="" className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism">
        <label htmlFor="new-promt">
          <span className="font-satoshi font-semibold">
            Your IA promt
          </span>
          <textarea name="new-promt" id="" placeholder="Write your prompt here...." className="form_textarea"></textarea>
        </label>

        <label htmlFor="tag">
          <span className="font-satoshi font-semibold">
            Tag
            <span>(#product, #webdevelopment, #idea)</span>
          </span>
          <input name="tag" id="" placeholder="#tag" className="form_input"></input>
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500">Cancel</Link>
          <button type="submit" className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white">
            {isLoading ? "Loading..." : type}
          </button>
        </div>
      </form>
    </section>
  )
}

export default Form
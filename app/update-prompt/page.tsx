import { Metadata, ResolvingMetadata } from "next";
import Update from "@components/ui/Update";


type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
 
export async function generateMetadata(
  { params, searchParams }: Props,
  parent?: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const id = params.id;
 
  // fetch data
  // const product = await fetch(`https://.../${id}`).then((res) => res.json());
 
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent)!.openGraph?.images || [];
 
  return {
    title: "this is a example",
    openGraph: {
      images: ['https://www.udemy.com/staticx/udemy/images/v7/logo-udemy-inverted.svg', ...previousImages],
    },
  };
}

const UpdatePrompt  = () => {
  

  return (
    <Update />
  );
}

export default UpdatePrompt;
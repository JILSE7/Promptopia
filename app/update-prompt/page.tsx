import { Metadata, ResolvingMetadata } from "next";
import Update from "@components/ui/Update";


type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
 
export const metadata: Metadata = {
  title: 'Test',
  description: 'jsjjs',
};

const UpdatePrompt  = () => {
  

  return (
    <Update />
  );
}

export default UpdatePrompt;
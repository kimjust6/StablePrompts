import { IPrompt } from "@/utils/Interfaces";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }: { data: IPrompt[]; handleTagClick: (tag: string) => void }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data?.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

export default PromptCardList;

import PromptCard from "./PromptCard";

const Posts = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full ">
      <h1 className="head_text text-left">
        <span className="purple_gradient">{name} Prompts</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      <div className="mt-10 prompt_layout">
        {data?.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleDelete={() => {
              handleDelete && handleDelete(post);
            }}
            handleEdit={() => {
              handleEdit && handleEdit(post);
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Posts;

"use client";
import { useEffect, useState } from "react";
// import axios from "axios";
import { getAllPrompts } from "@/utils/actions";
import Loading from "./Loading";
import PromptCard from "./PromptCard";
import { Input } from "./ui/input";

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState(null);
  const [allPosts, setAllPosts] = useState(null);

  const apiMethod = async function (uri, callback) {
    // Call your api here (or whatever thing you want to do) and assign to result.
    try {
      const result = await fetch("/api/prompt/allprompts/nice", {
        cache: "no-store",
      });
      const responsePosts = await result.json();

      setAllPosts(responsePosts);
      setPosts(responsePosts);
      callback(null, responsePosts);
    } catch (error) {
      callback(error);
    }
  };

  const searchOnChange = (e) => {
    const text = (e?.target?.value ?? e).toLowerCase();
    setSearchText(text);
    // show all posts if there is no text
    if (text === "") {
      setPosts(allPosts);
    } else {
      // check if post includes substring
      const filteredPosts = allPosts.filter(
        (p) =>
          p.prompt.toLowerCase().includes(text) ||
          p.tag.toLowerCase().includes(text) ||
          p.creator.email.toLowerCase().includes(text) ||
          p.creator.fName.toLowerCase().includes(text) ||
          p.creator.lName.toLowerCase().includes(text)
      );

      setPosts(filteredPosts);
    }
  };

  // on first load, get all the posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getAllPrompts();
        const responsePosts = JSON.parse(response);
        setAllPosts(responsePosts);
        setPosts(responsePosts);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form
        className="relative w-full flex items-center justify-center"
        onSubmit={(e) => {
          e.preventDefault();
        }}>
        <Input
          type="text"
          placeholder="Search for a tag or prompt"
          value={searchText}
          onChange={searchOnChange}
          required
          className="search_input peer"
        />
      </form>
      {/* {posts === null ? (
        <Loading />
      ) : (
        <PromptCardList data={posts} handleTagClick={searchOnChange} />
      )} */}

      {posts === null ? (
        <Loading />
      ) : (
        <div className="mt-10 prompt_layout">
          {posts?.map((post) => (
            <PromptCard
              key={post._id}
              post={post}
              handleDelete={() => {
                console.log("nice");
              }}
              handleEdit={() => {
                console.log("nice2");
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Feed;

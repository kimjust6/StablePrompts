"use client";
import { useState, useEffect } from "react";

import PromptCardList from "./PromptCardList";
import Loading from "./Loading";
import { Input } from "./ui/input";

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState(null);
  const [allPosts, setAllPosts] = useState(null);

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
        const response = await fetch("/api/prompt");
        const responsePosts = await response.json();
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
          className="search_input peer"></Input>
      </form>
      {posts === null ? (
        <Loading></Loading>
      ) : (
        <PromptCardList
          data={posts}
          handleTagClick={searchOnChange}></PromptCardList>
      )}
    </section>
  );
};

export default Feed;

"use client";
import { useState, useEffect } from "react";

import PromptCardList from "./PromptCardList";

const Feed = () => {
    const [searchText, setSearchText] = useState("");
    const [posts, setPosts] = useState([]);
    const [allPosts, setAllPosts] = useState([]);
    const searchOnChange = (e) => {
        const text = (e?.target?.value ?? e).toLowerCase();
        setSearchText(text);

        // show all posts if there is no text
        if (text === "") {
            setPosts(allPosts);
        } else {
            // check if post includeds substring
            const filteredPosts = allPosts.filter(
                (p) =>
                    p.prompt.toLowerCase().includes(text) ||
                    p.tag.toLowerCase().includes(text) 
            );

            setPosts(filteredPosts);
        }
    };

    // on first load, get all the posts
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch("/api/prompt");
            const responsePosts = await response.json();
            setPosts(responsePosts);
            setAllPosts(responsePosts);
        };

        fetchPosts();
    }, []);

    return (
        <section className="feed">
            <form className="relative w-full flex-center">
                <input
                    type="text"
                    placeholder="Search for a tag or email"
                    value={searchText}
                    onChange={searchOnChange}
                    required
                    className="search_input peer"
                ></input>
            </form>
            <PromptCardList
                data={posts}
                handleTagClick={searchOnChange}
            ></PromptCardList>
        </section>
    );
};

export default Feed;

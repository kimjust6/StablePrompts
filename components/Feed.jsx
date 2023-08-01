"use client";
import { useState, useEffect } from "react";

import PromptCardList from "./PromptCardList";

const Feed = () => {
    const [searchText, setSearchText] = useState("");
    const [posts, setPosts] = useState([]);
    const searchOnChange = (e) => {
        setSearchText(e.target.value);
    };

    // on first load, get all the posts
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch("/api/prompt");
            const responsePosts = await response.json();
            setPosts(responsePosts);
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
                handleTagClick={() => {}}
            ></PromptCardList>
        </section>
    );
};

export default Feed;

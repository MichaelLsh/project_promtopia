'use client';

import { useState, useEffect } from "react"

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard 
          key={prompt._id} 
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  // Search States
  const [searchText, setSearchText] = useState('')
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  
  const [posts, setPosts] = useState([]); // create a state to store the posts

  useEffect(() => {
    const fetchPosts = async () => { 
      const response = await fetch('/api/prompt'); // fetch the data from the API
      const data = await response.json(); // get the data from the response

      setPosts(data); // set the data to the state
    }
    
    console.log(posts);

    fetchPosts(); // call the fetchPosts function
  }, []);

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce the search method
    setSearchTimeout(
      setTimeout(() => {
        const searchResults = filterPrompts(e.target.value);
        setSearchResults(searchResults);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);
    const searchResults = filterPrompts(tagName);
    setSearchResults(searchResults);
  }

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input 
          type="text" 
          placeholder="Search for a tag or a username" 
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {/* All Prompts */}
      {searchText ? (
        <PromptCardList 
        data={searchResults}
        handleTagClick={handleTagClick}
      />
      ) : (
        <PromptCardList 
        data={posts}
        handleTagClick={handleTagClick}
      />
      )}
    </section>
  )
}

export default Feed;
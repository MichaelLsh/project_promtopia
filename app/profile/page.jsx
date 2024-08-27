'use client';

import { useState, useEffect } from "react";
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from "next/navigation";

import Profile from "@components/profile";

const MyProfile = () => {
  const router = useRouter(); // get the router object
    const { data: session } = useSession(); // get the session data

    const [posts, setPosts] = useState([]); // create a state to store the posts

    useEffect(() => {
        const fetchPosts = async () => { 
          const response = await fetch(`/api/users/${session?.user.id}/posts`); // fetch the current user's prompt posts from the API
          const data = await response.json(); // get the data from the response
    
          setPosts(data); // set the data to the state
        }
    
        if(session?.user.id) fetchPosts(); // call the fetchPosts function
      }, []);

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`); // redirect the user to the update prompt page
    }

    const handleDelete = async (post) => {
      const hasConfirmed = confirm(
        "Are you sure you want to delete this prompt?"
      );
  
      if (hasConfirmed) {
        try {
          await fetch(`/api/prompt/${post._id.toString()}`, {
            method: "DELETE",
          });
  
          const filteredPosts = posts.filter((item) => item._id !== post._id);
  
          setPosts(filteredPosts);
        } catch (error) {
          console.log(error);
        }
      }
    };

  return (
    <Profile 
        name="My"
        desc="Welcome to your personlized profile page!"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
  )
}

export default MyProfile;
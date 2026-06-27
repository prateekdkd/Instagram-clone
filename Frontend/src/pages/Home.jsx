
import React, { useState } from 'react'
import { useContext,useEffect } from 'react'
import { AuthContext } from '../context/Authcontext'
import Navbar from '../components/Navbar';
import CreatePost from '../components/Createpost';
import Postcard from '../components/Postcard';
import API from "../api/axios"
import Profile from './Profile';
export default function Home() {

  const [posts, setPosts] = useState([]);

  const getPosts = async ()=>{

    try{
      const {data} = await API.get("/posts/feed");

      setPosts(data)
    }
    catch(err)
    {
      console.log(err);
      console.log(err.response?.data);
    }
  }
  useEffect(()=>{
    getPosts();
  },[])

  const {user} = useContext(AuthContext);
  return (
    <>
    {/* <div>Wlcome,{user.username}</div> */}

    <div className="home">

       <Navbar /> 

      <CreatePost getPosts={getPosts} />

      <div className="posts-container">

        {posts.length > 0 ? (
          posts.map((post) => (
            <Postcard
              key={post._id}
              post={post}
              getPosts={getPosts}
            />
          ))
        ) : (
          <h3>No Posts Found</h3>
        )}

      </div>

    </div>
    </>

  )
}

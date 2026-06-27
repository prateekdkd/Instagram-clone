import React, { useState , useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import Commentsection from './Commentsection';
import { AuthContext } from '../context/Authcontext';
import { toast } from 'react-toastify';

export default function Postcard({post, getPosts}) {

  const [showComments, setShowComments] = useState(false);
  const { user, setUser } = useContext(AuthContext);

    const navigate = useNavigate();

    const deletePost = async ()=>{
      try{

        await API.delete(`/posts/${post._id}`)

        toast.success("Post Deleted",{style:{width:"200px"}})
        getPosts();
      }
      catch(err)
      {
         console.log(err);
      }
    }
    const likeUser = ()=>{

      try{const {data} = API.put(`/posts/like/${post._id}`)

      getPosts();
    }
    catch(err)
    {
      console.log(err);
    }
    }
    const unLikeUser = ()=>{
      try{
      const {data} = API.put(`/posts/unlike/${post._id}`)

      getPosts();
      }
      catch(err)
      {
        console.log(err);
      }
    }
    const isLiked = post.likes.includes(user?._id);
    const isuser = post.user?.username == user.username
 return (
    <div className="post-card">

      <div className="post-header" onClick={()=>navigate(`/profile/${post.user?._id}`)}>
        <img src={post.user?.profilePic}/>
        <h3> {post.user?.username}</h3>
        
      </div>

      <p className="post-content">
        {post.content}
      </p>

      {post.image && (
        <img
          src={post.image}
          alt="post"
          className="post-image"
        />
      )}

      <div className="post-actions">

        <button onClick={ isLiked ? unLikeUser : likeUser}>
           {isLiked ? "❤️" : "♡"} {post.likes?.length}
        </button>

        <button onClick={()=>{setShowComments(!showComments)}}>
          🗪 {post.comments.length}
        </button>

        <button onClick={deletePost}>
         {isuser ?  "🗑️ Delete" : "." }
        </button >

      </div>
      {showComments&&(
         <Commentsection
       postId={post._id}
      comments={post.comments}
      getPosts={getPosts}
  />
      )}
    </div>
  
  );
};



import React, { useActionState, useState } from 'react'
import API from '../api/axios';
import CommentItem from './Commentitem';
export default function Commentsection({postId, comments , getPosts}) {

    const [text, setText] = useState("");

    const addComment = async (e)=>{
        e.preventDefault();

        try{
        await API.post(`comments/${postId}`,{text})

        setText("");

        getPosts();
        }
        catch(err)
        {
            console.log(err);
        }
    }
  
  return (
    <div className='comment-section'>

      <form onSubmit={addComment}>
        <input
          type="text"
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button type="submit">
          Post
        </button>
      </form>

      <div>
        {comments?.map((comment) => (
          <CommentItem
            key={comment._id}
            comment={comment}
          />
        ))}
      </div>

    </div>
  );
};
  


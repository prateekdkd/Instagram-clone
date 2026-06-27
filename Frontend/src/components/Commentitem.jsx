import React from 'react'
import { useNavigate } from 'react-router-dom';
const CommentItem = ({ comment }) => {

  const navigate = useNavigate();

    if(!comment) return null;


  return (
    <div className="comment-item" onClick={()=>navigate(`/profile/${comment.user?._id}`)}>
      <strong>{comment.user?.username}</strong>
      <p>{comment.text}</p>
    </div>
  );
};

export default CommentItem;


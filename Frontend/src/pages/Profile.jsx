import React, { use, useEffect, useState ,useContext} from "react";
import { useParams , useLocation, useNavigate} from "react-router-dom";
import API from "../api/axios";
import { AuthContext } from "../context/Authcontext";

export default function Profile({post}) {
 
  const [profileUser, setProfileUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const {id} = useParams();
  const navigate = useNavigate();
 
    const { user, setUser } = useContext(AuthContext);

  const getUser = async ()=>{
   
    const {data} =  await API.get(`/users/${id}`);

    setProfileUser(data);

  }
  const getUserPost = async ()=>{
   try{
    const {data} = await API.get(`posts/user/${id}`);

    setPosts(data);
   }
   catch(err)
   {
    console.log(err);
   }
  }
  useEffect(()=>{
    if(id){getUser();
    getUserPost();}
  },[id])

  const followUser = async ()=>{
    try{
      await API.put(`/users/follow/${profileUser._id}`)

      getUser();
    }
    catch(err)
    {
      console.log(err);
    }
  }
  const unfollowUser = async()=>{
    try{
      await API.put(`/users/unfollow/${profileUser._id}`)

      getUser();
    }
    catch(err)
    {
      console.log(err);
    }
  }
  const isFollowing =
    profileUser?.followers?.includes(user?._id);
  return (
    <div className="profile">

  <div className="profile-header">

    <div className="profile-left">
      <img
        src={profileUser?.profilePic}
        alt=""
        className="profile-pic"
      />
    </div>

    <div className="profile-right">

      <div className="profile-top">
        <h2>{profileUser?.username}</h2>

      </div>

      <div className="profile-stats">
        <span><b>{posts.length}</b> posts</span>
        <span><b>{profileUser?.followers?.length}</b> followers</span>
        <span><b>{profileUser?.following?.length}</b> following</span>
      </div>

      <div className="profile-bio">
        <p>{profileUser?.bio}</p>
      </div>

    </div>

  </div>

    <button className="edit-btn" onClick={   
      user?._id === profileUser?._id
      ? () => navigate("/Editprofile")
      : isFollowing ? unfollowUser : followUser
      }>
          {user?._id === profileUser?._id
         ? "Edit Profile" 
         : isFollowing ? "Unfollow" : "Follow"}
        </button>

  <hr />

  <div className="profile-posts">

    {posts.map((post) => (
      <img
        key={post._id}
        src={post.image}
        alt=""
        className="profile-post"
      />
    ))}

  </div>

</div>
  );
}

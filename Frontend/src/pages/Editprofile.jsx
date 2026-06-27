import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/Authcontext'
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
export default function Editprofile() {
  const {user,setUser} = useContext(AuthContext);

  const [username, setUsername] = useState(user.username  || "")
  const [bio, setBio] = useState(user.bio || "")
  const [profilepic, setProfilepic] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
      const formData = new FormData();

      formData.append("username", username);
      formData.append("bio", bio);

      if(profilepic)
      {
        formData.append("profilepic", profilepic);

      }
      const {data} = await API.put("/users/profile", formData)

      localStorage.setItem("user",JSON.stringify(data));

      setUser(data)
      toast.success(" Save Changed Successful",{style:{width:"200px"}})
      navigate(`/profile/${data?._id}`)

    }
    catch(err)
    {
      console.log(err);
        console.log(err.response?.data);
    }
  }
  return (
    <div className="edit-profile-container">
  <div className="edit-profile-card">
    <h2>Edit Profile</h2>

    <div className="profile-image-section">
      <img
        src = {user?.profilePic}
        alt="Profile"
        className="profile-preview"
      />

      <input type="file" onChange={(e)=> setProfilepic(e.target.files[0])} id='ppb' hidden/>
      <label htmlFor="ppb" className='epb'>Edit profile pic</label>
    </div>

    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Username</label>
        <input
          type="text"
          placeholder="Enter username"
         value={username}
         onChange={(e)=>setUsername(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Bio</label>
        <textarea
          rows="4"
          placeholder="Write something about yourself..."
          value={bio}
          onChange={(e)=>setBio(e.target.value)}
        />
      </div>

      <button type="submit" className="save-btn">
        Save Changes
      </button>
    </form>
  </div>
</div>
  )
}

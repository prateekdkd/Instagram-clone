import React, { useState } from 'react'
import API from "../api/axios"
import { toast } from 'react-toastify'
export default function Createpost({getPosts}) {


  const [formData, setFromData] = useState({
    content:"",
    image: null,
  })

  const handleChange = (e)=>{
    
    if(e.target.name === "image")
    {
      setFromData({
        ...formData,
        image: e.target.files[0],
      })
    }
    else
    {
      setFromData({
        ...formData,
        [e.target.name]:e.target.value,
      })
    }
    
  }

  const handleSubmit = async (e)=>{
      e.preventDefault();

      const data = new FormData();

      data.append("content", formData.content)
      data.append("image",formData.image);
    try{
      await API.post("/posts/",data)

      setFromData({
        content:"",
        image:null,
      })
      toast.success("Post Created",{style:{width:"200px"}})
      getPosts();
  
    }
    catch(err)
    {
      console.log(err);
       console.log(err.response?.data);
    }
  }

  return (
    <>
    <div className="create-post">
      <h3 className='crtp'>Create Post</h3>
      <form  onSubmit={handleSubmit}>

        <textarea
          name="content"
          placeholder="What's on your mind?"
          value={formData.content}
          onChange={handleChange}
        />

        <input
          type="file"
          name="image"
          placeholder="Image URL (optional)"
          id="actual-btn"
          hidden
        onChange={handleChange}
        />
        <label htmlFor="actual-btn" className="custom-file-button">
    Choose File
     </label>

        <button type="submit">
          Post
        </button>

      </form>
    </div>
    </>
  )
}

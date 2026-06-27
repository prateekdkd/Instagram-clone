import React, { useState } from 'react'
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';
export default function Search() {

  const [query, setQuery] = useState("")
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const searchUsers = async ()=>{
    try{
    const {data} = await API.get(`/users/search?keyword=${query}`)

    setUsers(data);
    }
    catch(err)
    {
      console.log(err);
    }

  }

  return (
   <div className="search-page">

    <div className="search-box">
        <input
            type="text"
            placeholder="Search users..."
            value={query}
            onChange={(e)=>setQuery(e.target.value)}
        />

        <button onClick={searchUsers}>
            Search..
        </button>
    </div>

    <div className="search-results">

        {users.length > 0 ? (
            users.map((user)=>(

                 <div
                    key={user._id}
                    className="user-card"
                    onClick={()=>navigate(`/profile/${user._id}`)}
                >
                    <img
                        src={user.profilePic}
                        alt=""
                    />

                    <div className="user-info">
                        <h4>{user.username}</h4>
                    </div>

                    <button className='searchfollowbtn'>Follow</button>
                </div>
            ))
        ) : (
            <p className="no-user">
                Search users...
            </p>
        )}

    </div>

</div>
  )
}

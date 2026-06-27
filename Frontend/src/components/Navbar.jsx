
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Authcontext";
import { toast } from "react-toastify";


const Navbar = () => {
  const [open, setOpen] = useState(false);

  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    toast.success("Logout Successful")
    navigate("/login");

  


  };

  return (
    <nav className="navbar">
      <h2 className="logo">INISTAGRAM</h2>

      {/* Desktop Menu */}
      <div className="desktop-menu">
        <Link to="/">Home</Link>
        <Link to="/search">Search</Link>
        <Link to={`/profile/${user._id}`}>Profile</Link>

        <button onClick={logoutHandler}>
          Logout
        </button>
      </div>
       <Link to="/search" className="searchicon">🔍︎</Link>
      {/* Mobile Hamburger */}
      <div
        className="menu-icon"
        onClick={() => setOpen(!open)}
      >
        ☰
      </div>


      {/* Mobile Menu */}
      <div className={`mobile-menu ${open ? "active" : ""}`}>
        <div className="cross" onClick={()=>setOpen(!open)}>✗</div>
        <Link to="/" onClick={() => setOpen(false)}>
          Home
        </Link>

        <Link to="/search" onClick={() => setOpen(false)}>
          Search
        </Link>

        <Link
          to={`/profile/${user._id}`}
          onClick={() => setOpen(false)}
        >
          Profile
        </Link>

        <button onClick={logoutHandler}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
import { useContext,useState } from "react";
import { data, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Authcontext";
import API from "../api/axios";
import { toast } from "react-toastify";

const Register = () => {

  const {setUser} = useContext(AuthContext);
  const nevigate = useNavigate()
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const {data} = await API.post("/auth/register",formData);

      localStorage.setItem("token",data.user);
      setUser(data)
      toast.success("Register Successful",{style:{width:"200px"}})
      nevigate("/login")
    }
    catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>INISTAGRAM</h1>
        <p>Create your account 🚀</p>

        <input
          type="text"
          name="username"
          placeholder="Enter Username"
          value={formData.username}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit">Register</button>

        <span className="auth-link">
          Already have an account?
          <Link to="/login"> Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
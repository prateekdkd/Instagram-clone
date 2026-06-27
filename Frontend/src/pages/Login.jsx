import { useContext,useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/Authcontext";
import API from "../api/axios"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {

  const {setUser} = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit =  async (e) => {
    e.preventDefault();
    try{
      const {data} = await API.post("/auth/login",formData);

      localStorage.setItem("token", data.token)
      localStorage.setItem("user",JSON.stringify(data.user));

      setUser(data.user);
      toast.success("Login Successful",{style:{width:"200px"}})
      navigate("/")
    }
    catch(err)
    {
      console.log(err);
      toast.error("Login failed")
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>INISTAGRAM</h1>
        <p>Welcome Back 👋</p>

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

        <button type="submit">Login</button>

        <span className="auth-link">
          Don't have an account?
          <Link to="/register"> Register</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
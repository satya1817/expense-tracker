import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./login.css";
function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post(
        "/auth/login",
        formData
      );

      localStorage.setItem(
  "token",
  res.data.token
);

navigate("/intro");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

 return (
  <div className="login-container">
    <div className="login-card">
      <h1 className="login-title">
        STARK FINANCE
      </h1>

      <p className="login-subtitle">
        JARVIS Authentication Portal
      </p>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          ACCESS SYSTEM
        </button>
      </form>

      <p>
        New User?{" "}
        <span
          className="register-link"
          onClick={() =>
            navigate("/register")
          }
        >
          Create Account
        </span>
      </p>
    </div>
  </div>
);
}

export default Login;
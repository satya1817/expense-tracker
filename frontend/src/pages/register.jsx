import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./register.css";
import "./login.css";
function Register() {
  const [formData, setFormData] = useState({
    name: "",
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
    await API.post(
      "/auth/register",
      formData
    );

    navigate("/register-success");
  } catch (error) {
    console.log(error);
  }
};

  return (
  <div className="register-container">
    <div className="login-card">
      <h1 className="login-title">
        STARK FINANCE
      </h1>

      <p className="login-subtitle">
        Initialize New User Access
      </p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />

        <br /><br />

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
          CREATE ACCOUNT
        </button>
      </form>

      <p>
        Already Registered?{" "}
        <span
          className="register-link"
          onClick={() => navigate("/")}
        >
          Login
        </span>
      </p>
    </div>
  </div>
);
}

export default Register;
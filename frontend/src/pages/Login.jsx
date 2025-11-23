import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { MdEmail } from "react-icons/md";
import { IoMdLock } from "react-icons/io";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      toast.success("Login successful!");
      navigate("/employees");
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.error || "Invalid credentials");
    }
  };

  return (
    <div className="bg-container">
      <div className="main-container">
        <img
          src="https://res.cloudinary.com/destro001/image/upload/v1763819442/HRMS/register_banner_oakixb.png"
          className="side-image"
        />

        <div class="separator"></div>

        <div className="signup-container">
          <img src="https://res.cloudinary.com/destro001/image/upload/v1763886799/HRMS/logo_uzgxo3.png" />

          <div className="input-container">
            <MdEmail className="icon" />
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-container">
            <IoMdLock className="icon" />
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="register-button" onClick={handleLogin}>
            Login
          </button>

          <p className="have-account">
            Don’t have an account?{" "}
            <span onClick={() => navigate("/register")}>Sign up</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;

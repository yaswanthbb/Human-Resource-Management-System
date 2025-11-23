import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { FaUser } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { IoMdLock } from "react-icons/io";
import { toast } from "react-toastify";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await api.post("/auth/register", { name, email, password });
      toast.success("Account created successfully!");
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.error || "Registration failed");
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
          <img src="https://res.cloudinary.com/destro001/image/upload/v1763886799/HRMS/logo_uzgxo3.png"/>
          <div className="input-container">
            <FaUser className="icon" />
            <input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
          <button className="register-button" onClick={handleRegister}>
            Register
          </button>
          <p className="have-account">
            Already have an account?{" "}
            <span onClick={() => navigate("/")}>Log in</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;

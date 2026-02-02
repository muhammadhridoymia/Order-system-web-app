import React, { useState } from "react";
import "../AuthComponent/Auth.css";

function Register({ close,setUser }) {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    if (!phone || !password || !confirmPassword) {
      alert("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const userData = { phone };

    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  return (
    <div className="login-overlay">
      <div className="login-popup">
        <h2>Register</h2>

        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button onClick={handleRegister}>Register</button>
        <p onClick={()=>close(false)}>Back</p>
      </div>
    </div>
  );
}

export default Register;

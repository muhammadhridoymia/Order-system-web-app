import React, { useState } from "react";
import "../AuthComponent/Auth.css";
import Register from "./Register";

function Login({ setUser }) {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [show, setshow] = useState(false);
  const url = process.env.REACT_APP_API;

  const handleLogin = async () => {
    if (phone && password) {
      try {
        const res = await fetch(`${url}/api/login/user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ phone, password }),
        });
        const data = await res.json();
        if (data.success) {
          localStorage.setItem("user", JSON.stringify(data.user));
          setUser(data.user);
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      alert("Enter phone and password");
    }
  };

  return (
    <div className="login-overlay">
      <div className="login-popup">
        <h2>Login</h2>

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

        <button onClick={handleLogin}>Login</button>
        <p onClick={() => setshow(true)}>Register</p>
      </div>
      {show ? <Register close={setshow} setUser={setUser} /> : ""}
    </div>
  );
}

export default Login;

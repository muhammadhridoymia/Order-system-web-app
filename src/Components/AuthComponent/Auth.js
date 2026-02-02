import React, { useState } from "react";
import "../AuthComponent/Auth.css";
import Register from "./Register";

function Login({ setUser }) {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [show ,setshow]=useState(false)

  const handleLogin = () => {
    if (phone && password) {
      const userData = { phone };
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
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
        <p onClick={()=> setshow(true)}>Register</p>
      </div>
      {show?<Register close={setshow} setUser={setUser}/>:""}
    </div>
  );
}

export default Login;

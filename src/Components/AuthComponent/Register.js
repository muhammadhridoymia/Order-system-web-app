import React, { useState } from "react";
import "../AuthComponent/Auth.css";

function Register({ close, setUser }) {
  const [name, setname] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleRegisters = async () => {
    if (!name || !phone || !password || !image) {
      alert("All fields required");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("img", image);

    const res = await fetch("http://localhost:5000/api/add/user", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (data.success) {
      console.log(data);

      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
    }
  };

  return (
    <div className="login-overlay">
      <div className="login-popup">
        <h2>Register</h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setname(e.target.value)}
        />

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

        <input type="file" accept="image/*" onChange={handleImageChange} />

        {preview && (
          <img
            src={preview}
            alt="preview"
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              objectFit: "cover",
              marginTop: "10px",
            }}
          />
        )}

        <button onClick={handleRegisters}>Register</button>
        <p onClick={() => close(false)}>Back</p>
      </div>
    </div>
  );
}

export default Register;

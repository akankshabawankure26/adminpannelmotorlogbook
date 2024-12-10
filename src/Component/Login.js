
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../asset/logo.jpg";
import './login.css'

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Username:", userName);
    console.log("Password:", password);

    try {
      const data = new FormData();
      data.append("userName", userName);
      data.append("password", password);
      //"http://localhost/backend_motorbooklog_admin/login.php",
      //http://adminmvnpl.saturnxdigital.com/backend_motorbooklog_admin/login.php
      // Change to your API endpoint
      const response = await fetch(
        "http://adminmvnpl.saturnxdigital.com/backend_motorbooklog_admin/login.php",
        {
          method: "POST",
          body: data,
        }
      );

      const result = await response.json();
      console.log(result);

      if (result.status === "success") {
        // Navigate based on the user role
        if (userName === "Admin@co") {
          nav("/logbook");
        } else {
          nav("/");
        }
      } else {
        alert("Login failed: " + result.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred while trying to log in. Please try again later.");
    }
  };

  return (
    <section
      className="gradient-form" >
      <div>
        <div className="text-center mb-4">
          <img
            src={logo}
            alt="Logo"
            className="img-fluid"
          />
          <h4 className="mt-3 mb-0">Welcome Admin!</h4>
        </div>

        <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
          <p className="text-muted mb-4">Please login to your account</p>

          {/* Username Field */}
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="username" >
              Username :
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your userName"
              className="form-control"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            
            />
          </div>

          {/* Password Field */}
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="password">
              Password :
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Login Button */}
          <div className="text-center">
            <button
              className="btn btn-primary btn-block"
              type="submit"
              style={{
                width: "80%",
                backgroundColor: "#007BFF",
                color: "#fff",
                fontWeight: "bold",
                borderRadius: "5px",
                padding: "10px 20px",
              }}
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Login;


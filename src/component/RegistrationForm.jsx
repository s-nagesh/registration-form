import { useState } from "react";
import "./RegistrationForm.css";

function RegistrationForm() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  let validationForm = () => {
    const errors = {};
    console.log("username", username);

    if (!username) {
      errors.username = "Username is required";
    }
    if (!email) {
      errors.email = "Email is required";
    }
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 4) {
      errors.password = "Password must be at least 4 characters";
    }
    console.log("errors", errors);

    setErrors(errors);
    setSuccessMessage("")
    return Object.keys(errors).length === 0;
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    if (validationForm()) {
      setSuccessMessage("");
      setErrors({});
      simulateApiCall()
        .then(() => {
          setSuccessMessage("Registration successful!");
          setUserName("");
          setEmail("");
          setPassword("");
        })
        .catch(() => {
          setErrors({ api: "Registration failed. Please try again." });
        });
    }
  };

  const simulateApiCall = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  };
  return (
    <div className="container">
      <h1 style={{textAlign:"center","marginTop":"10px"}}>User Registartion Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label style={{fontWeight:"bold"}}>Username:</label> &nbsp;
          <input 
            type="text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter Your UserName"
          />
          {errors.username && <p style={{ color: "red",fontSize: "0.875em"  }}>{errors.username}</p>}
        </div>
        <br/>
        <div>
          <label style={{fontWeight:"bold"}}>Email:</label> &nbsp;
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email"
          />
          {errors.email && <p style={{ color: "red",fontSize: "0.875em" }}>{errors.email}</p>}
        </div>
        <br/>
        <div>
          <label style={{fontWeight:"bold"}}>Password:</label> &nbsp;
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Your Password"
          />
          {errors.password && <p style={{ color: "red" ,fontSize: "0.875em" }}>{errors.password}</p>}
        </div>
        <br/>
        <button type="submit">Register</button>
      </form>
      {errors.api && <p style={{ color: "red" }}>{errors.api}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </div>
  );
}

export default RegistrationForm;

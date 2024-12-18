import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login css.css"; 

export default function LoginPage() {
  const [logins, setLogins] = useState({ role: "", email: "", password: "" });
  const [error, setError] = useState({ role: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLogins({ ...logins, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (logins.role && logins.email && logins.password) {
      navigate(`/${logins.role}`);
    } else {
      setError({
        role: logins.role ? "" : "Role is required",
        email: logins.email ? "" : "Email is required",
        password: logins.password ? "" : "Password is required",
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login to OpenTickets</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Role:</label>
            <select
              name="role"
              value={logins.role}
              onChange={handleChange}
              className="form-control"
            >
              <option value="">Select Role</option>
              <option>User</option>
              <option>Employee</option>
              <option>Administrator</option>
            </select>
            {error.role && <p className="error-text">{error.role}</p>}
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="text"
              name="email"
              value={logins.email}
              onChange={handleChange}
              className="form-control"
            />
            {error.email && <p className="error-text">{error.email}</p>}
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={logins.password}
              onChange={handleChange}
              className="form-control"
            />
            {error.password && <p className="error-text">{error.password}</p>}
          </div>

          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
}

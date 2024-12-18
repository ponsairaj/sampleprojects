import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login css.css"; // Ensure your CSS file is linked

export default function Logins() {
  const [logins, setLogins] = useState({ role: '', email: '', password: '' });
  const [error, setError] = useState({ head: '', role: '', email: '', password: '' });
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLogins({ ...logins, [name]: value });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    const errors = { ...error };
    switch (name) {
      case 'role':
        errors.role = value ? '' : 'Role cannot be empty';
        break;
      case 'email':
        errors.email = value
          ? emailRegex.test(value) ? '' : 'Enter a valid email'
          : 'Email cannot be empty';
        break;
      case 'password':
        errors.password = value
          ? passwordRegex.test(value) ? '' : 'Password must contain uppercase, lowercase, special character, and a number'
          : 'Password cannot be empty';
        break;
      default:
        break;
    }
    setError(errors);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      console.log("Login Success:", logins);
      if (logins.role === 'User') {
        navigate('/User');
      } else if (logins.role === 'Employee') {
        navigate('/Employee');
      } else if (logins.role === 'Administrator') {
        navigate('/Administrator');
      }
    }
  };

  const validateForm = () => {
    let isValid = true;
    const validationErrors = { ...error };

    if (!logins.role) {
      validationErrors.role = 'Role cannot be empty';
      isValid = false;
    }
    if (!logins.email) {
      validationErrors.email = 'Email cannot be empty';
      isValid = false;
    } else if (!emailRegex.test(logins.email)) {
      validationErrors.email = 'Enter a valid email';
      isValid = false;
    }
    if (!logins.password) {
      validationErrors.password = 'Password cannot be empty';
      isValid = false;
    } else if (!passwordRegex.test(logins.password)) {
      validationErrors.password = 'Password must contain uppercase, lowercase, special character, and a number';
      isValid = false;
    }

    setError(validationErrors);
    return isValid;
  };

  return (
    <div className="container-form-center">
      <div className="form-container">
        <header className="header pb-2">
          <h1 className="text-center">Login Page</h1>
          <h4 className="text-center">Only Registered persons can Login!</h4>
        </header>
        <form className="form-control" onSubmit={handleSubmit}>
          <h2 className="text-center mb-4">Login Form:</h2>
          <div className="mb-3">
            <label className="form-label">Role:</label>
            <select name="role" value={logins.role} onChange={handleChange} className="form-control">
              <option value="">Select the role</option>
              <option>User</option>
              <option>Employee</option>
              <option>Administrator</option>
            </select>
            {error.role && <p className="text-danger">{error.role}</p>}
          </div>
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input type="text" name="email" value={logins.email} onChange={handleChange} className="form-control" />
            {error.email && <p className="text-danger">{error.email}</p>}
          </div>
          <div className="mb-4">
            <label className="form-label">Password:</label>
            <input type="password" name="password" value={logins.password} onChange={handleChange} className="form-control" />
            {error.password && <p className="text-danger">{error.password}</p>}
          </div>
          <div className="text-center">
            <button className="btn btn-success" type="submit">Login</button>
          </div>
        </form>
        <footer className="footer text-center mt-4 p-2">
          <h3>End of the page!</h3>
        </footer>
      </div>
    </div>
  );
}

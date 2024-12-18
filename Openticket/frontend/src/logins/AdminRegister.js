import React, { useState } from "react";

export default function Adminreg() {
  const [admin, setAdmin] = useState({ role: "Administrator", email: "", password: "" });
  const [error, setError] = useState({ email: "", password: "" });
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAdmin((prevAdmin) => ({ ...prevAdmin, [name]: value }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", password: "" };

    if (!admin.email) {
      newErrors.email = "Email is required!";
      isValid = false;
    } else if (!emailRegex.test(admin.email)) {
      newErrors.email = "Enter a valid email address!";
      isValid = false;
    }

    if (!admin.password) {
      newErrors.password = "Password is required!";
      isValid = false;
    }

    setError(newErrors);
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      console.log("Admin Registered Successfully:", admin);
      // Add registration logic here
    }
  };

  return (
    <div className="App">
      <header className="container-fluid nv pb-2 header">
        <h1 className="row justify-content-center">Administrator Registration</h1>
        <h4 className="row justify-content-center">Only Registered persons can Login!</h4>
      </header>
      <div className="container vh-100">
        <div className="container mt-4">
          <form className="form-control m-4" onSubmit={handleSubmit}>
            <h2>Registration Form:</h2>
            <div className="row">
              <div className="col-6 p-4">
                <label className="form-label">Role:</label>
                <select name="role" className="form-control" value={admin.role} onChange={handleChange} disabled>
                  <option>Administrator</option>
                </select>
              </div>
              <div className="col-6 p-4">
                <label className="form-label">Email:</label>
                <input
                  type="text"
                  name="email"
                  className="form-control"
                  value={admin.email}
                  onChange={handleChange}
                />
                <p className="text-danger">{error.email}</p>
              </div>
              <div className="p-4 col-6">
                <label className="form-label">Password:</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={admin.password}
                  onChange={handleChange}
                />
                <p className="text-danger">{error.password}</p>
              </div>
              <div className="container col-6 text-center mt-5 p-2">
                <button type="submit" className="btn btn-success btn-md">Register</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <footer className="nv container-fluid p-3">
        <h3 className="row justify-content-center">End of the page!!</h3>
      </footer>
    </div>
  );
}

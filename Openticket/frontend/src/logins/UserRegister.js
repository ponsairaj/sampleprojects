import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../images/lodgo.png";

export default function UserRegister() {
  const [userdata, setUserdata] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [error, setError] = useState({
    head: "",
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
  const navigate = useNavigate();
  const idcreator = Math.floor(Math.random() * 9000 + 10000);

  useEffect(() => {
    const loggedinuser = localStorage.getItem("LoggedinUser");
    const loggedinadmin = localStorage.getItem("LoggedinAdmin");
    const loggedinemployee = localStorage.getItem("LoggedinEmployee");

    if (loggedinadmin) navigate("/admin");
    else if (loggedinemployee) navigate("/employee");
    else if (loggedinuser) navigate("/user");
  }, [navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserdata((prevData) => ({ ...prevData, id: idcreator, [name]: value }));
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let fieldError = "";

    if (name === "name" && !value) fieldError = "User name cannot be empty";
    if (name === "email" && (!value || !emailRegex.test(value)))
      fieldError = value ? "Enter a valid email" : "Email cannot be empty";
    if (name === "password" && (!value || !passwordRegex.test(value)))
      fieldError =
        value
          ? "Password must include uppercase, lowercase, special character, and a number"
          : "Password cannot be empty";
    if (name === "confirmpassword" && value !== userdata.password)
      fieldError = value ? "Passwords do not match" : "Confirm password cannot be empty";

    setError((prevError) => ({ ...prevError, [name]: fieldError }));
  };

  const validateForm = () => {
    const isValid = Object.values(userdata).every((field) => field);

    const formError = {
      head: isValid ? "" : "Please fill all fields correctly.",
      name: !userdata.name ? "User name cannot be empty" : "",
      email: !userdata.email
        ? "Email cannot be empty"
        : !emailRegex.test(userdata.email)
        ? "Enter a valid email"
        : "",
      password: !userdata.password
        ? "Password cannot be empty"
        : !passwordRegex.test(userdata.password)
        ? "Password must include uppercase, lowercase, special character, and a number"
        : "",
      confirmpassword:
        !userdata.confirmpassword
          ? "Confirm password cannot be empty"
          : userdata.confirmpassword !== userdata.password
          ? "Passwords do not match"
          : "",
    };

    setError(formError);
    return isValid && Object.values(formError).every((err) => !err);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      axios
        .post("http://localhost:7000/userregistery", userdata)
        .then(() => {
          alert("Registered Successfully");
          setUserdata({ id: "", name: "", email: "", password: "", confirmpassword: "" });
          navigate("/");
        })
        .catch(() => {
          setError({ head: "Registration failed. Please try again." });
        });
    }
  };

  const navigateHome = () => navigate("/");

  return (
    <div className="App">
      <header className="container-fluid py-3 bg-dark text-light">
        <div className="row align-items-center">
          <div className="col-auto">
            <img
              src={logo}
              height={50}
              width={50}
              className="rounded cursor-pointer"
              alt="Logo"
              onClick={navigateHome}
            />
          </div>
          <h2 className="col text-center">Open Tickets</h2>
        </div>
      </header>

      <main className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <form
              className="form-control border border-4 border-info p-4 bg-light"
              onSubmit={handleSubmit}
            >
              <h3 className="text-center mb-4">User Registration</h3>
              <p className="text-danger text-center">{error.head}</p>
              <div className="mb-3">
                <label className="form-label">User Name</label>
                <input
                  name="name"
                  type="text"
                  className="form-control border border-info"
                  value={userdata.name}
                  onChange={handleChange}
                />
                <p className="text-danger">{error.name}</p>
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  name="email"
                  type="email"
                  className="form-control border border-info"
                  value={userdata.email}
                  onChange={handleChange}
                />
                <p className="text-danger">{error.email}</p>
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  name="password"
                  type="password"
                  className="form-control border border-info"
                  value={userdata.password}
                  onChange={handleChange}
                />
                <p className="text-danger">{error.password}</p>
              </div>
              <div className="mb-3">
                <label className="form-label">Confirm Password</label>
                <input
                  name="confirmpassword"
                  type="password"
                  className="form-control border border-info"
                  value={userdata.confirmpassword}
                  onChange={handleChange}
                />
                <p className="text-danger">{error.confirmpassword}</p>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-info">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <footer className="container-fluid py-3 bg-dark text-light text-center">
        <p>@2024 Creator</p>
      </footer>
    </div>
  );
}

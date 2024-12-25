import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../images/lodgo.png";

export default function Employeereg() {
  const [employeedata, setEmployee] = useState({
    id: "",
    name: "",
    email: "",
    department: "",
    password: "",
    confirmpassword: "",
  });

  const [error, setError] = useState({});

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
  const navigate = useNavigate();

  useEffect(() => {
    const loggedinuser = localStorage.getItem("LoggedinUser");
    const loggedinadmin = localStorage.getItem("LoggedinAdmin");
    const loggedinemployee = localStorage.getItem("LoggedinEmployee");

    if (loggedinadmin) {
      navigate("/admin");
    } else if (loggedinemployee) {
      navigate("/employee");
    } else if (loggedinuser) {
      navigate("/user");
    }
  }, [navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEmployee((prevData) => ({
      ...prevData,
      id: prevData.id || Math.floor(Math.random() * 9000 + 10000),
      [name]: value,
    }));
  };

  const validateField = (name, value) => {
    let message = "";

    switch (name) {
      case "name":
        if (!value) message = "Name cannot be empty";
        break;
      case "email":
        if (!value) message = "Email cannot be empty";
        else if (!emailRegex.test(value)) message = "Enter a valid email";
        break;
      case "department":
        if (!value || value === "Select a department")
          message = "Select a valid department";
        break;
      case "password":
        if (!value) message = "Password cannot be empty";
        else if (!passwordRegex.test(value))
          message = "Password must include uppercase, lowercase, number, and special character";
        break;
      case "confirmpassword":
        if (!value) message = "Confirm Password cannot be empty";
        else if (value !== employeedata.password)
          message = "Passwords do not match";
        break;
      default:
        break;
    }

    return message;
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(employeedata).forEach((key) => {
      const message = validateField(key, employeedata[key]);
      if (message) newErrors[key] = message;
    });
    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      try {
        await axios.post("http://localhost:7000/employeeregistery", employeedata);
        alert("Registered Successfully");
        navigate("/");
      } catch (err) {
        console.error(err);
        setError((prevError) => ({
          ...prevError,
          head: "Registration failed. Please try again.",
        }));
      }
    }
  };

  const Home = () => {
    navigate("/");
  };

  return (
    <div className="App text-light">
      <div className="container-fluid py-3 bg-dark text-light">
        <div className="row">
          <span className="col">
            <img
              src={logo}
              height={50}
              width={50}
              className="rounded"
              alt="Logo"
              onClick={Home}
            />
          </span>
          <h2 className="col-7 text-start">OPEN TICKETS</h2>
        </div>
      </div>

      <div className="container">
        <div className="mt-4 row justify-content-center">
          <div className="col-6">
            <form
              className="form-control border border-4 border-info my-3 bg-light"
              onSubmit={handleSubmit}
            >
              <h5>EMPLOYEE REGISTER:</h5>
              {error.head && <p className="text-danger">{error.head}</p>}
              <div className="mb-3">
                <label className="form-label">Employee Name:</label>
                <input
                  name="name"
                  type="text"
                  className="form-control border border-info"
                  onChange={handleChange}
                />
                {error.name && <p className="text-danger">{error.name}</p>}
              </div>
              <div className="mb-3">
                <label className="form-label">Email:</label>
                <input
                  type="text"
                  name="email"
                  className="form-control border border-info"
                  onChange={handleChange}
                />
                {error.email && <p className="text-danger">{error.email}</p>}
              </div>
              <div className="mb-3">
                <label className="form-label">Department:</label>
                <select
                  name="department"
                  className="form-control border border-info"
                  onChange={handleChange}
                >
                  <option>Select a department</option>
                  <option>Department - 1</option>
                  <option>Department - 2</option>
                  <option>Department - 3</option>
                </select>
                {error.department && <p className="text-danger">{error.department}</p>}
              </div>
              <div className="mb-3">
                <label className="form-label">Password:</label>
                <input
                  type="password"
                  name="password"
                  className="form-control border border-info"
                  onChange={handleChange}
                />
                {error.password && <p className="text-danger">{error.password}</p>}
              </div>
              <div className="mb-3">
                <label className="form-label">Confirm Password:</label>
                <input
                  type="password"
                  name="confirmpassword"
                  className="form-control border border-info"
                  onChange={handleChange}
                />
                {error.confirmpassword && <p className="text-danger">{error.confirmpassword}</p>}
              </div>
              <div className="text-center">
                <button className="btn btn-info btn-md" type="submit">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="p-4 container-fluid bg-dark text-light">
        <p className="text-center">@2024 Creator</p>
      </div>
    </div>
  );
}

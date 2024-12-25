import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import adminpic from "../images/admins.jfif";
import logo from "../images/lodgo.png";
import axios from "axios";

export default function EmployeeHome() {
  const [admin, setAdmin] = useState({ id: null, name: "", email: "", department: "", password: "", role: "" });
  const [error, setError] = useState({ name: "", email: "" });
  const [tickets, setTickets] = useState([]);
  const [myTickets, setMyTickets] = useState([]);
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get("http://localhost:7000/Tickets");
        setTickets(response.data);
        setMyTickets(response.data.filter((item) => item.status === "Moved to Admin"));
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchTickets();
  }, []);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axios.get("http://localhost:7000/admin");
        setAdmin(response.data[0]);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };

    fetchAdminData();
  }, []);

  const handleLogout = () => {
    alert("Logging out!");
    localStorage.removeItem("LoggedinAdmin");
    navigate("/");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAdmin((prevAdmin) => ({ ...prevAdmin, [name]: value }));
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let errors = { ...error };

    if (name === "name") {
      errors.name = value.trim() === "" ? "Name cannot be empty." : "";
    } else if (name === "email") {
      if (value.trim() === "") {
        errors.email = "Email cannot be empty.";
      } else if (!emailRegex.test(value)) {
        errors.email = "Enter a valid email address.";
      } else {
        errors.email = "";
      }
    }

    setError(errors);
  };

  const handleProfileSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        await axios.post("http://localhost:7000/admin", admin);
        alert("Profile updated successfully.");
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    if (admin.name.trim() === "") {
      errors.name = "Name cannot be empty.";
      isValid = false;
    }

    if (admin.email.trim() === "") {
      errors.email = "Email cannot be empty.";
      isValid = false;
    } else if (!emailRegex.test(admin.email)) {
      errors.email = "Enter a valid email address.";
      isValid = false;
    }

    setError(errors);
    return isValid;
  };

  const handleAcceptTicket = async (id) => {
    try {
      await axios.post("http://localhost:7000/admintickets", { id });
      alert("Ticket accepted successfully.");
    } catch (error) {
      console.error("Error accepting ticket:", error);
    }
  };

  return (
    <div className="App">
      {/* Header Section */}
      <div className="container-fluid py-3 bg-dark text-light">
        <div className="row align-items-center">
          <div className="col-2">
            <img src={logo} height={50} width={50} alt="Logo" className="rounded" />
          </div>
          <h2 className="col-8 text-center">OPEN TICKETS</h2>
        </div>
      </div>

      {/* Welcome Section */}
      <header className="container-fluid bg-dark text-light pb-2">
        <h5 className="text-center">Hello Admin!</h5>
        <h6 className="text-center">Welcome to the Admin Home Page!</h6>
        <div className="text-end">
          <button className="btn btn-sm btn-info" data-bs-toggle="offcanvas" data-bs-target="#settings" aria-controls="settings">
            Profile Settings
          </button>
          <button className="btn btn-sm btn-info ms-2" onClick={() => navigate("/Admintickets")}>My Tickets</button>
          <button className="btn btn-sm btn-info ms-2" onClick={() => navigate("/Adminregisters")}>Registers</button>
        </div>
      </header>

      {/* Profile Settings Offcanvas */}
      <div className="offcanvas offcanvas-start" tabIndex="-1" id="settings">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Profile Settings</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <div className="card border border-info">
            <div className="card-body text-center">
              <img src={adminpic} width="150" height="150" alt="Admin" className="rounded-circle" />
              <p className="mt-2">Name: {admin.name}</p>
              <p>Email: {admin.email}</p>
              <button
                className="btn btn-info btn-sm mt-3"
                data-bs-toggle="collapse"
                data-bs-target="#editProfile"
              >
                Edit Profile
              </button>
              <button className="btn btn-danger btn-sm mt-3" onClick={handleLogout}>Logout</button>
              <div id="editProfile" className="collapse mt-3">
                <form onSubmit={handleProfileSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Change Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={admin.name}
                      onChange={handleInputChange}
                    />
                    <small className="text-danger">{error.name}</small>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Change Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={admin.email}
                      onChange={handleInputChange}
                    />
                    <small className="text-danger">{error.email}</small>
                  </div>
                  <button type="submit" className="btn btn-success">Save Changes</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tickets Section */}
      <div className="container mt-4">
        <div className="row">
          {/* Raised Tickets */}
          <div className="col-md-6">
            <h5>Tickets Raised</h5>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Ticket Number</th>
                  <th>Complaint</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.complaint}</td>
                    <td>{item.status || "Pending"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Transferred Tickets */}
          <div className="col-md-6">
            <h5>Transferred Tickets</h5>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Ticket Number</th>
                  <th>Complaint</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {myTickets.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.complaint}</td>
                    <td>
                      <button className="btn btn-success btn-sm me-2" onClick={() => handleAcceptTicket(item.id)}>Accept</button>
                      <button className="btn btn-danger btn-sm">Reject</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-light text-center py-3">
        <p>&copy; 2024 Open Tickets</p>
      </footer>
    </div>
  )
}
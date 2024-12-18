import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./HomePage.css"; // Make sure this CSS file is linked properly

export default function Routing() {
  return (
    <div className="App">
      <header className="container-fluid header text-center mb-4">
        <h1>Welcome to OpenTickets</h1>
        <p>Your platform for raising, tracking, and managing support tickets efficiently!</p>
      </header>

      <div className="container">
        <div className="row">
          {/* General Information Section */}
          <div className="col-md-6 pt-4">
            <div className="card general-info">
              <h2 className="card-header text-center">General Information</h2>
              <div className="card-body">
                <p>OpenTickets provides a streamlined approach to handling technical issues and support requests. Whether you're a user needing assistance, an employee managing support tickets, or an administrator overseeing operations, OpenTickets has features tailored for you.</p>
                <ul>
                  <li>Users can raise and monitor support tickets.</li>
                  <li>Employees can access tickets assigned to their departments.</li>
                  <li>Administrators can oversee all ticket activities and manage user roles.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Navigation Links Section */}
          <div className="col-md-6">
            {["Login", "User Registration", "Employee Registration", "Administrator Registration"].map((text, index) => (
              <div className="container mt-4" key={text}>
                <h3 className="text-center py-4 border link-box">
                  <Link to={`/${text.replace(" ", "")}`} className="link-text">
                    {text}
                  </Link>
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <Outlet />

      <footer className="footer text-center py-3 mt-5">
        <p>OpenTickets © 2024. All rights reserved.</p>
      </footer>
    </div>
  );
}

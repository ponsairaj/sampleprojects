import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from "../images/lodgo.png";
import userImg from "../images/users.jpg";
import employeeImg from "../images/employees.jfif";
import adminImg from "../images/admins.jfif";

export default function Routing() {
  const navigate = useNavigate();
  const loggedinUser = localStorage.getItem("LoggedinUser");
  const loggedinAdmin = localStorage.getItem("LoggedinAdmin");
  const loggedinEmployee = localStorage.getItem("LoggedinEmployee");

  useEffect(() => {
    if (loggedinAdmin) {
      navigate("/admin");
    } else if (loggedinEmployee) {
      navigate("/employee");
    } else if (loggedinUser) {
      navigate("/user");
    }
  }, [loggedinAdmin, loggedinEmployee, loggedinUser, navigate]);

  return (
    <div className="app">
      {/* Header */}
      <header className="container-fluid py-3 bg-dark text-light">
  <div className="row align-items-center">
    <div className="col-2 text-center">
      <img src={logo} height={50} width={50} className="rounded" alt="Logo" />
    </div>
    <h2 className="col-6 text-center mb-0">Open Tickets</h2>
    <div className="col-4 text-end">
      <div className="d-inline-block me-2">
        <div className="dropdown">
          <button
            type="button"
            className="btn btn-info dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Register
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <Link to="/UserRegister" className="dropdown-item">
                User Registration
              </Link>
            </li>
            <li>
              <Link to="/EmployeeRegister" className="dropdown-item">
                Employee Registration
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <Link to="/login" className="btn btn-info">
        Login
      </Link>
    </div>
  </div>
</header>


      {/* Main Content */}
      <main className="container my-5">
        <div className="row">
          {/* Carousel Section */}
          <div className="col-lg-6 mb-4">
            <div
              id="carouselExampleControls"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img src={userImg} className="d-block w-100 rounded" alt="Users" />
                  <div className="mt-3 border border-info p-3 rounded">
                    <h5>Users</h5>
                    <p>Users are the customers who raise tickets.</p>
                  </div>
                </div>
                <div className="carousel-item">
                  <img src={employeeImg} className="d-block w-100 rounded" alt="Employees" />
                  <div className="mt-3 border border-info p-3 rounded">
                    <h5>Employees</h5>
                    <p>Staff responsible for solving tickets based on their respective departments.</p>
                  </div>
                </div>
                <div className="carousel-item">
                  <img src={adminImg} className="d-block w-100 rounded" alt="Admin" />
                  <div className="mt-3 border border-info p-3 rounded">
                    <h5>Admin</h5>
                    <p>The administrator manages all tickets and oversees the process.</p>
                  </div>
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="prev"
              >
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide="next"
              >
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>

          {/* Information Section */}
          <div className="col-lg-6">
            <div className="card border-info shadow-sm">
              <div className="card-header bg-info text-light">
                <h5 className="mb-0">General Information</h5>
              </div>
              <div className="card-body">
                <p>This application helps in raising and resolving tickets efficiently.</p>
                <h5>Tickets:</h5>
                <p>
                  A ticket is a record created to track and manage issues, requests, or tasks related
                  to technology, software, systems, or IT services. It helps track progress and
                  ensures resolution.
                </p>
                <h5>Roles:</h5>
                <ul>
                  <li>User: Raises tickets.</li>
                  <li>Employee: Resolves tickets based on their department.</li>
                  <li>Administrator: Oversees and manages the process.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-dark text-light py-3">
        <p className="text-center mb-0">&copy; 2024 Open Tickets. All rights reserved.</p>
      </footer>

      <Outlet />
    </div>
  );
}

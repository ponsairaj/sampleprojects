// Refactored registerlist.js
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../images/lodgo.png";

function Header({ onAdminHome }) {
  return (
    <header className="container-fluid bg-dark text-light pb-2">
      <div className="d-flex justify-content-between align-items-center">
        <h6>Welcome to the Mytickets page of Admin!</h6>
        <button className="btn btn-sm btn-info" onClick={onAdminHome}>Admin Home</button>
      </div>
    </header>
  );
}

function RegisterTable({ registers, onRemove }) {
  return (
    <table className="table table-light border border-4 border-info text-center mt-3">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Role</th>
          <th>Options</th>
        </tr>
      </thead>
      <tbody>
        {registers.map(({ id, name, email, department, role }) => (
          <tr key={id} className="border border-info">
            <td>{id}</td>
            <td>{name}</td>
            <td>{email}</td>
            <td>{department}</td>
            <td>{role}</td>
            <td>
              <button className="btn btn-sm btn-danger" onClick={() => onRemove(id)}>Remove</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function AdminRegisters() {
  const navigate = useNavigate();
  const [registers, setRegisters] = useState([]);

  const fetchRegisters = useCallback(() => {
    axios.get("http://localhost:7000/registers")
      .then(({ data }) => setRegisters(data))
      .catch(console.error);
  }, []);

  const handleRemove = useCallback((id) => {
    axios.post("http://localhost:7000/deleteregister", { id })
      .then(() => setRegisters((prev) => prev.filter((reg) => reg.id !== id)))
      .catch(console.error);
  }, []);

  useEffect(() => {
    fetchRegisters();
  }, [fetchRegisters]);

  return (
    <div className="App">
      <div className="container-fluid py-3 bg-dark text-light">
        <div className="d-flex align-items-center">
          <img src={logo} alt="Logo" height={50} width={50} className="rounded" />
          <h2 className="ms-3">OPEN TICKETS</h2>
        </div>
      </div>
      <Header onAdminHome={() => navigate("/Admin")} />
      <div className="container">
        <h5 className="text-center py-2">Registers</h5>
        <RegisterTable registers={registers} onRemove={handleRemove} />
      </div>
      <footer className="p-4 mt-5 container-fluid bg-dark text-light">
        <p className="text-center">@2024 Creator</p>
      </footer>
    </div>
  );
}

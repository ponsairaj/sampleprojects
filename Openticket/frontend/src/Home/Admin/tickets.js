// Refactored tickets.js
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../images/lodgo.png";

function TicketTable({ tickets }) {
  return (
    <table className="table table-info border border-4 border-info text-center">
      <thead>
        <tr>
          <th>Ticket Number</th>
          <th>User Name</th>
          <th>User Email</th>
          <th>Complaint</th>
          <th>Screenshots</th>
          <th>Worked By</th>
          <th>Solution</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tickets.map(({ id, username, useremail, complaint, screenshots, employeeid }) => (
          <tr key={id}>
            <td>{id}</td>
            <td>{username}</td>
            <td>{useremail}</td>
            <td title={complaint}>{complaint.slice(0, 50)}...</td>
            <td>
              <img src={screenshots} alt="No screenshots" className="img-thumbnail" width={50} />
            </td>
            <td>{employeeid}</td>
            <td>
              <textarea name="solution" placeholder="Add solution here..." className="form-control"></textarea>
            </td>
            <td>
              <button className="btn btn-sm btn-success me-2">Close</button>
              <button className="btn btn-sm btn-danger">Reject</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function AdminTickets() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);

  const fetchTickets = useCallback(() => {
    axios.get("http://localhost:7000/Tickets")
      .then(({ data }) => setTickets(data.filter((t) => t.status === "In Admin Bucket")))
      .catch(console.error);
  }, []);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  return (
    <div className="App">
      <div className="container-fluid py-3 bg-dark text-light">
        <div className="d-flex align-items-center">
          <img src={logo} alt="Logo" height={50} width={50} className="rounded" />
          <h2 className="ms-3">OPEN TICKETS</h2>
        </div>
      </div>
      <header className="container-fluid bg-dark text-light pb-2">
        <div className="d-flex justify-content-between align-items-center">
          <h6>Welcome to the Mytickets page of Admin!</h6>
          <button className="btn btn-sm btn-info" onClick={() => navigate("/admin")}>Admin Home</button>
        </div>
      </header>
      <div className="container">
        <h5 className="text-center mt-4">Tickets</h5>
        <TicketTable tickets={tickets} />
      </div>
      <footer className="p-4 container-fluid bg-dark text-light">
        <p className="text-center">@2024 Creator</p>
      </footer>
    </div>
  );
}

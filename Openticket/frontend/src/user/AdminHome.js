import React, { useState } from "react";

export default function AdminHome() {
  // Sample data representing admin information, tickets, and users
  const admin = { 
    username: 'Admin1', 
    email: 'admin1@company.com', 
    id: 'A001', 
    role: 'Administrator', 
    number: '1234567890' 
  };

  // Dummy data for all tickets in the system
  const [allTickets, setAllTickets] = useState([
    { ticketNumber: '101', description: 'Network issue', status: 'Pending', department: 'IT', raisedBy: 'User1' },
    { ticketNumber: '102', description: 'Software installation', status: 'In Progress', department: 'IT', raisedBy: 'User2' },
    { ticketNumber: '103', description: 'Hardware issue', status: 'Resolved', department: 'Support', raisedBy: 'User3' },
    { ticketNumber: '104', description: 'Password reset', status: 'Pending', department: 'Support', raisedBy: 'User4' }
  ]);

  // Dummy data for user roles
  const [users, setUsers] = useState([
    { username: 'User1', email: 'user1@company.com', role: 'User', department: 'IT' },
    { username: 'Employee1', email: 'employee1@company.com', role: 'Employee', department: 'Support' },
    { username: 'Admin1', email: 'admin1@company.com', role: 'Administrator', department: 'Admin' }
  ]);

  return (
    <div className="App">
      <header className="container-fluid nv pb-2 header">
        <h1 className="row justify-content-center">Hello, {admin.username}!</h1>
        <h4 className="row justify-content-center">Welcome to the Admin Dashboard!</h4>
      </header>

      <div className="container-fluid my-3 text-dark">
        <div className="row container">
          {/* Admin Details Card */}
          <div className="container-fluid col-4">
            <div className="card">
              <h2 className="card-title">Welcome {admin.username}!</h2>
              <div className="card-body text-center">
                <img src="https://picsum.photos/200" width="200" height="200" alt="Admin profile" className="rounded-circle" />
                <div className="container text-start mt-3">
                  <h4 className="text-center">Admin Information</h4>
                  <p>Admin ID: {admin.id}</p>
                  <p>Role: {admin.role}</p>
                  <p>Email Address: {admin.email}</p>
                  <p>Phone number: {admin.number}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tickets Table */}
          <div className="container-fluid col-8">
            <div className="container card mb-4">
              <h4 className="card-title mt-3">All Tickets in the System</h4>
              <div className="container bg-light">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Ticket Number</th>
                      <th scope="col">Description</th>
                      <th scope="col">Status</th>
                      <th scope="col">Department</th>
                      <th scope="col">Raised By</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allTickets.map((ticket) => (
                      <tr key={ticket.ticketNumber}>
                        <td>{ticket.ticketNumber}</td>
                        <td>{ticket.description}</td>
                        <td className={
                          ticket.status === 'Resolved' ? 'bg-success text-white' : 
                          ticket.status === 'In Progress' ? 'bg-warning text-white' : 
                          'bg-danger text-white'
                        }>
                          {ticket.status}
                        </td>
                        <td>{ticket.department}</td>
                        <td>{ticket.raisedBy}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* User Roles Table */}
            <div className="container card">
              <h4 className="card-title mt-3">User Management</h4>
              <div className="container bg-light">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Username</th>
                      <th scope="col">Email</th>
                      <th scope="col">Role</th>
                      <th scope="col">Department</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.username}>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>{user.department}</td>
                        <td>
                          {/* Placeholder buttons for role management */}
                          <button className="btn btn-primary btn-sm mx-1">Edit</button>
                          <button className="btn btn-danger btn-sm mx-1">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="container-fluid nv pb-4 footer">
        <h3 className="row justify-content-center">End of the page!</h3>
      </footer>
    </div>
  );
}

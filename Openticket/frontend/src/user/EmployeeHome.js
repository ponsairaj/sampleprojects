import React, { useState } from "react";

export default function EmployeeHome() {
  // Sample data representing employee information and ticket assignments
  const employee = { 
    username: 'Employee1', 
    email: 'employee1@company.com', 
    id: 'E001', 
    role: 'Employee', 
    department: 'IT', 
    number: '1234567890' 
  };

  // Dummy data for department tickets
  const [departmentTickets, setDepartmentTickets] = useState([
    { ticketNumber: '101', description: 'Network issue', status: 'Pending' },
    { ticketNumber: '102', description: 'Software installation', status: 'In Progress' },
    { ticketNumber: '103', description: 'Hardware issue', status: 'Resolved' }
  ]);

  // Dummy data for newly raised tickets
  const [newTickets, setNewTickets] = useState([
    { ticketNumber: '104', description: 'Password reset', raisedBy: 'User2' },
    { ticketNumber: '105', description: 'Printer issue', raisedBy: 'User3' }
  ]);

  return (
    <div className="App">
      <header className="container-fluid nv pb-2 header">
        <h1 className="row justify-content-center">Hello, {employee.username}!</h1>
        <h4 className="row justify-content-center">Welcome to the Employee Dashboard!</h4>
      </header>
      
      <div className="container-fluid my-3 text-dark">
        <div className="row container">
          {/* Employee Details Card */}
          <div className="container-fluid col-5">
            <div className="card">
              <h2 className="card-title">Welcome {employee.username}!</h2>
              <div className="card-body text-center">
                <img src="https://picsum.photos/200" width="200" height="200" alt="Employee profile" className="rounded-circle" />
                <div className="container text-start mt-3">
                  <h4 className="text-center">Employee Information</h4>
                  <p>Employee ID: {employee.id}</p>
                  <p>Role: {employee.role}</p>
                  <p>Department: {employee.department}</p>
                  <p>Email Address: {employee.email}</p>
                  <p>Phone number: {employee.number}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Ticket Tables for Employee */}
          <div className="container-fluid col-7">
            {/* Allocated Tickets Table */}
            <div className="container card mb-4">
              <h4 className="card-title mt-3">Tickets Allocated to {employee.department} Department</h4>
              <div className="container bg-light">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Ticket Number</th>
                      <th scope="col">Description</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {departmentTickets.map((ticket) => (
                      <tr key={ticket.ticketNumber}>
                        <td>{ticket.ticketNumber}</td>
                        <td>{ticket.description}</td>
                        <td className={ticket.status === 'Resolved' ? 'bg-success text-white' : 'bg-warning text-white'}>
                          {ticket.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Newly Raised Tickets Table */}
            <div className="container card">
              <h4 className="card-title mt-3">Newly Raised Tickets</h4>
              <div className="container bg-light">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Ticket Number</th>
                      <th scope="col">Description</th>
                      <th scope="col">Raised By</th>
                    </tr>
                  </thead>
                  <tbody>
                    {newTickets.map((ticket) => (
                      <tr key={ticket.ticketNumber}>
                        <td>{ticket.ticketNumber}</td>
                        <td>{ticket.description}</td>
                        <td>{ticket.raisedBy}</td>
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

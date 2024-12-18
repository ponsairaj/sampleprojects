import React from "react";

export default function UserHome() {
  const user = { username: 'User1', email: 'user1@gmail.com', id: '001', role: 'User', number: '9876543210' };

  return (
    <div className="App">
      <header className="container-fluid nv pb-2 header">
        <h1 className="row justify-content-center">Hello User!</h1>
        <h4 className="row justify-content-center">Welcome to the Home page of ticket raiser!</h4>
      </header>
      <div className="container-fluid my-3 text-dark">
        <div className="row container">
          <div className="container-fluid col-5">
            <div className="card">
              <h2 className="card-title">Welcome {user.username}!</h2>
              <div className="card-body text-center">
                <img src="https://picsum.photos/200" width="200" height="200" alt="User profile" className="rounded-circle" />
                <div className="container text-start mt-3">
                  <h4 className="text-center">User Information</h4>
                  <p>User ID: {user.id}</p>
                  <p>Role: {user.role}</p>
                  <p>Email Address: {user.email}</p>
                  <p>Phone number: {user.number}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid col-7">
            <div className="container card row pb-3">
              <h4 className="card-title">List of Contents:</h4>
              <div className="row">
                <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <img src="https://picsum.photos/600/300" className="d-block w-100" alt="Raise a Ticket" />
                      <div className="carousel-caption d-none d-md-block">
                        <a href="#ticketRaise" className="text-decoration-none text-light" data-bs-toggle="collapse" data-bs-target="#ticketRaise">
                          <h5>Raise A Ticket</h5>
                        </a>
                        <p>For any issues and machine problems</p>
                      </div>
                    </div>
                    <div className="carousel-item">
                      <img src="https://picsum.photos/600/300" className="d-block w-100" alt="Check Ticket Status" />
                      <div className="carousel-caption d-none d-md-block">
                        <a href="#ticketStatus" className="text-decoration-none text-light" data-bs-toggle="collapse" data-bs-target="#ticketStatus">
                          <h5>Ticket Status</h5>
                        </a>
                        <p>Check the status of previous tickets</p>
                      </div>
                    </div>
                  </div>
                  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="container mt-3 collapse" id="ticketRaise">
              <form className="form-control">
                <div className="row">
                  <div className="col-6">
                    <label>Email:</label>
                    <input name="email" value={user.email} readOnly className="form-control" />
                  </div>
                  <div className="col-6">
                    <label>User Name:</label>
                    <input name="username" value={user.username} readOnly className="form-control" />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Department:
                      <select name="Department" className="form-control">
                        <option value="">Select Department</option>
                        <option>Department-1</option>
                        <option>Department-2</option>
                        <option>Department-3</option>
                      </select>
                    </label>
                  </div>
                  <div className="col-6">
                    <label className="form-label">Phone Number:</label>
                    <input type="text" name="phoneNumber" value={user.number} readOnly className="form-control" />
                  </div>
                  <div className="col-12">
                    <label>Ticket Notes:</label>
                    <textarea name="ticket" rows={3} className="form-control" />
                  </div>
                  <div className="col-12">
                    <label>Screenshots:</label>
                    <input type="file" name="Screenshots" multiple className="form-control" />
                  </div>
                  <div className="col-12 mt-2 text-center">
                    <button type="submit" className="btn btn-success">Raise Ticket</button>
                  </div>
                </div>
              </form>
            </div>
            <div className="container mt-3 collapse" id="ticketStatus">
              <div className="container bg-light">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Ticket Number</th>
                      <th scope="col">Ticket Data</th>
                      <th scope="col">Department</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">12</th>
                      <td>Complaint: Issue-1</td>
                      <td>Department-2</td>
                      <td className="bg-success text-white">Closed</td>
                    </tr>
                    <tr>
                      <th scope="row">18</th>
                      <td>Complaint: Issue-3</td>
                      <td>Department-3</td>
                      <td className="bg-warning text-white">Open</td>
                    </tr>
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

import React,{useEffect} from "react";
import { Link, Outlet,useNavigate } from "react-router-dom";
import logo from "../images/lodgo.png";
import user from "../images/users.jpg";
import employee from "../images/employees.jfif";
import admin from "../images/admins.jfif";
export default function Routing(){
  const navigate = useNavigate();
  const loggedinuser = localStorage.getItem('LoggedinUser');
  const loggedinadmin = localStorage.getItem('LoggedinAdmin');
  const loggedinemployee = localStorage.getItem('LoggedinEmployee');

  useEffect(() => {
    if (loggedinadmin) {
      navigate('/admin')
    } else if (loggedinemployee) {
      navigate('/employee')
    } else if (loggedinuser) {
      navigate('/user')
    }
  })
  
  return(
    <div className="App">
      <div className="container-fluid py-3 bg-dark text-light">
        <div className="row">
          <div className="col-2">
            <span>
              <img src={logo} height={50} width={50} className="rounded " alt="Logo"/>
            </span>
          </div>
          <h2 className="col-6 text-center">OPEN TICKETS</h2>
          <div className="col-2">
            <button type="button" className="btn btn-info dropdown-toggle" id="#registers" data-bs-toggle="dropdown" aria-expanded ="false">Register</button>
            <div className="dropdown-menu"  aria-labelledby="#registers"> 
              <p className="dropdown-item">
                <Link to = "/UserRegister" className="text-decoration-none text-dark">User Registration</Link>
              </p>
              <p className="dropdown-item">
                <Link to = "/EmployeeRegister" className="text-decoration-none text-dark">Employee Registration</Link>
              </p>
            </div>
          </div>
          <div className=" col-2">
            <button className="btn btn-md btn-info px-3 ">
              <Link to = "/login" className=" text-decoration-none text-dark" >Login</Link>
            </button>
          </div>
        </div>
      </div>
      <div className="container md-5">
        <div className="row p-3">
          <div className="container col-6">
            <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img src={user} className="d-block w-100 rounded" alt="Image-1" />
                  <div className="mt-5 border border-2 border-info">
                    <h5 className="ps-3">Users :</h5>
                    <p className="ps-5">Users are the costumers who are raising tickets</p>
                  </div>
                </div>
                <div className="carousel-item">
                  <img src={employee} className="d-block w-100 rounded" alt="Image-2" />
                  <div className="border border-2 border-info">
                    <h5 className="ps-3">Employee's :</h5>
                    <p className="ps-5">The Staff's are responsible for solving the tickets according to thier respective departments</p>
                  </div>
                </div>
                <div className="carousel-item">
                  <img src={admin} className="d-block w-100 rounded" alt="Image-3" />
                  <div className="mt-4 border border-2 border-info">
                    <h5 className="ps-3">Admin :</h5>
                    <p className="ps-5">Administartor is the head of this process who manages all the tickets </p>
                  </div>
                </div>
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
          <div className="card border col-6 border-3 border-info text-dark bg-light mt-3">
            <h5 className="card-title">General Infos:-</h5>
            <div className="card-body">
              <p>This Application is used for raising tickets and sloving the those tickets</p>
              <h5>Tickets :</h5>
              <p>A Ticket refers to a record created for tracking and managing issues, requests, or tasks related to technology, software, systems, or IT services. It is typically used in IT service management (ITSM), customer support, or helpdesk systems to track the progress of resolving an issue or completing a request.</p>
              <h5>Roles :</h5>
              <p className="ps-4">User</p>
              <p className="ps-4">Employee</p>
              <p className="ps-4">Administartor</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-2">
        <div className="p-4 mt-5 container-fluid footer bg-dark text-light">
          <p className="text-center">@2024 creater</p>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
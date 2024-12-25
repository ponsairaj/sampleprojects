import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../images/lodgo.png";
export default function Admintickets (){

  const navigate = useNavigate();
  const [mytickets,setMytickets] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:7000/Tickets')
    .then(response=>{
      setMytickets(response.data.filter(item=>item.status === "In Admin Bucket"))
    })
  }, [])
  
  const AdminHome =()=>{
    navigate('/admin')
  };

  return(
    <div className="App">
      <div className="container-fluid py-3 bg-dark text-light">
        <div className="row">
          <div className="col-2">
            <span>
              <img src={logo} height={50} width={50} className="rounded " alt="Logo"/>
            </span>
          </div>
          <h2 className="col-8 text-center">OPEN TICKETS</h2>
        </div>
      </div>
      <header className ="container-fluid bg-dark text-light pb-2 header">
        <h6 className="row justify-content-center" >Welcome to the Mytickets page of Admin!</h6>
        <div className="text-end">
          <button className="btn btn-sm btn-info ms-1" type="button" onClick={AdminHome}>Admin home</button>
        </div> 
      </header>
        <div className="container">
        <h5 className="text-center mt-4">Working</h5>
              <table className="table table-info border border-4 border-info text-center">
                <thead className="text-center">
                  <tr>
                    <th scope="col">Ticket Number</th>
                    <th scope="col">User Name</th>
                    <th scope="col">User Email</th>
                    <th scope="col">Complaint</th>
                    <th scope="col">Screenshots</th>
                    <th scope="col">Worked By</th>
                    <th scope="col">Solution</th>
                    <th scope="col">Ticket Status</th>
                  </tr>
                </thead>
                <tbody>  
                  {mytickets.map(item=>
                    <tr className="border border-info" key={item.id}>
                      <th>{item.id}</th>
                      <td>{item.username}</td>
                      <td>{item.useremail}</td>
                      <td>{item.complaint}</td>
                      <td><img src={item.screenshots} alt="No screenshots"/></td>
                      <td>{item.employeeid}</td>
                      <td><textarea name="solution"/></td>
                      <td>
                        <button className="btn btn-sm btn-success m-1">Close ticket</button>
                        <button className="btn btn-sm btn-danger m-1">Unable to Close</button>
                      </td>
                    </tr>
                  )}
                </tbody>                    
              </table>
            </div>
      <div className="p-4 container-fluid footer bg-dark text-light">
        <p className="text-center">@2024 creater</p>
      </div>
    </div>
  )
}
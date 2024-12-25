import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../images/lodgo.png";

export default function Adminregisters(){
  const navigate = useNavigate();
  const [registers, setRegisters] = useState([]);
  const AdminHome =()=>{
    navigate('/Admin')
  };

  useEffect(() => {
    axios.get('http://localhost:7000/registers')
      .then(response=>{
        setRegisters(response.data);
      })
      .catch(error=>{
        console.error(error);
      })
  }, [])
  
  const Remove =(id)=>{
    axios.post('http://localhost:7000/deleteregister',{id})
      .then(response=>{
        console.log(response);
      })
      .catch(error=>{
        console.error(error);
      })
      setRegisters(registers.filter(register=>register.id !== id));
   };

  return(
    <div className="App">
      <div className="container-fluid py-3 bg-dark text-light">
        <div className="row">
          <div className="col">
            <span>
              <img src={logo} height={50} width={50} className="rounded " alt="Logo"/>
            </span>
          </div>
          <h2 className="col-7 text-start">OPEN TICKETS</h2>
        </div>
      </div>
      <header className ="container-fluid bg-dark text-light pb-2 header">
        <h6 className="row justify-content-center" >Welcome to the Mytickets page of Admin!</h6>
        <div className="text-end">
          <button className="btn btn-sm btn-info ms-1" type="button" onClick={AdminHome}>Admin home</button>
        </div> 
      </header>
        <div className="container">
        <h5 className="text-center py-2">Registers</h5>
              <table className="table table-light border border-4 border-info text-center mt-3">
                <thead className="text-center">
                  <tr> 
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Department</th>
                    <th scope="col">Password</th>
                    <th scope="col">Role</th>
                    <th scope="col">Options</th>
                  </tr>
                </thead>
                <tbody>  
                  {registers.map(item=>
                    <tr className="border border-info" key={item.id}>
                      <th>{item.id}</th>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.department}</td>
                      <td>{item.password}</td>
                      <td>{item.role}</td>
                      <td>
                        <button className="btn btn-sm btn-danger m-1" onClick={()=>Remove(item.id)}>Remove</button>
                      </td>
                    </tr>
                  )} 
                </tbody>                    
              </table>
            </div>
      <div className="p-4 mt-5 container-fluid footer bg-dark text-light">
        <p className="text-center">@2024 creater</p>
      </div>
    </div>
  )
}
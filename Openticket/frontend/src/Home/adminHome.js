import React, { useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import adminpic from "../images/admins.jfif";
import logo from "../images/lodgo.png";
import axios from "axios";
export default function EmployeeHome(){
  const [admins,setAdmins]= useState({id:null,name:'',email:'',department:'',password:'',role:''});
  const [error, setError] = useState({head:'',name:'',email:''});
  const [tickets, setTickets] = useState([]);
  const [mytickets,setMytickets] = useState([]);
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
  const navigate = useNavigate();
  
  useEffect(() => {
    axios.get('http://localhost:7000/Tickets')
    .then(response=>{
      setTickets(response.data)
      setMytickets(tickets.filter(item=>item.status === "Moved to Admin"));
    })
    .catch(error=>{
      console.error(error);
    })
  }, [admins]);

  useEffect(() => {
    axios.get('http://localhost:7000/admin')
    .then(response=>{
      setAdmins(response.data[0])
    })
    .catch(error=>{
      console.error(error);
    })
  }, [])
  

  const Logout =()=>{
    alert('Logging out !');
    localStorage.removeItem('LoggedinAdmin');
    navigate('/')
  };

  const profilechange = (event) =>{
      const {name,value} = event.target;
      setAdmins({...admins,[name]:value});
      Validate(name,value);
  };

  const Validate =(name,value)=>{
    const errors ={head:'',name:'',email:''};
    switch (name) {
      case 'name':
        if (value === '') {
          errors.name = 'Enter the name!';          
        } else {
          errors.name = '';
        }
        break;
      case 'email':
        if (value === '') {
          errors.email = 'Enter the email';
        } else if (!emailRegex.test(value)){
          errors.email = 'Enter the proper email';
        } else {
          errors.email = '';
        }
        break;       
      default:
        break;
    };
    setError(errors);
  };

  const profilechanged = (event)=>{
    event.preventDefault();
    if (Validation(admins)){
      axios.post("http://localhost:7000/admin",admins)
      .then(response=>{
        console.log(response);
      })
      .catch(error=>{
        console.error(error);
      })
    };
  };

  const Validation = () =>{
    var isValid = true;
    const errors ={head:'',name:'',email:''};
    if (admins.name === '') {
      errors.name = 'Enter the new name';
      isValid = false;
    } else {
      errors.name = '';
      isValid = true;
    }
    if (admins.email === '') {
      errors.email = 'Enter the new email';
      isValid = false;
    } else if (!emailRegex.test(admins.email)) {
      errors.email = 'Enter the proper email';
      isValid = false;
    } else {
      errors.email = ''
      isValid = true;
    }
    setError(errors);
    return isValid;
  };

  const Admintickets=()=>{
    navigate('/Admintickets');
  };

  const AdminRegisters = ()=>{
    navigate('/Adminregisters')
  };

  const myticketpage = (id) =>{
    axios.post('http://localhost:7000/admintickets',{id})
    .then(response=>{
      console.log(response);
    })
    .catch(error=>{
      console.error(error);
    })
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
        <h5 className="row justify-content-center" >Hello Admin!</h5>
        <h6 className="row justify-content-center" >Welcome to the Home page of Admin!</h6>
        <div className="text-end">
          <button  className="btn btn-sm btn-info" data-bs-toggle="offcanvas" data-bs-target="#settings" aria-controls="settings">Profile settings</button>
          <button className="btn btn-sm btn-info ms-2" type="button" onClick={Admintickets}>mytickets</button>
          <button className="btn btn-sm btn-info ms-2" type="button" onClick={AdminRegisters}>Registers</button>
        </div>
      </header>
      <div className="offcanvas offcanvas-start" tabindex="-1" id="settings" aria-labelledby="settings">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="settings">Profile settings</h5>
          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <div>
            This Slide helps Admin to Edit thier profile and Logout
          </div>
          <div className="card m-2 border border-4 border-info">
            <h4 className="card-title p-2">Admin Profile:</h4>
            <div className="card-body text-center">
              <span>
                <img src={adminpic} width="200" height="200" alt ="images" className ="rounded rounded-circle"/>
              </span>
              <div className="pt-2 text-start">
                <p className="border border-info bg-light ps-2">Admin Name:- {admins.name}</p>
                <p className="border border-info bg-light ps-2">Admin Mail:- {admins.email}</p>
              </div>
              <div>
                <button type="button" className="btn btn-sm  btn-info m-3" href="#adminprofile"  data-bs-toggle = "collapse"  data-bs-target ="#adminprofile">Profile</button>
                <button className="btn btn-danger btn-sm m-3" type="button" onClick={Logout}>Logout</button>
              </div>
              <div className="container collapse"  aria-hidden="true" id="adminprofile">
                <form className="form-control text-start border border-2 border-info" onSubmit={profilechanged}>
                  <h5>Profile Editor:</h5>
                  <label className="form-label">Change name:</label>
                  <input type="text" name="name" className="form-control border border-info" onChange={profilechange}/>
                  <p className="text-danger">{error.name}</p>
                  <label className="form-label">Change email:</label>
                  <input type="text" name="email" className="form-control border border-info" onChange={profilechange}/>
                  <p className="text-danger">{error.email}</p>
                  <button className="btn btn-sm btn-success mt-2 " type="submit" >Change Profile</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container ">
        <div className="row">
          <div className="col mb-4">
            <h5 className="p-2 mt-3">Tickets Raised</h5>
            <table className="table table-light m-3 text-center border border-4 border-info">
              <thead>
                <th scope="col">Ticket Number</th>
                <th scope="col">Complaint</th>
                <th scope="col">Status</th>
              </thead>
              <tbody>
                {tickets.map(items=>
                  <tr className="border border-info">
                    <th key={items.id} scope="row">{items.id}</th>
                    <td>{items.complaint}</td>
                    <td>{items.status || "Ticket raised"}</td>
                  </tr>
                )}
                </tbody>
            </table>
          </div>
          <div className="col">
            <h5 className="p-2 mt-3">Tickets Transfered</h5>
            <table className="table table-light m-3 text-center border border-4 border-info">
              <thead>
                <th scope="col">Ticket Number</th>
                <th scope="col">Complaint</th>
                <th scope="col">Option</th>
              </thead>
              <tbody>
                {mytickets.map(item=>
                  <tr className="border border-info">
                  <th scope="row" key={item.id}>{item.id}</th>
                  <td>{item.complaint}</td>
                  <td>
                    <button className="btn btn-sm btn-success m-1" onClick={()=>{myticketpage(item.id)}}>Accept</button>
                    <button className="btn btn-sm btn-danger m-1">Reject</button>
                  </td>
                </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="p-4 container-fluid bg-dark text-light">
        <p className="text-center">@2024 creater</p>
      </div>
    </div>
  )
}
import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import employeepic from "../images/employees.jfif";
import logo from "../images/lodgo.png";
import axios from "axios";
export default function EmployeeHome(){
  const [employees,setEmployees] = useState ({id:'',name:'',email:'',department:'',role:''});
  const [tickets, setTickets] = useState([]);
  const [unordertickets,setUnordertickets] = useState([]);
  const [mytickets, setMytickets] = useState([]);
  const [error, setError] = useState({head:'',name:'',email:''});
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
  const navigate = useNavigate();
  const loggedin = localStorage.getItem('LoggedinEmployee');

  useEffect(() => {
    axios.get('http://localhost:7000/loggedinEmployee')
      .then(response=>{
        setEmployees(response.data[0])     
      })
      .catch(error=>{
        console.error(error);
      })
  }, [])

  useEffect(() => {
    if (employees.department === "Department - 1") {
      axios.get('http://localhost:7000/department1tickets')
      .then(response=>{
        setUnordertickets(response.data);
        setMytickets(unordertickets.filter(ticket=>ticket.employeeid === employees.id && ticket.status !== "Moved to Admin"));
        setTickets(unordertickets.filter(item=>item.employeeid === null));  
      })
      .catch(error=>{
        console.error(error);
      })
    } else if (employees.department === "Department - 2"){
      axios.get('http://localhost:7000/department2tickets')
      .then(response=>{
        setUnordertickets(response.data);
        setMytickets(unordertickets.filter(ticket=>ticket.employeeid === employees.id && ticket.status !== "Moved to Admin"));
        setTickets(unordertickets.filter(item=>item.employeeid === null));  
      })
      .catch(error=>{
        console.error(error);
      })
    } else if(employees.department === "Department - 3"){
      axios.get('http://localhost:7000/department3tickets')
      .then(response=>{
        setUnordertickets(response.data);
        setMytickets(unordertickets.filter(ticket=>ticket.employeeid === employees.id && ticket.status !== "Moved to Admin"));
        setTickets(unordertickets.filter(item=>item.employeeid === null));  
      })
      .catch(error=>{
        console.error(error);
      })
    }
  },[employees,]);

useEffect(() => {
  if (!loggedin) {
    navigate('/');
  };
}, [navigate,loggedin]);

  const Logout =()=>{
    alert('Logging Out!');
    localStorage.removeItem('LoggedinEmployee');
    navigate('/');
  };

  const profilechange = (event) =>{
      const {name,value} = event.target;
      setEmployees({...employees,[name]:value});
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
    if (Validation()) {
      axios.post('http://localhost:7000/employee',employees)
      .then(response=>{
        console.log(response);
      })
      .catch(error=>{
        console.error(error);
      })
    }
  };

  const Validation = () =>{
    var isValid = true;
    const errors ={head:'',name:'',email:''};
    if (employees.name === '') {
      errors.name = 'Enter the new name';
      isValid = false;
    } else {
      errors.name = '';
      isValid = true;
    }
    if (employees.email === '') {
      errors.email = 'Enter the new email';
      isValid = false;
    } else if (!emailRegex.test(employees.email)) {
      errors.email = 'Enter the proper email';
      isValid = false;
    } else {
      errors.email = ''
      isValid = true;
    }
    setError(errors);
    return isValid;
  };

  const Acceptticket =(id)=>{ 
    const ids = {"ticid":id ,"empid": employees.id}; 
    axios.post('http://localhost:7000/employeetickets',ids)
      .then(response=>{
        console.log(response.data);     
      }) 
      .catch(error=>{  
        console.error(error); 
      })
      setTickets(tickets.filter(ticket=>ticket.id !== id));
  };

  const ticketdeclined =(id)=>{  
    axios.post('http://localhost:7000/declinedtickets',{id})
      .then(response=>{
        console.log(response.data);     
      }) 
      .catch(error=>{  
        console.error(error); 
      })
      setTickets(tickets.filter(ticket=>ticket.id !== id));
  };

  const ticketclosed =(id)=>{
    axios.post('http://localhost:7000/closeticket',{id})
      .then(response=>{
        console.log(response.data);     
      }) 
      .catch(error=>{  
        console.error(error); 
      })
      setMytickets(mytickets.filter(ticket=>ticket.id !== id));
  };

  const ticketmoved = (id) =>{
    axios.post('http://localhost:7000/ticketmovedadmin',{id})
      .then(response=>{
        console.log(response.data);     
      }) 
      .catch(error=>{  
        console.error(error); 
      })
      setMytickets(mytickets.filter(ticket=>ticket.id !== id));
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
      <header className ="container mt-2 py-2 header  border border-2 border-info">
        <div className="row">
          <div className="col">
            <h5 className="text-center" >Hello Employee!</h5>
            <h6 className="text-center" >Welcome to the Home page of ticket closer!</h6>
          </div>
          <div className="col-1">
            <button  className="btn btn-sm btn-info" data-bs-toggle="offcanvas" data-bs-target="#settings" aria-controls="settings">Settings</button>
          </div>
        </div>
      </header>
      <div className="offcanvas offcanvas-start" tabindex="-1" id="settings" aria-labelledby="settings">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="settings">Settings</h5>
          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <div>
            This settings helps employee to Edit their profile and Logout !
          </div>
          <div>
            <button type="button" className="btn btn-sm  btn-info m-3" href="#employeeprofile"  data-bs-toggle = "collapse"  data-bs-target ="#employeeprofile">Edit Profile</button>
            <button className="btn btn-danger btn-sm m-3" type="button" onClick={Logout}>Logout</button>
          </div>
          <div className="container collapse"  aria-hidden="true" id="employeeprofile">
            <form className="form-control text-start"  onSubmit={profilechanged}>
              <h5>Profile Editor:</h5>
              <label className="form-label">Change name:</label>
              <input type="text" name="name" className="form-control" onChange={profilechange}/>
              <p className="text-danger">{error.name}</p>
              <label className="form-label">Change email:</label>
              <input type="text" name="email" className="form-control" onChange={profilechange}/>
              <p className="text-danger">{error.email}</p>
              <button className="btn btn-sm btn-success mt-2 " type="submit">Change Profile</button>
            </form>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-4 card m-4 border border-4 border-secondary rounded bg-info">
            <h4 className="card-title p-2">Employee Profile:</h4>
            <div className="card-body text-center">
              <span>
                <img src={employeepic} width="200" height="200" alt ="images" className ="rounded rounded-circle"/>
              </span>
              <div className="pt-2 text-start">
                <p className="border border-secondary bg-light ps-2 rounded">Employee ID:- {employees.id}</p>
                <p className="border border-secondary bg-light ps-2 rounded">Employee Name:- {employees.name}</p>
                <p className="border border-secondary bg-light ps-2 rounded">Employee Mail:- {employees.email}</p>
                <p className="border border-secondary bg-light ps-2 rounded">Department :- {employees.department}</p>
                <p className="border border-secondary bg-light ps-2 rounded">Role :- {employees.role}</p>
              </div>
            </div>
          </div>
          <div className="container col-6 mt-4">
            <h5 >TicketRaised</h5>
            <div >
              <table className="table table-info border border-3 border-info  m-3 text-center">
                <thead className="border border-3 border-info">
                  <tr className="text-center">
                    <th scope="col">Ticket Number</th>
                    <th scope="col">Complaint</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map(items=>
                    <tr key={items.id}>
                      <th>{items.id}</th>
                      <td>{items.complaint}</td>
                      <td>
                        <button className="btn btn-sm btn-success m-1" onClick={()=>Acceptticket(items.id)}>Accept</button>
                        <button className="btn btn-sm btn-danger m-1" onClick={()=>{ticketdeclined(items.id)}}>Decline</button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="container text-dark">
              <p>Working tickets are solved within a week or reported to Admin about the issue <button href="#mytickets" className="btn btn-sm btn-info" data-bs-toggle = "collapse"  data-bs-target ="#mytickets">Working Ticket's</button> </p>
            </div>
          </div>
          <div className="container collapse" aria-hidden="true" id="mytickets">
            <h5 className="text-center">Working</h5>
              <table className="table table-info border border-4 border-info text-center">
                <thead className="border border-3 border-info text-center">
                  <tr>
                    <th scope="col">Ticket Number</th>
                    <th scope="col">User Name</th>
                    <th scope="col">User Email</th>
                    <th scope="col">Complaint</th>
                    <th scope="col">Screenshots</th>
                    <th scope="col">Solution</th>
                    <th scope="col">Ticket Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mytickets.map(items=>
                    <tr className="border border-info">
                      <td>{items.id}</td>
                      <td>{items.username}</td>
                      <td>{items.useremail}</td>
                      <td>{items.complaint}</td>
                      <td><img src={'http://localhost:7000/images/' + items.screenshots} alt="No screenshots" width={35} height={30}/></td>
                      <td><textarea name="solution"/></td>
                      <td>
                        <button className="btn btn-sm btn-success m-1" onClick={()=>ticketclosed(items.id)}>Close ticket</button>
                        <button className="btn btn-sm btn-danger m-1" onClick={()=>ticketmoved(items.id)}>Move to Admin</button>
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
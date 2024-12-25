import React,{useState,useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../images/lodgo.png";
import userpic from "../images/users.jpg";
import ticketraise from "../images/ticketraise.png";
import myticket from "../images/myticket.jfif";
export default function UserHome() {

  const [user, setUser] = useState({id:'',name:'',email:'',department:'',password:'',role:''});
  const [error, setError] = useState({head:'',name:'',email:''});
  const idcreater = Math.floor(Math.random()*9000+10000);
  const [ticket, setTicket] = useState({id:null,  username:'' , useremail:'' , department:'' , complaint:'',screenshot:''});
  const [ticketerror, setTicketerror] = useState({head:'', department:'' , complaint:''});
  const [tickets, setTickets] = useState([]);
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
  const navigate = useNavigate();
  const loggedin = localStorage.getItem('LoggedinUser');

  useEffect(() => {
    axios.get('http://localhost:7000/loggedinUser')
      .then(response=>{
        setUser(response.data[0]);
        console.log(response.data);       
      })
      .catch(error=>{
        console.error(error);
      })
  }, [loggedin]);

  useEffect(() => {
    if (!loggedin) {
      navigate('/');
    };
  }, [navigate,loggedin]);
  
  const Logout =()=>{
    alert('Logging Out!');
    localStorage.removeItem('LoggedinUser');
    navigate('/');
  };

  const profilechange = (event) =>{
    const {name,value} = event.target;
    setUser({...user,[name]:value});
    Validateprofile(name,value);
};

  const ticketchange = (event) =>{
    const name = event.target.name;
    const value = event.target.type === 'file' ? event.target.files[0] : event.target.value;
    setTicket({...ticket,id:idcreater,username:user.name,useremail:user.email,[name]:value});
    Validateticket(name,value);
  };

const Validateprofile =(name,value)=>{
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

const Validateticket =(name,value)=>{
  const errors ={head:'', department:'' , complaint:''};
  switch (name) {
    case 'department':
      if (value === '') {
        errors.department = 'Select the department!';          
      } else {
        errors.department = '';
      }
      break;
    case 'complaint':
      if (value === '') {
        errors.complaint = 'Enter the complaint or Issue!';
      } else {
        errors.complaint = '';
      }
      break;       
    default:
      break;
  };
  setTicketerror(errors);
};

const profilechanged = (event)=>{
  event.preventDefault();
  if (Validationprofile(user)){
    axios.post('http://localhost:7000/user',user)
    .then(response=>{
      console.log(response);
    })
    .catch(error=>{
      console.error(error);
    })
  };
};

const config = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
};

const ticketchanged = (event)=>{
  event.preventDefault();
  if (Validationticket) {
    axios.post('http://localhost:7000/Tickets',ticket,config)
    .then(response=>{
      console.log(response.data);
    })
    .catch(error=>{
      console.error(error);
    })
    alert("Ticket Succesfully Raised!");
  }
};

const Validationprofile = () =>{
  var isValid = true;
  const errors ={head:'',name:'',email:''};
  if (user.name === '') {
    errors.name = 'Enter the new name';
    isValid = false;
  } else {
    errors.name = '';
    isValid = true;
  }
  if (user.email === '') {
    errors.email = 'Enter the new email';
    isValid = false;
  } else if (!emailRegex.test(user.email)) {
    errors.email = 'Enter the proper email';
    isValid = false;
  } else {
    errors.email = ''
    isValid = true;
  }
  setError(errors);
  return isValid;
};

const Validationticket = () =>{
  var isValid = true;
  const errors ={head:'',department:'',complaint:''};
  if (ticket.department === '') {
    errors.department = 'Select the department';
    isValid = false;
  } else {
    errors.department = '';
    isValid = true;
  }
  if (ticket.complaint === '') {
    errors.complaint = 'Enter the comlaint or issue';
    isValid = false;
  } else {
    errors.complaint = '';
    isValid = true;
  }
  setTicketerror(errors);
  return isValid;
};

const getTickets =()=>{
  axios.put('http://localhost:7000/userTickets',user)
  .then(response=>{
    setTickets(response.data);
    console.log(response.data);       
  })
  .catch(error=>{
    console.error(error);
  })
}

  return (
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
        <div className="row">
          <div className="col">
            <h5 className="text-center" >Hello User!</h5>
            <h6 className="text-center" >Welcome to the Home page of ticket raiser!</h6>
          </div>
          <div className="col-1">
            <button  className="btn btn-sm btn-dark text-light" data-bs-toggle="offcanvas" data-bs-target="#settings" aria-controls="settings">Settings</button>
          </div>
        </div>
      </header>
      <div className="offcanvas offcanvas-start" tabindex="-1" id="settings" aria-labelledby="settings">
        <div className="offcanvas-header bg-light">
          <h5 className="offcanvas-title" id="settings">Settings</h5>
          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body bg-light">
          <div>
            This settings helps Users to Edit their profile and Logout !
          </div>
          <div>
            <button type="button" className="btn btn-sm  btn-info m-3" href="#userprofile"  data-bs-toggle = "collapse"  data-bs-target ="#userprofile">Profile</button>
            <button className="btn btn-danger btn-sm m-3" type="button" onClick={Logout} >Logout</button>
          </div>
          <div className="container collapse"  aria-hidden="true" id="userprofile">
            <form className="form-control text-start bg-light border border-info border-3"  onSubmit={profilechanged}>
              <h5>Profile Editor:</h5>
              <label className="form-label">Change name:</label>
              <input type="text" name="name" className="form-control border border-info" onChange={profilechange}/>
              <p className="text-danger">{error.name}</p>
              <label className="form-label">Change email:</label>
              <input type="text" name="email" className="form-control border border-info" onChange={profilechange}/>
              <p className="text-danger">{error.email}</p>
              <button className="btn btn-sm btn-success mt-2 " type="submit">Change Profile</button>
            </form>
          </div>
        </div>
      </div>
      <div className ="container my-3 text-dark mt-4">
        <div className ="row">
          <div className ="container-fluid col-5">
            <div className = "card border border-info border-4">
              <h2 className ="card-title p-2">Welcome {user.name}!</h2>
              <div className ="card-body text-center">
                <span>
                  <img src={userpic} width="200" height="200" alt ="images" className ="rounded rounded-circle"/>
                </span>
                <div className="container text-start">
                  <h4 className="text-center">User Information!</h4>
                  <p className="border border-info ps-2">User ID: {user.id} </p>
                  <p className="border border-info ps-2">Role: {user.role} </p>
                  <p className="border border-info ps-2">Email Address: {user.email} </p>              
                </div>
              </div>
            </div>
          </div>
          <div className ="container-fluid col-7 ">
            <div className ="container card row pb-3 border border-4 border-info">
              <h4 className ="card-title">List of Contents:</h4>
              <div className ="row">
                <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <img src={ticketraise} width={200} height={300} className="d-block w-100 " alt="raiseTicket"/>
                      <div className="ps-3 text-center border border-info text-dark">
                        <a href="#ticketRaise" className="text-dark" data-bs-toggle ="collapse" data-bs-target ="#ticketRaise">
                          <h5><b>Raise A Ticket</b></h5>
                        </a>
                        <p>For any issues and machine problem.Click raise a ticket </p>
                      </div>
                    </div>
                    <div className="carousel-item">
                      <img src={myticket} width={200} height={300}  className="d-block w-100 " alt="ticketStatus"/>
                      <div className="ps-3 text-center border border-info text-dark">
                        <a href="#ticketStatus" className=" text-dark" data-bs-toggle ="collapse" data-bs-target = "#ticketStatus" onClick={getTickets}>
                          <h5><b>Ticket status</b></h5>
                        </a>
                        <p>To know the status of previous tickets.Click Ticket status</p>
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
            <div className="container  mt-3 collapse" aria-hidden="true" id="ticketRaise" >
              <form className="form-control border border-info border-4" onSubmit={ticketchanged} encType="multipart/form-data">
                <div className="row">
                  <h5 className="text-center">Ticket Raiser</h5>
                <div className="container col-6">
                <label>Email:</label>
                <input name="email" value={user.email} className="form-control border border-info" disabled/>
                </div>
                <div className="container col-6">
                <label>User Name:</label>
                <input name="name" value={user.name} className="form-control border border-info" disabled/>
                </div><br />
                <div className="container col-12">
                  <label className="form-label">Department: 
                    <select name="department" className="form-control border border-info" onChange={ticketchange}>
                      <option>Department - 1</option>
                      <option>Department - 2</option>
                      <option>Department - 3</option>
                    </select>
                  </label>
                  <p className="text-danger">{ticketerror.department}</p>
                </div>
                <div className="container col-12">
                 <label>Ticket notes:</label>
                 <textarea name="complaint" rows={3} className="form-control border border-info" onChange={ticketchange}/>
                 <p className="text-danger">{ticketerror.complaint}</p> 
                </div>
                <div className="container col-12">
                  <label>Screenshots:</label>
                  <input type="file" name="screenshot" className="form-control border border-info" onChange={ticketchange}/>
                </div>
                <div className="container col-12 mt-2 text-center">
                  <button type="submit" className="btn btn-success ">Raise Ticket</button>
                </div>
                </div>
              </form>
            </div>
            <div className="container mt-3 collapse" aria-hidden="true" id="ticketStatus" >
              <div className="container-fluid">
              <h5 className="text-center">TICKETS STATUS</h5>
                <table className="table bg-light border border-2 border-info">
                  <thead>
                    <tr className="text-center">
                      <th scope="col">Ticket Number</th>
                      <th scope="col">Ticket Data</th>
                      <th scope="col">Ticket Department</th>
                      <th scope="col">Ticket Status</th>
                    </tr>
                  </thead>
                 <tbody className="text-center">
                  {tickets.map(items=>
                    <tr>
                      <th scope="row" key={items.id}>{items.id}</th>
                      <td>{items.complaint}</td>
                      <td>{items.department}</td>
                      <td>{items.status || "Ticket Raised"}</td>
                    </tr>
                  )}
                 </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 mt-4 container-fluid bg-dark text-light">
        <p className="text-center">@2024 creater</p>
      </div>
    </div>
  );
}
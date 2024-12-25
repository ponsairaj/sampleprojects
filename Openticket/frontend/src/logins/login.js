import React,{useState,useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../images/lodgo.png";
import axios from "axios";

export default function Logins(){

  const [values,setValues] = useState([]);
  const [type, setType] = useState("password");
  const [logins, setLogins] = useState({role:'',email:'',password:''});
  const [error, setError] = useState({head:'', role:'',email:'',password:''});
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
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
  });

  useEffect(() => {
    axios.get('http://localhost:7000/registers')
    .then(response=>{ 
      setValues(response.data);
    })
    .catch(error=>{
      console.error(error);
    })
  },[logins.role]);
  

  const handleChange =(event)=>{
    const {name,value} = event.target;
    setLogins({...logins,[name]:value});
    Validate(name,value);
  };

  const Home=()=>{
    navigate('/');
  }

  const Validate = (name,value)=>{
    const errors = {role:'',email:'',password:''};
    switch (name) {
      case 'role':
        if (value === ''|| value === 'Select the role') {
          errors.role = 'Role cannot be empty';
        } else {
          errors.role = '';
        }
        break;

      case 'email':
        if (value === '') {
          errors.email = 'Email cannot be empty';
        } else if (!emailRegex.test(value)) {
          errors.email = 'Enter a valid email';
        } else{
          errors.email = '';
        }
        break;
      
      case 'password':
        if (value === '') {
          errors.password = 'Password cannot be empty';
        } else  if (!passwordRegex.test(value)){
          errors.password = 'A password must contain uppercase,lowercase,special character and a number';
        } else{
          errors.password = '';
        }
        break;  

      default:
        break;
    }
    setError(errors);
  };

  const handdleSubmit = (event)=>{
    event.preventDefault();
    if (Validation()) {
      loggedin();
      if (logins.role === 'user') {
        axios.put('http://localhost:7000/loggedinUser',logins)
        .catch(error=>{
          console.error(error);
        })
      } else if (logins.role === 'employee'){
        axios.put('http://localhost:7000/loggedinEmployee',logins)
        .catch(error=>{
          console.error(error);
        })
      } else{
        axios.put('http://localhost:7000/loggedinAdmin',logins)
        .catch(error=>{
          console.error(error);
        })
      }
    };
  };

  const loggedin =()=>{
    if (logins.role === 'admin') {
      navigate('/Admin');
      alert("Welcome Admin !");
      localStorage.setItem("LoggedinAdmin",logins.email);
    } else if (logins.role === 'employee') {
      navigate('/Employee');
      alert("Welcome Employee !");
      localStorage.setItem("LoggedinEmployee",logins.email);
    } else {
      navigate('/User');
      alert("Welcome User !");
      localStorage.setItem("LoggedinUser",logins.email);
    }
  };

  const Validation = ()=>{
    var isValid = true;
    const Error = {head:'',role:'',email:'',password:''};
    if (logins.role === '' || logins.role === 'Select the role') {
      Error.role = 'Role cannot be empty';
      isValid = false;
    } else {
      Error.role = '';
      isValid = true;
    };
    if (logins.email === '') {
      Error.email = 'Email cannot be empty';
      isValid = false;
    } else if (!emailRegex.test(logins.email)) {
      Error.email = 'Enter a valid email';
      isValid = false;
    } else {
      Error.email = '';
      isValid = true;
    };
    if (logins.password === '') {
      Error.password = 'Password cannot be empty';
      isValid = false;
    } else if(!passwordRegex.test(logins.password)) {
      Error.password = 'A password must contain uppercase,lowercase,special character and a number';
      isValid = false;
    } else {
      Error.password = '';
      isValid = true;
    };
    if(!values.some(data=>data.role === logins.role && data.email === logins.email && data.password === logins.password)){
      Error.head = 'Enter the registered information';
      isValid = false;
    } else{
      Error.head = '';
      isValid = true;
    }
    setError(Error);
    return isValid;  
  };

  return(
    <div className="App text-light">
      <div className="container-fluid py-3 bg-dark text-light">
        <div className="row">
          <div className="col-2">
            <span>
              <img src={logo} height={50} width={50} className="rounded " alt="Logo" onClick={Home}/>
            </span>
          </div>
          <div className="col-8">
            <h2 className="text-center">OPEN TICKETS</h2>
          </div>
        </div>
      </div>
      <div className="container-fluid bg-dark text-light py-2 ">
        <div className="row">
          <p className="text-center col-10 ps-5 ms-3">Caution : Only registered can Login, want to register click the register button </p>
          <div className="col text-end">
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
        </div>
      </div>
      <div className="container ">
        <div className="container mt-4">
          <div className="row justify-content-center">
            <div className="col-6 ">
              <form className="form-control position-center border border-4 border-info my-3" onSubmit={handdleSubmit}>
                <h5>LOGIN FORM :</h5>
                <div className="container"> 
                  <p className="text-danger">{error.head}</p>
                  <div className="col">
                    <label className="form-label ">Role:</label> 
                    <select name="role" onChange={handleChange} className="form-control border border-info">
                      <option>Select the role</option>
                      <option>user</option>
                      <option>employee</option>
                      <option>admin</option>
                    </select>
                    <p className="text-danger">{error.role}</p>
                  </div>
                  <div className="col ">
                    <label className="form-label">Email:</label>
                    <input type="text" name="email"  onChange={handleChange} className="form-control  border border-info" />
                    <p className="text-danger">{error.email}</p>
                  </div>
                  <div className=" col">
                    <label className="form-label">Password:</label>
                    <input type={type} name="password"  onChange={handleChange} className="form-control  border border-info"/>
                    <p className="text-danger">{error.password}</p>
                    <input type="checkbox" onClick={() => setType(type === 'password' ? 'text' : 'password')} className=" border border-info"/> Show Password
                  </div>
                  <div className="container col-6 text-center mt-5 p-2">
                      <button className="btn btn-info btn-md" type="submit">Login</button>
                  </div>
                </div>
              </form>
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
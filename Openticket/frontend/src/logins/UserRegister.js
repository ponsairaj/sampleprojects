import React,{useState,useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import logo from "../images/lodgo.png";

export default function Userreg(){

  const [userdata,setUserdata] = useState({id:'',name:'',email:'',password:'',confirmpassword:''});
  const [error,setError] = useState({head:'', id:'',name:'',email:'',password:'',confirmpassword:''});
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
  const navigate = useNavigate();
  const loggedinuser = localStorage.getItem('LoggedinUser');
  const loggedinadmin = localStorage.getItem('LoggedinAdmin');
  const loggedinemployee = localStorage.getItem('LoggedinEmployee');
  const idcreator = Math.floor(Math.random()*9000+10000);

  useEffect(() => {
    if (loggedinadmin) {
      navigate('/admin')
    } else if (loggedinemployee) {
      navigate('/employee')
    } else if (loggedinuser) {
      navigate('/user')
    }
  });

  const handleChange =(event)=>{
    const {name,value} = event.target;
    setUserdata({...userdata,id:idcreator,[name]:value});
    Validate(name,value);
  };

  const Validate = (name,value)=>{
    const errors = {head:'', id:'',name:'',email:'',password:'',confirmpassword:''};
    switch (name) {

      case 'name':
        if (value === '') {
          errors.name = 'User name cannot be empty';
        } else {
          errors.name = '';
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
        
      case 'confirmpassword':
        if (value === '') {
          errors.confirmpassword = 'Confirmpassword cannot be empty'; 
        } else if(value !== userdata.password){
          errors.confirmpassword = 'Password does not match';
        } else {
          errors.confirmpassword = '';
        }
        break;

      default:
        break;
    }
    setError(errors);
  };

  const handleSubmit =(event)=>{
    event.preventDefault();
    if (Validation()) {
      axios.post('http://localhost:7000/userregistery', userdata)
        .then(response => {
          console.log(userdata);
          setUserdata({id:'',name:'',email:'',password:'',confirmpassword:''}); 
          alert('Registered Successfully');
          navigate('/');
        })
        .catch(error => {
          console.error(error);
          setError({ head: 'Registration failed. Please try again.' });
        }); 
    }
  };
  
  const Validation = ()=>{
    var isValid = true;
    const Error = {head:'', id:'',name:'',email:'',password:'',confirmpassword:''};
    if (userdata.name === '') {
      Error.name = 'User name cannot be empty';
      isValid = false;
    } else {
      Error.name = '';
      isValid = true;
    };
    if (userdata.email === '') {
      Error.email = 'Email cannot be empty';
      isValid = false;
    } else if (!emailRegex.test(userdata.email)) {
      Error.email = 'Enter a valid email';
      isValid = false;
    } else {
      Error.email = '';
      isValid = true;
    };
    if (userdata.password === '') {
      Error.password = 'Password cannot be empty';
      isValid = false;
    } else if(!passwordRegex.test(userdata.password)) {
      Error.password = 'A password must contain uppercase,lowercase,special character and a number';
      isValid = false;
    } else {
      Error.password = '';
      isValid = true;
    };
    if (userdata.confirmpassword === '') {
      Error.confirmpassword = 'Confirmpassword cannot be empty';
      isValid =false;
    } else if(userdata.confirmpassword !== userdata.password) {
      Error.confirmpassword = 'Password does not match';
      isValid = false;
    } else {
      Error.confirmpassword = '';
      isValid = true;
    }
    setError(Error);
    return isValid;  
  };

  const Home=()=>{
    navigate('/')
  };

  return(
    <div className="App text-light">
      <div className="container-fluidd py-3 bg-dark text-light">
        <div className="row">
            <span className="col">
              <img src={logo} height={50} width={50} className="rounded " alt="Logo" onClick={Home}/>
            </span>
          <h2 className="col-7 text-start">OPEN TICKETS</h2>
        </div>
      </div>
        <div className="container ">
          <div className=" mt-4 row align-items-center">
            <div className="container col-6">
              <form className="form-control border border-4 border-info my-3 bg-light" onSubmit={handleSubmit}>
                <h5>USER REGISTER:</h5>
                <p className="text-danger">{error.head}</p> 
                <div className="col">
                  <label className="form-label">User Name:</label> 
                  <input name="name" type="name" className="form-control border border-info" onChange={handleChange}/>
                  <p className="text-danger">{error.name}</p>
                </div>
                <div className="col">
                  <label className="form-label">Email:</label>
                  <input type="text" name="email" className="form-control border border-info" onChange={handleChange}/>
                  <p className="text-danger">{error.email}</p>
                </div>
                <div className="col">
                  <label className="form-label">Password:</label>
                  <input type="password" name="password" className="form-control border border-info" onChange={handleChange}/>
                  <p className="text-danger">{error.password}</p>
                </div>
                <div className="col">
                  <label className="form-label">Confirm Password:</label>
                  <input type="password" name="confirmpassword" className="form-control border border-info" onChange={handleChange}/>
                  <p className="text-danger">{error.confirmpassword}</p>
                </div>
                <div className="container col-6 text-center ">
                  <button className="btn btn-info btn-md" type="submit">Register</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="p-4 container-fluid  bg-dark text-light">
          <p className="text-center">@2024 creater</p>
        </div>
    </div>
  );
}
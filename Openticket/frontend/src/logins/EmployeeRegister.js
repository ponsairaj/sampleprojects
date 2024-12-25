import React,{useState,useEffect} from "react";
import axios from "axios";
import { useNavigate} from "react-router-dom";
import logo from "../images/lodgo.png";
export default function Employeereg(){

  const [employeedata,setEmployee] = useState({id:'',name:'',email:'',department:'',password:'',confirmpassword:''});
  const[error,setError] = useState({head:'', id:'',name:'',email:'',department:'',password:'',confirmpassword:''});
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
    setEmployee({...employeedata,id:idcreator,[name]:value});
    Validate(name,value);
  };
  
  const Validate = (name,value)=>{
    const errors = {head:'', id:'',name:'',email:'',department:'',password:'',confirmpassword:''};
      switch (name) {
  
        case 'name':
          if (value === '') {
            errors.name = 'Name cannot be empty';
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
        
        case 'department':
          if (value === '' || value === 'Select the department') {
            errors.department = 'Select the department';
          } else {
            errors.department = '';
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
          } else if(value !== employeedata.password){
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
      axios.post('http://localhost:7000/employeeregistery', employeedata)
        .then(response => {
          console.log(employeedata);
          setEmployee({id:'',name:'',email:'',department:'',password:'',confirmpassword:''}); 
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
    const Error = {head:'', id:'',name:'',email:'',department:'',password:'',confirmpassword:''};
      
    if (employeedata.name === '') {
      Error.name = 'Name cannot be empty';
      isValid = false;
    } else {
      Error.name = '';
      isValid = true;
    };
    if (employeedata.email === '') {
      Error.email = 'Email cannot be empty';
      isValid = false;
    } else if (!emailRegex.test(employeedata.email)) {
      Error.email = 'Enter a valid email';
      isValid = false;
    } else {
      Error.email = '';
      isValid = true;
    };
    if (employeedata.department === '' || employeedata.department === 'Select the department') {
      Error.department = 'Select the department';
      isValid = false;
    } else {
      Error.department = '';
      isValid = true;
    }
    if (employeedata.password === '') {
      Error.password = 'Password cannot be empty';
      isValid = false;
    } else if(!passwordRegex.test(employeedata.password)) {
      Error.password = 'A password must contain uppercase,lowercase,special character and a number';
      isValid = false;
    } else {
      Error.password = '';
      isValid = true;
    };
    if (employeedata.confirmpassword === '') {
      Error.confirmpassword = 'Confirmpassword cannot be empty';
      isValid =false;
    } else if(employeedata.confirmpassword !== employeedata.password) {
      Error.confirmpassword = 'Password does not match';
      isValid = false;
    } else {
      Error.confirmpassword = '';
      isValid = true;
    }
      setError(Error);
      return isValid;  
  };

  const Home =()=>{
    navigate('/');
  };
  
  return(
      <div className="App text-light">
        <div className="container-fluid py-3 bg-dark text-light">
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
                <h5>EMPLOYEE REGISTER:</h5>
                  <p className="text-danger">{error.head}</p>
                  <div className="col ">
                    <label className="form-label">Employee Name:</label> 
                    <input name="name" type="name" className="form-control border border-info" onChange={handleChange}/>
                    <p className="text-danger">{error.name}</p>
                  </div>
                  <div className="col">
                    <label className="form-label">Email:</label>
                    <input type="text" name="email" className="form-control border border-info" onChange={handleChange}/>
                    <p className="text-danger">{error.email}</p>
                  </div>
                  <div className="col">
                    <label className="form-label">Department:</label>
                    <select name="department" className="form-control border border-info" onChange={handleChange}>
                      <option>Select a department</option>
                      <option>Department - 1</option>
                      <option>Department - 2</option>
                      <option>Department - 3</option>
                    </select>
                    <p className="text-danger">{error.department}</p>
                  </div>
                  <div className=" col">
                    <label className="form-label">Password:</label>
                    <input type="password" name="password" className="form-control border border-info" onChange={handleChange}/>
                    <p className="text-danger">{error.password}</p>
                  </div>
                  <div className=" col">
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
          <div className="p-4 container-fluid bg-dark text-light">
            <p className="text-center">@2024 creater</p>
          </div>
      </div>
    );
}
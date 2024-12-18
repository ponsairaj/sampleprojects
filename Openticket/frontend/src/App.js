import './App.css';
import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserHome from './user/userHome';
import Routing from './logins/main';
import Logins from './logins/login';
import Userreg from './logins/UserRegister';
import Employeereg from './logins/EmployeeRegister';
import Adminreg from './logins/AdminRegister';
import EmployeeHome from './user/EmployeeHome';
import AdminHome from './user/AdminHome';
function App() {
  return(
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element ={<Routing />} />
        <Route path='/login' element ={<Logins />}/>
        <Route path='/UserRegistration' element = {<Userreg />}/>
        <Route path='/EmployeeRegistration' element = {<Employeereg />}/>
        <Route path='/AdministratorRegistration' element = {<Adminreg />}/>
        <Route path='/User' element ={<UserHome />} />
        <Route path='/Employee' element = {<EmployeeHome />} />
        <Route path='/Admin' element ={<AdminHome />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

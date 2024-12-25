import './App.css';
import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Routing from './logins/main';
import Logins from './logins/login';
import Userreg from './logins/UserRegister';
import Employeereg from './logins/EmployeeRegister';
import EmployeeHome from './Home/employeeHome';
import AdminHome from './Home/adminHome';
import UserHome from './Home/userHome';
import Admintickets from './Home/Admin/tickets';
import Adminregisters from './Home/Admin/registerlist';
import Security from './Home/Admin/Security';
function App() {
  return(
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element ={<Routing />} />
        <Route path='/login' element ={<Logins />}/>
        <Route path='/UserRegister' element = {<Userreg />}/>
        <Route path='/EmployeeRegister' element = {<Employeereg />}/>
        <Route path='/User' element ={<UserHome />} />
        <Route path='/Employee' element = {<EmployeeHome />} />
        <Route element = {<Security />}>
          <Route path='/Admin' element = {<AdminHome />} />
          <Route path='/Admintickets' element = {<Admintickets />}/>
          <Route path='/Adminregisters' element = {<Adminregisters />}/>
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

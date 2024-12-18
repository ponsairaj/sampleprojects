import React, { useState } from "react";

export default function Employeereg() {
  const [employee, setEmployee] = useState({
    id: '',
    name: '',
    department: '',
    email: '',
    password: '',
    confirmpassword: ''
  });

  const [error, setError] = useState({
    employeeid: '',
    employeename: '',
    department: '',
    email: '',
    password: '',
    confirmpassword: ''
  });

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value
    }));
    validateField(name, value);
  };

  const validateField = (name, value) => {
    const newErrors = { ...error };
    switch (name) {
      case 'id':
        newErrors.employeeid = value ? '' : 'Enter the ID of the employee!';
        break;
      case 'name':
        newErrors.employeename = value ? '' : 'Enter the employee name!';
        break;
      case 'department':
        newErrors.department = value && value !== 'Select Department' ? '' : 'Select the department!';
        break;
      case 'email':
        newErrors.email = value
          ? emailRegex.test(value) ? '' : 'Enter a valid email!'
          : 'Enter the email!';
        break;
      case 'password':
        newErrors.password = value
          ? passwordRegex.test(value) ? '' : 'Password must contain uppercase, lowercase, special character, and a number!'
          : 'Enter the password!';
        break;
      case 'confirmpassword':
        newErrors.confirmpassword = value
          ? value === employee.password ? '' : 'Passwords do not match!'
          : 'Confirm password cannot be empty!';
        break;
      default:
        break;
    }
    setError(newErrors);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isValidForm()) {
      console.log("Form submitted successfully", employee);
    }
  };

  const isValidForm = () => {
    const requiredFields = ['id', 'name', 'department', 'email', 'password', 'confirmpassword'];
    let isValid = true;
    const newErrors = { ...error };
    requiredFields.forEach((field) => {
      if (!employee[field]) {
        newErrors[field] = 'This field is required';
        isValid = false;
      }
    });
    setError(newErrors);
    return isValid;
  };

  return (
    <div className="App">
      <header className="container-fluid nv pb-2 header">
        <h1 className="row justify-content-center">Employee Registration</h1>
        <h4 className="row justify-content-center">Only Registered persons can Login!</h4>
      </header>
      <div className="container vh-100">
        <div className="container mt-4">
          <form className="form-control m-4" onSubmit={handleSubmit}>
            <h2>Employee Registration:</h2>
            <div className="row">
              <div className="p-4 col-6">
                <label className="form-label">Employee ID:</label>
                <input type="number" name="id" className="form-control" onChange={handleChange} />
                <p className="text-danger">{error.employeeid}</p>
              </div>
              <div className="col-6 p-4">
                <label className="form-label">Employee Name:</label>
                <input name="name" type="text" className="form-control" onChange={handleChange} />
                <p className="text-danger">{error.employeename}</p>
              </div>
              <div className="col-6 p-4">
                <label className="form-label">Department:</label>
                <select name="department" className="form-control" onChange={handleChange}>
                  <option>Select Department</option>
                  <option>Department-1</option>
                  <option>Department-2</option>
                  <option>Department-3</option>
                </select>
                <p className="text-danger">{error.department}</p>
              </div>
              <div className="col-6 p-4">
                <label className="form-label">Email:</label>
                <input type="text" name="email" className="form-control" onChange={handleChange} />
                <p className="text-danger">{error.email}</p>
              </div>
              <div className="p-4 col-6">
                <label className="form-label">Password:</label>
                <input type="password" name="password" className="form-control" onChange={handleChange} />
                <p className="text-danger">{error.password}</p>
              </div>
              <div className="p-4 col-6">
                <label className="form-label">Confirm Password:</label>
                <input type="password" name="confirmpassword" className="form-control" onChange={handleChange} />
                <p className="text-danger">{error.confirmpassword}</p>
              </div>
              <div className="container col-6 text-center mt-5 p-2">
                <button type="submit" className="btn btn-success btn-md">Register</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <footer className="nv container-fluid p-3">
        <h3 className="row justify-content-center">End of the page!!</h3>
      </footer>
    </div>
  );
}

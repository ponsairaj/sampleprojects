import React from "react";
import { Outlet,Navigate } from "react-router-dom";

export default function Security (){

  const admin = localStorage.getItem("LoggedinAdmin");

  return admin ? <Outlet /> : <Navigate to="/" />
};
import React from "react";
import { Redirect, useLocation } from "react-router-dom";

export default function Protected({ children }) {
  const token = localStorage.getItem("token");
  const location = useLocation();
  if (token) {
    console.log(children.type.name);
    if (children.type.name === "Register" || children.type.name === "Login") {
      return <Redirect to="/" state={{ from: location }} />;
    }
    return children;
  } else {
    if (children.type.name === "Register" || children.type.name === "Login") {
      return children;
    }
    return <Redirect to="/login" state={{ from: location }} />;
  }
  //   return <div>Protected</div>;
}

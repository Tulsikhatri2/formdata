import React, { useState } from "react";
import Login from "./Components/Login";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { Routes, Route } from "react-router-dom";
import Form from "./Components/Form";
import Home from "./Components/Home";
import PrivateRoutes from "./Components/PrivateRoutes";

function App() {

  const [loggedIn, setLoggedIn] = useState(false)
  console.log(loggedIn)
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login isLoggedIn={loggedIn}/>}/>
        <Route path="/form" element={<PrivateRoutes Component={Form} isLoggedIn={loggedIn}/>}/>
      </Routes>
    </>
  );
}

export default App;

import React from "react";
import Login from "../view/login"
import Listpage from "../view/listpage"
import Adduser from "../view/adduser"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";


export default function() {


    return (
        <Router>
           <Routes>
              <Route exact path="/" element={<Login/>} />
              <Route exact path="/listpage" element={<Listpage/>} />
              <Route exact path="/adduser" element={<Adduser/>} />
           </Routes>
        </Router>
       )
}


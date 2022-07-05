import React from "react";
import ReactDOM from "react-dom/client";
import Demo from "./routes/index";
import './index.css';


// ReactDOM.render(<Demo />, document.querySelector("#root")); 
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Demo />);

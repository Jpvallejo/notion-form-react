import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Form } from "./Form";
import { UploadFileForm } from "./UploadFileForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" Component={Form} />
          <Route path="/file" Component={UploadFileForm} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

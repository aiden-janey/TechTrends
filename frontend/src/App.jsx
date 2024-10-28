import React, { Component } from "react";
import Home from "./pages/Home";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./shared/NavBar";
import ErrorPage from "./pages/ErrorPage";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import JobsList from "./pages/Jobs/JobsList";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavBar />
        <div className="container-fluid">
          <Routes>
            <Route path="/" exact Component={Home} />
            <Route path="/about" exact Component={About} />
            <Route path="*" exact Component={ErrorPage} />
            <Route path="/login" exact Component={Login} />
            <Route path="/signup" exact Component={Signup} />
            <Route path="/jobs/list" exact Component={ErrorPage} />
            <Route path="/tech/list" exact Component={ErrorPage} />
            <Route path="/users/list" exact Component={ErrorPage} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

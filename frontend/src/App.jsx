import React, { Component } from "react";
import Home from "./pages/Home";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./shared/NavBar";
import ErrorPage from "./pages/ErrorPage";
import Jobs from "./pages/Jobs";
import Technologies from "./pages/Technologies";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavBar />
        <div className="container-fluid">
          <Routes>
            <Route path="/" exact Component={Home} />
            <Route path="/jobs" exact Component={Jobs} />
            <Route path="/tech" exact Component={Technologies} />
            <Route path="/about" exact Component={About} />
            <Route path="/contact" exact Component={Contact} />
            <Route path="*" exact Component={ErrorPage} />
            <Route path="/login" exact Component={Login} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

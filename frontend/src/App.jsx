import React, { Component } from "react";
import "./App.css";
import Home from "./pages/Home";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./shared/NavBar";
import ErrorPage from "./pages/ErrorPage";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavBar />
        <div className="container-fluid">
          <Routes>
            <Route path="/" exact Component={Home} />
            <Route path="*" exact Component={ErrorPage} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

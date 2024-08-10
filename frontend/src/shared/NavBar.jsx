import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      login: "localhost:3000/login",
      signup: "localhost:3000/signup",
      home: "localhost:3000/",
    };
  }
  render() {
    return (
      <div className="container">
        <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
          <div className="col-md-3 mb-2 mb-md-0">
            <Link
              to="/"
              className="d-inline-flex link-body-emphasis text-decoration-none"
            >
              <img
                src=""
                to="/"
                className="bi"
                width="40"
                height="32"
                aria-label="TechTrends"
                alt="Logo"
              />
            </Link>
          </div>

          <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
            <li className="nav-item dropdown">
              <Link
                to="/jobs"
                className="nav-link px-2 dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Jobs
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/jobs/list">
                    View Jobs
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/jobs/positions">
                    Frequent Positions
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/jobs/cities">
                    Frequent Cities
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/jobs/salary">
                    Average Salary by Position
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link px-2 dropdown-toggle"
                to="tech"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Technologies
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/tech/lang">
                    Proportion of Languages
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/tech/db">
                    Frequency of Databases
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/tech/lib">
                    Frequency of Frameworks & Libraries
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/tech/tools">
                    Proportion of Tooling
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/about" className="nav-link px-2">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="nav-link px-2">
                Contact
              </Link>
            </li>
          </ul>
          <div className="col-md-3 text-end">
            <Link to="/login" className="btn btn-outline-primary me-2">
              Login
            </Link>
            <Link to="/signup" className="btn btn-primary me-2">
              Sign-up
            </Link>
          </div>
        </header>
      </div>
    );
  }
}

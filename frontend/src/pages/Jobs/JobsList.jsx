import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class JobsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      selectedJob: null,
    };
  }

  render() {
    return (
      <>
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border">
            <div className="col-md-3 text-center border">
              {this.state.jobs.map((job) => {
                return (
                  <Link
                    className="card"
                    onClick={this.setState({ selectedJob: job })}
                  >
                    <div className="card-body">
                      <h5 className="card-title">{job.position}</h5>
                      <h6 className="card-subtitle mb-2 text-body-secondary">
                        {job.company}
                      </h6>
                      <p className="card-text">{job.level} Level</p>
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className="col-md-3">
              <div className="row">
                <Link
                  to="/jobs/my-jobs"
                  className="btn btn-outline-primary me-2"
                >
                  View My Jobs Btn
                </Link>
                <Link to="/jobs/add-job" className="btn btn-primary me-2">
                  Add A Job Btn
                </Link>
              </div>
              <div className="row"></div>
            </div>
          </div>
        </div>
      </>
    );
  }

  async componentDidMount() {
    let res = await axios({
      method: "get",
      url: "http://localhost:8080/jobs/",
    });
    console.log(res.data);
    this.setState({ jobs: res.data });
  }

  onHandleJobClick = (job) => {
    this.setState({ selectedJob: job });
    console.log(this.state.selectedJob);
  };
}

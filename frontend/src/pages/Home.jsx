import React, { Component } from "react";
import { ResponsiveContainer, Treemap } from "recharts";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "positions",
      reviews: [
        {
          id: 1,
          rating: 4.5,
          user: "John Smith",
          comment: "Thanks to TechTrends!",
          link: "google.ca",
        },
        {
          id: 2,
          rating: 5.0,
          user: "Alyssa Sanders",
          comment: "It Helped Me Get a Job!",
          link: "google.ca",
        },
        {
          id: 3,
          rating: 4,
          user: "Sam Doherty",
          comment: "And Showed Which Skills Are In-Demand!",
          link: "google.ca",
        },
      ],
    };
  }

  render() {
    return (
      <>
        <div className="container text-center">
          <div className="row">
            <div className="col-4">
              <div className="row">
                <div className="col-12">
                  <div className="p-3">
                    <h1>TechTrends</h1>
                  </div>
                </div>
                <div className="col-12">
                  <p>
                    A job market analysis app that allows you to track the ebbs
                    & flows of today's tech career landscape.
                  </p>
                  <p>
                    Track changes in the employable skills for jobs and changes
                    in desired technologies and view job posts aggregated from
                    sites like LinkedIn, Indeed & Glassdoor.
                  </p>
                  <p>
                    Also help provide data to improve the site by adding job
                    posts you've found in your search & help the developer
                    community stay informed on what to reskill.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-8">
              <div className="text-white p-3 h-100">
                <ResponsiveContainer width="100%" height="100%">
                  <Treemap
                    width={400}
                    height={200}
                    data={this.state.children}
                    dataKey="size"
                    aspectRatio={4 / 3}
                    stroke="#FFFFFF"
                    fill="#0d6efd"
                  />
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div className="row">
            {this.state.reviews.map((review) => {
              return (
                <div className="col-4">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{review.rating}</h5>
                      <h6 className="card-subtitle mb-2 text-body-secondary">
                        {review.user}
                      </h6>
                      <p className="card-text">{review.comment}</p>
                      <Link to={review.link} className="card-link">
                        View Review
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }

  async componentDidMount() {
    let res = await axios({
      method: "get",
      url: "http://localhost:8080/jobs/recharts/position_counts",
    });
    this.setState({ children: res.data });
  }
}

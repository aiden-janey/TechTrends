import React, { Component } from "react";
import { ResponsiveContainer, Treemap } from "recharts";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "positions",
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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Cras tempus enim sit amet consectetur dignissim. Ut quis
                    rutrum elit. Donec aliquam ante sed imperdiet lobortis.
                    Donec feugiat est eget pellentesque congue. Proin dui
                    mauris, ultricies ac enim id, consectetur consequat nisl.
                    Morbi quam sem, imperdiet vitae posuere ut, rutrum
                    consectetur arcu. Maecenas mi orci, luctus id eros quis,
                    finibus rhoncus odio. Cras massa tortor, ultricies at mattis
                    in, cursus et mauris. Maecenas mollis iaculis dolor at
                    dignissim. Vivamus ut libero tempus, ultricies velit
                    suscipit, pulvinar diam. Mauris ullamcorper magna quis
                    porttitor fringilla.
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
            <div className="col-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <h6 className="card-subtitle mb-2 text-body-secondary">
                    Card subtitle
                  </h6>
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <Link to="#" className="card-link">
                    Card link
                  </Link>
                  <Link to="#" className="card-link">
                    Another link
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <h6 className="card-subtitle mb-2 text-body-secondary">
                    Card subtitle
                  </h6>
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <Link to="#" className="card-link">
                    Card link
                  </Link>
                  <Link to="#" className="card-link">
                    Another link
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <h6 className="card-subtitle mb-2 text-body-secondary">
                    Card subtitle
                  </h6>
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <Link to="#" className="card-link">
                    Card link
                  </Link>
                  <Link to="#" className="card-link">
                    Another link
                  </Link>
                </div>
              </div>
            </div>
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

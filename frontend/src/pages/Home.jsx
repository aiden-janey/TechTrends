import React, { Component } from "react";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      positionDist: this.props.positionDist,
      langPopularity: this.props.langPopularity,
      frequentCities: this.props.frequentCities,
      avgSalary: this.props.avgSalary,
    };
  }

  render() {
    return (
      <>
        <div className="container text-center">
          <div className="row row-cols-3">
            <div className="col">COlCOLODO</div>
            <div className="col-2">eiwuroiwey</div>
          </div>
        </div>
      </>
    );
  }

  renderDonut = () => {};

  getData = () => {};
}

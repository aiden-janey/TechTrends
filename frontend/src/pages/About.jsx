import React, { Component } from "react";

export default class About extends Component {
  render() {
    return (
      <>
        <div className="text-center container">
          <h1>About Us</h1>
          <br />
          <p>
            TechTrends was developed by Aiden Janey as an data analysis app that
            implements some popular technologies. It uses the MERN (MongoDB,
            ExpressJS, React & NodeJS) stack, as well as other libraries &
            frameworks like: Bootstrap, Axios, Rebrush & more.
          </p>
          <p>To learn more about what I used read the Design Document.</p>
        </div>
      </>
    );
  }
}

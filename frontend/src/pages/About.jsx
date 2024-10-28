import React, { Component } from "react";

export default class About extends Component {
  render() {
    return (
      <>
        <div className="text-center container">
          <h1>About TechTrends</h1>
          <br />
          <p>
            TechTrends was developed by Aiden Janey as an data analysis app that
            implements some popular technologies. It uses the MERN (MongoDB,
            ExpressJS, React & NodeJS) stack, as well as other libraries &
            frameworks like: Bootstrap, Axios, Rebrush & more.
          </p>
          <p>To learn more about what I used read the Design Document.</p>
          <p>
            Don't forget to check out my GitHub to see what else I'm working on.
            If you're impressed by my work, considered reaching out via LinkedIn
            or email me at arjaney.professional@gmail.com.
          </p>
        </div>
      </>
    );
  }
}

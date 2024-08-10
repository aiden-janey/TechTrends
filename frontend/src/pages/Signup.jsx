import { Component } from "react";

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "", confirmPassword: "" };
  }

  render() {
    return (
      <div className="container">
        <form className="p-5 d-inline-flex flex-wrap flex-column align-items-center justify-content-center border float">
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              value={this.state.email}
              onChange={(event) => {
                this.setState({ email: event.target.value });
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={this.state.password}
              onChange={(event) => {
                this.setState({ password: event.target.value });
              }}
            />
            <i className="bi bi-eye-slash"></i>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword2"
              value={this.state.confirmPassword}
              onChange={(event) => {
                this.setState({ confirmPassword: event.target.value });
              }}
            />
            <i className="bi bi-eye-slash"></i>
          </div>
          <p>Captcha Here</p>
          <button
            type="submit"
            className="btn btn-primary m-1"
            onClick={this.onSignupClick}
          >
            Sign-up
          </button>
        </form>
      </div>
    );
  }

  onSignupClick = async () => {
    console.log(this.state);
    let response = await fetch(
      `http://localhost:5000/users?email=${this.state.email}&password=${this.state.password}`,
      { method: "GET" }
    );
    let body = await response.json();

    console.log(body);

    if (body.length > 0) {
      this.setState({
        message: <span className="text-success">Successful Login!</span>,
      });
    } else {
      this.setState({
        message: <span className="text-danger">Login Failed.</span>,
      });
    }
  };
}

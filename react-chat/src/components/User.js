import React, { Component } from "react";
import "./User.css";

class User extends Component {
  login() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        const user = result.user;
        this.props.setUser(user);
      });
  }

  logoff() {
    this.props.firebase
      .auth()
      .signOut()
      .then(() => {
        this.props.resetUser();
      });
  }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged(user => {
      this.props.setUser((user = ""));
    });
  }

  render() {
    return (
      <div className="card border-light text-center bg-transparent">
        <div className="card-header bg-transparent border-light">
          Username & Account Info
        </div>
        <div className="card-body">
          <h3 className="card-title">Sign-In</h3>
          <div className="btn-group">
            <button className="btn btn-lg btn-success" onClick={this.login.bind(this)}>
              Sign-In
            </button>
            <button
              className="btn btn-lg btn-secondary"
              onClick={this.logoff.bind(this)}
            >
              Sign-Out
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default User;

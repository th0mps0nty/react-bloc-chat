import React, { Component } from "react";
import * as firebase from "firebase";
import "./App.css";
import RoomList from "./components/RoomList";
import MessageList from "./components/MessageList";
import User from "./components/User";

var config = {
  apiKey: "AIzaSyCDp9r_UHNEsAubNXz8A2gssuhRlmUyseI",
  authDomain: "react-bloc-chat-451c0.firebaseapp.com",
  databaseURL: "https://react-bloc-chat-451c0.firebaseio.com",
  projectId: "react-bloc-chat-451c0",
  storageBucket: "react-bloc-chat-451c0.appspot.com",
  messagingSenderId: "4855665423"
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeRoom: "",
      username: ""
    };

    this.setUser = this.setUser.bind(this);
    this.activeRoom = this.activeRoom.bind(this);
    this.resetUser = this.resetUser.bind(this);
  }

  setUser(user) {
    this.setState({ username: user });
  }

  resetUser() {
    this.setState({ username: "" });
  }

  activeRoom(room) {
    this.setState({ activeRoom: room });
  }

  render() {
    const showMessages = this.state.activeRoom;
    return (
      <div className="App">
        <main>
          <RoomList firebase={firebase} activeRoom={this.activeRoom} />
          {showMessages ? (
            <MessageList
              firebase={firebase}
              activeRoom={this.state.activeRoom.key}
              activeRoomName={this.state.activeRoom.name}
            />
          ) : null}
          <User
            firebase={firebase}
            setUser={this.setUser}
            resetUser={this.resetUser}
          />
          <p>
            {`Welcome ${
              this.state.username.displayName
                ? this.state.username.displayName
                : ""
            }`}
          </p>
        </main>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';

// Initialize Firebase
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
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;

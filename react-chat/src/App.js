import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import RoomList from './components/RoomList';

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
        <main>
          <RoomList firebase={firebase} />
        </main>
      </div>
    );
  }
}

export default App;

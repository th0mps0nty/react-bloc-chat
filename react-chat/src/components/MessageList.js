import React, { Component } from "react";
import "./MessageList.css";

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      username: "",
      content: "",
      sentAt: "",
      roomId: ""
    };

    this.messageRef = this.props.firebase.database().ref("messages");
    this.handleChange = this.handleChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      username: this.props.username,
      content: e.target.value,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: this.props.activeRoom
    });
  }

  sendMessage(e) {
    e.preventDefault();
    this.messageRef.push({
      username: this.state.username,
      content: this.state.content,
      sentAt: this.state.sentAt,
      roomId: this.state.roomId
    });

    this.setState({
      username: "",
      content: "",
      sentAt: "",
      roomId: ""
    });
  }

  componentDidMount() {
    this.messageRef.on("child_added", snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat(message) });
    });
  }

  render() {
    return (
      <div className="message-area">
        <h2>{this.props.activeRoomName}</h2>
        <ul className="message-list">
          {this.state.messages.map(message => {
            if (message.roomId === this.props.activeRoom)
              return (
                <li className="messages" key={message.key}>
                  {message.content} {message.sentAt} {message.username}
                </li>
              );
            else return null;
          })}
        </ul>
        <form className="message-bar" onSubmit={this.sendMessage}>
          <input
            type="text"
            value={this.state.content}
            placeholder="Enter Message"
            onChange={this.handleChange}
          />
          <input type="submit" value="Send" />
        </form>
      </div>
    );
  }
}

export default MessageList;

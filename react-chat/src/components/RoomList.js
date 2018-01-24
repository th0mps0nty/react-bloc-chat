import React, { Component } from "react";
import "./RoomList.css";

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      submitForm: false,
      newRoomName: ""
    };
    this.roomsRef = this.props.firebase.database().ref("rooms");
    this.createRoom = this.createRoom.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
  }

  componentDidMount() {
    this.roomsRef.on("child_added", snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat(room) });
    });
  }

  toggleForm() {
    if (this.state.submitForm === true) {
      this.setState({ submitForm: false });
    } else {
      this.setState({ submitForm: true });
    }
  }

  createRoom(e) {
    e.preventDefault();
    const newRoom = e.target.elements.newRoomName.value;
    this.roomsRef.push({ name: newRoom });
    this.setState({ submitForm: false });
    e.target.elements.newRoomName.value = "";
  }

  selectRoom(room) {
    this.props.activeRoom(room);
  }

  render() {
    return (
      <div className="roomlist">
        <h1 className="title">Bloc Chat</h1>
        <button className="new-room" onClick={this.toggleForm}>
          Create Room
        </button>
        <ul className="sidebar-list">
          {this.state.rooms.map((room, index) => (
            <li
              className="rooms"
              key={index}
              onClick={e => this.selectRoom(room, e)}
            >
              {room.name}
            </li>
          ))}
        </ul>

        <div className={this.state.submitForm ? "displayed" : "hidden"}>
          <form onSubmit={this.createRoom}>
            <h2 className="form-title">Create New Room</h2>
            <h3 className="text-field-description">Enter Room Name</h3>
            <input type="text" id="new-room-name" name="newRoomName" />
            <button className="create-room" type="submit">
              Create Room
            </button>
            <button className="cancel" onClick={this.toggleForm}>
              Cancel
            </button>
          </form>
        </div>
      </div>
    );
  }
}
export default RoomList;

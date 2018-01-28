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
      <div className="card border-dark text-center">
        <div className="card-header jumbotron">
          <h1>Welcome to Bloc Chat</h1>
        </div>

        <div className="card-body bg-transparent">
          <button className="btn btn-sm btn-primary" onClick={this.toggleForm}>
            Create a New Room
          </button>
        </div>

        <div className="card-body">
          <ul className="navbar">
            {this.state.rooms.map((room, index) => (
              <button-group
                className="btn btn-group"
                key={index}
                onClick={e => this.selectRoom(room, e)}
              >
                <button className="btn btn-lg btn-success">{room.name}</button>
              </button-group>
            ))}
          </ul>

          <div className={this.state.submitForm ? "displayed" : "hidden"}>
            <div className="card-body text-center">
              <form onSubmit={this.createRoom}>
                <h4>Create a New Room</h4>
                <div className="form-control">
                  <input
                    className="form-control"
                    type="text"
                    id="new-room-name"
                    placeholder="Enter Room Name"
                    name="newRoomName"
                  />
                  <button className="btn btn-sm btn-primary" type="submit">
                    Create Room
                  </button>
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={this.toggleForm}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default RoomList;

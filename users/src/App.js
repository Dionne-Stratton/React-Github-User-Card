import React from "react";
import axios from "axios";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
      followers: [],
    };
  }

  componentDidMount() {
    console.log("CDM running");
    axios
      .get("https://api.github.com/users/dionne-stratton")
      .then((response) => {
        console.log("response", response);
        this.setState({ users: response.data });
      })
      .catch((error) => console.log(error))
      .then(
        axios
          .get(`https://api.github.com/users/dionne-stratton/followers`)
          .then((response) => {
            this.setState({ followers: response.data });
            console.log("folower response", response);
          })
          .catch((error) => console.log(error))
      );
  }

  componentDidUpdate(prevState, prevProps) {
    if (prevState.users !== this.state.users) {
      console.log("users have changed");
    }
    if (prevState.followers !== this.state.followers) {
      console.log("state updated, userType", this.state.userType);
    }
  }

  handleChange = (e) => {
    console.log("handleChange called", this.state.userType);
    this.setState({
      ...this.state,
      userType: e.target.value,
    });
  };
  render() {
    console.log("Followers", this.state.followers);
    return (
      <div className="App">
        <h1>The Queen:</h1>

        <div className="users">
          <h1>{this.state.users.login}</h1>
          <img width="250" className="user" src={this.state.users.avatar_url} />
          {this.state.followers.map((followers) => {
            return (
              <div>
                <h3>My minion: {followers.login}</h3>
                <img width="200" src={followers.avatar_url} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;

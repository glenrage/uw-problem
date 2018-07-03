import React, { Component } from 'react';
import axios from 'axios';

class GithubAvatar extends Component {
  state = {
    followedUsers: {
      followers: []
    }
  };

  renderAvatars = () => {
    return this.props.git.map((el, index) => {
      return (
        <div className="card" key={index}>
          <img
            className="card-img-top"
            src={el.avatar}
            alt={el.login}
            onMouseOver={this.handleHover.bind(this, el)}
          />
          <p className="login-name">{el.login}</p>
        </div>
      );
    });
  };

  renderList = () => {
    return this.state.followedUsers.followers.map((el, idx) => {
      return (
        <ul key={idx}>
          <li>{el.followers}</li>
        </ul>
      );
    });
  };

  handleHover = async el => {
    if (el.login[0] === 'a') {
      axios
        .post('http://localhost:3000/api/followers', { el })
        .then(data => this.setState({ followedUsers: data.data }));
    }
  };
  render() {
    console.log(this.state);
    return (
      <div className="git-container">
        {this.renderAvatars()}
        {this.renderList()}
      </div>
    );
  }
}

export default GithubAvatar;

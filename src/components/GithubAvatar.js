import React, { Component } from 'react';
import axios from 'axios';

class GithubAvatar extends Component {
  state = {
    followedUsers: {
      followers: []
    },
    loading: false
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
      console.log('Username startd with A');
      this.setState({ loading: true });
      await axios
        .post('http://localhost:3000/api/followers', { el })
        .then(data =>
          this.setState({
            followedUsers: data.data,
            loading: false
          })
        );
    }
  };
  render() {
    console.log(this.state);
    return (
      <div className="row-row">
        <div className="column-big">
          <div className="git-box">{this.renderAvatars()}</div>
        </div>
        <div className="column-small">
          <h5>Followers List</h5>
          {this.state.loading === true && <div className="loader">Loading</div>}
          <div className="list">{this.renderList()}</div>
        </div>
      </div>
    );
  }
}

export default GithubAvatar;

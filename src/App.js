import React, { Component } from 'react';
import GithubAvatar from './components/GithubAvatar';
import axios from 'axios';
import './App.css';
import './loader.css';

class App extends Component {
  state = {
    githubData: []
  };

  componentDidMount() {
    this.fetchGithubData();
  }

  fetchGithubData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/github');
      const responseData = response.data.gitData;
      this.setState({ githubData: responseData });
    } catch (error) {
      console.error(error);
    }
  };
  render() {
    return (
      <div className="App">
        <GithubAvatar git={this.state.githubData} />
      </div>
    );
  }
}

export default App;

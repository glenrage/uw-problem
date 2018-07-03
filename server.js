const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const app = express();
require('dotenv').load();

app.use(bodyParser.json());
app.use(cors());

app.get('/api/github', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.github.com/users?since=999?client_id=${
        process.env.CLIENT_ID
      }&client_secret=${process.env.CLIENT_SECRET}`
    );
    const data = response.data;
    const gitData = data.map(el => {
      return {
        avatar: el.avatar_url,
        followers: el.followers_url,
        login: el.login
      };
    });

    return res.json({ gitData });
  } catch (error) {
    console.error(error);
  }
});

app.post('/api/followers', async (req, res) => {
  try {
    const response = await axios.get(req.body.el.followers);
    const data = await response.data;
    const followers = data.map(el => {
      return {
        followers: el.login
      };
    });

    return res.json({ followers });
  } catch (error) {
    console.error(error);
  }
});

app.listen(3000, () => {
  console.log('Listening on Port 3000');
});

const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors'); // Require cors
const app = express();
const port = 5000;

app.use(cors()); // Use cors as middleware

const Token = 'dcb7f78e517746e7bbb40851c9b86ac2';

app.get('/api/standings/:leagueId', async (req, res) => {
  const leagueId = req.params.leagueId;
  const URL = `https://api.football-data.org/v4/competitions/${leagueId}/standings/`;
  try {
    const response = await fetch(URL, { headers: { 'X-Auth-Token': Token } });
    console.log(response);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));

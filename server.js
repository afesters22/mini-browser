const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (frontend)
app.use(express.static('public'));

// Proxy endpoint
app.get('/proxy', async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) return res.status(400).send('Missing url parameter');

    const response = await fetch(url);
    const body = await response.text();

    res.send(body);
  } catch (err) {
    res.status(500).send('Error fetching website: ' + err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});

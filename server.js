const express = require('express');
const path = require('path');

const app = express();
app.get('/restaurants/:id', (req, res ) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Listening on localhost:${PORT}`));
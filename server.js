const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/restaurants/:id', (req, res ) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/restaurants/:id/profile', (req, res) => {
  const id = req.params.id;
  axios.get(`http://localhost:3001/restaurants/${id}/profile`)
    .then(response => response.data)
    .then(data => res.send(data))
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
})

app.get('/restaurants/:id/menu-items', (req, res) => {
  const id = req.params.id;
  axios.get(`http://localhost:3002/restaurants/${id}/menu-items`)
    .then(response => response.data)
    .then(data => res.send(data))
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

app.get('/restaurants/:id/menu-items/:itemId', (req, res) => {
  const {id, itemId} = req.params;
  axios.get(`http://localhost:3002/restaurants/${id}/menu-items/${itemId}`)
    .then(response => response.data)
    .then(data => res.send(data))
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

app.post('/restaurants/:id/order', (req, res) => {
  console.log(req.body);
  res.sendStatus(201);
});

app.get('/restaurants/:id/suggestions', (req, res) => {
  const id = req.params.id;
  axios.get(`http://localhost:3003/restaurants/${id}/suggestions`)
    .then(response => response.data)
    .then(data => res.send(data))
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

app.get('/reviews', (req, res) => {
  axios.get('http://localhost:3004/reviews')
    .then(response => response.data)
    .then(data => res.send(data))
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

app.get('/restaurants/:id/reviews', (req, res) => {
  const id = req.params.id;
  axios.get(`http://localhost:3004/restaurants/${id}/reviews`)
    .then(response => response.data)
    .then(data => res.send(data))
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Listening on localhost:${PORT}`));

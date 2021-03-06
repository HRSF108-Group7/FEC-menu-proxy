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
  axios.get(`http://ec2-18-225-9-230.us-east-2.compute.amazonaws.com/restaurants/${id}/profile`)
    .then(response => response.data)
    .then(data => res.send(data))
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
})

app.get('/restaurants/:id/menu-items', (req, res) => {
  const id = req.params.id;
  axios.get(`http://ec2-13-57-210-63.us-west-1.compute.amazonaws.com/restaurants/${id}/menu-items`)
    .then(response => response.data)
    .then(data => res.send(data))
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

app.get('/restaurants/:id/menu-items/:itemId', (req, res) => {
  const {id, itemId} = req.params;
  axios.get(`http://ec2-13-57-210-63.us-west-1.compute.amazonaws.com/restaurants/${id}/menu-items/${itemId}`)
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
  axios.get(`http://ec2-54-183-207-43.us-west-1.compute.amazonaws.com/restaurants/${id}/suggestions`)
    .then(response => response.data)
    .then(data => res.send(data))
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

app.get('/reviews', (req, res) => {
  axios.get('http://ec2-54-183-220-92.us-west-1.compute.amazonaws.com/reviews')
    .then(response => response.data)
    .then(data => res.send(data))
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

app.get('/restaurants/:id/reviews', (req, res) => {
  const id = req.params.id;
  axios.get(`http://ec2-54-183-220-92.us-west-1.compute.amazonaws.com/restaurants/${id}/reviews`)
    .then(response => response.data)
    .then(data => res.send(data))
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Listening on localhost:${PORT}`));

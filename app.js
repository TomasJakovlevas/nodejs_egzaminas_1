import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = 8000;

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.json('Server is running');
});

// grąžins 10 juokelių apie Chuck Norris
app.get('/api/jokes/', async (req, res) => {
  let jokes = [];
  for (let x = 0; x < 10; x++) {
    try {
      const data = await fetch('https://api.chucknorris.io/jokes/random').then(
        (response) => response.json()
      );
      jokes.push(data.value);
    } catch (err) {
      console.log(err.response.body);
    }
  }

  res.json(jokes);
});

// grąžins "amount" parametre nurodytą kiekį juokelių apie Chuck Norris
app.get('/api/jokes/:amount', async (req, res, next) => {
  const amount = req.params.amount;

  if (isNaN(amount)) {
    next();
  } else {
    let jokes = [];
    for (let x = 0; x < amount; x++) {
      try {
        const data = await fetch(
          'https://api.chucknorris.io/jokes/random'
        ).then((response) => response.json());
        jokes.push(data.value);
      } catch (err) {
        console.log(err.response.body);
      }
    }

    res.json(jokes);
  }
});

// grąžins 10 juokelių apie Chuck Norris iš nurodytos "category"
app.get('/api/jokes/:category', async (req, res) => {
  const category = req.params.category;

  let jokes = [];
  for (let x = 0; x < 10; x++) {
    try {
      const data = await fetch(
        `https://api.chucknorris.io/jokes/random?category=${category}`
      ).then((response) => response.json());
      jokes.push(data.value);
    } catch (err) {
      console.log(err.response.body);
    }
  }

  res.json(jokes);
});

// grąžins "amount" parametre nurodytą kiekį juokelių apie Chuck Norris iš nurodytos "category"
app.get('/api/jokes/:category/:amount', async (req, res) => {
  const category = req.params.category;
  const amount = req.params.amount;

  if (isNaN(amount)) {
    res.send('Please provide number');
    return;
  } else {
    let jokes = [];
    for (let x = 0; x < amount; x++) {
      try {
        const data = await fetch(
          `https://api.chucknorris.io/jokes/random?category=${category}`
        ).then((response) => response.json());
        jokes.push(data.value);
      } catch (err) {
        console.log(err.response.body);
      }
    }

    res.json(jokes);
  }
});

// Starting server
app.listen(PORT, () => console.log(`Server is running on ${PORT}...`));

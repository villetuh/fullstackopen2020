import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  if (req.query.height === undefined || req.query.weight === undefined) {
    res.status(400).send({
      message: 'Required query parameters height and weight are missing.'
    });
  }
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.status(400).send({
      message: 'Query parameters need to be numbers.'
    });
  }

  const bmi = calculateBmi(height, weight);
  res.send({
    weight,
    height,
    bmi
  });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});
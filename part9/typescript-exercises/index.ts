import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

interface ExercisePostParams {
  target: number,
  daily_exercises: Array<number>
}

const app = express();

app.use(express.json());

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

app.post('/exercises', (req, res) => {
  const body = req.body as ExercisePostParams;

  if (body.target === undefined || body.daily_exercises === undefined) {
    res.status(400).send({ error: "parameters missing" });
    return;
  }

  const target = Number(body.target);

  if (isNaN(target)) {
    res.status(400).send({ error: "malformatted parameters" });
    return;
  }

  const dailyExercises: Array<number> = [];
  for (let i = 0; i < body.daily_exercises.length; i++) {
    const exerciseAmount = Number(body.daily_exercises[i]);
    if (isNaN(exerciseAmount)) {
      res.status(400).send({ error: "malformatted parameters" });
      return;
    }
    dailyExercises.push(exerciseAmount);
  }

  const details = calculateExercises(target, dailyExercises);

  res.send(details);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});
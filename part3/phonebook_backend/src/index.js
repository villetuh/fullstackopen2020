const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const Person = require('./models/person');

const app = express();

app.use(cors());
app.use(express.static('build'));

morgan.token('post-data', request => {
  if (request.method !== 'POST') {
    return null;
  }

  return JSON.stringify(request.body);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data'));
app.use(express.json());

app.get('/info', (requests, response) => {
  Person.find({}).then(persons => {
    response.send(`Phone book contains ${persons.length} entries.<br />${new Date(Date.now())}`);
  });
});

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons);
  });
});

app.post('/api/persons', (request, response, next) => {
  const newPerson = request.body;

  if (newPerson.name === undefined || newPerson.name === '') {
    response.status(422).json('{ "error": "Entry must contain name of the person." }').end();
    return;
  }
  else if (newPerson.number === undefined || newPerson.number === '') {
    response.status(422).json('{ "error": "Entry must contain number for the person." }').end();
    return;
  }

  const person = new Person({
    name: newPerson.name,
    number: newPerson.number
  });

  person.save()
    .then(newEntry => {
      response.status(201).json(newEntry);
    })
    .catch(error => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
  const person = {
    name: request.body.name,
    number: request.body.number
  };

  Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true })
    .then(updatedPerson => {
      if (person) {
        response.json(updatedPerson);
      } else {
        response.status(404).end();
      }
    })
    .catch(error => next(error));
});

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch(error => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch(error => next(error));
});

const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Unsupported id format.' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});
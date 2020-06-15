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

app.post('/api/persons', (request, response) => {
  const newPerson = request.body;

  if (newPerson.name === undefined || newPerson.name === '') {
    response.status(422).json('{ "error": "Entry must contain name of the person." }').end();
    return;
  }
  else if (newPerson.number === undefined || newPerson.number === '') {
    response.status(422).json('{ "error": "Entry must contain number for the person." }').end();
    return;
  }

  Person.find({ name: newPerson.name }).then((matchedPersons) => {
    if (matchedPersons.length > 0) {
      response.status(422).json('{ "error": "Person with same name already found." }').end();
      return;
    }

    const person = new Person({
      name: newPerson.name,
      number: newPerson.number
    });

    person.save().then(newEntry => {
      response.status(201).json(newEntry);
    });
  });
});

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person);
    } else {
      response.status(404).end();
    }
  })
  .catch(error => {
    console.log('HTTP GET:', error);
    response.status(400).send({ error: 'Unsupported id format.' });
  });
});

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndDelete(request.params.id).then(person => {
    response.status(204).end();
  })
  .catch(error => {
    console.log('HTTP DELETE:', error);
    response.status(400).send({ error: 'Unsupported id format.' });
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});
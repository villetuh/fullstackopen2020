const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

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

let persons = [
  { name: 'Arto Hellas', id: 1, number: '040-123456' },
  { name: 'Ada Lovelace', id: 2, number: '39-44-5323523' },
  { name: 'Dan Abramov', id: 3, number: '12-43-234345' },
  { name: 'Mary Poppendieck', id: 4, number: '39-23-6423122' }
];

app.get('/info', (requests, response) => {
  response.send(`Phone book contains ${persons.length} entries.<br />${new Date(Date.now())}`);
});

app.get('/api/persons', (request, response) => {
  response.json(persons);
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

  if (persons.some(person => person.name === newPerson.name)) {
    response.status(422).json('{ "error": "Person with same name already found." }').end();
    return;
  }

  let newId;
  do {
    newId = Math.floor(Math.random() * Math.floor(1000));
  } 
  while (persons.some(person => person.id === newId));

  const personToAdd = { ...newPerson, id: newId};
  
  persons.push(personToAdd);

  response.status(201).json(personToAdd);
});

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find(person => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter(person => person.id !== id);

  response.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});
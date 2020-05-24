const express = require('express');
const app = express();

let persons = [
  { name: 'Arto Hellas', id: 1, number: '040-123456' },
  { name: 'Ada Lovelace', id: 2, number: '39-44-5323523' },
  { name: 'Dan Abramov', id: 3, number: '12-43-234345' },
  { name: 'Mary Poppendieck', id: 4, number: '39-23-6423122' }
];

app.get('/api/persons', (request, response) => {
  response.json(persons);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});
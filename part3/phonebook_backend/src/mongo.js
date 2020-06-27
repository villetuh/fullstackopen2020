const mongoose = require('mongoose');

if (process.argv.length !== 3 && process.argv.length !== 5) {
  console.log('Please provide correct amount of arguments.');
  process.exit(1);
}

const db_name = 'phonebook';
const password = process.argv[2];

const url = `mongodb+srv://phonebook_dbuser:${password}@fullstackopen2020-9s2ue.mongodb.net/${db_name}?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 5) {
  const newPerson = new Person({
    name: process.argv[3],
    number: process.argv[4]
  });

  newPerson.save().then(result => {
    console.log(`added ${result.name} number ${result.number} to phone book.`);
    mongoose.connection.close();
  });
} else {
  Person.find({}).then(result => {
    let output = 'Phone book:';
    result.forEach(person => {
      output = output.concat('\n', person.name, ' ', person.number);
    });
    console.log(output);
    mongoose.connection.close();
  });
}


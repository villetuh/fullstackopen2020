const mongoose = require('mongoose');

const connectionString = process.env.DB_CONNECTION_STRING;

mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log('Connection to database created successfully.');
  })
  .catch(error => {
    console.log('Error occurred while connection to database.');
  });

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Person', personSchema);
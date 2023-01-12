const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://pako:1234@dwg-forest.egke2al.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });


const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log("Connected to MongoDB");
});

module.exports = db;

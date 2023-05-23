const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 1000;

mongoose.connect('mongodb://127.0.0.1:27017/college', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB successfully!');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });


// Define a Mongoose schema for your collection
const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String
});

// Define a Mongoose model based on the schema
const student_details = mongoose.model('student_details', studentSchema);

app.get('/students', (req, res) => {
  // Retrieve all documents from the 'student_details' collection
  student_details.find()
    .then((students) => {
      res.json(students); // Send the retrieved documents as a JSON response
    })
    .catch((err) => {
      console.error('Error retrieving students:', err.message);
      res.status(500).json({ error: 'An error occurred while retrieving students' });
    });
});

app.post('/insert', (req, res) => {
  if (!req.body.name || !req.body.age || !req.body.email) {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  // Create a new student document and save it to the 'student_details' collection
  const newStudent = new student_details({
    name: req.body.name,
    age: req.body.age,
    email: req.body.email
  });

  newStudent.save()
    .then((student) => {
      res.json(student); // Send the saved document as a response
    })
    .catch((err) => {
      console.error('Error inserting student:', err.message);
      res.status(500).json({ error: 'An error occurred while inserting student' });
    });
});





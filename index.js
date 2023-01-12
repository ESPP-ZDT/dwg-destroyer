const express = require('express');
const multer = require('multer');
const app = express();
const port = 3000;
const db = require('./db');
const routes = require('./routes/FileRoutes')



// configure Multer to handle file uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

app.use('/api', routes);



app.listen(port, () => console.log(`Server listening on port ${port}!`));

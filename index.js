const express = require('express');
const app = express();
const port = 5000;
const db = require('./db');
const routes = require('./routes/FileRoutes')
const cors = require('cors');

app.use(cors());

app.use(express.json())

app.use('/api/file', routes);



app.listen(port, () => console.log(`Server listening on port ${port}!`));

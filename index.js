const express = require('express');
const app = express();
const port = 3000;
const db = require('./db');
const routes = require('./routes/FileRoutes')



app.use('/api', routes);



app.listen(port, () => console.log(`Server listening on port ${port}!`));

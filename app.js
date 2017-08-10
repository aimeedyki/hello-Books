import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import passport from 'passport';
import jwt from 'jsonwebtoken';
require('dotenv').config();

// Set up the express app
const app = express();

//sets port
const port = process.env.PORT || 8080;
app.listen(port, (err) => {
  /* eslint-disable no-console */
  if (err) console.log(err);
  console.log('started');
});


// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Require routes into the application.
import serverRoutes from './server/routes';
app.use(serverRoutes)



export default app;
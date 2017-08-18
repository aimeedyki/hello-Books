import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';


require('dotenv').config();

// Set up the express app
const app = express();

//sets port
const port = process.env.PORT || 8000;
app.listen(port, (err) => {
  /* eslint-disable no-console */
  if (err) console.log(err);
  console.log('started');
});

//db.sequelize.sync({ force: true })

// swagger definition
const swaggerDefinition = {
  info: {
    title: 'Node Swagger API',
    version: '1.0.0',
    description: 'Hello i am swagger . I am one step ahead of postman. My job is to provide API description',
  },
  host: 'localhost:8000',
  basePath: '/',
};

// options for swagger jsdoc 
const options = {
  swaggerDefinition: swaggerDefinition, // swagger definition
  apis: ['./server/routes/*.js'], // path where API specification are written
};

// initialize swaggerJSDoc
//const swaggerSpec = swaggerJSDoc(options);

// route for swagger.json
app.get('/swagger.json', (req, res)=> {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
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
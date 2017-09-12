import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config';
import serverRoutes from './routes';


require('dotenv').config();

// Set up the express app
const app = express();

//sets port
const port = process.env.PORT || 8000;

//db.sequelize.sync({ force: true })

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const publicPath = express.static(path.join(__dirname, '../client/public/'))

app.use('/', publicPath);

app.use('/api-docs', express.static(path.join(__dirname, 'api-docs')));

// swagger definition
const swaggerDefinition = {
  info: {
    title: 'Hello books API',
    version: '1.0.0',
    description: 'API that manages the processes for a library',
  },
  host: 'localhost:8000',
  basePath: '/api/v1',
};

const apiPath = path.join(__dirname, 'routes/*.js')

// options for swagger jsdoc 
const options = {
  swaggerDefinition, // swagger definition
  apis: [apiPath], // path where API specification are written
};

// initialize swaggerJSDoc
const swaggerSpec = swaggerJSDoc(options);
const indexFile = path.join(__dirname, 'index.html');

const compiler = webpack(webpackConfig);
app.use(webpackMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  noInfo: true,
}));

app.use(webpackHotMiddleware(compiler));
// route for swagger.json
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.get('/api-docs', (req, res) => {
  res.sendFile(path.join(__dirname, 'api-docs/index.html'));
})

// Require routes into the application.
app.use(serverRoutes)

app.get('/me', (req, res) => {
  res.status(200).send('me');
});

app.get('/*', (req, res) => {
  res.sendFile(indexFile);
});

app.listen(port, (err) => {
  /* eslint-disable no-console */
  if (err) console.log(err);
  console.log('started');
});

export default app;
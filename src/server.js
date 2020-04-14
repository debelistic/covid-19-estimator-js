import express from 'express';
import bodyParser from 'body-parser';
import debug from 'debug';
import routes from './routes';
// import estimator from './estimator';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to covid19 estimator'
  });
});

app.use('/api/v1/on-covid-19', routes);

app.use('*', (req, res) => res.status(404).json({
  status: res.statusCode,
  message: 'Request not found'
}));

app.listen(port, () => {
  debug.log(`Listening on port ${port}`);
});

export default app;

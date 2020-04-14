import express from 'express';
import bodyParser from 'body-parser';
import debug from 'debug';
import routes from './routes';
// import estimator from './estimator';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/api/v1/on-covid-19', routes);

app.listen(port, () => {
  debug.log(`Listening on port ${port}`);
});

export default app;

import express from 'express';
import bodyParser from 'body-parser';
import debug from 'debug';
// import estimator from './estimator';

const app = express();
const port = 3000;
// const server = http.createServer();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// estimator();

// finally, let's start our server...
app.listen(port, () => {
  debug.log(`Listening on port ${port}`);
});

export default app;

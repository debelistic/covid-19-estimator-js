import express from 'express';
import estimator from './estimator';

const app = express();


app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to covid19 estimator'
  });
});


app.post('/', (req, res) => {
  if (!req.body) {
    return res.status(200).json({
      message: 'Enter data'
    });
  }
  const data = req.body;
  const result = estimator(data);

  return res.status(200).json({
    result
  });
});

export default app;

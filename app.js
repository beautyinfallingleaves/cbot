const express = require('express');
const cors = require('cors');
const { dialogflowFulfillmentMw } = require('./middlewares');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => res.status(200).json({ status: 'ok '}));

// this webhook is called by Dialogflow intent fulfillment
app.post('/dialogflow-webhook', dialogflowFulfillmentMw);

app.use('*', (req, res) => res.status(404).send('Not found'));

app.use((err, req, res, next) => {
  console.log(`Error on route ${req.originalUrl}`);
  console.log(err);
  return res.status(500).send('Inernal server error');
});

module.exports = app;

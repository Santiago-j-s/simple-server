import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';

const app = express();
const port = 4001;

app.all('/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'POST, GET');
  next();
});

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));

app.post('/', (req, res) => {
  console.log(req.body);
  fs.writeFile('./request.json', JSON.stringify(req.body, null, 2), err => {
    if (err) {
      console.error(err);
      return;
    }
  });
  res.status(200).send('Received!');
})

app.listen(port, () => {
  console.log(`running on ${port}`);
});

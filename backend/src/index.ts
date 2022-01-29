import express from 'express';
const app = express();
const PORT = 5000; // TODO Move to .env

app.get('/api', (req, res) => {
  res.json({
    status: '[Backend API] Hello World!'
  });
});

app.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}`)
});
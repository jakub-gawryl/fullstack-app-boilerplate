import express from 'express';
const app = express();
const PORT = 3005;

app.get('/', (req, res) => {
  res.send('[Backend] Hello World!')
})

app.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}`)
})
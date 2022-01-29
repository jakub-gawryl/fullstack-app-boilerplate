import express from 'express';
const PORT = 5000; // TODO Move to .env

const app = express();

app.get('/api', (req, res) => {
  res.json({
    status: '[Backend API] Hello World!'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
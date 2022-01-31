import path from 'path';
import express from 'express';
const PORT = 5000; // TODO Move to .env

const app = express();
const publicDir = path.resolve('public');

// Public dir
app.use(express.static(publicDir));

app.get('/api', (req, res) => {
  res.json({
    status: '[Backend API] Hello World!'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV?.toUpperCase()} mode on port ${PORT}`);
});

export default app;
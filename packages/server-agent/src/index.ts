import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/a2a/messages', (req, res) => {
  const { capability, payload } = req.body;

  if (capability === 'hello') {
    console.log('Received hello capability with payload:', payload);
    res.json({
      message: 'Hello from the server agent!',
      received_payload: payload,
    });
  } else {
    res.status(400).json({ error: `Unknown capability: ${capability}` });
  }
});

app.listen(port, () => {
  console.log(`Server agent listening at http://localhost:${port}`);
});

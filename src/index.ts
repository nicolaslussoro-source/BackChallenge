import express from 'express';
import dotenv from 'dotenv';
import authRouter from './routes/auth';
import metricsRouter from './routes/metrics';
import { init as initDb } from './db';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/auth', authRouter);

app.use('/metrics', metricsRouter);

// Initialize DB (create tables if needed)
initDb().catch((err) => {
  console.error('Failed to initialize DB', err);
  process.exit(1);
});

const port = process.env.PORT || 3000;
app.listen(Number(port), () => {
  console.log(`Server listening on http://localhost:${port}`);
});

import express from 'express';
import cors, { CorsOptions } from 'cors'
import authRouter from './routes/auth.routes';
import metricsRouter from './routes/metrics.routes';
import { init as initDb } from './db';
import { envs } from './config/env';

const app = express();
app.use(express.json());

const allowedOrigins = [
    'http://localhost:4200', 
];

const corsOptions: CorsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        if (!origin) return callback(null, true); 

        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'La política CORS no permite el acceso desde el origen especificado.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],

    credentials: true, 
};

app.use(cors(corsOptions));

app.use('/auth', authRouter);

app.use('/metrics', metricsRouter);

initDb().catch((err) => {
  console.error('Failed to initialize DB', err);
  process.exit(1);
});

app.listen(envs.PORT, () => {
  console.log(`Server listening on http://localhost:${envs.PORT }`);
});

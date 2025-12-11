"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const metrics_routes_1 = __importDefault(require("./routes/metrics.routes"));
const db_1 = require("./db");
const env_1 = require("./config/env");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const allowedOrigins = [
    'http://localhost:4200',
];
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'La política CORS no permite el acceso desde el origen especificado.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.use('/auth', auth_routes_1.default);
app.use('/metrics', metrics_routes_1.default);
(0, db_1.init)().catch((err) => {
    console.error('Failed to initialize DB', err);
    process.exit(1);
});
app.listen(env_1.envs.PORT, () => {
    console.log(`Server listening on http://localhost:${env_1.envs.PORT}`);
});

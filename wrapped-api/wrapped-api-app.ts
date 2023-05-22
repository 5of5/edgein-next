import express from "express"
import morgan from "morgan"
import helmet from "helmet"
import cors from "cors"
import submitdataRouter from "./src/routes/submit-data-route"

const app = express();

// security header
app.use(helmet());

// apply middleware logger
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// applymiddleware cors
app.use(cors());

app.use(express.json({ limit: '10kb' }));

// routing for app
app.use('/api/v1/submit-data', submitdataRouter);

export default app;

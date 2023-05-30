import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

import express, { Request, Response } from "express"
import morgan from "morgan"
import cors from "cors"
import { commonHandler as submitDataHandler } from "@/pages/api/submit-data"
import { convertExpressToCommonRequest, convertExpressToCommonResp } from "@/utils/api";

const app = express();

// apply middleware logger
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}else{
    app.use(morgan('common'));
}

// applymiddleware cors
app.use(cors());

app.use(express.json({ limit: '10kb' }));

// routing for app
const routes = {
    '/api/v1/submit-data': submitDataHandler,
}
for (const [route, handler] of Object.entries(routes)) {
    app.use(route, (req: Request, res: Response) => {
        handler(convertExpressToCommonRequest(req), convertExpressToCommonResp(res));
    });
}

// start server
const PORT = process.env.PORT || 8005;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});


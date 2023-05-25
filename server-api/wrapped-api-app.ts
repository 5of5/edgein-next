import express from "express"
import morgan from "morgan"
import cors from "cors"
import commonHandler from "../pages/api/submit-data"
import type {CommonRequest, CommonResponse} from "../utils/constants"

const app = express();

// apply middleware logger
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// applymiddleware cors
app.use(cors());

app.use(express.json({ limit: '10kb' }));

const convertExpressToCommonRequest = (req: Express.Request) =>{
    return req as CommonRequest;
}
const convertExpressToCommonResp = (res: Express.Response) =>{
    return res as CommonResponse;
}
// routing for app
app.use('/api/v1/submit-data', (req: Express.Request, res: Express.Response) => {
    commonHandler(convertExpressToCommonRequest(req), convertExpressToCommonResp(res));
  });

export default app;

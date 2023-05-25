import express, {Request, Response } from "express"
import morgan from "morgan"
import cors from "cors"
import commonHandler from "@/pages/api/submit-data"
import type {CommonRequest, CommonResponse} from "@/utils/constants"

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

const convertExpressToCommonRequest = (req: Request) =>{
    const commonReq: CommonRequest = {
        url: req.url,
        cookies: req.cookies,
        body: req.body,
        method: req.method,
    };
    return commonReq;
}
const convertExpressToCommonResp = (res: Response) =>{
    const commonRes: CommonResponse = res;
    return commonRes;
}
// routing for app
app.use('/api/v1/submit-data', (req: Request, res: Response) => {
    commonHandler(convertExpressToCommonRequest(req), convertExpressToCommonResp(res));
  });

export default app;

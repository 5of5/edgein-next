import express from 'express';
import handler from "../../../pages/api/submit-data"

const submitdataRouter = express.Router({ mergeParams: true });
submitdataRouter.route('/').post(handler);
export default submitdataRouter;

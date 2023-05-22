import express from 'express';
import submitDataController from "../controllers/submit-data-controller"

const submitdataRouter = express.Router({ mergeParams: true });
submitdataRouter.route('/').post(submitDataController);
export default submitdataRouter;

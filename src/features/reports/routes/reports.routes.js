//importing all libraries and modules
import express from 'express'
import reportController from '../controllers/report.controller.js'
import jwtAuth from '../../../middlewares/jwt.middleware.js';


//instance of controller
const  instance = new reportController();

//creating router for reports
const reportRouter = express.Router();

reportRouter.get('/:status',jwtAuth,(req,res,next)=>{
    instance.getReportsByStatus(req,res,next);

})

export default reportRouter;
//importing all libraries and modules
import express from 'express';
import jwtAuth from '../../../middlewares/jwt.middleware.js';
import patientController from '../controllers/patients.controller.js';

//instance creation for controller
const instance = new patientController();


//defining router
const patientRouter = express.Router();


patientRouter.post('/register',jwtAuth, (req,res,next)=>{
instance.register(req,res,next);
})
patientRouter.post('/:id/create_report',jwtAuth, (req,res,next)=>{
instance.createReport(req,res,next);
})

patientRouter.get('/:id/all_reports',jwtAuth, (req,res,next)=>{
instance.getReport(req,res,next);
})

export default patientRouter;

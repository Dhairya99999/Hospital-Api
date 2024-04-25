//importing libraries and modules
import express from 'express';
import doctorController from '../controllers/doctor.controller.js';

//instance of controller class
const instance = new doctorController();

//creating router
const doctorRouter = express.Router();

doctorRouter.post('/register', (req,res,next)=>{
    instance.signUp(req,res,next)
});

doctorRouter.post('/login', (req,res,next)=>{
    instance.signIn(req,res,next)
});

export default doctorRouter;
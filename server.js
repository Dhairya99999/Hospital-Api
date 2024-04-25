
//importing environment variables and using them
import dotenv from 'dotenv'
dotenv.config();

//importing all libraries
import express from 'express';

//importing modules
import ApplicationError from './src/middlewares/error.handler.js'
import {connectUsingMongoose} from './config/db.config.js'
import doctorRouter from './src/features/doctors/routes/doctor.routes.js';
import patientRouter from './src/features/patients/routes/patient.routes.js';
import reportRouter from './src/features/reports/routes/reports.routes.js';
//creating server
const server = express();

//using json data
server.use(express.json());

//configuring routes
server.use('/api/doctors', doctorRouter);
server.use('/api/patients', patientRouter);
server.use('/api/reports', reportRouter);

//error handler
server.use((err,req,res,next)=>{
    if(err instanceof ApplicationError){
        res.status(err.code).send(err.message);
    }
    else{
        res.status(500).send("Something went wrong with internal server");
    }
})

//incase no path matches
server.use((req,res)=>{
    res.status(500).send("Invalid Path or Route");
})

//starting server
server.listen(process.env.PORT, ()=>{
    
    console.log("Server is active");
    connectUsingMongoose();
});
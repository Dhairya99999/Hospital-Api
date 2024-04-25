//importing libraries and modules 
import express from 'express'
import doctorRepo from '../models/doctor.repository.js'
import JWT from 'jsonwebtoken';
import ApplicationError from '../../../middlewares/error.handler.js';

export default class doctorController{
    constructor(){
        this.repo = new doctorRepo();
    }

    async signUp(req,res,next)
    {
        const {name, contact, email, password} = req.body;
        const doctorData = {name, contact, email, password};

        try{
            const newDoctor = await this.repo.register(doctorData);
            res.status(200).send(`Doctor registered successfully. Doctor - ${newDoctor}`);
        }catch(err)
        {
            //  handle error for duplicate email
                 if(err.code === 11000 && err.keyPattern && err.keyPattern.email )
                 {
                     return next(new ApplicationError('Email already registered ', 400))
                 }
                     return next(new ApplicationError(err, 400));
        }
    }


    async signIn(req,res,next)
    {
        const {email, password} = req.body;

        try{
            const doctor = await this.repo.login(email,password);
            if(doctor){

                const token = JWT.sign({
                    userID: doctor._id,
                    email: doctor.email,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1h'
                });

                res.status(200).send(`Doctor Logged In, Token -- ${token}`)

                }
            }
            catch(err){
                return next(new ApplicationError(err.message, err.code || 500))
            }
        }



    }

//importing libraries and models
import express from 'express';
import bcrypt from 'bcrypt';
import DoctorModel from './doctor.schema.js';
import ApplicationError from '../../../middlewares/error.handler.js';


export default class doctorRepo{

    async register(data){
        const newDoctor = new DoctorModel(data);
        const hashedPassword = await bcrypt.hash(newDoctor.password, 12);
        newDoctor.password = hashedPassword;
        return await newDoctor.save();
    }

    async login(email,password){
        try {
            const user = await DoctorModel.findOne({ email });
            if (!user) {
                throw new ApplicationError('Doctor not found', 404);
            }
    
            const validatedUser = await bcrypt.compare(password, user.password);
            if (!validatedUser) {
                throw new ApplicationError('Incorrect password', 400);
            }
    
            return user;
        } catch (err) {
            throw new ApplicationError(`${err.message}`, err.code || 500);
        }

    }




}

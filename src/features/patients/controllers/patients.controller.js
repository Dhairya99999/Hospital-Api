//importing all libraries and modules
import express from 'express';
import patientRepo from '../models/patients.repository.js';
import ApplicationError from '../../../middlewares/error.handler.js';
import {loggedInId, loggedInUser} from '../../../middlewares/jwt.middleware.js'

export default class patientController{
    constructor(){
        this.repo = new patientRepo();
    }




    async register(req,res,next){

        const {contact,name} = req.body;
        const patient = {contact,name};

        try{
            const newPatient = await this.repo.register(patient);
           return res.status(201).send(newPatient);
        }
        catch(err){
            res.status(err.code || 500).send(err);
        }
    }

    async createReport(req,res,next){

        const {status} = req.body;
        const patientId = req.params.id;
        const date = new Date();
        const createdBy = loggedInId;
    try{    
        if(!loggedInId){
            throw new ApplicationError('Youre not authorized to create a report', 400)
        }

        const report = await this.repo.createReport(createdBy, status, date, patientId);
        const patient = await this.repo.findPatientbyId(patientId);
        patient.reports.push(report);
        await patient.save();
        res.status(201).send(`Report-- ${report} created for patient ${patientId}`);


    }
    catch(err){
        
        res.status(err.code || 500).send(err.message);
    }
    }


    async getReport(req,res,next){
        const patientId = req.params.id;
        try{
                const reports = await this.repo.returnReports(patientId);
                res.status(200).send(reports);
        }
        catch(err){
            res.status(err.code || 500).send(err);
        }
    }
}
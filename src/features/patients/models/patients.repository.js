//importing modules and libraries
import express from 'express';
import ApplicationError from '../../../middlewares/error.handler.js';
import patientModel from './patients.schema.js';
import reportModel from '../../reports/models/report.schema.js';

export default class patientRepo{

    async register(data){

        const existingPatient = await patientModel.findOne({contact: data.contact});

        if(existingPatient){
           return `Patient already exists -- ${existingPatient}`; 
        }

        return await new patientModel(data).save();
    }

    async createReport(createdBy, status, date, patientId){
        return await new reportModel({createdBy, status, date, patientId}).save();
    }

    async returnReports(id){
         const patient = await patientModel.findById(id);
         return patient.reports;

        
    }

    async findPatientbyId(id){
        return await patientModel.findById(id);
    }



}
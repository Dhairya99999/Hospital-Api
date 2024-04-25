//importing all modules and libraries
import express from 'express';
import reportRepo from '../models/reports.repository.js';

export default class reportController{
    constructor(){
        this.repo = new reportRepo();
    }

    async getReportsByStatus(req,res,next){
        const status = req.params.status;

        try{
            const reports = await this.repo.getReportsByStatus(status);
            res.status(200).send(reports);
        }catch(err){
            res.status(err.code || 500).send(err.message);
        }


    }
}
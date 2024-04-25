//importing all modules and libraries
import express from 'express';
import reportModel from "./report.schema.js";

export default class reportRepo{

    async getReportsByStatus(status){
        return await reportModel.find({status: status});
    }
    

}
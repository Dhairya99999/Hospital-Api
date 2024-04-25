import mongoose from "mongoose";

const patientsSchema = new mongoose.Schema({
    name: {type: String, required:true},
    contact :{type: Number, required: true, min:999999999, max: 9999999999, unique:true},
    reports: [{type: String}]
});

const patientModel = mongoose.model('Patients', patientsSchema);
export default patientModel;

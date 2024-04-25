import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
    createdBy:{type: String, required:true},
    status:{type:String, enum:["Negative", "Travelled-Quarantine", "Symptoms-Quarantine","Positive-Admit"], required:true},
    date:   {type: Date, default: Date.now, required:true},
    patientId: {type: mongoose.Schema.Types.ObjectId, ref:'Patients', required:true}
})

const reportModel = mongoose.model('Reports', reportSchema);
export default reportModel;
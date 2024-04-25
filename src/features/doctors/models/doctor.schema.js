import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
    name: {type: String, required:true},
    contact :{type: Number, requied: true, min:999999999, max: 9999999999},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true}
})

const DoctorModel = mongoose.model('Doctors', DoctorSchema);

export default DoctorModel;
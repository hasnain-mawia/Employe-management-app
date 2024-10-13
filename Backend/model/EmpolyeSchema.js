import mongoose from "mongoose";

const EmployeSchema = mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    department: String,
    profileImage: String,
    salary: String,
    createdAT: {
        type: Date,
        default: new Date()
    },
    updatedAT: {
        type: Date,
        default: new Date()
    },
});


const EmployeModel = mongoose.model('employees', EmployeSchema);
export default EmployeModel;
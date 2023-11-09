const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const departmentSchema = new Schema({
    department_name: {
        type: String,
        require: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })


module.exports = mongoose.model("department", departmentSchema);
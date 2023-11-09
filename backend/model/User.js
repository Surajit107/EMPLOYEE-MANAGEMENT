const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema({
    full_name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    location_city: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        // dafault: "admin",
        dafault: "user"
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: 'department'
    }
}, { timestamps: true })


module.exports = mongoose.model("user", userSchema);
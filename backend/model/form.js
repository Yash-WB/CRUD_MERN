const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
    firstName: {type: String},
    lastName: {type: String},
    mobileNumber: {type: String},
    email: {type: String},
    gender: {type: String},
    qualification: {type: String},
    hobbies: {type: [String]}
});

module.exports = mongoose.model('Form', formSchema);
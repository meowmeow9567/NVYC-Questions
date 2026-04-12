const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    askedBy: {
        type: String,
        required: true,
    },
    isApproved: {
        type: Boolean,
        default: false,
    },
    answer: {
        type: String,
        default: "",
    },
}, { timestamps: true });

module.exports = mongoose.model("Question", questionSchema);
const mongoose = require("mongoose")

const contactSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        trim: true
    },
    last_name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required:true,
        unique:true

    },
    mobile_number: {
        type: Number,
        trim: true,
        required:true,
        unique:true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    deletedAt:{ type:String,
        default:null

    }
}, { timestamps: true })

module.exports = mongoose.model('Contact', contactSchema)

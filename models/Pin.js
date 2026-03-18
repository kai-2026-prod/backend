const mongoose = require('mongoose');

const pinSchema = new mongoose.Schema({
   username: {
       type: String,
       required: true,
    },
    title: {
        type: String,
        required: true,
        minlength: 3,
    },
    desc: {
        type: String,
        required: true,
        minlength: 3,
    },
    rating:{
        type: Number,
        require: true, 
        min: 0,
        max: 5,
    },
    lat:{
        type: Number,
        require:true,
        min: -90,
        max: 90,
    },
    long:{
        type: Number,
        require:true,
        min: -180,
        max: 180,
    },
 }, {timestamps: true});

module.exports = mongoose.model('Pin', pinSchema);


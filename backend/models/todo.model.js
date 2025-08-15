const mongoose = require('mongoose');

const todoSchema=new mongoose.Schema({
    uid:{type:String, required:true},
    title:{type:String, required:true},
    completed:{type:Boolean, default:false},
    createdAt:{type:Date, default: Date.now}
}
);

module.exports=todoSchema;
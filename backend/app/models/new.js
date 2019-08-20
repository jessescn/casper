const { Schema, model } = require('mongoose');

const NewSchema =  new Schema({
   topic:{
       type: String,
       required: true
   },
   title:{
       type: String,
       required: true
   },
   description:{
       type: String,
       required: true
   },
   link:{
       type: String,
       required: true
   },
   image:{
       type: String,
       required: true
   }
})

module.exports = model('New', NewSchema);
const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema;
//for specifying the scheme
const articleSchema = new mongoose.Schema({

    
    Title: {
        type: String,
        required: true
    },
    Content: {
        type: String,
        required: true
    },
   /* User : {
        type : ObjectId,
        ref : "user",
        required : true
      }*/
      User:{
        type:String,
        required:true
    }

})

module.exports = mongoose.model('Article',articleSchema)
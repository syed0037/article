const User=require('../models/User');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
 
const register=(req,res,next)=>{
    bcrypt.hash(req.body.password,10,function(err,hashedPass){
        if(err){
            res.json(err)
        }
        const newUser=new User({
            name:req.body.name,
            email:req.body.email,
            password:hashedPass
        });
        newUser.save()
        .then(newUser=>{
        res.json({
            message:'User Added Successfully' 
        })
         })
        .catch(error=>{
            res.status(500).json(
                {
                    message:'error occured'
                }
            )
        })
        
        
    })

}

const login= (req,res,next)=>{
    var username=req.body.name
    var email=req.body.email
    var password=req.body.password
   User.findOne({email:req.body.email})
   .then(user=>{
       if(user){
           bcrypt.compare(password,user.password,function(err,result){
               if(err){
                   res.json({
                       error:err
                   })
               }
               if(result){
                   let token=jwt.sign({email:user.email},'verySecretValue',{expiresIn:'1h'})
                   res.json({
                       message:'Login successful',
                       token
                   })
               }
               else{
                   res.json({
                       message:'Password does not match'
                   })
               }
           })
       }else{
           res.json({
               message:'No user found'
           })
       }
   })
};
module.exports={
    register,login
}
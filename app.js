require("dotenv").config();
const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb://localhost/ArticleDBex'
const User = require("./models/user");
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const auth = require("./middleware/auth");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const app = express()
const Article= require("./models/article");


mongoose.connect(url, {useNewUrlParser:true})
const con = mongoose.connection

con.on('open', () => {
    console.log('connected...')
})

app.use(express.json())

const articleRouter = require('./routes/articles')
const {check,validationResult}=require('express-validator');
const article = require("./models/article");




app.use('/articles',articleRouter)

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/user'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/user'
 *       500:
 *         description: Some server error
 */

app.post("/register", 
 [
   check("email","please enter a valid email").isEmail(),
   check("password","please enter a valid password").isLength({min:8})
 ],
    async (req, res) => {
    const error=validationResult(req);
    if(!error.isEmpty())
    {
      return res.json({
        error:error.array()
      });
    }
    
    try {
      // Get user input
      const { first_name, last_name, email, password } = req.body;
  
      // Validate user input
      if (!(email && password && first_name && last_name)) {
        res.status(400).send("All input is required");
      }
  
      // check if user already exist
      // Validate if user exist in our database
      const oldUser = await User.findOne({ email });
  
      if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
      }
  
      //Encrypt user password
      encryptedPassword = await bcrypt.hash(password, 10);
  
      // Create user in our database
      const user = await User.create({
        first_name,
        last_name,
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        password: encryptedPassword,
      });
  
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      // save user token
      user.token = token;
  
      // return new user
      res.status(201).json(user);
    } catch (err) {
      console.log(err);
    }
    
  });

  app.post("/login", async (req, res) => {
    try {
      // Get user input
      const { email, password } = req.body;
  
      // Validate user input
      if (!(email && password)) {
        res.status(400).send("All input is required");
      }
      // Validate if user exist in our database
      const user = await User.findOne({ email });
  
      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
  
        // save user token
        user.token = token;
  
        // user
        return res.status(200).send('logged in successfully');
      }
     return res.status(400).send("Invalid Credentials");
    } catch (err) {
      console.log(err);
    }
  });
//after login takes place succussfully
 /*app.post("/welcome", auth, (req, res) => {
    res.status(200).send("Welcome");
  });
  
  */
 const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Article API",
        version: "1.0.0",
        description: "A simple Article API",
      },
      servers: [
        {
          url: "http://localhost:9000",
        },
      ],
    },
    apis: ["./routes/*.js","./app.js"]
  };
  const specs = swaggerJsDoc(options);
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
/*
  app.put('/:id',async(req,res)=> {
    try{

        const user ={
                
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password
          };
        if(!req.body.first_name && !req.body.last_name && !req.body.email && !req.body.password){
                return res.send("please enter the details to be updated");
        }
            
    
    
        const updtUser = await user.findByIdAndUpdate(
          { email: req.body.email },
          user);
        res.send("user updated succussfully");
        res.sendStatus(201);
      } catch (error) {
        res.send( error );
        res.sendStatus(500)
      }
});*/

/**
 * @swagger
 * /{id}:
 *  put:
 *    summary: Update the user by the id
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The user id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/user'
 *    responses:
 *      200:
 *        description: The user was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/user'
 *      404:
 *        description: The user was not found
 *      500:
 *        description: Some error happened
 */

app.put("/:id",async(req,res)=>{
  //if(req.body.userId === req.params.id){
      if(req.body.password){
          const salt=await bcrypt.genSalt(10);
          req.body.password=await bcrypt.hash(req.body.password,salt);
      }
  try{
      const updateduser=await User.findByIdAndUpdate(
          req.params.id,{
              $set:req.body,
          },
          {new:true}
      );
      res.status(200).json(updateduser);
      
  }catch(err){
      return res.status(500).json(err);
    
  }
/*}else{
  res.status(401).json("you can update only your account")
}*/
});

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Remove the user by id
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 * 
 *     responses:
 *       200:
 *         description: The user was deleted
 *       404:
 *         description: The user was not found
 */


app.delete("/:id",async(req,res)=>{
  //if(req.body.userId === req.params.id){
    try{
          const user=await User.findById(req.params.id);

      try{
          await Article.deleteMany({email:user.email})
          await User.findOneAndDelete(req.params.id)
           res.status(200).json("User has been deleted");
           
       }catch(err){
           return res.status(500).json(err);
         
       }

    }catch(err){
res.status(404).json("User not found")
    }
 
/*}else{
  res.status(401).json("you can delete only your account")
}*/
});

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Get the user by id
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id 
 *     responses:
 *       200:
 *         description: The user description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/user'
 *       404:
 *         description: The user was not found
 */

app.get("/:id",async(req,res)=>{
  try{
      const user=await User.findById(req.params.id);
      const {password, ...others}=user._doc;
      res.status(200).json(others);
  }catch(err){
      res.status(500).json(err);
  }
})
/**
 * @swagger
 * components:
 *   schemas:
 *     user:
 *       type: object
 *       required:
 *         - first_name
 *         - last_name
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         first_name:
 *           type: string
 *           description: The first name
 *         last_name:
 *           type: string
 *           description: The last name
 *         email:
 *           type: string
 *           description: The user's email
 *         password:
 *           type: string
 *           description: the user's password
 *       example:
 *         id: d5fE_asz
 *         first_name: riya
 *         last_name: raj
 *         email: riyaraj@gmail.com
 *         password: chaplotanand
 */


/**
 * @swagger
 * /:
 *   get:
 *     summary: Returns the list of all the users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: The list of the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/user'
 */

app.get('/', async(req,res) => {
  try{
         const user = await User.find()
         res.json(user)
  }catch(err){
      res.send('user does not exist ')
  }
});

app.listen(9000, () => {
    console.log('Server started')
})
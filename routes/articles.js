const express = require('express');
const article = require('../models/article');
const router = express.Router()
const Article = require('../models/article')

/**
 * @swagger
 * components:
 *   schemas:
 *     Article:
 *       type: object
 *       required:
 *         - Title
 *         - Content
 *         - User
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the article
 *         Title:
 *           type: string
 *           description: The article title
 *         Content:
 *           type: string
 *           description: The article author
 *         User:
 *           type: string
 *           description: The user of article
 *       example:
 *         id: d5fE_asz
 *         Title: The New Turing Omnibus
 *         Content: Alexander K. Dewdney
 *         User: hehe
 */
//using the get method for an async request so that it doesnt block the request
/**
 * @swagger
 * /articles:
 *   get:
 *     summary: Returns the list of all the articles
 *     tags: [Article]
 *     responses:
 *       200:
 *         description: The list of the articles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 */
router.get('/', async(req,res) => {
    try{
           const articles = await Article.find()
           res.json(articles)
    }catch(err){
        res.send('article does not exist ')
    }
});
/**
 * @swagger
 * /articles/{id}:
 *   get:
 *     summary: Get the article by id
 *     tags: [Article]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The article id 
 *     responses:
 *       200:
 *         description: The article description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       404:
 *         description: The article was not found
 */
//using this to access by particular id 
router.get('/:id', async(req,res) => {
   
    
    try{
           const article = await Article.findById(req.params.id)
           res.json(article)
           if(!req.params.id){
               res.send('article does not exist')
               res.sendStatus('404')
           }
    }catch(err){
        res.send('article does not exist ')
        res.sendStatus('404')
        
    }
});
/**
 * @swagger
 * /articles:
 *   post:
 *     summary: Create a new article
 *     tags: [Article]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Article'
 *     responses:
 *       200:
 *         description: The article was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       500:
 *         description: Some server error
 */
//using this for creation 
router.post('/', async(req,res) => {
    if(!req.body.Title && req.body.Content && req.body.User){
        return res.send("please enter the title");
    }
    if(req.body.Title && !req.body.Content && req.body.User){
        return res.send("please enter the content");
    }
    if(req.body.Title && req.body.Content && !req.body.User){
        return res.send("please enter the user");
    }
    if(!req.body.Title && !req.body.Content && req.body.User){
        return res.send("please enter the title and conent");
    }
    if(req.body.Title && !req.body.Content && !req.body.User){
        return res.send("please enter the content and user");
    }
    if(!req.body.Title && req.body.Content && !req.body.User){
        return res.send("please enter the title and user");
    }
    if(!req.body.Title && !req.body.Content && !req.body.User){
        return res.send("please enter the appropriate details");
    }
    const article = new Article({
        
        Title: req.body.Title,
        Content: req.body.Content,
        User: req.body.User

    })

    try{
        const a1 =  await article.save() 
        res.send("Article is successfully added");
    }catch(err){
        res.send('Error')
        res.sendStatus(500)
    }
});
/**
 * @swagger
 * /articles/{id}:
 *  put:
 *    summary: Update the article by the id
 *    tags: [Article]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The article id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Article'
 *    responses:
 *      200:
 *        description: The article was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Article'
 *      404:
 *        description: The article was not found
 *      500:
 *        description: Some error happened
 */
router.put('/:id',async(req,res)=> {
    try{

        const article ={
                
            Title: req.body.Title,
            Content: req.body.Content,
            User: req.body.User};
        if(!req.body.Title && !req.body.Content && !req.body.User){
                return res.send("please enter the details to be updated");
        }
            
    
    
        const updtArticle = await Article.findByIdAndUpdate(
          { _id: req.params.id },
          article);
        res.send("article updated succussfully");
      } catch (error) {
        res.json({ message: error });
        res.sendStatus(500)
      }
});

router.patch('/:id',async(req,res)=> {
    try{
        const article = await Article.findById(req.params.id) 
        article.Content = req.body.Content
        const a1 = await alien.save()
        res.json(a1)   
    }catch(err){
        res.send('Error')
        
    }

});
/**
 * @swagger
 * /articles/{id}:
 *   delete:
 *     summary: Remove the article by id
 *     tags: [Article]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The article id
 * 
 *     responses:
 *       200:
 *         description: The article was deleted
 *       404:
 *         description: The article was not found
 */
router.delete('/:id',async(req,res)=> {
    try{
        const article = await Article.findById(req.params.id) 
        article.sub = req.body.sub
        const a1 = await article.remove()
        res.send("article deleted succussfully")   
    }catch(err){
        res.send('Error')
    }

});

module.exports=router
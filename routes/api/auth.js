const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const User = require('../../models/Users')
const jwt = require('jsonwebtoken')
const config = require('config')
const bcrypt = require('bcrypt')
const { check, validationResult } = require('express-validator')

//@route GET api/auth
//@ desc Test Route
// @access Public

router.get('/',auth, async(req, res) => {
    try{
        const user = await User.findById(req.user.id).select('-password')// does not returning password
        res.json(user)
        }
        catch(err){
        console.error(err)
        res.status(500).send('server error')
    }
})


//@route POST api/auth
//@ desc REGISTER ROUTE
// @access Public

router.post('/', [
    check('email', 'Please include email').isEmail(),
    check('password', 'Password is required').isLength({ min: 6 })
],
async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    // if user exist

    const {email, password } = req.body // get name , email and password from user POST method.

    try{
        let user = await User.findOne({email:email})// search user from email from req.body
        
        if(!user){//if no user in database
           return res.status(400).json({ errors: [{msg:'invalid credetentials'}] })// if user exist,refuse registration 
        }


        const isMatch=await bcrypt.compare(password,user.password)// compare password from client post and database client password

        if(!isMatch){
            return res.status(400).json([{errors:{msg:'invalid credentials'}}])
        }
            // return jsonwebtoken
            const payload = {
                user:{
                    id:user.id // user.id from mongoDB (user._id)
                }
            }
            jwt.sign(payload,
                config.get("jwtSecret"),
                {expiresIn:36000},
                (err,token)=>{
                if(err){
                    throw err
                }
                res.json({ token})
            })
        
    }catch(err){
        res.status(500).send('server error',err)


    }


   
})

module.exports = router
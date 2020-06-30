const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator')


const User = require('../../models/Users')

//@route POST api/users
//@ desc Test Route
// @access Public

router.post('/', [
    check('name', 'Name is Required').not().isEmpty(),
    check('email', 'Please include email').isEmail(),
    check('password', 'Please enter a password include 6 or more characters').isLength({ min: 6 })
],
async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    // if user exist

    const { name, email, password } = req.body // get name , email and password from user POST method.

    try{
        let user = await User.findOne({email:email})// search user from email from req.body
        
        if(user){
           return res.status(400).json({ errors: [{msg:'User already exist'}] })// if user exist,refuse registration 
        }

 //get users gravatar

        const avatar = gravatar.url(email,{
                s:'200',
                r:'pg',
                d:'mm'
            })  
            
            user = new User({
                name,
                email,
                avatar,
                password,
            })
 
            // encrypt password

            const salt = await bcrypt.genSalt(10) // generate salt
            
            user.password = await bcrypt.hash(password,salt) //hash password
            
            await user.save()
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

        //  return res.send('user registered')
            


    }catch(err){
        res.status(500).send('server error',err)


    }


   return res.send('users route',token)
})

module.exports = router
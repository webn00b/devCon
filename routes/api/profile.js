const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const Profile = require('../../models/Profile')
const User = require ('../../models/Users')
const { populate } = require('../../models/Users')
//@route GET api/profile/me
//@ desc Test Route
// @access Public

router.get('/me',auth,async(req, res) => {
    try{
        const profile = await Profile.findOne({id:req.user.id}).populate('user',['name','avatar'])
        if(!profile){
            return res.status(400).json({msg:'Server no proffile(lol) error'})
        }
        res.json(profile)
    }catch(err){
        console.error(err.message);
        res.status(500).send('server profile error')
        
    }
})

module.exports = router
const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const Profile = require('../../models/Profile')
const User = require ('../../models/Users')
const {check,validationResult}=require('express-validator/check')

// @route GET api/profile/me
// @desc get current user profile
// @access Private

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



// @route POST api/profile
// @desc create or update user profile
// @access Private

router.post('/',[auth,[
    check('status','status is required').not().isEmpty(),
    check('skills','skills is required').not().isEmpty()]],
    async(req,res)=>{
        const errors=validationResult(req) //03.31 for me

})

module.exports = router
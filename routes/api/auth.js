const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const User = require('../../models/Users')
//@route GET api/auth
//@ desc Test Route
// @access Public

router.get('/',auth, async(req, res) => {
    try{
const user = await User.findById(req.user.id).select('-password')// does not returning password
res.json(user)
    }catch(err){
        console.error(err)
    res.status(500).send('server error')
    }
})

module.exports = router
const express = require('express')
const router = express.Router()

const { check, validationResult } = require('express-validator')


//@route POST api/users
//@ desc Test Route
// @access Public

router.post('/', [check('name', 'Name is Required').not().isEmpty(),
    check('email', 'Please include email').isEmail(),
    check('password', 'Please enter a password include 6 or more characters').isLength({ min: 6 })
], (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    res.send('post')
})

module.exports = router
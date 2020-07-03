const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const Profile = require('../../models/Profile')
const User = require('../../models/Users')
const { check, validationResult } = require('express-validator')

// @route GET api/profile/me
// @desc get current user profile
// @access Private

router.get('/me', auth, async(req, res) => {
    try {
        const profile = await Profile.findOne({ id: req.user.id }).populate('user', ['name', 'avatar'])
        if (!profile) {
            return res.status(400).json({ msg: 'Server no profile(lol) error' })
        }
        res.json(profile)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server profile error')

    }
})



// @route POST api/profile
// @desc create or update user profile
// @access Private

router.post('/', [auth, [
        check('status', 'status is required').not().isEmpty(),
        check('skills', 'skills is required').not().isEmpty()
    ]],
    async(req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        // return res.json({ msg: 'hi' })
        //build profile object
        const { company, website, location, bio, status, githubusername, skills, youtube, facebook, twitter, instagram, linkedin } = req.body
        const profileFields = {}
        profileFields.user = req.user.id
        if (company) profileFields.company = company
        if (website) profileFields.website = website
        if (location) profileFields.location = location
        if (bio) profileFields.bio = bio
        if (status) profileFields.status = status
        if (githubusername) profileFields.githubusername = githubusername
        if (skills) {
            profileFields.skills = skills.split(',').map(x => x.trim())
        }
        //build social object

        profileFields.social = {}
        if (youtube) profileFields.social.youtube = youtube
        if (facebook) profileFields.social.youtube = facebook
        if (twitter) profileFields.social.twitter = twitter
        if (instagram) profileFields.social.instagram = instagram
        if (linkedin) profileFields.social.linkedin = linkedin

        try {
            //Update
            let profile = await Profile.findOne({ user: req.user.id })
            if (profile) {
                profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true })
                return res.json(profile)
            }
            //Create
            profile = new Profile(profileFields)
            await profile.save()
            res.json(profile)

        } catch (err) {
            console.error(err.message)
            res.status(500).send('profile data error')
        }
    })

//@route GET api/public
//@desc GET all profiles
//@access PUBLIC

router.get('/', async(req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar'])
        res.json(profiles)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('server error')
    }
})

// GET api/profile/user/:user_id
// @desc Get profile by user ID
//@access PUBLIC

router.get('/user/:user_id', async(req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar'])
        if (!profile) {
            return res.status(400).json({ msg: 'no profile for that user' })
        }
        res.json(profile)
    } catch (error) {
        if (error.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'profile not found' })
        }
        res.status(500).send('server error')
        console.error(error.message)
    }
})


module.exports = router
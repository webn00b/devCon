const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const auth = require('../../middleware/auth')
const User = require('../../models/Users')
const Post = require('../../models/Post')
const Profile = require('../../models/Profile')

//@route POST api/post
//@ desc Create a post
// @access Private

router.post('/', [auth, [
    check('text', 'text is required').not().isEmpty()
]], async(req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const user = await (await User.findById(req.user.id)).isSelected('-password')
        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        })
        const post = await newPost.save()
        res.json(post)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("server error")
    }

    res.send('Post Route')
})


//@route Get api/posts
//@ desc Get  all post
// @access Private

router.get('/', auth, async(req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 })
        res.json(posts)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("server error")
    }
})

//@route Get api/post/:id
//@ desc Get  post by id
//@access Private

router.get('/:id', auth, async(req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        if (!post) {
            return res.status(404).json({ msg: 'post not found' })
        }

        res.json(post)
    } catch (error) {
        if (error.kind === 'ObjectID') {
            return res.status(404).json({ msg: 'post not found' })
        }
        console.error(error.message)
        res.status(500).send("server error")
    }
})


//@route DELETE api/posts:/id
//@ desc delete a post
//@access Private

router.delete('/:id', auth, async(req, res) => {
    try {
        const post = await Post.findById(req.params.id)
            // check post 
        if (!post) {
            return res.status(404).json({ msg: "post not found" })
        }
        //check user
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'user not authorized' })
        }
        await post.remove()
        return res.json({ msg: 'post removed' })
    } catch (error) {
        if (error.kind === 'ObjectID') {
            return res.status(404).json({ msg: 'post not found' })
        }
        console.error(error.message)
        res.status(500).send("server error")
    }
})


//@route PUT api/posts/like/:id
//@ desc like a post
//@access Private

router.put('/like/:id', auth, async(req, res) => {
    try {
        const post = await Post.findById(req.params.id)
            // check if user has been already liked
        console.log({ user: req.user.id });

        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ msg: "post already liked" })
        }
        post.likes.unshift({ user: req.user.id })

        await post.save();
        res.json(post.likes)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("server error")
    }
})

module.exports = router
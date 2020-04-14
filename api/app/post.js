const express = require('express');
const auth = require('../middleware/auth');
const upload = require('../multer').uploads;
const Post = require('../models/Post');
const User = require('../models/User');
const router = express.Router();

router.get('/', async (req, res) => {
    let params = {};
    if (req.query.user) {
        params._id = req.query.user;

    }
    try{
        const user = await User.findOne(params);
        const items = await Post.find({user:{$in:[...user.subscriptions]}}).populate('user');

       return  res.send(items);
    }catch (e) {
        return res.status(400).send(e);
    }

});
router.get('/tags', async (req, res) => {
    const tags = await Post.distinct('tags');

    return res.send(tags);
});

router.post('/', [auth, upload.single('image')], async (req, res) => {
    if (!(req.body.title || req.file)){
        return res.status(400).send({message: 'One of the fields is empty'});
    }
    try {
        const postData = {
            title: req.body.title,
            tags: JSON.parse(req.body.tags),
            user:req.user._id
        };

        if (req.file) {
            postData.image = req.file.filename;
        }

        const post = new Post(postData);

        await post.save();

        return res.send({id: post._id});
    } catch (e) {
        return res.status(400).send(e);

    }
});
module.exports = router;
const express = require('express');
const router = express.Router();
const { Comment } = require('../models/Comment');

//=================================
//             Comment
//=================================

router.post('/saveComment', (req, res) => {
  const newComment = new Comment(req.body);
  newComment.save((err, subscribe) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    Comment.find({ _id: newComment.id })
      .populate('writer')
      .exec((err, result) => {
        if (err) {
          return res.status(400).json({ success: false, err });
        }
        res.status(200).json({
          success: true,
          result,
        });
      });
  });
});
module.exports = router;

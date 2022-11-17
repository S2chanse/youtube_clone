const express = require('express');
const router = express.Router();
const { Like } = require('../models/Like');
const { DisLike } = require('../models/DisLike');
//=================================
//             Like
//=================================

router.post('/getLikes', (req, res) => {
  let body = req.body;
  let variable = {};
  if (body.videoId) {
    variable = { videoId: body.videoId };
  } else {
    variable = { commentId: body.commentId };
  }
  Like.find(variable).exec((err, results) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    return res.status(200).json({ success: true, results });
  });
});

router.post('/getDisLikes', (req, res) => {
  let body = req.body;
  let variable = {};
  if (body.videoId) {
    variable = { videoId: body.videoId };
  } else {
    variable = { commentId: body.commentId };
  }
  DisLike.find(variable).exec((err, results) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    return res.status(200).json({ success: true, results });
  });
});
module.exports = router;

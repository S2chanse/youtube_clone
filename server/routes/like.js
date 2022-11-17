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

router.post('/upLike', (req, res) => {
  console.log(req.body);
  let variable = req.body;
  console.log(variable);
  const newLike = Like(variable);
  newLike.save((err, result) => {
    if (err) return res.status(400).json({ success: false, err });
    DisLike.findOneAndDelete(variable).exec((err, done) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true });
    });
  });
});

router.delete('/upLike', (req, res) => {
  console.log(req.body);
  let variable = req.body;
  Like.findOneAndDelete(variable).exec((err, done) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post('/upDisLike', (req, res) => {
  console.log(req.body);
  let variable = req.body;
  console.log(variable);
  const newLike = DisLike(variable);
  newLike.save((err, result) => {
    if (err) return res.status(400).json({ success: false, err });
    Like.findOneAndDelete(variable).exec((err, done) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({ success: true });
    });
  });
});

router.delete('/upDisLike', (req, res) => {
  console.log(req.body);
  let variable = req.body;
  DisLike.findOneAndDelete(variable).exec((err, done) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});
module.exports = router;

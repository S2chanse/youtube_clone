const express = require('express');
const router = express.Router();
const { Video } = require('../models/video');

//=================================
//             User
//=================================

router.post('/upload', (req, res) => {
  console.log(req.body);
  res.status(200).json({ success: true });
  //const user = new User(req.body);
  //   user.save((err, doc) => {
  //     if (err) return res.json({ success: false, err });
  //     return res.status(200).json({
  //       success: true,
  //     });
  //   });
});

module.exports = router;

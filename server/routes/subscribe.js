const express = require("express");
const router = express.Router();
const { Subscriber } = require("../models/Subscriber");

//=================================
//             Subscriber
//=================================

router.post("/subscribeNumber", (req, res) => {
  console.log();
  Subscriber.find({ userTo: req.body.userTo })
    .exec()
    .then((subscribe) => {
      console.log(subscribe);
      res.status(200).json({ success: true, subscribeCnt: subscribe.length });
    })
    .catch((err) => {
      res.status(400).json({ success: false, err });
    });
});

router.post("/subscribed", (req, res) => {
  Subscriber.find({
    userTo: req.body.userTo,
    userFrom: req.body.userFrom,
  }).exec((err, subscribe) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    res.status(200).json({
      success: true,
      subscribeYN: subscribe.length > 0 ? true : false,
    });
  });
});

router.post("/unSubscribe", (req, res) => {
  Subscriber.findOneAndDelete({
    userTo: req.body.userTo,
    userFrom: req.body.userFrom,
  }).exec((err, subscribe) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    res.status(200).json({
      success: true,
      subscribe,
    });
  });
});

router.post("/subscribe", (req, res) => {
  const newSubscriber = new Subscriber(req.body);
  newSubscriber.save((err, subscribe) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    res.status(200).json({
      success: true,
      subscribe,
    });
  });
});
module.exports = router;

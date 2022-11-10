const express = require("express");
const router = express.Router();
const { Video } = require("../models/video");
const multer = require("multer");
const path = require("path");
const ffmpeg = require("fluent-ffmpeg");
const { fail } = require("assert");
const userId = "6363176a21cf543a1e9db08f";

//=================================
//             User
//=================================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".mp4") {
      return cb(res.status(400).end("only jpg, png, mp4 is allowed"), false);
    }
    cb(null, true);
  },
});

const upload = multer({ storage: storage }).single("file");

router.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, err: err });
    }
    res.status(200).json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

router.post("/thumbnail", (req, res) => {
  //썸네일 생성 및 비디오 러닝타임 가져오기
  let thumbsFilePath = "";
  let fileDuration = "";

  console.log(req.body.url);
  //비디오 정보 가져오기
  ffmpeg.ffprobe(req.body.url, function (err, metadata) {
    console.dir(metadata);
    console.log(metadata.format.duration);

    fileDuration = metadata.format.duration;
  });

  //비디오 썸네일 생성 후 가져오기
  ffmpeg(req.body.url)
    .on("filenames", function (filenames) {
      console.log("Will generate " + filenames.join(", "));
      thumbsFilePath = "uploads/thumbnails/" + filenames[0];
    })
    .on("end", function () {
      console.log("Screenshots taken");
      return res.status(200).json({
        success: true,
        thumbsFilePath: thumbsFilePath,
        fileDuration: fileDuration,
      });
    })
    .on("error", function (err) {
      console.error(err);
      return res.status(400).json({
        success: false,
      });
    })
    .screenshots({
      // Will take screens at 20%, 40%, 60% and 80% of the video
      count: 3,
      folder: "uploads/thumbnails",
      size: "320x240",
      // %b input basename ( filename w/o extension )
      filename: "thumbnail-%b.png",
    });
});

//video 정보 저장
router.post("/infoUpload", (req, res) => {
  let videoInfo = req.body;
  videoInfo.userId = userId;
  console.log(videoInfo);
  const videoInfoModel = new Video(videoInfo);
  videoInfoModel.save((err, doc) => {
    if (err) {
      console.error(err);
      res.status(400).json({ success: fail, err });
      return;
    }
    res.status(200).json({ success: true });
  });
  res.status(200).json({ success: true });
});
module.exports = router;

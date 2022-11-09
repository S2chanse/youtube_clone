const mongoose = require('mongoose');

const videoSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
});

const Video = mongoose.model('Video', videoSchema);

module.exports = { Video };

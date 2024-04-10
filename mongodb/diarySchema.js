const mongoose = require("mongoose");

const diarySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
    minlength: 5,
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  photos: {
    type: [
      {
        contentType: String,
        data: Buffer,
      },
    ],
    validate: {
      validator: function (array) {
        return array.length > 0 && array.length <= 6;
      },
      message: "Images should containa at least one and at most six Images",
    },
    required: [true, "Images are required"],
  },
});

const Diary = mongoose.model("diary", diarySchema);

module.exports = Diary;

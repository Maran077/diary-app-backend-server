const Diary = require("../mongodb/diarySchema");
const ErrorHandler = require("../error/errorHandler");
const catchAsyncError = require("../middlewere/catchAsyncError");

class DiaryController {
  // Create a new diary entry
  static createDiary = catchAsyncError(async (req, res) => {
    const { title, description, date, location } = req.body;
    const files = req.files;
    const userId = req.user._id;
    const photos = [];

    files?.forEach((file) => {
      const buffer = file.buffer;
      const image = {
        data: buffer,
        contentType: "image/jpg",
      };
      photos.push(image);
    });

    const newDiary = new Diary({
      userId,
      title,
      description,
      date,
      location,
      photos,
    });
    await newDiary.save();
    res
      .status(201)
      .json({ message: "Diary created successfully", diary: newDiary });
  });

  // Get all diaries for a user
  static getAllDiaries = catchAsyncError(async (req, res) => {
    const { _id } = req.user;
    const diaries = await Diary.find({ userId: _id });
    res.status(200).json({ diaries, success: true });
  });

  // Get a single diary entry by ID
  static getDiaryById = catchAsyncError(async (req, res, next) => {
    const diary = await Diary.findById(req.params.id);
    if (!diary) return next(new ErrorHandler("Diary not found", 404));
    res.status(200).json(diary);
  });

  // Update a diary entry by ID
  static updateDiary = catchAsyncError(async (req, res, next) => {
    const { title, description, date, location } = req.body;
    const files = req.files;
    const photos = [];

    files?.forEach((file) => {
      const buffer = file.buffer;
      const image = {
        data: buffer,
        contentType: "image/jpg",
      };
      photos.push(image);
    });
    const updatedDiary = await Diary.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        date,
        location,
        photos,
      },
      { new: true }
    );
    if (!updatedDiary) return next(new ErrorHandler("Diary not found", 404));
    res.status(200).json({
      message: "Diary updated successfully",
      updatedDiary,
    });
  });

  // Delete a diary entry by ID
  static deleteDiary = catchAsyncError(async (req, res, next) => {
    const deletedDiary = await Diary.findByIdAndDelete(req.params.id);
    if (!deletedDiary) return next(new ErrorHandler("Diary not found", 404));
    res.status(200).json({
      message: "Diary deleted successfully",
      deletedDiary,
    });
  });
}

module.exports = DiaryController;

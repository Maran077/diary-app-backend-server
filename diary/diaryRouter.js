const express = require("express");

const tokenVerify = require("../middlewere/authericationVerify");
const upload = require("../middlewere/multer");
const DiaryController = require("./diary");

const router = express.Router();

router.post(
  "/",
  tokenVerify,
  upload.array("diaryPhotos", 6),
  DiaryController.createDiary
);
router.get("/", tokenVerify, DiaryController.getAllDiaries);
router.get("/:id", tokenVerify, DiaryController.getDiaryById);
router.put(
  "/:id",
  tokenVerify,
  upload.array("diaryPhotos", 6),
  DiaryController.updateDiary
);
router.delete("/:id", tokenVerify, DiaryController.deleteDiary);

module.exports = router;

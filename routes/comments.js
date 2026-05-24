const router = require("express").Router();
const Comment = require("../models/Comment");
const { upload, cloudinary } = require("../cloudinary");

// get all comments for a pin
router.get("/:pinId", async (req, res) => {
    try {
        const comments = await Comment.find({ pinId: req.params.pinId });
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json(err);
    }
});

// create a comment
router.post("/", async (req, res) => {
    const newComment = new Comment(req.body);
    try {
        const savedComment = await newComment.save();
        res.status(200).json(savedComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

// update a comment
router.put("/:id", async (req, res) => {
    try {
        const updatedComment = await Comment.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

// delete a comment
router.delete("/:id", async (req, res) => {
    try {
        await Comment.findByIdAndDelete(req.params.id);
        res.status(200).json("Comment deleted.");
    } catch (err) {
        res.status(500).json(err);
    }
});

// upload photos to a comment
router.post("/:id/photos", upload.array("photos", 5), async (req, res) => {
    try {
        const urls = req.files.map(f => f.path);
        const updatedComment = await Comment.findByIdAndUpdate(
            req.params.id,
            { $push: { photos: { $each: urls } } },
            { new: true }
        );
        res.status(200).json(updatedComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

// get all comments
router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
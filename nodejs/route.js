const Controller = require("./controller");
const express = require("express");
const router = express.Router();
// const Page = require("./model");

router.post("/", Controller.getNotes);
router.post("/new", Controller.saveNote);
router.post("/update", Controller.updateNote);
router.post("/delete", Controller.deleteNote);

module.exports = router;

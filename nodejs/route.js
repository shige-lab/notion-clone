const Controller = require("./controller");
const Page = require("./model");
const express = require("express");
const router = express.Router();


router.post("/", Controller.getNotes);
router.post("/new",Controller.saveNote);
router.post("/update",Controller.updateNote);
router.post("/delete",Controller.deleteNote);

module.exports = router;

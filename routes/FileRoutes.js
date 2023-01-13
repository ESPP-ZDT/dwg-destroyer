const FileController = require("../controllers/FileController");
const FileConverterController = require("../controllers/FileConverterController");
const express = require("express");
const File = require("../models/FileModel");
const router = express.Router(); // create and store the router instance
const upload = require("../upload");

router.post(
    "/upload",
    upload.single("file"),
    FileController.createFile,
    FileController.convertDWGtoDXF
  );
  
router.get("/file/:name", FileController.getFile);
router.patch("/file/:name", FileController.updateFile);
router.delete("/file/:name", FileController.deleteFile);

//router.post("/file/convertDWGtoDXF/:name", FileController.convertDWGtoDXF);

module.exports = router;

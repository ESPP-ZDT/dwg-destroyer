const FileController = require('../controllers/FileController');
const express = require('express');
const router = express.Router(); // create and store the router instance

router.post('/upload', upload.single('file'), FileController.createFile);
router.get('/file/:name', FileController.getFile);
router.patch('/file/:name', FileController.updateFile);
router.delete('/file/:name', FileController.deleteFile);

module.exports = router;





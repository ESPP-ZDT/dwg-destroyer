const File = require('../models/FileModel');


const createFile = (req, res) => {
    const newFile = new File({
        name: req.file.originalname,
        path: req.file.path,
        type: req.file.mimetype
    });
    newFile.save()
    .then(file => res.json(file))
    .catch(err => res.status(400).json({error: err}));
};

const getFile = (req, res) => {
    File.findOne({ name: req.params.name })
    .then(file => res.json(file))
    .catch(err => res.status(404).json({error: err}));
};

const updateFile = (req, res) => {
    File.findOneAndUpdate({ name: req.params.name }, req.body)
    .then(file => {
        if (!file) {
            return res.status(404).send({
                message: "File not found with name " + req.params.name
            });
        }
        res.send(file);
    })
    .catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "File not found with name " + req.params.name
            });
        }
        return res.status(500).send({
            message: "Error updating file with name " + req.params.name
        });
    });
};

const deleteFile = (req, res) => {
    File.findOneAndRemove({ name: req.params.name })
    .then(file => {
        if (!file) {
            return res.status(404).send({
                message: "File not found with name " + req.params.name
            });
        }
        res.send({ message: "File deleted successfully!" });
    })
    .catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "File not found with name " + req.params.name
            });
        }
        return res.status(500).send({
            message: "Could not delete file with name " + req.params.name
        });
    });
};
module.exports = {createFile,getFile,updateFile,deleteFile}
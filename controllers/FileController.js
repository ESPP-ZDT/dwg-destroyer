const File = require('../models/FileModel');
const FileConverter = require('./FileConverterController');


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

const convertDWGtoDXF = (req, res) => {
    // Get the file name from the request
    const fileName = req.file.originalname;
    // specify the input and output file paths
    const inputFile = `../files/input/${fileName}.dwg`;
    const outputFile = `../files/output/converted_${fileName}.dxf`;
    // convert the DWG file to DXF
    FileConverter(inputFile, outputFile, (err) => {
      if (err) {
        console.error(err);
        res.status(500).send({ message: "Error converting file" });
      } else {
        console.log(`Successfully converted ${inputFile} to ${outputFile}`);
        res.send({ message: "DWG to DXF conversion successful!" });
      }
    });
  };
  


module.exports = {createFile,getFile,updateFile,deleteFile,convertDWGtoDXF}
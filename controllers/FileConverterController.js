const dxf = require('dxf-parser');
const fs = require('fs');
const dwg2dxf = require('dwg2dxf');

const FileConverter = (fileName) => {
    // specify the input and output file paths
    const inputFile = `../files/input/${fileName}.dwg`;
    const outputFile = `../files/output/converted_${fileName}.dxf`;

    // convert the DWG file to DXF
    dwg2dxf(inputFile, outputFile, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log(`Successfully converted ${inputFile} to ${outputFile}`);
            const dxfFile = fs.readFileSync(outputFile, 'utf-8');
            const parsedDxf = dxf.parseSync(dxfFile);
            const entities = parsedDxf.entities;
            console.log(entities);
        }
    });
}

module.exports = {FileConverter};

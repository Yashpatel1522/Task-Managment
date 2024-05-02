const logger = require("../../logger/logger");
var fs = require("fs");

const readPdf = async (request, response) => {
    try {
        const fileName = request.query.name;
        const data = fs.readFileSync(`public/assets/pdfs/${fileName}`);
        return response.json({data});
    } catch (error) {
        console.log(error);
    }
  };


  module.exports = readPdf;
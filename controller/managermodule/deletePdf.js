const logger = require("../../logger/logger");
var fs = require("fs");

const deletePdf = async (request, response) => {
    try {
        const fileName = request.query.name;
        console.log('===============================================');
        console.log('File Name is : '+fileName);
        console.log('===============================================');
        fs.unlinkSync(`public/assets/pdfs/${fileName}`);
        response.redirect();
    } catch (error) {
    }
  };


  module.exports = deletePdf;
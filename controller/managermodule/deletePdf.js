const logger = require("../../logger/logger");
var fs = require("fs");

const deletePdf = async (request, response) => {
    try {
        const fileName = request.query.name;
        fs.unlinkSync(`public/assets/pdfs/${fileName}`);
        response.redirect();
    } catch (error) {
    }
  };


  module.exports = deletePdf;
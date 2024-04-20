const database = require("../../helpers/database.helper")
const logger = require("../../logger/logger")
var db = new database();

exports.categoryPage = (request, response) => {
  try {
    response.render('./adminmodule/category')
  } catch (error) {
    logger.error("category page is not render !")
  }
}

exports.adminCategory = async (request, response) => {
  try {
    let categoryData = await db.executeQuery(`select * from categories where status = 1`);
    return response.json({ categoryData });
  } catch (err) {
    console.log(err);
    // logger.error("category not found it!");
  }
}

exports.searchCategory = async (request, response) => {
  try {
    let search = "%" + request.params.searchdata + "%";
    let categorySearch = await db.executeQuery(`SELECT * from categories where category like ? and status = 1`, [search]);
    return response.json({ categorySearch });
  } catch (err) {
    logger.error("Not task found it!");
  }
}
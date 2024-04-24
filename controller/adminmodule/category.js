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

exports.categoryDetail = async (request, response) => {
  try {
    let categoryId = request.params.id;
    let viewCategory = await db.executeQuery(`select * from categories as c left join tasks as t on c.id = t.category_id where (t.category_id = ? and  c.status = 1 and t.status = 1);`, [categoryId]);
    return response.json({ viewCategory });
  } catch (err) {
    logger.error("task not found it!");
  }
}

exports.deleteCategory = async (request, response) => {
  try {
    let categoryDelete = await db.updateOr({ status: "0" }, "categories", { id: request.params.id });
    return response.json({ categoryDelete });
  } catch (error) {
    logger.error("Category Data Can't deleted !");
  }
}

exports.addCategory = async (request, response) => {
  try {
    let { category_name } = request.body;
    let categories_is_exists = await db.executeQuery("select * from categories where category = ? and status = ?", [category_name, 1]);
    if (categories_is_exists.length === 0) {
      await db.insertData({ category: category_name }, "categories");
      return response.json({ status: 500, msg: "New Category Insert Succefully" })
    } else {
      return response.json({ status: 200, msg: "Category Is Already Exists" })
    }
  } catch (error) {
    logger.error("Category Data Can't deleted !");
  }
}
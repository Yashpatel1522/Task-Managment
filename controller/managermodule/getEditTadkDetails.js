const database = require("../../helpers/database.helper");
const logger = require("../../logger/logger");

const getEditDetails = async (request, response) => {
  try {
    let categoryQ = `select id, category from categories where status = 1`;
    let db = new database();
    let categoryRes = await db.executeQuery(categoryQ);

    let urgencyQ = `select id, type from urgency`;
    let urgencyRes = await db.executeQuery(urgencyQ);

    let importanceQ = `select id, type from importants`;
    let importanceRes = await db.executeQuery(importanceQ);

    return response.send({
      categoryRes: categoryRes,
      urgencyRes: urgencyRes,
      importanceRes: importanceRes,
    });
  } catch (error) {
    logger.error(error);
    return response.send({ error: error });
  }
};

module.exports = getEditDetails;

const database = require("../../helpers/database.helper");
const db = new database();

const getProfiledata = async (request, response) => {
  try {
    let f = await db.executeQuery(`select * from users where id=1`);
    console.log(f);
    return response.json({
      result: await db.executeQuery(`select * from users where id=1`),
    });
  } catch (error) {
    return response.send({ error: error });
  }
};
const updateProfiledata = async (request, response) => {
  try {
    return response.json({
      result: await db.updateAnd(request.body, "users", { id: 1 }),
    });
  } catch (error) {
    return response.send({ error: error });
  }
};
module.exports = { getProfiledata, updateProfiledata };

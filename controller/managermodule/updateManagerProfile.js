const database = require("../../helpers/database.helper");
const logger = require("../../logger/logger");

const updateManager = async (request, response) => {
  try {
    let managerId = request.user.id;
    const data = request.body;
    let db = new database();
    const updateQuery = `update users set first_name = ?, last_name = ?, email = ?, contact = ?, date_of_birth = ? where id = ?;`;
    const updateRes = await db.executeQuery(updateQuery, [
      request.body.first_name,
      request.body.last_name,
      request.body.email,
      request.body.contact,
      request.body.date_of_birth,
      managerId,
    ]);

    const countQuery = `select count(*) as count from user_profiles where user_id = ?`;
    const countRes = await db.executeQuery(countQuery, managerId);

    if (countRes[0].count == 0) {
      if (request.file) {
        const oldName = request.file.filename.slice(
          request.file.filename.indexOf("-") + 1
        );
        const updateImageQuery = `insert into user_profiles (user_id, oldimage_name, newimage_name) values (?, ?, ?)`;
        console.log(oldName);
        console.log(request.file.filename);
        const updatedRes = await db.executeQuery(updateImageQuery, [
          managerId,
          oldName,
          request.file.filename,
        ]);
      }
    } else if (request.file) {
      const oldName = request.file.filename.slice(
        request.file.filename.indexOf("-") + 1
      );
      const updateImageQuery = `update user_profiles set oldimage_name = ?, newimage_name = ? where user_id = ?`;
      const updatedRes = await db.executeQuery(updateImageQuery, [
        oldName,
        request.file.filename,
        managerId,
      ]);
    }

    return response.redirect('/manager/dashboard');
  } catch (error) {
    logger.error(error);
    return response.send({ error: error });
  }
};

module.exports = updateManager;

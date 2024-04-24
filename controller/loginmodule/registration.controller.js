const addUser = require("../../services/auth/registration");

const registrationGet = (req, res) => {
  res.render("loginmodule/registration.ejs");
};

const registrationPost = async (request, response) => {
  let flag = await addUser(request.body, request.file);
  console.log(request.body);
  if (flag.flag == true) {
    response.send(flag).status(200);
  } else {
    response.send(flag).status(500);
  }
};
const dashboardGet = (req, res) => {
  res.render("loginmodule/dashboard.ejs");
};

module.exports = { registrationGet, dashboardGet, registrationPost };

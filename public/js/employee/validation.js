const isString = (obj) => {
  keys = Object.keys(obj);
  let error = {};
  keys.forEach((key) => {
    if (document.getElementById(key).value.trim() == "") {
      error[key] = obj[key];
    }
  });
  return error;
};

const printErrorMes = (id, msg) => {
  let node = document.getElementById(id).parentNode;
  node.innerHTML += `<small class='text-danger'>${msg}</small>`;
};

const removeMessage = () => {
  const errors = document.querySelectorAll("small.text-danger");
  errors.forEach((error) => error.remove());
};

const isNumberWithString = (obj) => {
  let keys = Object.keys(obj);
  let error = {};
  keys.forEach((item) => {
    if (!isNaN(document.getElementById(item).value.trim())) {
      error[item] = obj[item];
    }
  });
  return error;
};

const regularExp2 = (type, id) => {
  let EMAIL =
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/;
  let CONTACT = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  let DATE = /\d{2,4}\-\d{1,2}\-\d{1,2}/;
  switch (type) {
    case "email":
      if (EMAIL.test(document.getElementById(id).value.trim())) return true;
      break;
    case "mobile":
      if (CONTACT.test(document.getElementById(id).value.trim())) return true;
      break;
    case "date":
      if (DATE.test(document.getElementById(id).value.trim())) return true;
      break;
  }
  return false;
};


const isValidProfilDetails = () => {
  removeMessage();
  let errors = isString({
    profile_first_name: "First name",
    profile_last_name: "Last name",
    profile_email: "Email ID",
    profile_contact: "Phone number",
    profile_date_of_birth: "Birthdate",
    profile_employee_role: "Department",
  });
  let res = isNumberWithString({
    profile_first_name: "First name",
    profile_last_name: "Last name",
  });

  //set validation errors to those fields which are filled but is NaN
  let keys = Object.keys(errors);
  Object.keys(res).forEach((item) => {
    if (keys.indexOf(item) < 0) errors[item] = res[item];
  });

  keys = Object.keys(errors);
  if (regularExp2("email", "profile_email") == false && keys.indexOf("email") < 0)
    errors["profile_email"] = "Email ID";

  if (regularExp2("mobile", "profile_contact") == false && keys.indexOf("phoneno") < 0)
    errors["profile_contact"] = "Phone number";

  if (regularExp2("date", "profile_date_of_birth") == false && keys.indexOf("date") < 0)
    errors["profile_date_of_birth"] = "Birthdate";
  let flag = true;
  Object.keys(errors).forEach((error) => {
    printErrorMes(error, `${errors[error]} is invalid...`);
    flag = false;
  });
  return flag;
};

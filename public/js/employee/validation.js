const isRequiredString = (obj) => {
  keys = Object.keys(obj);
  let error = {};
  keys.forEach((key) => {
    if (document.getElementById(key).value.trim() == "") {
      error[key] = obj[key];
    }
  });
  return error;
};

const printErrorMessage = (id, msg) => {
  let node = document.getElementById(id).parentNode;
  node.innerHTML += `<small class='text-danger'>${msg}</small>`;
};

const removeErrorMessage = () => {
  const errors = document.querySelectorAll("small.text-danger");
  errors.forEach((error) => error.remove());
};

const isNumberString = (obj) => {
  let keys = Object.keys(obj);
  let error = {};
  keys.forEach((item) => {
    if (!isNaN(document.getElementById(item).value.trim())) {
      error[item] = obj[item];
    }
  });
  return error;
};

const regularExp = (type, id) => {
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
      console.log(document.getElementById(id).value.trim());
      if (DATE.test(document.getElementById(id).value.trim())) return true;
      break;
  }
  return false;
};

// const isValidProfile=(id)=>{
//   const img=document.getElementById(id)
//   var file = img.files[0];
//     if (!file){
//       return false;
//     }
//     var arr=(file.type).split("image/");
//     console.log(arr)
//     if (arr.length==1){
//         return false;
//     }
// }
//   function isValidLogin() {
//     removeErrorMessage();
//     // let errors = isRequiredString({
//     //   'firstName': 'First name',
//     //   'lastName': 'Last name',
//     //   'email': 'Email ID',
//     //   'phoneno': 'Phone number',
//     //   'date': 'Birthdate'
//     // });
//     let errors = isRequiredString({
//           'username':'User Name',
//           'password':'Password'
//         });
//     // let res = isNumberString({
//     //   'firstName': 'First name',
//     //   'lastName': 'Last name',
//     // })

//     // let keys = Object.keys(errors);
//     // Object.keys(res).forEach(item=>{
//     //   if(keys.indexOf(item)<0)
//     //     errors[item] = res[item]
//     // });

//     // keys = Object.keys(errors);
//     // if(regularExp('email', 'email') == false && keys.indexOf('email')<0)
//     //   errors['email']= "Email ID"

//     // if(regularExp('mobile', 'phoneno') == false && keys.indexOf('phoneno')<0)
//     //   errors['phoneno']= "Phone number"

//     // if(regularExp('date', 'date') == false && keys.indexOf('date')<0)
//     //   errors['date']= "Birthdate"

//     let flag = true;
//     Object.keys(errors).forEach(error => {
//       printErrorMessage(error, `${errors[error]} is invalid...`)
//       flag = false;
//     })
//     return flag;
//   }

//   const isValidRegistration=()=>{
//     removeErrorMessage();
//     let errors = isRequiredString({
//       'first_name': 'First name',
//       'last_name': 'Last name',
//       'email': 'Email ID',
//       'contact': 'Phone number',
//       'date_of_birth': 'Birthdate',
//       'employee_role': 'Department',
//     });
//     // let errors = isRequiredString({
//     //       'username':'User Name',
//     //       'password':'Password'
//     //     });
//     let res = isNumberString({
//       'first_name': 'First name',
//       'last_name': 'Last name',
//     })

//     //set validation errors to those fields which are filled but is NaN
//     let keys = Object.keys(errors);
//     Object.keys(res).forEach(item=>{
//       if(keys.indexOf(item)<0)
//         errors[item] = res[item]
//     });

//     keys = Object.keys(errors);
//     if(regularExp('email', 'email') == false && keys.indexOf('email')<0)
//       errors['email']= "Email ID"

//     if(regularExp('mobile', 'contact') == false && keys.indexOf('phoneno')<0)
//       errors['contact']= "Phone number"

//     if(regularExp('date', 'date_of_birth') == false && keys.indexOf('date')<0)
//       errors['date_of_birth']= "Birthdate"

//     if(isValidProfile("img")==false && keys.indexOf('img')<0)
//     {
//       errors['img']= "Profile"
//     }
//     let flag = true;
//     Object.keys(errors).forEach(error => {
//       printErrorMessage(error, `${errors[error]} is invalid...`)
//       flag = false;
//     })
//     return flag;
//   }

const isValidProfilDetails = () => {
  removeErrorMessage();
  let errors = isRequiredString({
    first_name: "First name",
    last_name: "Last name",
    email: "Email ID",
    contact: "Phone number",
    date_of_birth: "Birthdate",
    employee_role: "Department",
  });
  let res = isNumberString({
    first_name: "First name",
    last_name: "Last name",
  });

  //set validation errors to those fields which are filled but is NaN
  let keys = Object.keys(errors);
  Object.keys(res).forEach((item) => {
    if (keys.indexOf(item) < 0) errors[item] = res[item];
  });

  keys = Object.keys(errors);
  if (regularExp("email", "email") == false && keys.indexOf("email") < 0)
    errors["email"] = "Email ID";

  if (regularExp("mobile", "contact") == false && keys.indexOf("phoneno") < 0)
    errors["contact"] = "Phone number";

  if (regularExp("date", "date_of_birth") == false && keys.indexOf("date") < 0)
    errors["date_of_birth"] = "Birthdate";

  // if(isValidProfile("img")==false && keys.indexOf('img')<0)
  // {
  //   errors['img']= "Profile"
  // }
  let flag = true;
  Object.keys(errors).forEach((error) => {
    printErrorMessage(error, `${errors[error]} is invalid...`);
    flag = false;
  });
  return flag;
};

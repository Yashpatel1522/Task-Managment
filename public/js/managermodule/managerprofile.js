const imageInput = document.getElementById("change");
const selectedImage = document.getElementById("selectedImage");

imageInput.addEventListener("change", function (event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function (event) {
    selectedImage.src = event.target.result;
  };

  reader.readAsDataURL(file);
});

const validation = () => {
  let first_name = document.getElementById("firstname").value.trim();
  let last_name = document.getElementById("lastname").value.trim();
  let phone_input = document.getElementById("phone_input").value.trim();
  let dob = document.getElementById("dob_input").value.trim();

  let spanEle = document.getElementsByClassName("msg");
  Object.keys(spanEle).forEach((element) => {
    spanEle[element].innerText = ``;
  });

  let errorArr = [];
  let errorMsg = [];
  let flag = true;

  let focusField;

  // First Name Validation
  if (first_name == ``) {
    if (!errorArr.includes(0)) {
      errorArr.push(0);
      errorMsg.push(`First name Can't be blank`);
      if (!focusField) {
        focusField = `firstname`;
      }
    }
    flag = false;
  }
  for (let i = 0; i < first_name.length; i++) {
    if (!isNaN(first_name[i])) {
      if (!errorArr.includes(0)) {
        errorArr.push(0);
        errorMsg.push(`Invalid first name`);
        if (!focusField) {
          focusField = `firstname`;
        }
      }
      flag = false;
    }
  }

  // Last Name Validation
  if (last_name == ``) {
    if (!errorArr.includes(1)) {
      errorArr.push(1);
      errorMsg.push(`Last name can't be blank`);
      if (!focusField) {
        focusField = `lastname`;
      }
    }
    flag = false;
  }
  for (let i = 0; i < last_name.length; i++) {
    if (!isNaN(last_name[i])) {
      if (!errorArr.includes(1)) {
        errorArr.push(1);
        errorMsg.push(`Invalid last name`);
        if (!focusField) {
          focusField = `lastname`;
        }
      }
      flag = false;
    }
  }

  // Contact No. Validation
  if (phone_input == ``) {
    if (!errorArr.includes(2)) {
      errorArr.push(2);
      errorMsg.push(`Contact number can't be blank`);
      if (!focusField) {
        focusField = `phone_input`;
      }
    }
    flag = false;
  } else if (phone_input.length != 10 || isNaN(phone_input)) {
    if (!errorArr.includes(2)) {
      errorArr.push(2);
      errorMsg.push(`Invalid contact number`);
      if (!focusField) {
        focusField = `phone_input`;
      }
    }
    flag = false;
  }

  //Date Validation
  if (dob == ``) {
    if (!errorArr.includes(3)) {
      errorArr.push(3);
      errorMsg.push(`Date of birth can't be blank`);
      if (!focusField) {
        focusField = `dob_input`;
      }
    }
    flag = false;
  } else if (dob.length != 10) {
    if (!errorArr.includes(3)) {
      errorArr.push(3);
      errorMsg.push(`Invalid date of birth`);
      if (!focusField) {
        focusField = `dob_input`;
      }
    }
    flag = false;
  }
  for (let i = 0; i < dob.length; i++) {
    if ((i == 4 && dob[i] != "-") || (i == 7 && dob[i] != "-")) {
      if (!errorArr.includes(3)) {
        errorArr.push(3);
        errorMsg.push(`Invalid date format`);
        if (!focusField) {
          focusField = `dob_input`;
        }
      }
      flag = false;
    } else if (i != 4 && i != 7 && isNaN(dob[i])) {
      if (!errorArr.includes(3)) {
        errorArr.push(3);
        errorMsg.push(`Invalid date of birth`);
        if (!focusField) {
          focusField = `dob_input`;
        }
      }
      flag = false;
    }
  }
  if (dob.slice(0, 4) > 2024) {
    if (!errorArr.includes(3)) {
      errorArr.push(3);
      errorMsg.push(`Invalid year of birth`);
      if (!focusField) {
        focusField = `dob_input`;
      }
    }
    flag = false;
  }
  if (dob.slice(5, 7) > 12) {
    if (!errorArr.includes(3)) {
      errorArr.push(3);
      errorMsg.push(`Invalid month of birth`);
      if (!focusField) {
        focusField = `dob_input`;
      }
    }
    flag = false;
  }
  if (dob.slice(8, 10) > 31) {
    if (!errorArr.includes(3)) {
      errorArr.push(3);
      errorMsg.push(`Invalid date of birth`);
      if (!focusField) {
        focusField = `dob_input`;
      }
    }
    flag = false;
  } else if (
    dob.slice(5, 7) == 4 ||
    dob.slice(5, 7) == 6 ||
    dob.slice(5, 7) == 9 ||
    dob.slice(5, 7) == 11
  ) {
    if (dob.slice(8, 10) > 30) {
      if (!errorArr.includes(3)) {
        errorArr.push(3);
        errorMsg.push(`Invalid date of birth`);
        if (!focusField) {
          focusField = `dob_input`;
        }
      }
      flag = false;
    }
  } else if (dob.slice(5, 7) == 2) {
    if (dob.slice(0, 4) % 4 == 0) {
      if (dob.slice(8, 10) > 29) {
        if (!errorArr.includes(3)) {
          errorArr.push(3);
          errorMsg.push(`Invalid date of birth`);
          if (!focusField) {
            focusField = `dob_input`;
          }
        }
        flag = false;
      }
    } else {
      if (dob.slice(8, 10) > 28) {
        if (!errorArr.includes(3)) {
          errorArr.push(3);
          errorMsg.push(`Invalid date of birth`);
          if (!focusField) {
            focusField = `dob_input`;
          }
        }
        flag = false;
      }
    }
  }

  if (document.getElementById("change").value) {
    let image = document.getElementById("change").value.split(".");
    let imageType = image[image.length - 1];

    imageType = imageType.toLowerCase();
    if (
      imageType != "jpg" &&
      imageType != "jpeg" &&
      imageType != "png" &&
      imageType != "svg"
    ) {
      document.getElementById("imgMsg").innerText = `Invalid Image`;
      flag = false;
    }
  }

  if (errorArr) {
    errorArr.forEach(function (element, index) {
      spanEle[element].innerText = errorMsg[index];
    });
  }
  if (focusField) {
    document.getElementById(focusField).focus();
  }

  return flag;
};

const getProfile = async () => {
  let url = window.location.origin + "/manager/getManagerProfile/1";
  let response = await fetch(url);
  let data = await response.json();

  let spanEle = document.getElementsByClassName("msg");
  Object.keys(spanEle).forEach((element) => {
    spanEle[element].innerText = ``;
  });
  document.getElementById("imgMsg").innerText = ``;

  document.getElementById("id").value = data.result[0].id;
  document.getElementById("firstname").value = data.result[0].first_name;
  document.getElementById("lastname").value = data.result[0].last_name;
  document.getElementById("email1").value = data.result[0].email;
  document.getElementById("phone_input").value = data.result[0].contact;
  document.getElementById("dob_input").value = data.result[0].date_of_birth;

  if (data.imageResult[0]) {
    document.getElementById(
      "selectedImage"
    ).src = `/assets/userprofiles/${data.imageResult[0].newimage_name}`;
  }
};

const logout = () => {
  try {
    Swal.fire({
      title: "Are you sure?",
      text: "You Logout this page !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "logout!",
          text: "You are logout",
          icon: "success",
        }).then((result2) => {
          if (result2.isConfirmed) {
            window.location.href = "/";
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

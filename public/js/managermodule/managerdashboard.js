const getData = async () => {
  let url = window.location.origin + `/manager/getManagerTaskCount`;
  let response = await fetch(url);
  let data = await response.json();
  document.getElementsByClassName("count")[0].innerText =
    data.todoResult[0].count;
  document.getElementsByClassName("count")[1].innerText =
    data.progressResult[0].count;
  document.getElementsByClassName("count")[2].innerText =
    data.compleatedResult[0].count;
};

const getProfile = async () => {
  let url = window.location.origin + "/manager/getManagerProfile";
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

const profOption = () => {
  document.getElementById("profClk").style.display = "block";
};

const remOption = () => {
  document.getElementById("profClk").style.display = "none";
};

const showOption = () => {
  if (
    document.getElementById("profClk").style.display == "none" ||
    document.getElementById("profClk").style.display == ""
  ) {
    document.getElementById("profClk").style.display = "block";
  } else {
    document.getElementById("profClk").style.display = "none";
  }
};

// pop-up js of addtask.ejs
let popup = document.getElementById("popup");

const openPopup = () => {
  popup.classList.add("open-popup");
};

const closePopup = () => {
  popup.classList.remove("open-popup");
};

// function for serach task
const openViewComments = (teamId) => {
  window.location.href = `/manager/comments/${teamId}`;
};

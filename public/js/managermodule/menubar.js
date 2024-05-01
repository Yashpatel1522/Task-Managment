flag = true;
function closeProf() {
  const profDisp = document.getElementById("profClk");
  if (flag) {
    profDisp.style.display = "none";
  }
  flag = true;
}
async function getProf1() {
  let data = await (await fetch("/manager/getManagerProfile/2")).json();
  let profData = data;

  if (profData.imageResult) {
    document.getElementById(
      "profImg"
    ).src = `/assets/userprofiles/${profData.imageResult[0].newimage_name}`;
    document.getElementById("userName").innerText =
      `${profData.result[0].first_name}` +
      " " +
      `${profData.result[0].last_name}`;
  } else {
    document.getElementById("profImg").src = `/assets/employee/user.png`;
    document.getElementById("userName").innerText =
      `${profData.result[0].first_name}` +
      " " +
      `${profData.result[0].last_name}`;
  }
}
getProf1();
function closeDropdown() {
  const profDisp = document.getElementById("profClk");
  if (flag) {
    profDisp.style.display = "none";
  }
  if (taskFlag) {
    let classes = Array.from(document.getElementsByClassName("menu"));
    classes.forEach((element) => {
      element.style.display = "none";
    });
  }
  taskFlag = true;
  flag = true;
}

const profOption = () => {
  document.getElementById("profClk").style.display = "block";
};

const remOption = () => {
  document.getElementById("profClk").style.display = "none";
};

const showOption = async () => {
  if (
    document.getElementById("profClk").style.display == "none" ||
    document.getElementById("profClk").style.display == ""
  ) {
    document.getElementById("profClk").style.display = "block";
  } else {
    document.getElementById("profClk").style.display = "none";
  }
  flag = false;
};

const requireValidation = (allfields, reqfields) => {
  let flag = true;
  for (var i = 0; i < reqfields.length; i++) {
    if (reqfields[i].value.trim().length === 0) {
      allfields[i].innerHTML = "* required";
      flag = false;
    }
  }
  return flag;
};

const addTaskValidation = () => {
  let err = true;
  const validdob = /[12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])/;
  const allfields = document.querySelectorAll(".errclass");
  const reqfields = document.querySelectorAll(".reqfieled");
  const reqselect = document.querySelectorAll(".reqselect");
  const reqselecterr = document.querySelectorAll(".reqselecterr");
  const startdate = document.getElementById("task_start_date").value;
  const enddate = document.getElementById("task_end_date").value;
  if (!requireValidation(allfields, reqfields)) {
    err = false;
  }

  for (let i = 0; i < reqselect.length; i++) {
    if (reqselect[i].value == 0) {
      reqselecterr[i].innerHTML = "* required";
      err = false;
    }
  }
  if (startdate.trim().length === 0) {
    document.getElementById("dateerr").innerHTML = "* required";
    err = false;
  } else if (!validdob.test(startdate)) {
    document.getElementById("dateerr").innerHTML = "Please enter valid date";
    err = false;
  }
  if (enddate.trim().length === 0) {
    document.getElementById("dateerr2").innerHTML = "* required";
    err = false;
  } else if (!validdob.test(enddate)) {
    document.getElementById("dateerr2").innerHTML = "Please enter valid date";
    err = false;
  }

  return err;
};

const addUserList = () => {
  try {
    fetch(`${window.location.origin}/manager/getdataapi`, {
      method: "get", // *GET, POST, PUT, DELETE, etc.
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data received:", data);
        employeeDynamicCombo(data.empdata);
        teamDynamicCombo(data.teamdata);
        catagoryDynamicCombo(data.categorydata);
        importantLevelCombo(data.importancyData);
        urgencyLevelCombo(data.urgencyData);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  } catch (error) {
    console.log(error);
  }
};
addUserList();

const employeeDynamicCombo = (data) => {
  let empcombo = document.getElementById("Assin_task_to");
  for (var i = 0; i < data.length; i++) {
    let option = document.createElement("option");
    option.setAttribute("value", `${data[i].id}`);
    option.setAttribute("id", `${data[i].id}`);
    option.textContent = `${data[i].first_name}`;
    empcombo.appendChild(option);
  }
};

const teamDynamicCombo = (data) => {
  let teamcombo = document.getElementById("Assin_task_to_team");
  data.forEach((team) => {
    let option = document.createElement("option");
    option.setAttribute("value", `${team.id}`);
    option.setAttribute("id", `${team.id}`);
    option.textContent = `${team.team_name}`;
    teamcombo.appendChild(option);
  });
};

const catagoryDynamicCombo = (data) => {
  let categoryCombo = document.getElementById("task_category");
  for (var i = 0; i < data.length; i++) {
    let option = document.createElement("option");
    option.setAttribute("value", `${data[i].id}`);
    option.setAttribute("id", `${data[i].id}`);
    option.textContent = `${data[i].category}`;
    categoryCombo.appendChild(option);
  }
};

const importantLevelCombo = (data) => {
  let importantCombo = document.getElementById("impotant_level");
  for (var i = 0; i < data.length; i++) {
    let option = document.createElement("option");
    option.setAttribute("value", `${data[i].id}`);
    option.setAttribute("id", `${data[i].id}`);
    option.textContent = `${data[i].type}`;
    importantCombo.appendChild(option);
  }
};

const urgencyLevelCombo = (data) => {
  let urgencyCombo = document.getElementById("urgency_level");
  for (var i = 0; i < data.length; i++) {
    let option = document.createElement("option");
    option.setAttribute("value", `${data[i].id}`);
    option.setAttribute("id", `${data[i].id}`);
    option.textContent = `${data[i].type}`;
    urgencyCombo.appendChild(option);
  }
};

const insertTaskData = () => {
  let err = addTaskValidation();
  if (err === true) {
    let form = document.getElementById("taskForm");
    // let btnSubmit = document.getElementById("savebtn");
    let formData = new FormData(form);
    formData.delete("Assin_task_to");
    formData.delete("files");
    formData.delete("Assin_task_to_team");
    let selectedArray = new Array();
    let count = 0;
    let usres = document.getElementById("Assin_task_to");
    for (i = 0; i < usres.options.length; i++) {
      if (usres.options[i].selected) {
        selectedArray[count] = usres.options[i].value;
        count++;
      }
    }
    let selectedTeamArray = new Array();
    let teamCount = 0;
    let teams = document.getElementById("Assin_task_to_team");
    for (i = 0; i < teams.options.length; i++) {
      if (teams.options[i].selected) {
        selectedTeamArray[teamCount] = teams.options[i].value;
        teamCount++;
      }
    }
    formData.append("Assin_task_to", selectedArray.toString());
    formData.append("Assin_task_to_team", selectedTeamArray.toString());
    var files = document.getElementById("files").files;
    console.log(files);
    for (var x = 0; x < files.length; x++) {
      formData.append("files", files[x]);
    }
    try {
      fetch(`/manager/inserttask`, {
        method: "post", // *GET, POST, PUT, DELETE, etc.
        body: formData,
      })
        .then((response) => {
          console.log(response);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          if (typeof data.msg !== "undefined") {
            DataINsertedSuccessfully();
          } else {
            serverValidation(data);
          }
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    } catch (error) {
      console.log(error);
    }
  }
};

const onReset = () => {
  document.getElementById("taskForm").reset();
};

const serverValidation = (data) => {
  if (typeof data.task_name_err !== "undefined") {
    document.getElementById("tnerr").innerHTML = data.task_name_err;
  }
  if (typeof data.Assin_task_to_err !== "undefined") {
    document.getElementById("aterr").innerHTML = data.Assin_task_to_err;
  }
  if (typeof data.task_status_err !== "undefined") {
    document.getElementById("tserr").innerHTML = data.task_status_err;
  }
  if (typeof data.task_category !== "undefined") {
    document.getElementById("cterr").innerHTML = data.task_category;
  }
  if (typeof data.start_date_err !== "undefined") {
    document.getElementById("dateerr").innerHTML = data.start_date_err;
  }
  if (typeof data.end_date_err !== "undefined") {
    document.getElementById("dateerr2").innerHTML = data.end_date_err;
  }
  if (typeof data.description_err !== "undefined") {
    document.getElementById("descriptionserr").innerHTML = data.description_err;
  }
  if (typeof data.impotant_level_err !== "undefined") {
    document.getElementById("ilerr").innerHTML = data.impotant_level_err;
  }
  if (typeof data.urgency_level_err !== "undefined") {
    document.getElementById("ulerr").innerHTML = data.urgency_level_err;
  }
};

const DataINsertedSuccessfully = () => {
  Swal.fire({
    title: "Done",
    text: "Task inserted Succesfully",
    icon: "success",
  }).then(function () {
    window.location.reload();
  });
};

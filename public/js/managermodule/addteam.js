const onReset = () => {
  document.getElementById("teamForm").reset();
};

const addEmpList = async () => {
  try {
    await fetch(`${window.location.origin}/manager/getempdata`, {
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
        employeeDynamicCombo(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  } catch (error) {
    console.log(error);
  }
};
addEmpList();

const employeeDynamicCombo = (empdata) => {
  let empcombo = document.getElementById("empselect");
  empdata.forEach((data) => {
    let option = document.createElement("option");
    option.setAttribute("value", `${data.id}`);
    option.setAttribute("id", `${data.id}`);
    option.textContent = `${data.first_name}`;
    empcombo.appendChild(option);
  });
};

const addTeamValidations = () => {
  let err = true;
  let team_Name = document.getElementById("team_name").value;
  if (team_Name.trim().length === 0) {
    document.getElementById("tnerr").innerHTML = "* required";
    err = false;
  }
  let selectvalue = document.getElementById("empselect").value;
  if (selectvalue == 0) {
    document.getElementById("tmerr").innerHTML = "* required";
    err = false;
  }
  return err;
};

const insertTaskData = async () => {
  let err = addTeamValidations();
  if (err === true) {
    let dataobj = {};
    let team_name = document.getElementById("team_name").value;
    dataobj.team_name = team_name;
    let selectedArray = new Array();
    let count = 0;
    let emp = document.getElementById("empselect");
    for (i = 0; i < emp.options.length; i++) {
      if (emp.options[i].selected) {
        selectedArray[count] = emp.options[i].value;
        count++;
      }
    }
    dataobj.employe = selectedArray;
    try {
      await fetch(`${window.location.origin}/manager/addteamdata`, {
        method: "post", // *GET, POST, PUT, DELETE, etc.
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(dataobj),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          if (data.msg !== "undefined") {
            DataINsertedSuccessfully();
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

// pop-up js of addtask.ejs
let popup = document.getElementById("popup");

const openPopup = () => {
  popup.classList.add("open-popup");
};

const closePopup = () => {
  popup.classList.remove("open-popup");
};

const DataINsertedSuccessfully = () => {
  Swal.fire({
    title: "Done",
    text: "Task inserted Succesfully",
    icon: "success",
  }).then(function () {
    window.location.href = "/manager/Teams";
  });
};

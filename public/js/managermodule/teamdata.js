async function fetchNotificationData() {
  try {
    await fetch(`${window.location.origin}/manager/notification`, {
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
        if (typeof data !== "undefined") {
          showNotifications(data);
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  } catch (error) {
    console.log(error);
  }
}

function showNotifications(data) {
  let notificatiodata = "";
  data.forEach((element) => {
    notificatiodata += `<h3>Today is due date of <b>${element.task_name}</b> task<h3>`;
  });
  Swal.fire({
    title: ` ${notificatiodata}`,
    icon: "info",
  });
}

async function getProfile() {
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
}

function showOption() {
  if (
    document.getElementById("profClk").style.display == "none" ||
    document.getElementById("profClk").style.display == ""
  ) {
    document.getElementById("profClk").style.display = "block";
  } else {
    document.getElementById("profClk").style.display = "none";
  }
}

let pageLimit = 2;
let currentPage = 1;
let maxLength;
let pageCount;

const getTeamData = async () => {
  let data = await (await fetch(`/manager/teamapi`)).json();
  maxLength = data.result.length;
  pageCount = Math.ceil(maxLength / pageLimit);
  let table = document.getElementById("team-table");
  let dataadd = `<thead>
              <th>TeamId</th>
              <th>TeamName</th>
              <th>View Details</th>
              <th>Edit Team</th>
              <th>Delete Team</th>
              </thead>`;
  if (data.result.length != 0) {
    let startIndex = (currentPage - 1) * pageLimit;
    let endIndex = Math.min(startIndex + pageLimit, maxLength);
    data.result.slice(startIndex, endIndex).forEach((element) => {
      dataadd += `<tr>
              <td>${element.id}</td>
              <td>${element.team_name}</td>
              <td>
              <input type="button" value="View" class="btn btn-secondary px-3" onclick="viewTeam(${element.id})">
              </td>
              <td><input type="button" value="Edit" class="btn btn-secondary px-3" onclick="showTeamData(${element.id})"></td>
              <td>
              <input type="button" value="Delete" class="btn btn-secondary px-3" onclick="deleteTeam(${element.id})">
              </td>`;
    });
    table.innerHTML = dataadd;
    document.getElementById(
      "team-pagignation"
    ).innerHTML = `<div class = "pagination">
          <input type="button" value="firstpage" class="page-link" onclick="firstPage1()">
          <input type="button" value="previous" class="page-link" onclick="previous1()">
          <span class="page-link" >${currentPage}</span>
          <input type="button" value="next" class="page-link" onclick="next1()">
          <input type="button" value="lastpage" class="page-link" onclick="lastPage1()"></div>`;
  }
};

const firstPage1 = () => {
  currentPage = 1;
  getTeamData();
};

const previous1 = () => {
  if (currentPage > 1) {
    currentPage--;
    getTeamData();
  }
};

const next1 = () => {
  if (currentPage < pageCount) {
    currentPage++;
    getTeamData();
  }
};

const lastPage1 = () => {
  currentPage = pageCount;
  getTeamData();
};

const searchTeams = async (value) => {
  try {
    let data = await (
      await fetch(`/manager/managerTeam/searchteam/${value}`)
    ).json();
    document.getElementById("team-table").innerHTML = "";
    if (value === "") {
      getTeamData();
    }
    let table = document.getElementById("team-table");
    let dataadd = `<thead>
    <th>TeamId</th>
    <th>TeamName</th>
    <th>View Details</th>
    <th>Edit Team</th>
    <th>Delete Team</th>
    </thead>`;
    if (data.searchData.length != 0) {
      data.searchData.forEach((element) => {
        dataadd += `<tr>
        <td>${element.id}</td>
        <td>${element.team_name}</td>
        <td>
        <input type="button" value="View" class="btn btn-secondary px-3" onclick="viewTeam(${element.id})">
        </td>
        <td><input type="button" value="Edit" class="btn btn-secondary px-3" onclick="showTeamData(${element.id})"></td>
        <td>
        <input type="button" value="Delete" class="btn btn-secondary px-3" onclick="deleteTeam(${element.id})">
        </td>`;
      });
      table.innerHTML = dataadd;
    } else {
      table.innerHTML = `<div class="alert alert-danger" role="alert">
      data not found
    </div>`;
    }
  } catch (error) {
    console.log(error);
  }
};

const showTeamData = async (id) => {
  let popup = document.getElementById("popup");
  popup.classList.add("open-popup");
  let data = await (
    await fetch(`/manager/managerTeam/showteamdata/${id}`)
  ).json();
  console.log(data);
  document.getElementById("team_name").value = data.teamData[0].team_name;
  let emp = document.getElementById("empselect");
  console.log(document.getElementById("empselect"));
  for (i = 0; i < emp.options.length; i++) {
    for (j = 0; j < data.teamData.length; j++) {
      if (emp.options[i].value == data.teamData[j].emp_id) {
        emp.options[i].setAttribute("selected", "true");
      }
    }
  }
  let updatebtn = document.getElementById("savebtn");
  updatebtn.setAttribute("onclick", `UpdateData(${id})`);
  updatebtn.setAttribute("value", "Update");
};

const UpdateData = async (id) => {
  let dataobj = {};
  dataobj.id = id;
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
    await fetch(`${window.location.origin}/manager/updateteamdata`, {
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
        console.log("Data received:", data);
        if (data.msg !== "undefined") {
          DataupdatedSuccessfully();
          getTeamData();
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  } catch (error) {
    console.log(error);
  }
};

function DataupdatedSuccessfully() {
  Swal.fire({
    title: "Done",
    text: "Task updated Succesfully",
    icon: "success",
  }).then(() => {
    window.location.href = "/manager/Teams";
  });
}

let teampopup = document.getElementById("show-detail");
const closePopup3 = () => {
  try {
    teampopup.classList.remove("open-popup");
  } catch (error) {
    console.log(error);
  }
};

const viewTeam = async (id) => {
  try {
    teampopup.classList.add("open-popup");
    let data = await (await fetch(`/manager/teamapi/${id}`)).json();
    let dataadd = " ";
    if (
      data.teamCreate.length != 0 ||
      data.memberDetails.length != 0 ||
      data.teamTask.length != 0
    ) {
      dataadd += `<div class="allform width:fit-content p-4" >
        <div class="row mb-3">
        <div class="col-md-11">
            <h2 class="text-primary text-center">Team Detalis</h2>
        </div>
        <div class="col-md-1">
            <i class='bx bxs-x-circle text-danger fs-2'onclick="closePopup3()"></i>
        </div>
      </div>
      <div class="row mb-3">
          <div class="col-md-6">
              <label class="text-primary">Team Id :-</label>
              <input type="text" class="form-control" tabindex="2" id="first_name" name="first_name" value="${data.teamCreate[0].id}" disabled>
          </div>
          <div class="col-md-6">
              <label class="text-primary">Team Name :</label>
              <input type="text" class="form-control" tabindex="3" id="last_name" name="last_name" value="${data.teamCreate[0].team_name}" disabled>
          </div>
      </div>
      <div class="row mb-3">
          <div class="col-md-12">
              <label class="text-primary">Created By :-</label>
              <input type="text" class="form-control" tabindex="2" id="first_name" name="first_name" value="${data.teamCreate[0].created_by}" disabled>
          </div>
      </div>`;
      dataadd += `<div class="row mb-3">
          <div class="col-md-12">
              <label class="text-primary">Employee List :-</label>`;
      data.memberDetails.forEach((element) => {
        dataadd += `<input type="text" class="form-control" tabindex="2" id="first_name" name="first_name" value="${element.employees}" disabled>`;
      });
      dataadd += `</div></div>
      <div class="row mb-3">
          <div class="col-md-12">
              <label class="text-primary">Task List :-</label>`;
      data.teamTask.forEach((element) => {
        dataadd += `<input type="text" class="form-control" tabindex="2" id="first_name" name="first_name" value="${element.task_name}" disabled>`;
      });
      dataadd += `</div></div>`;
      document.getElementById("team-form").innerHTML = dataadd;
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteTeam = async (id) => {
  try {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success btn-gap",
        cancelButton: "btn btn-danger btn-gap",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          await fetch(`http://localhost:8000/manager/deleteteamapi/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });
          swalWithBootstrapButtons
            .fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            })
            .then(async (result2) => {
              if (result2.isConfirmed) {
                getTeamData();
              }
            });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your date is safe :)",
            icon: "error",
          });
        }
      });
  } catch (error) {
    console.log(error);
  }
};

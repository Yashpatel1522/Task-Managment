const getTeamData = async () => {
  let data = await (await fetch(`/manager/teamapi`)).json();
  if (data.imageResult[0]) {
    document.getElementById(
      "selectedImage"
    ).src = `/assets/userprofiles/${data.imageResult[0].newimage_name}`;
  }
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
};

const showteamdata = async() => {
  let profData = await (await fetch('/manager/getManagerProfile/2')).json();
  if(profData.imageResult) {
    document.getElementById('profImg').src = `/assets/userprofiles/${profData.imageResult[0].newimage_name}`;
    document.getElementById('userName').innerText = `${profData.result[0].first_name}`+" "+`${profData.result[0].last_name}`;
  }
  else {
    document.getElementById('profImg').src = `/assets/employee/user.png`;
    document.getElementById('userName').innerText = `${profData.result[0].first_name}`+" "+`${profData.result[0].last_name}`;
  }
  
  pagignation("/manager/teamapi");
};

const getDataGrid = async (elements) => {
  let table = document.getElementById("team-table");
  let dataadd = `<thead>
                <th>TeamId</th>
                <th>TeamName</th>
                <th>View Details</th>
                <th>Edit Team</th>
                <th>Delete Team</th>
                </thead>`;
  elements.forEach((element) => {
    dataadd += `<tr>
              <td>${element.id}</td>
              <td>${element.team_name}</td>
              <td>
              <input type="button" value="View" class="btn btn-secondary px-3" style = "background-color:#0A1828" onclick="viewTeam(${element.id})">
              </td>
              <td><input type="button" value="Edit" class="btn btn-secondary px-3" style = "background-color:#0A1828" onclick="showTeamData(${element.id})"></td>
              <td>
              <input type="button" value="Delete" class="btn btn-secondary px-3" style = "background-color:#0A1828" onclick="deleteTeam(${element.id})">
              </td>`;
  });

  table.innerHTML = dataadd;
};

const searchTeams = async (value) => {
  let filterArray = [];
  if (value.trim() === "") {
    filterArray = teamDataGlobal;
    searchPagignation(filterArray, 1);
  } else if (value.trim()) {
    teamDataGlobal.forEach((element) => {
      for (let key in element) {
        if (element[key] != null) {
          let values = element[key].toString().toLowerCase();
          let status = values.includes(value.toString().toLowerCase());
          if (status) {
            filterArray.push(element);
          }
        }
      }
    });
    if (filterArray.length > 0) {
      searchPagignation(filterArray, 1);
    } else {
      document.getElementById("team-table").innerHTML = " ";
      document.getElementById("team-table").innerHTML +=
        '<div class="alert alert-info"><strong>Team not found</strong></div>';
    }
  }
};

const searchPagignation = async (filterArray, currPage) => {
  arrayPagignation = [];
  for (let element of filterArray) {
    arrayPagignation.push(element);
  }
  maxLength = arrayPagignation.length;
  currentPage = currPage;
  document.getElementById("current_page").innerHTML = `${currentPage}`;
  startIndex = (currentPage - 1) * pageLimit;
  endIndex = Math.min(startIndex + pageLimit, maxLength);
  pageCount = Math.ceil(maxLength / pageLimit);
  let array = arrayPagignation.slice(startIndex, endIndex);
  getDataGrid(array);
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
                window.location.href = "/manager/Teams";
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

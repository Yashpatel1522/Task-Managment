// Team Data Show
var getTeamShow = async () => {
  try {
    let data = await (await fetch(`/admin/teamapi`)).json();
    let table = document.getElementById("team-table")
    let dataadd = `<thead>
                <th>TeamId</th>
                <th>TeamName</th>
                <th>View Details</th>
                <th>Edit Team</th>
                <th>Delete Team</th>
                </thead>`
    if (data.result.length != 0) {
      data.result.forEach(element => {
        dataadd += (`<tr>
                <td>${element.id}</td>
                <td>${element.team_name}</td>
                <td>
                <input type="button" value="View" class="btn btn-secondary px-3" onclick="viewTeam(${element.id})">
                </td>
                <td><input type="button" value="Edit" class="btn btn-secondary px-3" onclick="editTeam(${element.id})"></td>
                <td>
                <input type="button" value="Delete" class="btn btn-secondary px-3" onclick="deleteTeam(${element.id})">
                </td > `)
      });
      table.innerHTML = dataadd;
    }
  } catch (error) {
    console.log(error);
  }
}

// popup close funcation
var teampopup = document.getElementById("show-detail-team");
var closePopup3 = () => {
  try {
    teampopup.classList.remove("open-popup")
  } catch (error) {
    console.log(error);
  }
}

// view team details 
var viewTeam = async (id) => {
  try {
    teampopup.classList.add("open-popup");
    let data = await (await fetch(`/admin/teamapi/${id}`)).json();
    let dataadd = " ";
    if (data.teamCreate.length != 0 || data.memberDetails.length != 0 || data.teamTask.length != 0) {
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
      </div>`
      dataadd += `<div class="row mb-3">
          <div class="col-md-12">
              <label class="text-primary">Employee List :-</label>`
      data.memberDetails.forEach(element => {
        dataadd +=
          `<input type="text" class="form-control" tabindex="2" id="first_name" name="first_name" value="${element.employees}" disabled>`

      });
      dataadd += `</div></div>
      <div class="row mb-3">
          <div class="col-md-12">
              <label class="text-primary">Task List :-</label>`
      data.teamTask.forEach(element => {
        dataadd += `<input type="text" class="form-control" tabindex="2" id="first_name" name="first_name" value="${element.task_name}" disabled>`
      });
      dataadd += `</div></div>`
      document.getElementById("team-form").innerHTML = dataadd;
    }
  } catch (error) {
    console.log(error);
  }
}

// Edit Team Data
var editTeam = async (id) => {
  try {
    let data = await (await fetch(`/admin/teamapi/${id}`)).json();
    teampopup.classList.add("open-popup");
    let editdata = " ";
    if (data.teamCreate.length != 0 || data.memberDetails.length != 0 || data.teamTask.length != 0) {
      editdata += `<div class="regForm width:fit-content p-5">
    <div class="registration">
      <div class="row mb-3">
        <div class="col-md-10">
          <h2 class="text-primary text-center">Edit Team</h2>
        </div>
        <div class="col-md-2">
          <i class='bx bxs-x-circle text-danger fs-2' onclick="closePopup3()"></i>
        </div>
      </div>
      <form onsubmit="return isTeamForm()" id="new-team-form" enctype="multipart/form-data">
        <div class="row">
          <div class="col-md-12">
            <p class="bg-danger text-white text-center" id="error" style="display: none;"></p>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-md-12">
            <label class="text-primary">Team Name :</label>
            <input type="text" class="form-control" tabindex="1" id="team_name" name="team_name"
              placeholder="Enter Team Name" value='${data.teamCreate[0].team_name}'>
            <span id="tnameerr"></span>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-md-12">
            <label class="text-primary">Employee List :-</label>
            <select tabindex="2" class="form-control" id="emp_select" name="emp_select[]" multiple>
            <option value="0">select</option>
            </select>
            <span id="toptionerr"></span>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-md-6">
            <input type="button" class="btn btn-primary form-control" value="Submit" tabindex="9"
              onclick="return isTeamSubmit()">
          </div>
          <div class="col-md-6">
            <input type="reset" class="btn btn-danger form-control" value="Reset" tabindex="10">
          </div>
        </div>
      </form>
    </div>
  </div>`
    }
    document.getElementById("team-form").innerHTML = editdata;
  } catch (error) {

  }
}


// search Team Data
var searchTeam = async (value) => {
  try {
    let data = await (await fetch(`/admin/teamapi/search/${value}`)).json();
    document.getElementById("team-table").innerHTML = "";
    if (value === "") {
      getTeamShow();
    }
    let table = document.getElementById("team-table");
    let dataadd = `<thead>
                <th>TeamId</th>
                <th>TeamName</th>
                <th>View Details</th>
                <th>Edit Team</th>
                <th>Delete Team</th>
                </thead>`
    if (data.searchTeam.length != 0) {
      data.searchTeam.forEach(element => {
        dataadd += (`<tr>
                <td>${element.id}</td>
                <td>${element.team_name}</td>
                <td>
                <input type="button" value="View" class="btn btn-secondary px-3" onclick="viewTeam(${element.id})">
                </td>
                <td><input type="button" value="Edit" class="btn btn-secondary px-3" onclick="alert('Edit')"></td>
                <td>
                <input type="button" value="Delete" class="btn btn-secondary px-3" onclick="deleteTeam(${element.id})">
                </td > `)
      });
      table.innerHTML = dataadd;
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Not Found Data"
      });
      getTeamShow();
    }
  } catch (error) {
    console.log(error);
  }
}

// Delete Team Data
var deleteTeam = async (id) => {
  try {
    var swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success btn-gap",
        cancelButton: "btn btn-danger btn-gap"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true

    }).then(async (result) => {
      if (result.isConfirmed) {
        await fetch(`http://localhost:8000/admin/teamapi/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
        })
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        }).then(async (result2) => {
          if (result2.isConfirmed) {
            getTeamShow();
          }
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your date is safe :)",
          icon: "error"
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
}



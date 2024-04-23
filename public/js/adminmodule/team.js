// Team Data Show
var getTeamShow = async () => {
  try {
    fetchData("/admin/teamapi", "team-table");
  } catch (error) {
    console.log(error);
  }
}

// view team details 
var viewTeam = async (id) => {
  try {
    viewFetchData(`/admin/teamapi/${id}`, "team-form");
  } catch (error) {
    console.log(error);
  }
}

// Edit Team Data
var editTeam = async (id) => {
  try {
    let data = await (await fetch(`/admin/teamapi/${id}`)).json();
    document.getElementById("show-detail").classList.add("open-popup");
    let editdata = " ";
    if (data.teamCreate.length != 0 || data.memberDetails.length != 0 || data.teamTask.length != 0) {
      editdata += `<div class="regForm width:fit-content p-5">
    <div class="registration">
      <div class="row mb-3">
        <div class="col-md-10">
          <h2 class="text-primary text-center">Edit Team</h2>
        </div>
        <div class="col-md-2">
          <i class='bx bxs-x-circle text-danger fs-2' onclick="closePopup1()"></i>
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
          <div class="col-md-6">
            <label class="text-primary">Selected Employee:-</label>
            <select tabindex="2" class="form-control" id="emp_select2" name="emp_select2[]" multiple>
            <option value="0">select</option>`
      data.memberDetails.forEach(element => {
        editdata += `<option value="${element.id}" selected>${element.employees}</option>`
      });

      editdata += `</select>
      <span id="toptionerr"></span>
          </div>
          <div class="col-md-6">
            <label class="text-primary">Employee List :-</label>
            <select tabindex="2" class="form-control" id="emp_select" name="emp_select[]" multiple>
            <option value="0">select</option>`
      editdata += comboTeamEmployees();
      editdata += `</select>
      <span id="toptionerr"></span>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-md-6">
            <input type="button" class="btn btn-primary form-control" value="Submit" tabindex="9"
              onclick="return isTeamUpdate()">
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
    console.log(error);
  }
}


// search Team Data
var searchTeam = async (value) => {
  try {
    if (value === "") {
      getTeamShow()
    } else {
      searchAllData(`/admin/teamapi/search/${value}`, "team-table", "/admin/teamapi");
    }
  } catch (error) {
    console.log(error);
  }
}

// Delete Team Data
var teamDelete = async (id) => {
  try {
    deleteAllData(`/admin/teamapi/${id}`, "team-table", "/admin/teamapi");
  } catch (error) {
    console.log(error);
  }
}




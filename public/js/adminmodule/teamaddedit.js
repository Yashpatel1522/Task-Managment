var isTeamSubmit = async () => {
  try {
    if (isTeamForm()) {
      let team_name = document.getElementById("team_name").value;
      let memberArray = [];
      let team_member = document.getElementById("emp_select");
      for (i = 0; i < team_member.options.length; i++) {
        if (team_member.options[i].selected) {
          memberArray.push(team_member.options[i].value);
        }
      }
      let team_form_data = new FormData()
      team_form_data.append("team_name", team_name);
      team_form_data.append("member_id", memberArray);

      let res = await fetch('/admin/newteam', {
        method: 'post',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(team_form_data),
      })
      let result = await res.json();
      if (result.status === 200) {
        closePopup();
        Swal.fire({
          icon: "success",
          title: "Team Added!",
          text: result.msg
        }).then(async (result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      } else {
        Swal.fire({
          title: "Error",
          text: result.msg,
          icon: "error"
        })
      }
    }
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
                  placeholder="Enter Team Name"  value='${data.teamCreate[0].team_name}'>
                  <span id="tnameerr"></span>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-md-12">
                <label class="text-primary">Employee List :-</label>
                <select tabindex="2" class="form-control" id="emp_select" name="emp_select[]" multiple>
                  <option value="0">select</option>`
      data.memberDetails.forEach(element => {
        editdata += `<option value="${element.emp_id}" selected>${element.employees}</option>`
      });
      notTeamEmployees(id);
      editdata += `</select >
                  <span id="toptionerr"></span>
                  </div>
              </div>
              <div class="row mb-3">
              <div class="col-md-6">
                <input type="button" class="btn btn-primary form-control" value="Submit" tabindex="9"
                  onclick="return isTeamUpdate(${id})">
              </div>
              <div class="col-md-6">
                <input type="button" class="btn btn-danger form-control" value="Cancel" tabindex="10" onclick="closePopup1()">
              </div>
              </div>
          </form>
        </div>
      </div> `
    }
    document.getElementById("team-form").innerHTML = editdata;
  } catch (error) {
    console.log(error);
  }
}

var isTeamUpdate = async (id) => {
  try {
    if (isTeamForm()) {
      let team_name = document.getElementById("team_name").value;
      let memberArray = [];
      let team_member = document.getElementById("emp_select");
      for (i = 0; i < team_member.options.length; i++) {
        if (team_member.options[i].selected) {
          memberArray.push(team_member.options[i].value);
        }
      }
      let update_team_form_data = new FormData()
      update_team_form_data.append("team_name", team_name);
      update_team_form_data.append("member_id", memberArray);

      let res = await fetch(`/admin/teamapi/${id} `, {
        method: 'post',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(update_team_form_data),
      })

      let result = await res.json();
      if (result.status === 200) {
        closePopup1();
        Swal.fire({
          icon: "success",
          title: "Team Updated!",
          text: result.msg
        }).then(async (result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      } else {
        Swal.fire({
          title: "Error",
          text: result.msg,
          icon: "error"
        })
      }
    }
  } catch (error) {
    console.log(error);
  }
}

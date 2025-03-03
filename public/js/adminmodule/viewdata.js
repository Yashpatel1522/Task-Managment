let popupview = document.getElementById("show-detail");
const viewFetchData = async (api, id) => {
  try {
    popupview.classList.add("open-popup");
    let data = await (await fetch(`${api}`)).json();
    if (id === "team-form") {
      let dataadd = " ";
      if (data.teamCreate.length != 0 || data.memberDetails.length != 0 || data.teamTask.length != 0) {
        dataadd += `<div class="allform width:fit-content p-4" >
        <div class="row mb-3">
        <div class="col-md-11">
            <h2 class="text-primary text-center">Team Detalis</h2>
        </div>
        <div class="col-md-1">
            <i class='bx bxs-x-circle text-danger fs-2'onclick="closePopup1()"></i>
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
              <label class="text-primary">Employee List :-</label>
              <select class="form-control">`
        data.memberDetails.forEach(element => {
          dataadd += `<option value = "${element.emp_id}"> ${element.employees}</option>`
        });
        dataadd += `</select></div></div>
      <div class="row mb-3">
          <div class="col-md-12">
              <label class="text-primary">Task List :-</label>
              <select class="form-control">`
        data.teamTask.forEach(element => {
          dataadd += `<option value = "${element.task_name}"> ${element.task_name}</option>`
        });
        dataadd += `</select></div></div>`
        document.getElementById("team-form").innerHTML = dataadd;
      }
    } else {
      let userdata = "";
      if (data.result.length != 0) {
        userdata +=
          `<div class="allform width:fit-content p-4" >
            <div class="row mb-3">
              <div class="col-md-11">
                <h2 class="text-primary text-center">Manager Detalis</h2> 
              </div>
              <div class="col-md-1">
                <i class='bx bxs-x-circle text-danger fs-2'onclick="closePopup1()"></i>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-md-6">
                  <label class="text-primary">First Name :</label>
                  <input type="text" class="form-control" tabindex="2" id="first_name" name="first_name" value="${data.result[0].first_name}" disabled>
              </div>
              <div class="col-md-6">
                  <label class="text-primary">Last Name :</label>
                  <input type="text" class="form-control" tabindex="3" id="last_name" name="last_name" value="${data.result[0].last_name}" disabled>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-md-6">
                  <label class="text-primary">Email :</label>
                  <input type="text" class="form-control" tabindex="4" id="email" name="email" value="${data.result[0].email}" disabled>
              </div>
              <div class="col-md-6">
                  <label class="text-primary">Mobile No: :</label>
                  <input type="text" class="form-control" tabindex="5" id="contact" name="contact"  value="${data.result[0].contact}" disabled>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-md-6">
                  <lable class="text-primary">Date Of Birth</lable>
                  <input type="text" class="form-control" tabindex="6" id="date_of_birth" name="date_of_birth" value="${data.result[0].date_of_birth}" disabled>
              </div>
              <div class="col-md-6">
                  <lable class="text-primary">Department</lable>
                  <input type="text" class="form-control" tabindex="7" id="employee_role" name="employee_role" placeholder="Enter Department" value="${data.result[0].employee_role}" disabled>
              </div>
            </div>`
      }
      if (id === "manager-form" && data.result2.length != 0) {
        userdata +=
          `<div class="row mb-3">
              <div class="col-md-12">
                <lable class="text-primary">Task List</lable>
                <select class="form-control">`
        data.result2.forEach(element => {
          userdata += `<option value = "${element.id}"> ${element.task_name}</option>`
        });
        userdata += `</select>
                  </div>
              </div>`
      }
      userdata += `</div>`
      document.getElementById(`${id}`).innerHTML = userdata;
    }
  } catch (error) {
    console.log(error);
  }
}

const closePopup1 = () => {
  try {
    popupview.classList.remove("open-popup")
  } catch (error) {
    console.log(error);
  }
}
async function viewteamdata() {

  response = await fetch(`/employee/teamdetailsdata`)
  let data = await response.json();
  data.forEach(element => {
    document.getElementById('details').innerHTML += `<tr><td>${element.team_name}</td><td>${element.first_name}</td>
    <td><button class="btn btn-primary" onclick="show(${element.id})">view</button></td></tr>`
  });
  console.log(data, "data is")

}
let ides_team = (id) => document.getElementById(id);

const hideteam = (id) => {
  ides_team(id).style.display = "none";
};
const show = async (id) => {
  document.getElementById('team').style.display = "block"
  response = await fetch(`/employee/teamdetails/${id}`)
  let data = await response.json();

  document.getElementById('teamdetails').innerHTML = `
                          <div class="row">
                              <div class="field fs-6 text p-3 col">
                                <label>Tasks :&nbsp;</label>
                              </div>
                            <div id="taskflex" class="field flex-column" style="height: 60px;overflow: scroll;width: 90%;text-align: center;overflow-x: hidden;">
                            </div>
                          </div>
                          <div class="row">
                            <div class="field fs-6 text p-3 col">
                              <label>Team Members Name :&nbsp;</label>
                            </div>
                            <div id="pflex" class="field flex-column" style="height: 60px;overflow: scroll;width: 90%;text-align:center;overflow-x: hidden;">
                            </div>
                          </div>
                          <button type = "button" class="btn btn-primary" style="position: relative;left: 41%;top: 15px;margin-top: 8%;" data-dismiss="modal"
                          onclick = "hideteam('team')">Close</button>`

  data.result1.forEach(element => {
    document.getElementById('taskflex').innerHTML +=
      `<p>${element.task_name}</p>`
  })
  data.result2.forEach(element => {
    document.getElementById('pflex').innerHTML +=
      `<p>${element.first_name}</p>`
  });
}

viewteamdata()



const searchTeam = async (value) => {

  if (value === "") {
    document.getElementById("details").innerHTML = `<tr>
    <th> Team Name</th>
    <th>Manager</th>
    <th>Members Details</th></tr>`;
    viewteamdata()
  }
  let response = await (fetch(`/employee/teamsearchdetails/${value}`))
  let data = await response.json();

  document.getElementById("details").innerHTML = `<tr>
    <th> Team Name</th>
    <th>Manager</th>
    <th>Members Details</th></tr>`;
  if (data.length != 0) {
    data.forEach(element => {
      document.getElementById('details').innerHTML += `<tr><td>${element.team_name}</td><td>${element.first_name}</td>
    <td><button class="btn btn-primary" onclick="show(${element.id})">view</button></td></tr>`
    });
  }
  else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Data Not Found"
    });
    ides_team('searchteam').value = ""
    viewteamdata();
  }
}

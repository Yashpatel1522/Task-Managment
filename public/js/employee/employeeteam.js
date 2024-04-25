
let path = window.location.pathname.split("/");
let id = path[path.length - 1];
console.log(id, "id is ");
var gdata;
async function viewteamdata() {
  
  response = await fetch(`/employee/teamdetailsdata/${id}`)
  data = await response.json();
  gdata = data
  data.forEach(element => {
    document.getElementById('details').innerHTML += `<tr><td>${element.team_name}</td>
    <td><button class="btn btn-primary" onclick="show(${element.teamid})">view</button></td></tr>`
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
  data = await response.json();

  console.log(data, "{}{}")

  data.result1.forEach(element => {
    console.log(element, "ele")
    document.getElementById('teamdetails').innerHTML =
      `
                          <div class="row">
                            <div class="field fs-6 text p-3 col">
                              <label>Team Name :&nbsp;</label>
                              <p>${element.team_name}</p>
                            </div>
                          </div>
                          <div class="row">
                            <div class="field fs-6 text p-3 col">
                            <label>Task Assignee Name :&nbsp;</label>
                            <p>${element.manager_name}</p>
                            </div>
                          </div>
                          <div class="row">
                            <div class="field fs-6 text p-3 col">
                              <label>Team Members  Name :&nbsp;</label>
                            </div>
                          </div>
                          <div class="row">
                           <div id="pflex" class="field flex-column" style="height: 60px;overflow: scroll;width: 90%;text-align: center;">
                            </div>
                          </div>

                          <button type = "button" class="btn btn-primary" style="margin: 20px 75px;" data-dismiss="modal"
                          onclick = "hideteam('team')">Close</button>`

  });
  data.result2.forEach(element => {

    document.getElementById('pflex').innerHTML +=
      `<p>${element.employee_name}</p>`
  })

}
viewteamdata()



const seachresultteam = async () => {

  let svalue = document.getElementById('searchteam').value
  console.log(svalue);
  if (svalue === "") {
    document.getElementById("details").innerHTML = `<tr>
    <th> Team Name</th>
    <th>Members Details</th></tr>`;
    viewteamdata()
  }
  let response = await (fetch(`/employee/teamsearchdetails/${svalue}`))
  let data = await response.json();

  document.getElementById("details").innerHTML = `<tr>
    <th> Team Name</th>
    <th>Members Details</th></tr>`;
  if (data.length != 0) {
    data.forEach(element => {
      document.getElementById('details').innerHTML += `<tr><td>${element.team_name}</td>
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

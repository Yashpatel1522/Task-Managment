
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
                          `<div class="field">
                            <label class="ms-3">Team Name:</label>
                            <p>${element.team_name}</p>
                          </div>
                          <div class="field">
                            <label  class="ms-3">Task Assignee Name:</label>
                            <p>${element.manager_name}</p>
                          </div>
                          <div class="field">
                            <label  class="ms-3">Team Members  Name:</label>
                            <div id="pflex" class="field flex-column" style="height: 60px;overflow: scroll;">
                            </div>
                          </div>
                          <button type = "button" class="btn btn-primary" style="margin: 26px 71px;" data-dismiss="modal"
                          onclick = "hideteam('team')">Close</button>`

  });
  data.result2.forEach(element => {

    document.getElementById('pflex').innerHTML +=
      `<p>${element.employee_name}</p>`
  })

}
viewteamdata()
// style = "position: sticky;top: 0px;background-color: white;"
// style = "height: 90px;overflow: scroll;"
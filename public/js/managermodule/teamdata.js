const getTeamData = async () => {
  let data = await (await fetch(`/manager/teamapi`)).json();
  let table = document.getElementById("team-table");
  let dataadd = `<thead>
              <th>TeamId</th>
              <th>TeamName</th>
              <th>View Details</th>
              <th>Edit Team</th>
              <th>Delete Team</th>
              </thead>`;
  if (data.result.length != 0) {
    data.result.forEach((element) => {
      dataadd += `<tr>
              <td>${element.id}</td>
              <td>${element.team_name}</td>
              <td>
              <input type="button" value="View" class="btn btn-secondary px-3" onclick="alert('view')">
              </td>
              <td><input type="button" value="Edit" class="btn btn-secondary px-3" onclick="alert('Edit')"></td>
              <td>
              <input type="button" value="Delete" class="btn btn-secondary px-3" onclick="alert('Delete')">
              </td>`;
    });
    table.innerHTML = dataadd;
  }
};

const searchTeams = async (value) => {
  try {
    console.log(value);
    let data = await (await fetch(`/manager/managerTeam/searchteam/${value}`)).json();
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
        <input type="button" value="View" class="btn btn-secondary px-3" onclick="alert('view')">
        </td>
        <td><input type="button" value="Edit" class="btn btn-secondary px-3" onclick="alert('Edit')"></td>
        <td>
        <input type="button" value="Delete" class="btn btn-secondary px-3" onclick="alert('Delete')">
        </td>`;
      });
      table.innerHTML = dataadd;
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Not Found Data",
      });
      getTeamData();
    }
  } catch (error) {
    console.log(error);
  }
};

const searchAllData = async (api, id, apifetch) => {
  try {
    let data = await (await fetch(`${api}`)).json();
    document.getElementById(`${id}`).innerHTML = "";
    document.getElementById("pagination").innerHTML = "";
    if (id === "team-table") {
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
                <input type="button" value="View" class="btn btn-success px-3" onclick="viewTeam(${element.id})">
                </td>
                <td><input type="button" value="Edit" class="btn btn-secondary px-3" onclick="editTeam(${element.id})"></td>
                <td>
                <input type="button" value="Delete" class="btn btn-danger px-3" onclick="teamDelete(${element.id})">
                </td > `
        });
        document.getElementById(`${id}`).innerHTML = dataadd;
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Not Found Data",
        });
        fetchData(`${apifetch}`, `${id}`);
      }
    } else {
      let table = document.getElementById(`${id}`);
      let dataadd = `<thead>
                <th>FirstName</th>
                <th>LastName</th>
                <th>Email</th>
                <th>Contact No</th>
                <th>View Details</th>
                <th>Delete</th>
                </thead>`;
      if (data.result.length != 0) {
        data.result.forEach((element) => {
          dataadd += `<tr>
                <td>${element.first_name}</td>
                <td>${element.last_name}</td>
                <td>${element.email}</td>
                <td>${element.contact}</td> 
                <td>
                <input type="button" value="view" class="btn btn-success px-3" onclick="viewusers(${element.id})">
                </td>
                <td>
                <input type="button" value="delete" class="btn btn-danger px-3" onclick="usersDeleteData(${element.id})">
                </td>`
        });
        table.innerHTML = dataadd;
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Not Found Data",
        });
        fetchData(`${apifetch}`, `${id}`);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

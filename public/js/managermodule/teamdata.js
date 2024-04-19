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
              <td><input type="button" value="Edit" class="btn btn-secondary px-3" onclick="showTeamData(${element.id})"></td>
              <td>
              <input type="button" value="Delete" class="btn btn-secondary px-3" onclick="alert('Delete')">
              </td>`;
    });
    table.innerHTML = dataadd;
  }
};

const searchTeams = async (value) => {
  try {
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
        <td><input type="button" value="Edit" class="btn btn-secondary px-3" onclick="showTeamData(${element.id})"></td>
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


const showTeamData = async(id)=>{
  let popup = document.getElementById("popup");
  popup.classList.add("open-popup");
  let data = await (await fetch(`/manager/managerTeam/showteamdata/${id}`)).json();
  console.log(data);
  document.getElementById('team_name').value = data.teamData[0].team_name;
    let emp = document.getElementById("empselect")
    console.log(document.getElementById("empselect"));
    for (i = 0; i < emp.options.length; i++) {
      for(j=0;j<data.teamData.length;j++) {
        if(emp.options[i].value == data.teamData[j].emp_id){
            emp.options[i].setAttribute("selected","true");
        }
      }  
    }  
    let updatebtn = document.getElementById('savebtn');
    updatebtn.setAttribute("onclick",`UpdateData(${id})`);
    updatebtn.setAttribute("value","Update");
}

const UpdateData = async(id)=>{
  let dataobj={};
  dataobj.id = id;
  let team_name = document.getElementById('team_name').value
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
          'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(dataobj)
    })
      .then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data received:", data);
        if(data.msg !== "undefined")
        {
          DataupdatedSuccessfully()
          getTeamData();
          
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  } catch (error) {
    console.log(error);
  }
}

function DataupdatedSuccessfully(){
  Swal.fire({
    title: "Done",
    text: "Task updated Succesfully",
    icon: "success",
  });
}
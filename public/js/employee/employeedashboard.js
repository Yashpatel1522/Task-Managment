let dashboardData;
let profileData;
const assignBadge = (type) => {
  switch (type) {
    case 'high':
      return 'text-danger';
    case 'mid':
      return 'text-primary';
    case 'low':
       return 'text-secondary';
    case 'inprogress':
      return 'badge text-bg-primary m-2'
    case 'completed':
      return 'badge text-bg-success m-2'
    case 'todo':
      return 'badge text-bg-secondary m-2'
 
  }
}
//dynamic table creation function
function createTable(tableData, section) {
  const keys = Object.keys(tableData[0]);

  let temp = `<tr>`;
  keys.map((el) => {
    temp += `<th scope="col">${el}</th>`;
  });
  temp += `</tr>`;
  document.getElementById(`${section}heading`).innerHTML = temp;

  temp = "";
  tableData.map((dataobj) => {
    const vals = Object.values(dataobj);

    temp += `<tr>`;
    vals.map((val) => {
      temp += `<td class="${assignBadge(val)}">${val}</td>`;
    });
    temp += `</tr>`;
  });
  document.getElementById(`${section}body`).innerHTML = temp;
}

const showNoData = (section) => {
  let temp = '<h3 class="text-center mt-4">No Data</h3>'
  document.getElementById(`${section}body`).innerHTML = temp
}

// function for rendering dashboardData dynamically
const renderData = (dashboardData) => {
  const taskCountsElement = document.getElementById("taskCountsElement");
  document.get
  Object.keys(dashboardData.taskStatusCounts[0]).forEach((key) => {
    const value = dashboardData.taskStatusCounts[0][key];
    console.log(dashboardData.imagename[0].newimage_name);
    document.getElementById("profileImage").src = `/assets/userprofiles/${dashboardData.imagename[0].newimage_name}`
    console.log(document.getElementById("selectedImage"));
    let taskCountBox = `<div class="col-sm-3 ps-0" id="taskCountBox">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">${key}</h5>
        <p class="card-text">${value}</p>
        </div>
        </div>
        </div>`;
        taskCountsElement !== null ? taskCountsElement.innerHTML += taskCountBox: '';
  });
  dashboardData.upCommingDeadlineData.length != 0
    ? createTable(dashboardData.upCommingDeadlineData, "deadline")
    : showNoData("deadline");
  dashboardData.employeeInprogressTaskData.length != 0
    ? createTable(dashboardData.employeeInprogressTaskData, "inprogress")
    : showNoData("inprogress");
};
  
getDashBoardData("/employee/getdashboardata").then((data) => {
  dashboardData = data.result;
  renderData(dashboardData);
});

async function getDashBoardData(url) {
  const response = await fetch(url);
  return response.json();
}

async function loadProfile() {
  let response = await fetch("/employee/getprofiledata").then((response) => { return response.json() }).then((data) => {
    profileData = data.result;
    renderProfileData(profileData)
  })
}

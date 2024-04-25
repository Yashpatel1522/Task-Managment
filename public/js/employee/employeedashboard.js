let dashboardData;
let profileData;
const assignBadge = (type) => {
  switch (type) {
    case 'urgent':
      return 'text-danger'
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
  console.log(`${section}body`);
  document.getElementById(`${section}body`).innerHTML = `<h3 class="text-center mt-4">No Data</h3>`;
}

// function for rendering dashboardData dynamically
const renderData = (dashboardData) => {

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

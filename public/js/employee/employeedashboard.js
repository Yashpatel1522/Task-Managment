let dashboardData;
let profileData;

//dynamic table creation function
function createTable(tableData, section) {
  const keys = Object.keys(tableData[0])

  let temp = `<tr>`
  keys.map((el) => {
    temp += `<th scope="col">${el}</th>`
  })
  temp += `</tr>`
  document.getElementById(`${section}heading`).innerHTML = temp


  temp = ''
  tableData.map((dataobj) => {
    const vals = Object.values(dataobj)
    console.log('vals', vals);

    temp += `<tr>`
    vals.map((val) => {
      temp += `<td>${val}</td>`
    })
    temp += `</tr>`

  })
  document.getElementById(`${section}body`).innerHTML = temp;

}

// function for rendering dashboardData dynamically
const renderData = (dashboardData) => {
  const taskCountsElement = document.getElementById('taskCountsElement')
  Object.keys(dashboardData.taskStatusCounts[0]).forEach(key => {
    const value = dashboardData.taskStatusCounts[0][key];

    let taskCountBox = `<div class="col-sm-3 ps-0" id="taskCountBox">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">${key}</h5>
        <p class="card-text">${value}</p>
        </div>
        </div>
        </div>`
    taskCountsElement.innerHTML += taskCountBox
  });
  createTable(dashboardData.upCommingDeadlineData, 'deadline')
  createTable(dashboardData.employeeInprogressTaskData, 'inprogress')
}

const renderProfileData = (profileData) => {
  let keys = Object.keys(profileData[0])
  console.log(profileData[0]);

  keys.map((key)=> {

    if(!(document.getElementById(`${key}`) == null)) {
      document.getElementById(`${key}`).value = profileData[0][key]
    }
    else if(key=="employee_role"){
      document.getElementById(`${key}`).value = profileData[0][key]
    }
    })
    let profileImageName = profileData[0].img_url.split("/")
    document.getElementById('selectedImage').src = `/assets/userprofiles/${profileData[0].id}/${profileImageName[3]}`
  }
getDashBoardData("/employee/getdashboardata").then((data) => {
  dashboardData = data.result
  renderData(dashboardData)
});

function showDropdown() {
  document.getElementById("dropdown").classList.toggle("show");
}

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
let dashboardData;
async function getDashBoardData(url) {
  const response = await fetch(url);
  return response.json();
}

function createTable(tableData, section) {
  const keys = Object.keys(tableData[0])

  let temp =  `<tr>`
  keys.map((el) => {
    temp += `<th scope="col">${el}</th>`
  })
  temp += `</tr>`
  document.getElementById(`${section}heading`).innerHTML = temp


  temp = ''
  tableData.map((dataobj) => {
    const vals = Object.values(dataobj)
    console.log('vals',vals);

  temp += `<tr>`
  vals.map((val) => {
    temp += `<td>${val}</td>`
  })
  temp +=`</tr>`

  })
  document.getElementById(`${section}body`).innerHTML = temp;

}                                              
                         
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
  createTable(dashboardData.upCommingDeadlineData,'deadline')
  createTable(dashboardData.employeeInprogressTaskData, 'inprogress')
}

getDashBoardData("http://localhost:8000/employee/getdashboardata").then((data) => {
  dashboardData = data.result
  renderData(dashboardData)
});
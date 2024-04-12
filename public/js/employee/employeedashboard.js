let dashboardData;
async function getDashBoardData(url) {
  const response = await fetch(url);
  return response.json();
}

function createTable(deadLineData) {
  const keys = Object.keys(deadLineData[0])

  let temp =  `<tr>`
  keys.map((el) => {
    temp += `<th scope="col">${el}</th>`
  })
  temp += `</tr>`
  document.getElementById('deadlineheading').innerHTML = temp


  temp = ''
  deadLineData.map((dataobj) => {
    const vals = Object.values(dataobj)
    console.log('vals',vals);

  temp += `<tr>`
  vals.map((val) => {
    temp += `<td>${val}</td>`
  })
  temp +=`</tr>`

  })
  document.getElementById('tbody').innerHTML = temp;

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
  createTable(dashboardData.upCommingDeadlineData)
}

getDashBoardData("http://localhost:8000/employee/getdashboardata").then((data) => {
  dashboardData = data.result
  renderData(dashboardData)
});
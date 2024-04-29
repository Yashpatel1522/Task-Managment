const chartShow = async () => {
  let result = await (await fetch(`/admin/chartsData`)).json();
  let todo = 0
  if (result.todoCount[0]!= undefined){
    todo = result.todoCount[0].data;
  }

  let inprogress = 0
  if (result.inprogressCount[0]!=undefined) {
    inprogress = result.inprogressCount[0].data;
  }

  let compleated = 0
  if (result.completedCount[0]!=undefined) {
    compleated = result.completedCount[0].data;
  }

  const Pieadmin = {
    series: [todo , inprogress , compleated],
    chart: {
      height: 400,
      width: 400,
      type: 'pie',
    },
    labels: ['To do', 'In Progress', 'Completed'],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  var Piechart = new ApexCharts(document.getElementById("chart"), Pieadmin);
  Piechart.render();
  managerAssignTask()
}

const managerAssignTask = async () => {
  let task = await (await fetch(`/admin/managerTask`)).json();
  let TaskActivity = document.getElementById("recentActivity");
  let logs = ""
  task.managerAssignTask.forEach(e => {
    logs += `<p><span class="text-secondary"> ${e.first_name} created </span> <span class = "text-success"> ${e.task_name} </span> </p>`
  });
  TaskActivity.innerHTML = logs;
}

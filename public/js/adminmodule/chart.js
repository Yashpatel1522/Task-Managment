let label = [];
let data = [];

const chartShow = async () => {
  let result = await (await fetch(`/admin/chartsData`)).json();
  result.chartData.forEach(e => {
    label.push(e.label);
    data.push(e.data);
  });
  console.log(data);
  const Pieadmin = {
    series: data,
    chart: {
      height: 400,
      width: 400,
      type: 'pie',
    },
    labels: ['Todo', 'In Progress', 'Completed'],
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

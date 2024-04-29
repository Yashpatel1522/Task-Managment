let flag = true;

const drawCharts = async () => {
  let taskResponse = await fetch(
    window.location.origin + `/manager/getManagerUpcomingTasks`
  );
  let taskData = await taskResponse.json();
  console.log();
  if (taskData.result[0]) {
    taskData.result.forEach((element) => {
      document.getElementById(
        "upcomingTasks"
      ).innerHTML += `<p>${element.task_name}</p>`;
    });
  }

  if (taskData.teamResult[0]) {
    taskData.teamResult.forEach((element) => {
      document.getElementById(
        "teams"
      ).innerHTML += `<p>${element.team_name}</p>`;
    });
  }

  let profData = await getProf();

  if(profData.imageResult) {
    document.getElementById('profImg').src = `/assets/userprofiles/${profData.imageResult[0].newimage_name}`;
    document.getElementById('userName').innerText = `${profData.result[0].first_name}`+" "+`${profData.result[0].last_name}`;
  }
  else {
    document.getElementById('profImg').src = `/assets/employee/user.png`;
    document.getElementById('userName').innerText = `${profData.result[0].first_name}`+" "+`${profData.result[0].last_name}`;
  }
  
  let url = window.location.origin + `/manager/getManagerTaskCount`;
  let response = await fetch(url);
  let data = await response.json();
  const todo = data.todoResult[0].count;
  const progress = data.progressResult[0].count;
  const compleated = data.compleatedResult[0].count;

  const Baroptions = {
    chart: {
      type: "bar",
      height: 400,
      width: 400,
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    series: [
      {
        data: [
          {
            x: "Todo",
            y: todo,
          },
          {
            x: "In Progress",
            y: progress,
          },
          {
            x: "Completed",
            y: compleated,
          },
        ],
      },
    ],
  };
  var Barchart = new ApexCharts(
    document.getElementById("statusBar"),
    Baroptions
  );
  Barchart.render();

  let pieArray = [];
  if (todo == 0 && compleated == 0 && progress == 0) {
    pieArray = [1, 1, 1];
  } else {
    pieArray = [todo, compleated, progress];
  }

  const Pieoption = {
    series: pieArray,
    chart: {
      height: 400,
      width: 400,
      type: "pie",
    },
    labels: ["Todo", "Completed", "In Progress"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  var Piechart = new ApexCharts(
    document.getElementById("statusPie"),
    Pieoption
  );
  Piechart.render();
};

function closeProf() {
  const profDisp = document.getElementById('profClk');
  if(flag) {
    profDisp.style.display = 'none'
  }
  flag = true;
}

async function getProf() {
  let data = await (await fetch('/manager/getManagerProfile/2')).json();
  return data;
}

const remOption = () => {
  document.getElementById("profClk").style.display = "none";
};

const showOption = () => {
  if (
    document.getElementById("profClk").style.display == "none" ||
    document.getElementById("profClk").style.display == ""
  ) {
    document.getElementById("profClk").style.display = "block";
  } else {
    document.getElementById("profClk").style.display = "none";
  }
  flag = false;
};

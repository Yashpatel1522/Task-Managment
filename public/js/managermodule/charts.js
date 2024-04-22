const getProfile = async () => {
  let url = window.location.origin + "/manager/getManagerProfile";
  let response = await fetch(url);
  let data = await response.json();
  let spanEle = document.getElementsByClassName("msg");
  Object.keys(spanEle).forEach((element) => {
    spanEle[element].innerText = ``;
  });
  document.getElementById("imgMsg").innerText = ``;

  document.getElementById("id").value = data.result[0].id;
  document.getElementById("firstname").value = data.result[0].first_name;
  document.getElementById("lastname").value = data.result[0].last_name;
  document.getElementById("email1").value = data.result[0].email;
  document.getElementById("phone_input").value = data.result[0].contact;
  document.getElementById("dob_input").value = data.result[0].date_of_birth;

  if (data.imageResult[0]) {
    document.getElementById(
      "selectedImage"
    ).src = `/assets/userprofiles/${data.imageResult[0].newimage_name}`;
  }
};

const drawCharts = async () => {
  let taskResponse = await fetch(
    window.location.origin +
      `/manager/getManagerUpcomingTasks?start_date=1999-10-01&end_date=2023-10-30&manager_id=3`
  );
  let taskData = await taskResponse.json();

  console.log(taskData.teamResult);

  if (taskData.result[0]) {
    taskData.result.forEach((element) => {
      document.getElementById(
        "upcomingTasks"
      ).innerHTML += `<p style="text-align: center; color: black;">${element.task_name}</p>`;
    });
  }

  if (taskData.teamResult[0]) {
    taskData.teamResult.forEach((element) => {
      document.getElementById(
        "teams"
      ).innerHTML += `<p style="text-align: center; color: black;">${element.team_name}</p>`;
    });
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
};

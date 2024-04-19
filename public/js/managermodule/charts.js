async function getProfile() {
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
  
    if(data.imageResult[0]) {
        document.getElementById('selectedImage').src = `/assets/userprofiles/${data.imageResult[0].newimage_name}`
    }
}

async function drawCharts() {
    let url = window.location.origin + `/manager/getManagerTaskCount`;
    let response = await fetch(url);
    let data = await response.json();
    const todo = data.todoResult[0].count;
    const progress = data.progressResult[0].count;
    const compleated = data.compleatedResult[0].count;

    const Baroptions = {
        chart: {
          type: 'bar',
          height: 400,
          width: 400
        },
        plotOptions: {
          bar: {
            horizontal: false
          }
        },
        series: [{
          data: [{
            x: 'Todo',
            y: todo
          }, {
            x: 'In Progress',
            y: progress
          }, {
            x: 'Completed',
            y: compleated
          }]
        }]
    }
    var Barchart = new ApexCharts(document.getElementById("statusBar"), Baroptions);
    Barchart.render();

    let pieArray = [];
    if(todo==0 && compleated==0 && progress==0) {
        pieArray = [1, 1, 1];
    }
    else {
        pieArray = [todo, compleated, progress]
    }

    const Pieoption = {
        series: pieArray,
        chart: {
            height: 400,
            width: 400,
            type: 'pie',
        },
        labels: ['Todo', 'Completed', 'In Progress'],
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

    var Piechart = new ApexCharts(document.getElementById("statusPie"), Pieoption);
    Piechart.render();
}

function remOption() {
    document.getElementById("profClk").style.display = "none";
}

function showOption() {
    if(document.getElementById("profClk").style.display == 'none' || document.getElementById("profClk").style.display == '') {
        document.getElementById("profClk").style.display = 'block'
    }
    else {
        document.getElementById("profClk").style.display = 'none'
    }
}

async function fetchNotificationData() {
    try {
      await fetch(`${window.location.origin}/manager/notification`, {
        method: "get", // *GET, POST, PUT, DELETE, etc.
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        }
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
                  if(typeof data !== "undefined"){
                      showNotifications(data);
                  }
              
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    } catch (error) {
      console.log(error);
    }
      
  }

function showNotifications(data) {
	let notificatiodata = "";
	data.forEach(element => {
		notificatiodata += `<h3>Today is due date of <b>${element.task_name}</b> task<h3>`
	});
    Swal.fire({
		title: ` ${notificatiodata}`,
    icon: "info",
		
  });
}
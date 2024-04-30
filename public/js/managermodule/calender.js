async function loadProf() {
  let profData = await (await fetch('/manager/getManagerProfile/2')).json();

  if (profData.imageResult && profData.result) {
    document.getElementById('profImg').src = `/assets/userprofiles/${profData.imageResult[0].newimage_name}`;
    document.getElementById('userName').innerText = `${profData.result[0].first_name}` + " " + `${profData.result[0].last_name}`;
  }
}

flag = true;

const showOption = async () => {
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

function closeProf() {
  const profDisp = document.getElementById('profClk');
  if (flag) {
    profDisp.style.display = 'none'
  }
  flag = true;
}


const getDeadline = async () => {
  let data = await (await fetch("/manager/dueDateOfTask")).json();
  return data;
};

const getCalender = async (month) => {
  let dueDate = await getDeadline();
  let data = await (await fetch(`/manager/calenderData/${month}`)).json();
  console.log(data);
  let calenderData = document.getElementById("calender");
  let tr1 = document.createElement("tr");
  tr1.setAttribute("class", "headercss");
  data.days.forEach((e) => {
    let th = document.createElement("th");
    th.innerText = `${e}`;
    tr1.appendChild(th);
  });
  calenderData.appendChild(tr1);

  for (let i = 0; i < data.yearCalendar.length; i++) {
    let tr = document.createElement("tr");
    for (let j = 0; j < data.yearCalendar[i].length; j++) {
      let td = document.createElement("td");
      td.innerText += `${data.yearCalendar[i][j] == 0 ? "" : data.yearCalendar[i][j]
        }`;
      if (data.yearCalendar[i][j] === todayDate && m + 1 === month) {
        td.style.backgroundColor = "rgb(90, 150, 90)";
      }
      dueDate.result.forEach((ele) => {
        if (new Date(ele.end_date).getMonth() + 1 === month) {
          if (new Date(ele.end_date).getDate() === data.yearCalendar[i][j]) {
            let div = document.createElement("div");
            div.innerText = `${ele.task_name}`;
            div.style.backgroundColor = "green";
            div.style.color = "white";
            div.style.margin = "10px";
            div.style.padding = "5px 10px";
            div.style.borderRadius = "8px";
            td.appendChild(div);
          }
        }
      });
      tr.appendChild(td);
    }
    calenderData.appendChild(tr);
  }
};

m = new Date().getMonth();
body = document.getElementsByTagName("body");
body.onload = getCalender(m + 1);

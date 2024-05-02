const getDeadline = async () => {
  let data = await (await fetch("/manager/dueDateOfTask")).json();
  return data;
};

let todayDate1 = new Date().getDate();

const getCalender = async (month) => {
  let dueDate = await getDeadline();
  let data = await (await fetch(`/manager/calenderData/${month}`)).json();
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
      if (data.yearCalendar[i][j] === todayDate1 && m + 1 === month) {
        td.style.backgroundColor = "rgb(90, 150, 90)";
      }
      dueDate.result.forEach((ele) => {
        if (new Date(ele.end_date).getMonth() + 1 === month) {
          if (new Date(ele.end_date).getDate() === data.yearCalendar[i][j]) {
            let div = document.createElement("div");
            div.innerText = `${ele.task_name}`;
            div.style.backgroundColor = "red";
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

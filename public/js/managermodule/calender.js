const showOption = async () => {
  if (
    document.getElementById("profClk").style.display == "none" ||
    document.getElementById("profClk").style.display == ""
  ) {
    document.getElementById("profClk").style.display = "block";
  } else {
    document.getElementById("profClk").style.display = "none";
  }
};

const monthplus = () => {
  month = document.getElementById("heading").innerText;
  switch (month) {
    case "January":
      month = 2;
      document.getElementById("calender").innerText = "";
      document.getElementById("heading").innerText = "February";
      getCalender(month);

      break;
    case "February":
      month = 3;
      document.getElementById("calender").innerText = "";
      document.getElementById("heading").innerText = "March";
      getCalender(month);

      break;
    case "March":
      month = 4;
      document.getElementById("calender").innerText = "";
      document.getElementById("heading").innerText = "April";
      getCalender(month);
      break;
    case "April":
      month = 5;
      document.getElementById("calender").innerText = "";
      document.getElementById("heading").innerText = "May";
      getCalender(month);
      break;
    case "May":
      month = 6;
      document.getElementById("calender").innerText = "";
      document.getElementById("heading").innerText = "June";
      getCalender(month);
      break;
    case "June":
      month = 7;
      document.getElementById("calender").innerText = "";
      document.getElementById("heading").innerText = "July";
      getCalender(month);
      break;
    case "July":
      month = 8;
      document.getElementById("calender").innerText = "";
      document.getElementById("heading").innerText = "August";
      getCalender(month);
      break;
    case "August":
      month = 9;
      document.getElementById("calender").innerText = "";
      document.getElementById("heading").innerText = "Saptember";
      getCalender(month);
      break;
    case "Saptember":
      month = 10;
      document.getElementById("calender").innerText = "";
      document.getElementById("heading").innerText = "October";
      getCalender(month);
      break;
    case "October":
      month = 11;
      document.getElementById("calender").innerText = "";
      document.getElementById("heading").innerText = "November";
      getCalender(month);
      break;
    case "November":
      month = 12;
      document.getElementById("calender").innerText = "";
      document.getElementById("heading").innerText = "December";
      getCalender(month);
      break;
    case "December":
      month = 1;
      document.getElementById("calender").innerText = "";
      document.getElementById("heading").innerText = "January";
      getCalender(month);
      break;
    default:
      break;
  }
};

const getDeadline = async () => {
  let data = await (await fetch("/manager/dueDateOfTask")).json();
  return data;
};

const getCalender = async (month) => {
  let dueDate = await getDeadline();
  let data = await (await fetch(`/admin/calenderData/${month}`)).json();
  console.log(data);
  let calenderData = document.getElementById("calender");
  let tr1 = document.createElement("tr");
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
      td.innerText += `${data.yearCalendar[i][j]}`;
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

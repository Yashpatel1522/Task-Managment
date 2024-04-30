let date = new Date();
const month = date.toLocaleString('default', { month: 'long' });
document.getElementById("heading").innerText = month;
let todayDate = new Date().getDate();

const monthplus = () => {
  let month = document.getElementById("heading").innerText;
  switch (month) {
    case "January":
      month = 2;
      document.getElementById("calender").innerText = "";
      document.getElementById("heading").innerText = "February";
      document.getElementById("leftsidearrow").style.display = "block";
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
      document.getElementById("rightsidearrow").style.display = "none";
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


const monthminus = () => {
  let month = document.getElementById("heading").innerText;
  switch (month) {
    case "January":
      month = 12;
      document.getElementById("calender").innerText = "";
      document.getElementById("heading").innerText = "December";
      getCalender(month);
      break;
    case "February":
      month = 1;
      document.getElementById("leftsidearrow").style.display = "none";
      document.getElementById("calender").innerText = "";
      document.getElementById("heading").innerText = "January";
      getCalender(month);

      break;
    case "March":
      month = 2;
      document.getElementById("calender").innerText = "";
      document.getElementById("heading").innerText = "February";
      getCalender(month);
      break;
    case "April":
      month = 3;
      document.getElementById("calender").innerText = "";
      document.getElementById("heading").innerText = "March";
      getCalender(month);
      break;
    case "May":
      month = 4;
      document.getElementById("calender").innerText = "";
      document.getElementById("heading").innerText = "April";
      getCalender(month);
      break;
    case "June":
      month = 5;
      document.getElementById("calender").innerText = "";
      document.getElementById("heading").innerText = "May";
      getCalender(month);
      break;
    case "July":
      month = 6;
      document.getElementById("calender").innerText = "";
      document.getElementById("heading").innerText = "June";
      getCalender(month);
      break;
    case "August":
      month = 7;
      document.getElementById("calender").innerText = "";
      document.getElementById("heading").innerText = "July";
      getCalender(month);
      break;
    case "Saptember":
      month = 8;
      document.getElementById("calender").innerText = "";
      document.getElementById("heading").innerText = "August";
      getCalender(month);
      break;
    case "October":
      month = 9;
      document.getElementById("calender").innerText = "";
      document.getElementById("heading").innerText = "Saptember";
      getCalender(month);
      break;
    case "November":
      month = 10;
      document.getElementById("calender").innerText = "";
      document.getElementById("heading").innerText = "October";
      getCalender(month);
      break;
    case "December":
      month = 11;
      document.getElementById("calender").innerText = "";
      document.getElementById("heading").innerText = "November";
      document.getElementById("rightsidearrow").style.display = "block";
      getCalender(month);
      break;
    default:
      break;
  }
}
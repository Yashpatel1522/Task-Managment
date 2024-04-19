async function getData() {
  let url = window.location.origin + `/manager/getManagerTaskCount`;
  let response = await fetch(url);
  let data = await response.json();
  document.getElementsByClassName("count")[0].innerText =
    data.todoResult[0].count;
  document.getElementsByClassName("count")[1].innerText =
    data.progressResult[0].count;
  document.getElementsByClassName("count")[2].innerText =
    data.compleatedResult[0].count;
}

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
// fetch api of notification data
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
		notificatiodata += `<h3>Today is due date of <b>${element.task_name}</b>task<h3>`
	});
  Swal.fire({
		title: ` ${notificatiodata}`,
    icon: "info",
		
  });
}

function profOption() {
  document.getElementById("profClk").style.display = "block";
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


// pop-up js of addtask.ejs
let popup = document.getElementById("popup");

function openPopup() {
  popup.classList.add("open-popup");
}

function closePopup() {
  popup.classList.remove("open-popup");
}


// function for serach task
function searchTasks()
{
	
}
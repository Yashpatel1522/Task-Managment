async function getData() {
  let url = window.location.origin + `/manager/getManagerTaskCount`;
  let response = await fetch(url);
  let data = await response.json();
  console.log(data);
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
  if(data.length != 0){
    data.forEach(element => {
      notificatiodata += `<h3>Today is due date of <b>${element.task_name}</b> task<h3>`
    });
  }
  else{
    notificatiodata += `<h3>Today there is no due date of any task<h3>`
  }
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

async function getEmployee() {
  let data = await (await fetch(`/manager/getEmployees`)).json();
  data = JSON.stringify(data)
  return data;
} 

async function editTaskPopup(id) {
  console.log(id);
  let data = await (await fetch(`/manager/getTaskDetails/${id}`)).json();
  let employeeData = await getEmployee();
  employeeData = JSON.parse(employeeData)
  console.log("in Below"+employeeData.result);

  let commonStr = ``;
  employeeData.result.forEach(element => {
    commonStr+=`<option value='${element.id}'>${element.first_name}</option>`;
  });

  console.log(data.result[0]);
  document.getElementById('editTaskPopup').classList.add("open-popup");
  let str = ``;
  console.log(data.employeeResult[0]);
  data.employeeResult.forEach(element => {
    console.log(element);
    str+=`<option value='${element.id}' selected>${element.first_name}</option>`
  });
  console.log(str);
  document.getElementById('taskContainer').innerHTML = `
  <div class="row mb-3">
  <div class="col-md-6">
    <label class="text-primary">Task Name :</label>
    <input type="text" class="form-control" tabindex="2" id="task_name" name="task_name"
          value="${data.result[0].task_name}">
  </div>
  <div class="col-md-6">
    <label class="text-primary">Description :</label>
    <input type="text" class="form-control" tabindex="3" id="description" name="description" 
        value="${data.result[0].task_description}">
  </div>
</div>
<div class="row mb-3">
  <div class="col-md-6">
    <label class="text-primary">Category :</label>
    <input type="text" class="form-control" tabindex="2" id="category" name="category"
          value="${data.categoryResult[0].category}">
  </div>
  <div class="col-md-6">
    <label class="text-primary">status :</label>
    <input type="text" class="form-control" tabindex="3" id="status" name="status"
        value="${data.result[0].task_status}">
  </div>
</div>

<div class="row mb-3">
  <div class="col-md-6">
    <label class="text-primary">Start Date :</label>
    <input type="text" class="form-control" tabindex="2" id="start_date" name="start_date"
          value="${data.result[0].task_start_date}">
  </div>
  <div class="col-md-6">
    <label class="text-primary">End Date :</label>
    <input type="text" class="form-control" tabindex="3" id="end_date" name="end_date" 
        value="${data.result[0].task_end_date}">
  </div>
</div>
<div class="row mb-3">
  <div class="col-md-6">
    <label class="text-primary">Urgency :</label>
    <input type="text" class="form-control" tabindex="3" id="Urgency" name="Urgency"
        value="${data.urgencyResult[0].type}">
  </div>
  <div class="col-md-6">
    <label class="text-primary">Importance :</label>
    <input type="text" class="form-control" tabindex="3" id="importance" name="importance"
        value="${data.importanceResult[0].type}">
  </div>
</div>
<div class="row mb-3">
  <div class="col-md-6">
    <label class="text-primary">Manager :</label>
    <input type="text" class="form-control" tabindex="2" id="manager" name="manager"
          value="${data.managerName}">
  </div>
  <div class="col-md-6">
    <label class="text-primary">employees :</label>
    <select name="emp" id="emp" multiple>
    ${commonStr}
      ${str}
    </select>
  </div>
</div>
  `;
  console.log(data.employeeResult);
}

function closeEditTask() {
  document.getElementById('editTaskPopup').classList.remove("open-popup");
}


// function for serach task
function searchTasks()
{
  
	searchtask

}
const getData = async () => {
  let profData = await getProf();

  if(profData.imageResult && profData.result) {
    document.getElementById('profImg').src = `/assets/userprofiles/${profData.imageResult[0].newimage_name}`;
    document.getElementById('userName').innerText = `${profData.result[0].first_name}`+" "+`${profData.result[0].last_name}`;
  }


  let url = window.location.origin + `/manager/getManagerTaskCount`;
  let response = await fetch(url);
  let data = await response.json();
  document.getElementsByClassName("count")[0].innerText =
    data.todoResult[0].count;
  document.getElementsByClassName("count")[1].innerText =
    data.progressResult[0].count;
  document.getElementsByClassName("count")[2].innerText =
    data.compleatedResult[0].count;
};

async function getProf() {
  let data = await (await fetch('/manager/getManagerProfile/2')).json();
  return data;
}

const profOption = () => {
  document.getElementById("profClk").style.display = "block";
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

// pop-up js of addtask.ejs
let popup = document.getElementById("popup");

const openPopup = () => {
  popup.classList.add("open-popup");
};

const closePopup = () => {
  popup.classList.remove("open-popup");
};

async function getEmployee() {
  let data = await (await fetch(`/manager/getEmployees`)).json();
  data = JSON.stringify(data);
  return data;
}

async function getDetails() {
  let data = await (await fetch(`/manager/getEditTadkDetails`)).json();
  data = JSON.stringify(data);
  return data;
}

async function editTaskPopup(id) {
  console.log(id);
  let data = await (await fetch(`/manager/getTaskDetails/${id}`)).json();
  let employeeData = await getEmployee();
  let getEditDetails = await getDetails();
  getEditDetails = JSON.parse(getEditDetails)
  employeeData = JSON.parse(employeeData);

  document.getElementById("editTaskPopup").classList.add("open-popup");
  let str = ``;
  console.log(data.employeeResult[0]);
  data.employeeResult.forEach((element) => {
    console.log(element);
    str += `<option value='${element.id}' selected>${element.first_name}</option>`;
  });

  if(data.extraEmployeeResult) {
    data.extraEmployeeResult.forEach(element => {
      str += `<option value='${element.id}'>${element.first_name}</option>`;
    });
  }

  console.log(str);

  let ctaegoryStr = ``;
  getEditDetails.categoryRes.forEach(element => {
    ctaegoryStr += `<option value='${element.id}'>${element.category}</option>`; 
  });

  let urgencyStr = ``;
  getEditDetails.urgencyRes.forEach(element => {
    urgencyStr += `<option value='${element.id}'>${element.type}</option>`; 
  });

  let importanceStr = ``;
  getEditDetails.importanceRes.forEach(element => {
    importanceStr += `<option value='${element.id}'>${element.type}</option>`; 
  });

  document.getElementById("taskContainer").innerHTML = `
  <div class="row mb-3">
  <div class="col-md-6">
    <label class="text-primary">Task Name :</label>
    <input type="hidden" name="id" value="${id}">
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
    <select class="form-control" tabindex="2" id="category" name="category">
      ${ctaegoryStr}
    </select>
    </div>
  <div class="col-md-6">
    <label class="text-primary">status :</label>
    <select class="form-control" tabindex="3" id="status" name="status">
    <option value='todo'>Todo</option><option value='inprogress'>In Progress</option><option value='inprogress'>Compleated</option>
    </select>
  </div>
</div>

<div class="row mb-3">
  <div class="col-md-6">
    <label class="text-primary">Start Date :</label>
    <input type="date" class="form-control" tabindex="2" id="start_date" name="start_date"
          value="${data.result[0].task_start_date}">
  </div>
  <div class="col-md-6">
    <label class="text-primary">End Date :</label>
    <input type="date" class="form-control" tabindex="3" id="end_date" name="end_date" 
        value="${data.result[0].task_end_date}">
  </div>
</div>
<div class="row mb-3">
  <div class="col-md-6">
    <label class="text-primary">Urgency :</label>

    <select class="form-control" tabindex="3" id="Urgency" name="Urgency">
      ${urgencyStr}
    </select>
  </div>
  <div class="col-md-6">
    <label class="text-primary">Importance :</label>

    <select class="form-control" tabindex="3" id="importance" name="importance"> 
      ${importanceStr}
    </select>
  </div>
</div>
<div class="row mb-3">
  <div class="col-md-6">
    <label class="text-primary">Manager :</label>
    <input type="text" class="form-control" tabindex="2" id="manager" name="manager"
          value="${data.managerName}" disabled>
  </div>
  <div class="col-md-6">
    <label class="text-primary">employees :</label>
    <select name="emp" id="emp" multiple>
      ${str}
    </select>
  </div>
</div>
  `;
  console.log(data.employeeResult);
}

function closeEditTask() {
  document.getElementById("editTaskPopup").classList.remove("open-popup");
}

// function for serach task
const openViewComments = (teamId) => {
  window.location.href = `/manager/comments/${teamId}`;
};
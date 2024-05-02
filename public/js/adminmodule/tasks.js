const getTaskData = async () => {
  try {
    let data = await (await fetch(`/admin/tasksData`)).json();
    todoTask = document.getElementById("todoTask");
    let todoData = ``;
    data.todoData.forEach((e) => {
      todoData += `<div class="m-3 p-2 tasks" draggable="true" id="${e.id}">
      <div class="card-body">
        <p>${e.task_name}</p>
        <p>${e.task_description}</p>
        <button class="btn btn-success" onclick="openpopup2(${e.id})">View</button>
        <button class="btn btn-secondary" onclick="openPopup(${e.id})">Edit</button>
      </div>
    </div>`;
    });
    todoTask.innerHTML = todoData;

    let inprogressTask = document.getElementById("inprogressTask");
    let inprogressData = ``;
    data.inprogress.forEach((e) => {
      inprogressData += `<div class="m-3 p-2 tasks" draggable="true" id=${e.id}> 
      <div class="card-body">
        <p>${e.task_name}</p>
        <p>${e.task_description}</p>
        <button class="btn btn-success" onclick="openpopup2(${e.id})">View</button>
        <button class="btn btn-secondary" onclick="openPopup(${e.id})">Edit</button>
      </div>
    </div>`;
    });
    inprogressTask.innerHTML = inprogressData;

    let completedTask = document.getElementById("completedTask");
    let completedData = ``;
    data.complete.forEach((e) => {
      completedData += `<div class="m-3 p-2 tasks" draggable="true" id=${e.id}>
      <div class="card-body">
        <p>${e.task_name}</p>
        <p>${e.task_description}</p>
        <button class="btn btn-success" onclick="openpopup2(${e.id})">View</button>
        <button class="btn btn-secondary" onclick="openPopup()">Edit</button>
      </div>
    </div>`;
    });
    completedTask.innerHTML = completedData;
  } catch (error) {
    console.log(error);
  }
};

const searchTaskData = async (value) => {
  try {
    let data = await (await fetch(`/admin/tasksData/${value}`)).json();
    document.getElementById("todoTask").innerHTML = "";
    if (value === "") {
      getTaskData();
    }
    let todoTask = document.getElementById("todoTask");
    let dataadd = ``;
    if (data.todoTask.length != 0) {
      data.todoTask.forEach((e) => {
        dataadd += `<div class="m-3 p-2 tasks" draggable="true" id=${e.id}>
      <div class="card-body">
        <p>${e.task_name}</p>
        <p>${e.task_description}</p>
        <button class="btn btn-success" onclick="openpopup2(${e.id})">View</button>
        <button class="btn btn-secondary" onclick="openPopup()">Edit</button>
      </div>
    </div>`;
      });
      todoTask.innerHTML = dataadd;
    } else {
      document.getElementById("todoTask").innerText = "Not Data Found";
    }

    document.getElementById("inprogressTask").innerHTML = "";
    if (value === "") {
      getTaskData();
    }
    let inprogressTask = document.getElementById("inprogressTask");
    let dataadd1 = ``;
    if (data.inprogressTask.length != 0) {
      data.inprogressTask.forEach((e) => {
        dataadd1 += `<div class="m-3 p-2 tasks" draggable="true" id=${e.id}> 
      <div class="card-body">
        <p>${e.task_name}</p>
        <p>${e.task_description}</p>
        <button class="btn btn-success" onclick="openpopup2(${e.id})">View</button>
        <button class="btn btn-secondary" onclick="openPopup(${e.id})">Edit</button>
      </div>
    </div>`;
      });
      inprogressTask.innerHTML = dataadd1;
    } else {
      document.getElementById("inprogressTask").innerText = "Not Data Found";
    }

    document.getElementById("completedTask").innerHTML = "";
    if (value === "") {
      getTaskData();
    }
    let completedTask = document.getElementById("completedTask");
    let dataadd2 = ``;
    if (data.completedTask.length != 0) {
      data.completedTask.forEach((e) => {
        dataadd2 += `<div class="m-3 p-2 tasks" draggable="true" id=${e.id}>
      <div class="card-body">
        <p>${e.task_name}</p>
        <p>${e.task_description}</p>
        <button class="btn btn-success" onclick="openpopup2(${e.id})">View</button>
        <button class="btn btn-secondary" onclick="openPopup()">Edit</button>
      </div>
    </div>`;
      });
      completedTask.innerHTML = dataadd2;
    } else {
      document.getElementById("completedTask").innerText = "Not Data Found";
    }
  } catch (err) {
    console.log(err);
  }
};

let taskPopup = document.getElementById("task-detail");

const closePopup2 = () => {
  try {
    taskPopup.classList.remove("open-popup");
  } catch (error) {
    console.log(error);
  }
};

const openpopup2 = async (id) => {
  try {
    taskPopup.classList.add("open-popup");
    let data = await (await fetch(`/admin/tasksDetails/${id}`)).json();
    if (data.taskDetail.length != 0) {
      document.getElementById("task").innerHTML = `
        <div class="containere bg-white width:fit-content p-4" style="border-radius:10px;">
          <div class="row mb-3">
            <div class="col-md-11">
              <h2 class="text-primary text-center">Task Detalis</h2> 
            </div>
            <div class="col-md-1">
              <i class='bx bxs-x-circle text-danger fs-2'onclick="closePopup2()"></i>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-md-6">
              <label class="text-primary">Task Name :</label>
              <input type="text" class="form-control" tabindex="2" id="task_name" name="task_name"
                    value="${data.taskDetail[0].task_name}" disabled>
            </div>
            <div class="col-md-6">
              <label class="text-primary">Description :</label>
              <input type="text" class="form-control" tabindex="3" id="description" name="description" 
                  value="${data.taskDetail[0].task_description}" disabled>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-md-6">
              <label class="text-primary">Category :</label>
              <input type="text" class="form-control" tabindex="2" id="category" name="category"
                    value="${data.taskDetail[0].category}" disabled>
            </div>
            <div class="col-md-6">
              <label class="text-primary">status :</label>
              <input type="text" class="form-control" tabindex="3" id="status" name="status"
                  value="${data.taskDetail[0].task_status}" disabled>
            </div>
          </div>
          
          <div class="row mb-3">
            <div class="col-md-6">
              <label class="text-primary">Start Date :</label>
              <input type="text" class="form-control" tabindex="2" id="start_date" name="start_date"
                    value="${data.taskDetail[0].task_start_date}" disabled>
            </div>
            <div class="col-md-6">
              <label class="text-primary">End Date :</label>
              <input type="text" class="form-control" tabindex="3" id="end_date" name="end_date" 
                  value="${data.taskDetail[0].task_end_date}" disabled>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-md-6">
              <label class="text-primary">Urgency :</label>
              <input type="text" class="form-control" tabindex="3" id="Urgency" name="Urgency"
                  value="${data.priorities[0].urgency}" disabled>
            </div>
            <div class="col-md-6">
              <label class="text-primary">Importance :</label>
              <input type="text" class="form-control" tabindex="3" id="importance" name="importance"
                  value="${data.priorities[0].importance}" disabled>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-md-6">
              <label class="text-primary">Admin :</label>
              <input type="text" class="form-control" tabindex="2" id="manager" name="manager"
                    value="${data.taskDetail[0].manager}" disabled>
            </div>
            <div class="col-md-6">
              <label class="text-primary">employees :</label>
              <select name="emp" id="emp">
              </select>
            </div>
          </div>
        </div>`;
      data.employees.forEach((e) => {
        document.getElementById(
          "emp"
        ).innerHTML += `<option value="${e.emp_id}">${e.employee}</option>`;
      });
      data.teamhastask.forEach((e) => {
        document.getElementById(
          "emp"
        ).innerHTML += `<option value="${e.team_id}">${e.team_name}</option>`;
      });
      // let employees = await (await fetch(`/login/employee/${id}`)).json();
      // employees.forEach((employee) => {
      //   document.getElementById("emp").innerHTML += `<option value = "volvo" > ${employee.first_name + "" + employee.last_name
      //     }</option>`;
      // });
    }
  } catch (err) {
    console.log(err);
  }
};
// setTimeout(()=>{
// const fun2=()=>{
//   alert("yes")
//   let draggable=document.getElementById('inprogressTask').children
//   console.log(draggable)
//   draggable=Array.from(draggable)
//   console.log(draggable)
// }
const taskDetails = async () => {
  await getTaskData();
  await dragEvent();
  // async function getData() {
  //   let url = window.location.origin + `/ manager / getManagerTaskCount`;
  //   let response = await fetch(url);
  //   let data = await response.json();
  //   console.log(data);
  //   document.getElementsByClassName("count")[0].innerText =
  //     data.todoResult[0].count;
  //   document.getElementsByClassName("count")[1].innerText =
  //     data.progressResult[0].count;
  //   document.getElementsByClassName("count")[2].innerText =
  //     data.compleatedResult[0].count;
  // };
};

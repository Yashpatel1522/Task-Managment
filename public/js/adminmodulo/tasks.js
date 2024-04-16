const getTaskData = async () => {
  try {
    let data = await (await fetch(`/admin/tasksData`)).json();
    todoTask = document.getElementById("todoTask");
    let todoData = ``;
    data.todoData.forEach(e => {
      todoData += `<div class="card m-3 p-2">
      <div class="card-body">
        <p>${e.task_name}</p>
        <p>${e.task_description}</p>
      </div>
    </div>`
  });
  todoTask.innerHTML = todoData;

  let inprogressTask = document.getElementById("inprogressTask");
    let inprogressData = ``;
    data.inprogress.forEach(e => {
     inprogressData += `<div class="card m-3 p-2">
      <div class="card-body">
        <p>${e.task_name}</p>
        <p>${e.task_description}</p>
      </div>
    </div>`
  });
  inprogressTask.innerHTML = inprogressData;

  let completedTask = document.getElementById("completedTask");
    let completedData = ``;
    data.complete.forEach(e => {
     completedData += `<div class="card m-3 p-2">
      <div class="card-body">
        <p>${e.task_name}</p>
        <p>${e.task_description}</p>
      </div>
    </div>`
  });
  completedTask.innerHTML = completedData;
  } catch (error) {
    // logger.error(error)
    console.log(error);
  }
}

const searchTaskData = async (value) => {
  try{
    let data = await (await fetch(`/admin/tasksData/${value}`)).json();
    document.getElementById("tasks").innerHTML = "";
    if (value === "") {
      console.log("hr;l");
      getTaskData()
    }
    let tasks = document.getElementById("tasks");
    let dataadd = ``
    if (data.taskData.length != 0) {
      data.taskData.forEach(e => {
        dataadd += `<div class="card m-3 p-2">
        <div class="card-body">
          <p>${e.task_name}</p>
          <p>${e.task_description}</p>
        </div>
      </div>`
      });
      tasks.innerHTML = dataadd;
    } else {
      document.getElementById("tasks").innerText = "Not Data Found"
    }
  }catch(err){
    console.log(err)
  }
}
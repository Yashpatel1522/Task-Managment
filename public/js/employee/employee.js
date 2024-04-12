function sc(act, id) {
  let row = document.getElementsByClassName('carddetails')[id];
  if (act == 'next') {
    row.scrollLeft += 200;
  }
  else {
    row.scrollLeft -= 200;
  }
}


var employeedata;
async function fetchData() {

  let path = window.location.pathname.split("/")
  let id = path[path.length - 1]
  console.log(id, "id is ")

  response = await fetch(`http://127.0.0.1:8000/employee/employeetasklist/${id}`)
  data = await response.json()
  employeedata = data
  function setCard(id, element) {
    document.getElementById(`${id}`).innerHTML += `
      <div class="card1" onclick="show('popup','${element.task_id}')">
                <div class="field">
                  <h4>${element.task_name}</h4>
                </div>
                <div class="field">
                  <label>Description:</label>
                  <p>${element.task_description}</p>
                </div>
                <div class="field">
                  <label>due date :</label>
                  <p>${element.task_end_date}</p>
                </div>
              </div >`
  }
  data.forEach(element => {
    console.log(element, "elementic ")
    if (element.task_status == 'todo') {
      setCard('todo', element)
    }

    else if (element.task_status == 'inprogress') {
      setCard('inprogress', element)

    }
    else if (element.task_status == 'completed') {
      setCard('completed', element)

    }
  });


}
fetchData()


let ides = (id) => document.getElementById(id);

const show = (id, taskid) => {
  ides(id).style.display = "block";
  console.log(taskid)
  employeedata.forEach(element => {
    if (element.task_id == taskid) {
      document.getElementById('taskdetails').innerHTML = `
                  <div class="field">
                    <label>Task Name:</label>
                    <p>${element.task_name}</p>
                  </div>
                  <div class="field">
                    <label>Description:</label>
                    <p>${element.task_description}</p>
                  </div>
                  <div class="field">
                    <label>start date :</label>
                    <p>${element.task_start_date}</p>
                  </div>
                   <div class="field">
                    <label>end date :</label>
                    <p>${element.task_end_date}</p>
                  </div>
                   <div class="field">
                   <label>task status:</label>
                    <p>${element.task_status}</p>
                  </div>
                   <div class="field">
                   <label>prioritiy :</label>
                    <p>${element.prioritiy_id}</p>
                  </div>
                   <div class="field">
                   <label>category name:</label>
                    <p>${element.category}</p>
                  </div>
                   <div class="field">
                   <label>manager name :</label>
                    <p>${element.manager_id}</p>
                  </div>

                </div >`

    }
  });

}

const hide = (id) => {
  ides(id).style.display = "none";
}
function sc(act, id) {
  let row = document.getElementsByClassName("carddetails")[id];
  if (act == "next") {
    row.scrollLeft += 200;
  } else {
    row.scrollLeft -= 200;
  }
}
function showDropdown() {
  document.getElementById("dropdown").classList.toggle("show");
}

let path = window.location.pathname.split("/");
let id = path[path.length - 1];




var employeedata;
async function fetchData() {

  response = await fetch(`/employee/employeetasklist/${id}`);
  data = await response.json();
  employeedata = data;

  function setCard(id, element) {
    document.getElementById(`${id}`).innerHTML += `
      <div class="card1" onclick="show('popup','${element.task_id}')">
                <div class="field">
                  <h4>${element.task_name}</h4>
                  <span class="ms-3" id='urgent-${element.task_id}'><span>
                </div>
                <div class="field">
                  <label>Description :&nbsp;</label>
                  <p>${element.task_description}</p>
                </div>
                <div class="field">
                  <label>due date :&nbsp;</label>
                  <p>${element.task_end_date}</p>
                </div>
              </div >`;
  }
  data.forEach((element) => {
    if (element.task_status == "todo") {
      setCard("todo", element);
    } else if (element.task_status == "inprogress") {
      setCard("inprogress", element);
    } else if (element.task_status == "completed") {
      setCard("completed", element);
    }
    switch (element.urgency_id) {
      case 1:
        document.getElementById(
          `urgent-${element.task_id}`
        ).innerHTML = `<img src="/assets/employee/redflag.svg" alt="flag" width="20px" height="20px">`;
        break;
      case 2:
        document.getElementById(
          `urgent-${element.task_id}`
        ).innerHTML = `<img src="/assets/employee/orangeflag.svg" alt="flag" width="20px" height="20px">`;
        break;
      case 3:
        document.getElementById(
          `urgent-${element.task_id}`
        ).innerHTML = `<img src="/assets/employee/yellowflag.svg" alt="flag" width="20px" height="20px">`;
        break;
      case 4:
        document.getElementById(
          `urgent-${element.task_id}`
        ).innerHTML = `<img src="/assets/employee/greenflag.svg" alt="flag" width="20px" height="20px">`;
        break;
    }
  });
}
fetchData();

var gtaskid;
let ides = (id) => document.getElementById(id);

const show = (id, taskid) => {
  ides(id).style.display = "block";
  console.log(taskid);
  gtaskid = taskid;
  employeedata.forEach((element) => {
    if (element.task_id == taskid) {
      document.getElementById("taskdetails").innerHTML = `
      <div class="field">
        <p class="fs-1 text fw-bold">${element.task_name}</p>
      </div>
    
      <div class="row">
      
        <div class="field fs-6 text p-3 col">
        <i class="bi bi-record-circle me-2"></i>
        <label>Status: &nbsp;</label>
        <p>${element.task_status}</p>
        </div>
     <div class="field fs-6 text p-3 col">
     <i class="bi bi-info-circle me-2"></i>
    <label>Description:</label>
    <p>${element.task_description}</p>
    </div>
      </div>
      <div class="row">
      
      <div class="field fs-6 text p-3 col">
      <i class="bi bi-calendar me-2"></i>
      <label>Start date :&nbsp;</label>
      <p>${element.task_start_date}</p>
      </div>
      <div class="field fs-6 text p-3 col">
      <i class="bi bi-calendar me-2"></i>
      <label>End date :&nbsp;</label>
      <p>${element.task_end_date}</p>
      </div> 
      </div>

      <div class="row">
      
      <div class="field fs-6 text p-3 col">
      <i class="bi bi-flag me-2"></i>
      <label>Urgency :&nbsp;</label>
       <p>${element.urgencytype}</p>
     </div>
      <div class="field fs-6 text p-3 col">
      <i class="bi bi-flag me-2"></i>
      <label>Importancy :&nbsp;</label>
       <p>${element.importancetype}</p>
     </div>
      </div>

      <div class="row">
      
      <div class="field fs-6 text p-3 col">
      <i class="bi bi-columns-gap me-2"></i>
      <label>Category name :&nbsp;</label>
       <p>${element.category}</p>
     </div>
      <div class="field fs-6 text p-3 col">
      <i class="bi bi-person-circle me-2"></i>
      <label>Manager name :&nbsp;</label>
       <p>${element.first_name}</p>
     </div>
      </div>
        <div class="modal-footer-user" id="commentpopup">
        <button type="button" class="btn btn-secondary" data-dismiss="modal"
          onclick="showComment('popup-comment',${element.task_id})">Comment</button>
        <button type="button" onclick="hide('popup')" class="btn btn-primary">Close</button>
      </div>

    </div >`;
    }
  });
};

const hide = (id) => {
  ides(id).style.display = "none";
};

let ides_comment = (id) => document.getElementById(id);

const showComment = (id, taskid) => {
  document.getElementById("popup").style.display = "none";
  employeedata.forEach((element) => {
    if (element.task_id == taskid) {
      ides_comment(id).style.display = "block";
    }
  });
};

const hideComment = (id) => {
  ides_comment(id).style.display = "none";
};

//user search section
const seachresultnew = async () => {
  let svalue = document.getElementById('seachtaskresult').value
  if (svalue === "") {
    ides("todo").innerHTML = ""
    ides("inprogress").innerHTML = ""
    ides("completed").innerHTML = ""

    fetchData()
  }
  let response = await fetch(`/employee/searchtask/${svalue}`)
  let data = await response.json();
  ides("todo").innerHTML = ""
  ides("inprogress").innerHTML = ""
  ides("completed").innerHTML = ""

  if (data.length != 0) {
    function resetCard(id, element) {
      document.getElementById(`${id}`).innerHTML = "";
      document.getElementById(`${id}`).innerHTML += `
      <div class="card1" onclick="show('popup','${element.task_id}')">
                <div class="field">
                  <h4>${element.task_name}</h4>
                  <span class="ms-3" id='urgent-${element.task_id}'><span>
                </div>
                <div class="field">
                  <label>Description:</label>
                  <p>${element.task_description}</p>
                </div>
                <div class="field">
                  <label>due date : </label>
                  <p>${element.task_end_date}</p>
                </div>
              </div >`;
    }
    data.forEach((element) => {
      console.log(element, "elementic ");
      if (element.task_status == "todo") {
        ides("todo").removeAttribute("style");
        resetCard("todo", element);
      } else if (element.task_status == "inprogress") {
        ides("inprogress").removeAttribute("style");
        resetCard("inprogress", element);
      } else if (element.task_status == "completed") {
        ides("completed").removeAttribute("style");
        resetCard("completed", element);
      }
      switch (element.urgency_id) {
        case 1:
          document.getElementById(
            `urgent-${element.task_id}`
          ).innerHTML = `<img src="/assets/employee/redflag.svg" alt="flag" width="20px" height="20px">`;
          break;
        case 2:
          document.getElementById(
            `urgent-${element.task_id}`
          ).innerHTML = `<img src="/assets/employee/orangeflag.svg" alt="flag" width="20px" height="20px">`;
          break;
        case 3:
          document.getElementById(
            `urgent-${element.task_id}`
          ).innerHTML = `<img src="/assets/employee/yellowflag.svg" alt="flag" width="20px" height="20px">`;
          break;
        case 4:
          document.getElementById(
            `urgent-${element.task_id}`
          ).innerHTML = `<img src="/assets/employee/greenflag.svg" alt="flag" width="20px" height="20px">`;
          break;
      }
    });
  }
  else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Data Not Found"
    });
    ides("seachtaskresult").value = ""
    fetchData();
  }
}

async function addcomment() {
  const formData = new FormData();
  const fields = ["taskcomment", "taskstatus"];
  formData.append("file", document.getElementById("file"));
  let file = document.getElementById("file");
  formData.append("file", file.files[0]);
  fields.forEach((element) => {
    formData.append(element, document.getElementById(element).value);
  });
  const response = await fetch(
    `/employee/addcomment/${id}/${gtaskid}`,
    {
      method: "POST",
      body: formData,
    }
  );
  let data = await response.json();
  if (data.msg == "done") {
    hideComment("popup-comment");
  }
}

function updateUserProfile() {
  let form = document.getElementById('profileform')
  let formData = new FormData(form)
  fetch(`/employee/updateprofile`, {
    method: 'POST',
    body: formData
  }).then(
    (response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    }
  )
    .then((data) => {
      if (data.message == "updated") {
        Swal.fire({
          title: "Done",
          text: "Profile Updated Succesfully",
          icon: "success",
        }).then(function () {
          window.location.reload();
        });
      } else {
        Swal.fire({
          title: "Done",
          text: "Profile is not Updated",
          icon: "error",
        })
      }
    })
}
async function setData() {
    let url = window.location.origin+`/manager/getEmployees`
	  let response = await fetch(url);
    let data = await response.json();
    let str = ``;
    console.log(data.result);
    if(data.result) {
        let count =0;
        for(let i=0; i<Math.ceil(data.result.length/3); i++) {
            str += `<div class="row pb-3">`;
            for(let j=0; j<3; j++) {
                if(data.result[count]) {
                    console.log(data.result[count].last_name);
                    str+=`
                    <div class="col-4">
                        <div class="card" style="width: 100%;">
                            <img src="" class="card-img-top" alt="">
                            <div class="card-body bg-light" style="border-radius: 10px;">
                                <h5 class="card-title" style="font-size: 25px;">${data.result[count].first_name} ${data.result[count].last_name}</h5>
                                <br>
                                <p class="card-text"><b>Email - </b>${data.result[count].email}</p>
                                <p class="card-text"><b>Birth Date - </b>${data.result[count].date_of_birth}</p>
                                <a href="#" class="btn btn-primary">View More</a>
                                <input type="button" value="Remove" class="btn btn-secondary px-3" onclick="removeEmployee(${data.result[count].id})">
                            </div>
                        </div>
                    </div>
                    `;
                    count++;
                }
            }
            str += `</div>`;
        }
    }
    document.getElementsByClassName('employeeList')[0].innerHTML = str
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

function showOption() {
    if(document.getElementById("profClk").style.display == 'none' || document.getElementById("profClk").style.display == '') {
      document.getElementById("profClk").style.display = 'block'
    }
    else {
      document.getElementById("profClk").style.display = 'none'
    }
}

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
          notificatiodata += `<h3>Today is due date of <b>${element.task_name}</b> task<h3>`
      });
    Swal.fire({
          title: ` ${notificatiodata}`,
      icon: "info",
          
    });
  }

async function searchEmployee(value){
  try {
    let data = await (await fetch(`/manager/searchEmploye/${value}`)).json();
    if (value === "") {
      setData();
    }
    let str = ``;
    if (data.searchData.length != 0) {
        let count =0;
        for(let i=0; i<Math.ceil(data.searchData.length/3); i++) {
            str += `<div class="row pb-3">`;
            for(let j=0; j<3; j++) {
                if(data.searchData[count]) {
                    console.log(data.searchData[count].last_name);
                    str+=`
                    <div class="col-4">
                        <div class="card" style="width: 100%;">
                            <img src="" class="card-img-top" alt="">
                            <div class="card-body bg-light" style="border-radius: 10px;">
                                <h5 class="card-title" style="font-size: 25px;">${data.searchData[count].first_name} ${data.searchData[count].last_name}</h5>
                                <br>
                                <p class="card-text"><b>Email - </b>${data.searchData[count].email}</p>
                                <p class="card-text"><b>Birth Date - </b>${data.searchData[count].date_of_birth}</p>
                                <a href="#" class="btn btn-primary">View More</a>
                                <input type="button" value="Remove" class="btn btn-secondary px-3" onclick="removeEmployee(${data.searchData[count].id})">
                            </div>
                        </div>
                    </div>
                    `;
                    count++;
                }
            }
            str += `</div>`;
        }
        document.getElementsByClassName('employeeList')[0].innerHTML = str
    }else{
          Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Not Found Data"
        });
        setData();
    }
    } catch (error) {
    console.log(error)
  }
}

const removeEmployee = async (id) => {
  try {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success btn-gap",
        cancelButton: "btn btn-danger btn-gap"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true

    }).then(async (result) => {
      if (result.isConfirmed) {
        await fetch(`http://localhost:8000/manager/removeemployeapi/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
        })
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        }).then(async (result2) => {
          if (result2.isConfirmed) {
            setData();
          }
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your date is safe :)",
          icon: "error"
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
}

async function setData() {
    let url = window.location.origin+`/manager/getEmployees`
	let response = await fetch(url);
    let data = await response.json();
    let str = ``;
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
                                <button class="btn btn-primary" onclick="showEmployeeDetails(${data.result[count].id}, '${data.result[count].first_name}', '${data.result[count].last_name}', '${data.result[count].email}', '${data.result[count].contact}', '${data.result[count].date_of_birth}', '${data.result[count].create_at}', '${data.result[count].img_url}')">View More</button>
                                <span></span>
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

function showEmployeeDetails(id, first_name, last_name, email, contact, dob, join, url) {
  Swal.fire({
    position: "top",
    title: `Full Details`,
    html: `
      <p><b>Employee Id : </b>${id}</p>
      <p><b>First Name : </b>${first_name}</p>
      <p><b>Last Name : </b>${last_name}</p>
      <p><b>Email : </b>${email}</p>
      <p><b>Contact : </b>${contact}</p>
      <p><b>Birth Date : </b>${dob}</p>
      <p><b>Date Of Joining : </b>${join.slice(0, 10)}</p>
    `,
    showClass: {
      popup: `
        animate__animated
        animate__fadeInUp
        animate__slower
      `
    },
    confirmButtonText: 'Close'
  });

  // Swal.fire({
  //   title: "Sweet!",
  //   text: "Modal with a custom image.",
  //   imageUrl: "https://unsplash.it/400/200",
  //   imageWidth: 400,
  //   imageHeight: 200,
  //   imageAlt: "Custom image"
  // });
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
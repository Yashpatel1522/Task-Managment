let pagelimit = 5;
let maxlength;
let currentpage = 1;
let pagecount;
const getManagerData = async () => {
  try {
    let data = await (await fetch(`/admin/managersapi`)).json();
    maxlength = data.result.length;
    pagecount = Math.ceil(maxlength/pagelimit);
    let table = document.getElementById("man-table")
    let dataadd = `<thead>
                <th>FirstName</th>
                <th>LastName</th>
                <th>Email</th>
                <th>Contact No</th>
                <th>View Details</th>
                <th>Edit Details</th>
                </thead>`
    if (data.result.length != 0) {
      data.result.slice(pagelimit - 5, pagelimit).forEach(element => {
        dataadd += (`<tr>
                <td>${element.first_name}</td>
                <td>${element.last_name}</td>
                <td>${element.email}</td>
                <td>${element.contact}</td>
                <td>
                <input type="button" value="view" class="btn btn-secondary px-3" onclick="openPopup1(${element.id})">
                </td>
                <td>
                <input type="button" value="delete" class="btn btn-secondary px-3" onclick="deleteManData(${element.id})">
                </td>`)
      });
      table.innerHTML = dataadd;
      document.getElementById("pagination").innerHTML = `
        <input type="button" value="FirstPage" onclick="firstpage()">
        <input type="button" value="Pervious" onclick="pervious()">
        <span>${Math.ceil(pagelimit/5)}</span>
        <input type="button" value="Next" onclick="next()">
        <input type="button" value="LastPage" onclick="lastpage()">`
    }

  } catch (error) {
    // logger.error(error)
    console.log(error);
  }
}

const firstpage = () => {
  pagelimit = 5;
  getManagerData();
}

const pervious = () => {
  if (pagelimit != 5) {
    pagelimit -= 5;
    getManagerData();
  }
}

const next = () => {
  if (pagelimit != maxlength) {
    currentpage++;
    pagelimit += 5;
    getManagerData();
  }
}

const lastpage = () => {
  currentpage = maxlength;
  getManagerData();
}



let popupview = document.getElementById("show-detail");


const closePopup1 = () => {
  try {
    popupview.classList.remove("open-popup")
  } catch (error) {
    console.log(error);
  }
}

const openPopup1 = async (id) => {
  try {
    popupview.classList.add("open-popup");
    let data = await (await fetch(`/admin/managersapi/${id}`)).json();

    if (data.managerDetail.length != 0) {
      document.getElementById("manager-form").innerHTML =
        `<div class="container width:fit-content p-4">
        <div class="row mb-3">
        <div class="col-md-11">
            <h2 class="text-primary text-center">Manager Detalis</h2> 
        </div>
        <div class="col-md-1">
            <i class='bx bxs-x-circle text-danger fs-2'onclick="closePopup1()"></i>
        </div>
    </div>
                <div class="row mb-3">
                    <div class="col-md-6">
                        <label class="text-primary">First Name :</label>
                        <input type="text" class="form-control" tabindex="2" id="first_name" name="first_name" value="${data.managerDetail[0].first_name}" disabled>
                    </div>
                    <div class="col-md-6">
                        <label class="text-primary">Last Name :</label>
                        <input type="text" class="form-control" tabindex="3" id="last_name" name="last_name" value="${data.managerDetail[0].last_name}" disabled>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-md-6">
                        <label class="text-primary">Email :</label>
                        <input type="text" class="form-control" tabindex="4" id="email" name="email" value="${data.managerDetail[0].email}" disabled>
                    </div>
                    <div class="col-md-6">
                        <label class="text-primary">Mobile No: :</label>
                        <input type="text" class="form-control" tabindex="5" id="contact" name="contact"  value="${data.managerDetail[0].contact}" disabled>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-md-6">
                        <lable class="text-primary">Date Of Birth</lable>
                        <input type="text" class="form-control" tabindex="6" id="date_of_birth" name="date_of_birth" value="${data.managerDetail[0].date_of_birth}" disabled>
                    </div>
                    <div class="col-md-6">
                        <lable class="text-primary">Department</lable>
                        <input type="text" class="form-control" tabindex="7" id="employee_role" name="employee_role" placeholder="Enter Department">
                    </div>
                </div>
                </div>`
    }
  } catch (error) {
    console.log(error);
  }
}

window.onclick = function(event) {
  if (event.target == popupview) {
    closePopup1()
  }
}
const searchData = async (value) => {
  try {
    console.log(value);
    let data = await (await fetch(`/admin/managersapi/search/${value}`)).json();
    document.getElementById("man-table").innerHTML = "";
    if (value === "") {
      getManagerData()
    }
    let table = document.getElementById("man-table");
    let dataadd = `<thead>
                <th>FirstName</th>
                <th>LastName</th>
                <th>Email</th>
                <th>Contact No</th>
                <th>View Details</th>
                <th>Delete</th>
                </thead>`
    if (data.searchData.length != 0) {
      data.searchData.forEach(element => {
        dataadd += (`<tr>
                <td>${element.first_name}</td>
                <td>${element.last_name}</td>
                <td>${element.email}</td>
                <td>${element.contact}</td>
                <td>
                <input type="button" value="view" class="btn btn-secondary px-3" onclick="openPopup1(${element.id})">
                </td>
                <td>
                <input type="button" value="delete" class="btn btn-secondary px-3" onclick="deleteManData(${element.id})">
                </td>`)
      });
      table.innerHTML = dataadd;
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Not Found Data"
      });
      getManagerData()
    }
  } catch (error) {
    console.log(error);
  }
}

const deleteManData = async (id) => {
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
      
    }).then((result) => {
      if (result.isConfirmed) {
        userdelete(id)
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
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
const userdelete = async (id) => {
  try {
    let data = await fetch(`http://localhost:8000/admin/managersapi/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    Swal.fire({
      title: "You Data Deleted",
      text: "You clicked the button!",
      icon: "success"
    });
    closePopup1();
    getManagerData();
  } catch (error) {
    console.log(error);
  }
}

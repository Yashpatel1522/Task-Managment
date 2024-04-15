let pagelimit = 5;
let maxlength;
const getEmpData = async () => {
  try {
    let data = await (await fetch(`/admin/employeesapi`)).json();
    maxlength = data.result.length;
    let table = document.getElementById("emp-table")
    let dataadd = `<thead>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Email</th>
              <th>Contact No</th>
              <th>View Details</th>
              <th>Delete</th>
              </thead>`
    if (data.result.length != 0) {
      data.result.slice(pagelimit - 5, pagelimit).forEach(element => {
        dataadd += (`<tr><td>${element.first_name}</td><td>${element.last_name}</td><td>${element.email}</td><td>${element.contact}</td><td><input type="button" value="view" class="btn btn-secondary px-3" onclick = "openPopup1(${element.id})"></td><td>
              <input type="button" value="delete" class="btn btn-secondary px-3" onclick="deleteEmpData(${element.id})">
              </td>`)
      });
      table.innerHTML = dataadd;
      document.getElementById("pagination").innerHTML = `
        <input type="button" value="FirstPage" onclick="firstpage()">
        <input type="button" value="Pervious" onclick="pervious()">
        <span>${pagelimit/5}</span>
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
  getEmpData();
}

const pervious = () => {
  if (pagelimit != 5) {
    pagelimit -= 5;
    getEmpData();
  }
}

const next = () => {
  if (pagelimit != maxlength) {
    pagelimit += 5;
    getEmpData();
  }
}

const lastpage = () => {
  pagelimit = maxlength;
  getEmpData();
}

let popup = document.getElementById("show-detail");
const openPopup = () => {
  try {
    popup.classList.add("open-popup");
  } catch (error) {
    console.log(error);
  }
}

const closePopup = () => {
  try {
    popup.classList.remove("open-popup")
  } catch (error) {
    console.log(error);
  }
}

const openPopup1 = async (id) => {
  try {
    popup.classList.add("open-popup");
    console.log(id);
    let data = await (await fetch(`/admin/employeesapi/${id}`)).json();

    if (data.employeeDetail.length != 0) {
      document.getElementById("employee-form").innerHTML =
        `<div onclick = "closePopup()">
            <i class="fa-solid fa-x"></i>
          </div>
            <table>
                <tr>
                  <td>
                    FirstName: <input type="text" value="${data.employeeDetail[0].first_name}" name="fname" disabled>
                  </td>
                  <td>
                    LastName: <input type="text" value="${data.employeeDetail[0].last_name}" name="fname" disabled>
                  </td>
                </tr>
                <tr>
                  <td>
                    Email: <input type="text" value="${data.employeeDetail[0].email}" name="email" disabled>
                  </td>
                  <td>
                    Contact No: <input type="text" value="${data.employeeDetail[0].contact}" name="contact" disabled>
                  </td>
                </tr>
            </table>`
    }
  } catch (error) {
    console.log(error);
  }
}

const searchEmpData = async (value) => {
  try {
    console.log(value);
    let data = await (await fetch(`/admin/employeesapi/search/${value}`)).json();
    document.getElementById("emp-table").innerHTML = "";
    if (value === "") {
      getEmpData()
    }
    let table = document.getElementById("emp-table");
    let dataadd = `<thead>
                <th>FirstName</th>
                <th>LastName</th>
                <th>Email</th>
                <th>Contact No</th>
                <th>View Details</th>
                <th>Edit Details</th>
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
                <input type="button" value="delete" class="btn btn-secondary px-3" onclick="deleteData(${element.id})">
                </td>`)
      });
      table.innerHTML = dataadd;
    } else {
      document.getElementById("emp-table").innerText = "Not Data Found"
    }
  } catch (error) {
    console.log(error);
  }
}

const deleteEmpData = (id) => {
  try {
    popup.classList.add("open-popup");
    document.getElementById("employee-form").innerHTML =
      `<div>
      <h3>Are You Sure !</h3>
      <div>
        <input type="button" value="Cancel" onclick="closePopup()">
        <input type="button" value="Submit" onclick="userdelete(${id})">
      </div>
    </div>`   
  } catch (error) {
    console.log(error);
  }
}


const userdelete = async (id) => {
  try {
    let data = await fetch(`http://localhost:8000/admin/employeesapi/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    closePopup();
    getEmpData();
  } catch (error) {
    console.log(error);
  }
}
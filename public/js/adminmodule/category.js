const getCategoryData = async () => {
  let fetchCategoryData = await (await fetch(`/admin/categoryData`)).json();
  category = document.getElementById("category");
  let categoryData = ``;
  fetchCategoryData.categoryData.forEach(e => {
    categoryData += `<div class="card m-3 p-2">
      <div class="card-body">
        <p class="h4 p-2">${e.category}</p>
        <input type="button" value="view" class="m-2 px-3 py-2" onclick="openpopup3(${e.id})">
        <input type="button" value="Delete" class="m-2 px-3 py-2 btn btn-danger" onclick="categoryDelete(${e.id})" >
      </div>
    </div>`
  });
  category.innerHTML = categoryData;
}

const searchCategoryData = async (value) => {

  let data = await (await fetch(`/admin/categoryData/${value}`)).json();
  document.getElementById("category").innerHTML = "";
  if (value === "") {
    getCategoryData()
  }
  if (data.categorySearch.length != 0) {
    data.categorySearch.forEach(e => {
      document.getElementById("category").innerHTML += `<div class="card m-3 p-2">
      <div class="card-body">
        <p class="h4 p-2">${e.category}</p>
        <input type="button" value="view" class="m-2 px-3 py-2" onclick="openpopup3(${e.id})" >
        <input type="button" value="Delete" class="m-2 px-3 py-2 btn btn-danger" onclick="categoryDelete(${e.id})" >
      </div>
    </div>`
    })
  }
  else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Not Found Data"
    });
    getCategoryData();
  }
}

let categoryPopup = document.getElementById("category-detail");
const closePopup3 = () => {
  try {
    categoryPopup.classList.remove("open-popup")
  } catch (error) {
    console.log(error);
  }
}

const openpopup3 = async (id) => {
  try {
    categoryPopup.classList.add("open-popup");
    let categoryDetail = await (await fetch(`/admin/categoryDetails/${id}`)).json();
    // console.log(categoryDetail);
    document.getElementById("viewCategory").innerHTML = "";
    if (categoryDetail.viewCategory.length != 0) {
      document.getElementById("viewCategory").innerHTML = `
        <div class="container width:fit-content p-4 rounded" style="background-color: white;">
          <div class="row mb-3">
            <div class="col-md-11">
              <h2 class="text-primary text-center">Category Details</h2>
            </div>
            <div class="col-md-1">
              <i class='bx bxs-x-circle text-danger fs-2'onclick="closePopup3()"></i>
            </div>
          </div>
          <div class="row mb-3">
              <label class="text-primary">Category Name :</label>
              <input type="text" class="form-control" tabindex="2" id="category-name" name="category-name"
                    value="${categoryDetail.viewCategory[0].category}" disabled>
          </div>
            <div class="col-md-6">
              <label class="text-primary">Tasks :</label>`
      categoryDetail.viewCategory.forEach(e => {
        document.getElementById("viewCategory").innerHTML += `
         <input type="text" class="form-control" tabindex="2" id="task_name" name="task_name"
                    value="${e.task_name}" disabled>`
      })
      document.getElementById("viewCategory").innerHTML += `</div></div>`
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No Task Available in this Category"
      });
      document.getElementById("viewCategory").innerHTML = ""
    }
  } catch (err) {
    console.log(err);
  }
}

var categoryDelete = async (id) => {
  try {
    await deleteAllData(`/admin/categoryData/${id}`, "category", "/admin/categoryData");
  } catch (error) {
    console.log(error);
  }
}

let addCategoryPopup = document.getElementById('addCategory');

function openPopup4() {
  addCategoryPopup.classList.add("open-popup");
}

function closePopup4() {
  addCategoryPopup.classList.remove("open-popup");
}

const addNewCategory = async () => {
  let formdata = document.getElementById("categoryForm");
  let data = new FormData(formdata)
  const params = new URLSearchParams(data);
  const jobdata = await new Response(params).text();

  let data2 = await fetch("http://localhost:8000/admin/category", {
    method: "POST",
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    body: jobdata
  })
  result = await data2.json()
  window.location.assign("http://localhost:8000/admin/category")
}
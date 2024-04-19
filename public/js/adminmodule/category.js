const getCategoryData = async () => {
  let fetchCategoryData = await (await fetch(`/admin/categoryData`)).json();
  category = document.getElementById("category");
  let categoryData = ``;
  fetchCategoryData.categoryData.forEach(e => {
    categoryData += `<div class="card m-3 p-2">
      <div class="card-body">
        <p class="h4 p-2">${e.id}</p>
        <p class="h4 p-2">${e.category}</p>
        <input type="button" value="view" class="m-2 px-3 py-2">
      </div>
    </div>`
  });
  category.innerHTML = categoryData;
}

const searchCategoryData = async (value) => {

  let data = await (await fetch(`/admin/categoryData/${value}`)).json();
  console.log(data);
  document.getElementById("category").innerHTML = "";
  if (value === "") {
    getCategoryData()
  }
  if (data.categorySearch.length != 0) {
    data.categorySearch.forEach(e => {
      document.getElementById("category").innerHTML += `<div class="card m-3 p-2">
      <div class="card-body">
        <p class="h4 p-2">${e.id}</p>
        <p class="h4 p-2">${e.category}</p>
        <input type="button" value="view" class="m-2 px-3 py-2">
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

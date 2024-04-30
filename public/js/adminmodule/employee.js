const getEmpData = async () => {
  try {
    fetchData("/admin/employeesapi", "emp-table");
  } catch (error) {
    console.log(error);
  }
};

const viewusers = async (id) => {
  try {
    viewFetchData(`/admin/employeesapi/${id}`, "employee-form");
  } catch (error) {
    console.log(error);
  }
};

const searchEmpData = async (value) => {
  try {
    if (value === "") {
      getEmpData();
    } else {
      searchAllData(
        `/admin/employeesapi/search/${value}`,
        "emp-table",
        "/admin/employeesapi"
      );
    }
  } catch (error) {
    console.log(error);
  }
};

const usersDeleteData = async (id) => {
  try {
    deleteAllData(
      `/admin/employeesapi/${id}`,
      "emp-table",
      "/admin/employeesapi"
    );
  } catch (error) {
    console.log(error);
  }
};

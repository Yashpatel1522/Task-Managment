const getManagerData = async () => {
  try {
    fetchData("/admin/managersapi", "man-table");
  } catch (error) {
    console.log(error);
  }
};

const viewusers = async (id) => {
  try {
    viewFetchData(`/admin/managersapi/${id}`, "manager-form");
  } catch (error) {
    console.log(error);
  }
};

const searchData = async (value) => {
  try {
    if (value === "") {
      getManagerData();
    } else {
      searchAllData(
        `/admin/managersapi/search/${value}`,
        "man-table",
        "/admin/managersapi"
      );
    }
  } catch (error) {
    console.log(error);
  }
};

const usersDeleteData = async (id) => {
  try {
    deleteAllData(
      `/admin/managersapi/${id}`,
      "man-table",
      "/admin/managersapi"
    );
  } catch (error) {
    console.log(error);
  }
};

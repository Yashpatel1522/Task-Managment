// Team Data Show
var getTeamShow = async () => {
  try {
    fetchData("/admin/teamapi", "team-table");
  } catch (error) {
    console.log(error);
  }
}

// view team details 
var viewTeam = async (id) => {
  try {
    viewFetchData(`/admin/teamapi/${id}`, "team-form");
  } catch (error) {
    console.log(error);
  }
}

// search Team Data
var searchTeam = async (value) => {
  try {
    if (value === "") {
      getTeamShow()
    } else {
      searchAllData(`/ admin / teamapi / search / ${value} `, "team-table", "/admin/teamapi");
    }
  } catch (error) {
    console.log(error);
  }
}

// Delete Team Data
var teamDelete = async (id) => {
  try {
    deleteAllData(`/ admin / teamapi / ${id} `, "team-table", "/admin/teamapi");
  } catch (error) {
    console.log(error);
  }
}
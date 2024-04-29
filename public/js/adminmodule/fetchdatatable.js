let pagelimit = 5;
let currentpage = 1;
let maxlength;
let pagecount;
const fetchData = async (api, id) => {
  try {
    let data = await (await fetch(`${api}`)).json();
    maxlength = data.result.length;
    pagecount = Math.ceil(maxlength / pagelimit);
    let dataadd;
    if (api === "/admin/teamapi") {
      dataadd = `<thead>
                <th>TeamId</th>
                <th>TeamName</th>
                <th>View Details</th>
                <th>Edit Team</th>
                <th>Delete Team</th>
                </thead>`;
      if (data.result.length != 0) {
        let startindex = (currentpage - 1) * pagelimit;
        let endindex = Math.min(startindex + pagelimit, maxlength);
        data.result.slice(startindex, endindex).forEach((element) => {
          dataadd += `<tr>
                <td>${element.id}</td>
                <td>${element.team_name}</td>
                <td>
                <input type="button" value="View" class="btn btn-success px-3" onclick="viewTeam(${element.id})">
                </td>
                <td><input type="button" value="Edit" class="btn btn-secondary px-3" onclick="editTeam(${element.id})"></td>
                <td>
                <input type="button" value="Delete" class="btn btn-danger px-3" onclick="teamDelete(${element.id})">
                </td > `;
        });
      }
    } else {
      dataadd = `<thead>
                  <th>FirstName</th>
                  <th>LastName</th>
                  <th>Email</th>
                  <th>Contact No</th>
                  <th>View Details</th>
                  <th>Edit Details</th>
                  </thead>`;
      if (data.result.length != 0) {
        let startindex = (currentpage - 1) * pagelimit;
        let endindex = Math.min(startindex + pagelimit, maxlength);
        data.result.slice(startindex, endindex).forEach((element) => {
          dataadd += `<tr>
                  <td>${element.first_name}</td>
                  <td>${element.last_name}</td>
                  <td>${element.email}</td>
                  <td>${element.contact}</td>
                  <td>
                  <input type="button" value="view" class="btn btn-success px-3" onclick="viewusers(${element.id})">
                  </td>
                  <td>
                  <input type="button" value="delete" class="btn btn-danger px-3" onclick="usersDeleteData(${element.id})">
                  </td>`;
        });
      }
    }
    document.getElementById(`${id}`).innerHTML = dataadd;
    if (maxlength > 5) {
      document.getElementById("pagination").innerHTML = `
      <input type="button" value="FirstPage" onclick="firstpage('${api}', '${id}')" class="btn btn-secondary px-2">
      <input type="button" value="Pervious" onclick="pervious('${api}', '${id}')" class="btn btn-secondary px-2">
      <span>${currentpage}</span>
      <input type="button" value="Next" onclick="next('${api}', '${id}')" class="btn btn-secondary px-2">
      <input type="button" value="LastPage" onclick="lastpage('${api}', '${id}')" class="btn btn-secondary px-2">`;
    }
  } catch (error) {
    console.log(error);
  }
};

// pagination
const firstpage = (api, id) => {
  currentpage = 1;
  fetchData(api, id);
};

const pervious = (api, id) => {
  if (currentpage > 1) {
    currentpage--;
    fetchData(api, id);
  }
};

const next = (api, id) => {
  if (currentpage < pagecount) {
    currentpage++;
    fetchData(api, id);
  }
};

const lastpage = (api, id) => {
  currentpage = pagecount;
  fetchData(api, id);
};

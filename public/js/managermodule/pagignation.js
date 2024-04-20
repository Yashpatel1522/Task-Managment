let pageLimit = 2;
let currentPage = 1;
let maxLength;
let pageCount;
let teamDataGlobal = [];

const pagignation = async (url) => {
  let teamData = await (await fetch(url)).json();
  teamDataGlobal = [...teamData.result];
  console.log(teamDataGlobal);
  maxLength = teamData.result.length;
  pageCount = Math.ceil(maxLength / pageLimit);
  let startIndex = (currentPage - 1) * pageLimit;
  let endIndex = Math.min(startIndex + pageLimit, maxLength);
  elements = teamDataGlobal.slice(startIndex, endIndex);
  getTeamDataGrid(elements);
  document.getElementById("current_page").innerHTML = `${currentPage}`;
};

const firstPage1 = () => {
  currentPage = 1;
  document.getElementById("current_page").innerHTML = `${currentPage}`;
  let startIndex = (currentPage - 1) * pageLimit;
  let endIndex = Math.min(startIndex + pageLimit, maxLength);
  elements = teamDataGlobal.slice(startIndex, endIndex);
  getTeamDataGrid(elements);
  document.getElementById("first").style.opacity = 0.5;
  document.getElementById("previous").style.opacity = 0.5;
  document.getElementById("next").style.opacity = 1;
  document.getElementById("last").style.opacity = 1;
};

const previous1 = () => {
  if (currentPage > 1) {
    currentPage--;
    document.getElementById("current_page").innerHTML = `${currentPage}`;
    let startIndex = (currentPage - 1) * pageLimit;
    let endIndex = Math.min(startIndex + pageLimit, maxLength);
    elements = teamDataGlobal.slice(startIndex, endIndex);
    getTeamDataGrid(elements);
    if (currentPage === 1) {
      document.getElementById("first").style.opacity = 0.5;
      document.getElementById("previous").style.opacity = 0.5;
    } else {
      document.getElementById("next").style.opacity = 1;
      document.getElementById("last").style.opacity = 1;
    }
  }
};

const next1 = () => {
  if (currentPage < pageCount) {
    currentPage++;
    document.getElementById("current_page").innerHTML = `${currentPage}`;
    let startIndex = (currentPage - 1) * pageLimit;
    let endIndex = Math.min(startIndex + pageLimit, maxLength);
    elements = teamDataGlobal.slice(startIndex, endIndex);
    getTeamDataGrid(elements);
    if (currentPage === pageCount) {
      document.getElementById("next").style.opacity = 0.5;
      document.getElementById("last").style.opacity = 0.5;
    } else {
      document.getElementById("first").style.opacity = 1;
      document.getElementById("previous").style.opacity = 1;
    }
  }
};

const lastPage1 = () => {
  currentPage = pageCount;
  document.getElementById("current_page").innerHTML = `${currentPage}`;
  let startIndex = (currentPage - 1) * pageLimit;
  let endIndex = Math.min(startIndex + pageLimit, maxLength);
  elements = teamDataGlobal.slice(startIndex, endIndex);
  getTeamDataGrid(elements);
  document.getElementById("first").style.opacity = 1;
  document.getElementById("previous").style.opacity = 1;
  document.getElementById("next").style.opacity = 0.5;
  document.getElementById("last").style.opacity = 0.5;
};

let pageLimit = 5;
let currentPage = 1;
let maxLength;
let pageCount;
let teamDataGlobal = [];
let arrayPagignation = [];
let startIndex;
let endIndex;

const pagignation = async (url) => {
  let teamData = await (await fetch(url)).json();
  teamDataGlobal = [...teamData.result];
  arrayPagignation = [...teamData.result];
  maxLength = teamData.result.length;
  pageCount = Math.ceil(maxLength / pageLimit);
  startIndex = (currentPage - 1) * pageLimit;
  endIndex = Math.min(startIndex + pageLimit, maxLength);
  elements = arrayPagignation.slice(startIndex, endIndex);
  document.getElementById("current_page").innerHTML = `${currentPage}`;
  if (teamData.result.length !== 0) {
    document.getElementById("nodata").style.display = "none";
    getDataGrid(elements);
    document.getElementById("current_page").style.display = "block";
  }
};

const firstPage1 = () => {
  currentPage = 1;
  document.getElementById("current_page").style.display = "block";
  document.getElementById("current_page").innerHTML = `${currentPage}`;
  startIndex = (currentPage - 1) * pageLimit;
  endIndex = Math.min(startIndex + pageLimit, maxLength);
  elements = arrayPagignation.slice(startIndex, endIndex);
  getDataGrid(elements);
  document.getElementById("first").style.opacity = "0.5";
  document.getElementById("previous").style.opacity = "0.5";
  document.getElementById("next").style.opacity = "1";
  document.getElementById("last").style.opacity = "1";
  document.getElementById("first").style.cursor = "none";
  document.getElementById("previous").style.cursor = "none";
  document.getElementById("next").style.cursor = "pointer";
  document.getElementById("last").style.cursor = "pointer";
};

const previous1 = () => {
  if (currentPage > 1) {
    currentPage--;
    document.getElementById("current_page").innerHTML = `${currentPage}`;
    startIndex = (currentPage - 1) * pageLimit;
    endIndex = Math.min(startIndex + pageLimit, maxLength);
    elements = arrayPagignation.slice(startIndex, endIndex);
    getDataGrid(elements);
    if (currentPage === 1) {
      document.getElementById("first").style.opacity = "0.5";
      document.getElementById("previous").style.opacity = "0.5";
      document.getElementById("next").style.opacity = "1";
      document.getElementById("last").style.opacity = "1";
      document.getElementById("first").style.cursor = "none";
      document.getElementById("previous").style.cursor = "none";
      document.getElementById("next").style.cursor = "pointer";
      document.getElementById("last").style.cursor = "pointer";
    } else {
      document.getElementById("first").style.cursor = "pointer";
      document.getElementById("previous").style.cursor = "pointer";
      document.getElementById("next").style.cursor = "pointer";
      document.getElementById("last").style.cursor = "pointer";
      document.getElementById("next").style.opacity = "1";
      document.getElementById("last").style.opacity = "1";
      document.getElementById("first").style.opacity = "1";
      document.getElementById("previous").style.opacity = "1";
    }
  }
};

const next1 = () => {
  if (currentPage < pageCount) {
    currentPage++;
    document.getElementById("current_page").innerHTML = `${currentPage}`;
    startIndex = (currentPage - 1) * pageLimit;
    endIndex = Math.min(startIndex + pageLimit, maxLength);
    elements = arrayPagignation.slice(startIndex, endIndex);
    getDataGrid(elements);
    if (currentPage === pageCount) {
      document.getElementById("next").style.opacity = "0.5";
      document.getElementById("last").style.opacity = "0.5";
      document.getElementById("next").style.cursor = "none";
      document.getElementById("last").style.cursor = "none";
      document.getElementById("first").style.opacity = "1";
      document.getElementById("previous").style.opacity = "1";
      document.getElementById("first").style.cursor = "pointer";
      document.getElementById("previous").style.cursor = "pointer";
    } else {
      document.getElementById("next").style.cursor = "pointer";
      document.getElementById("last").style.cursor = "pointer";
      document.getElementById("first").style.cursor = "pointer";
      document.getElementById("previous").style.cursor = "pointer";
      document.getElementById("next").style.opacity = "1";
      document.getElementById("last").style.opacity = "1";
      document.getElementById("first").style.opacity = "1";
      document.getElementById("previous").style.opacity = "1";
    }
  }
};

const lastPage1 = () => {
  currentPage = pageCount;
  document.getElementById("current_page").innerHTML = `${currentPage}`;
  startIndex = (currentPage - 1) * pageLimit;
  endIndex = Math.min(startIndex + pageLimit, maxLength);
  elements = arrayPagignation.slice(startIndex, endIndex);
  getDataGrid(elements);
  document.getElementById("first").style.cursor = "pointer";
  document.getElementById("previous").style.cursor = "pointer";
  document.getElementById("first").style.opacity = "1";
  document.getElementById("previous").style.opacity = "1";
  document.getElementById("next").style.opacity = "0.5";
  document.getElementById("last").style.opacity = "0.5";
  document.getElementById("next").style.cursor = "none";
  document.getElementById("last").style.cursor = "none";
};

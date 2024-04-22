const showComments = async () => {
  let href = window.location.pathname;
  let data = href.split("/")[3];
  pagignation(`${window.location.origin}/manager/getcomments/${data}`);
};

const getDataGrid = async (elements) => {
  let table = document.getElementById("comment-table");
  let dataadd = `<thead>
                <th>CommentId</th>
                <th>employee_name</th>
                <th>Task_Status</th>
                <th>Comment</th>
                <th>Attechments</th>
                </thead>`;
  elements.forEach((element) => {
    dataadd += `<tr>
                <th>${element.id}</th>
                <th>${element.first_name}</th>
                <th>${element.task_status}</th>
                <th>${element.comment}</th>
                <th><iframe src="../../public/assets/taskdetailfiles/${element.attechment}" title="W3Schools Free Online Web Tutorials">${element.attechment}</iframe></th>
            </tr>`;
  });

  table.innerHTML = dataadd;
};

const searchComments = async (value) => {
  let filterArray = [];
  if (value != "") {
    teamDataGlobal.forEach((element) => {
      for (let key in element) {
        let values = element[key].toString().toLowerCase();
        let status = values.includes(value.toString().toLowerCase());
        if (status) {
          filterArray.push(element);
        }
      }
    });
    console.log(filterArray);
    if (filterArray.length > pageLimit) {
      let startIndex = (currentPage - 1) * pageLimit;
      let endIndex = Math.min(startIndex + pageLimit, maxLength);
      let elements = filterArray.slice(startIndex, endIndex);
      getDataGrid(elements);
    } else {
      getDataGrid(filterArray);
    }
  } else {
    showteamdata();
  }
};

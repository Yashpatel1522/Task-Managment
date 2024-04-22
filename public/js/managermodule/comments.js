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
                <th>Confirm Status</th>
                </thead>`;
  elements.forEach((element) => {
    dataadd += `<tr>
                <td>${element.id}</td>
                <td>${element.first_name}</td>
                <td>${element.task_status}</td>
                <td>${element.comment}</td>
                <td><iframe src="../../public/assets/taskdetailfiles/${element.attechment}" title="W3Schools Free Online Web Tutorials">${element.attechment}</iframe></td>
        <button class="btn btn-primary" onclick="updateTaskStatus(${element.task_id},'${element.task_status}', ${element.employee_id})">View Comments</button>
                <td></td>
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

const updateTaskStatus = async (taskId, taskStatus, employeeId) => {
  let dataobj = {};
  dataobj.taskId = taskId;
  dataobj.taskStatus = taskStatus;
  dataobj.employeeId = employeeId;

  try {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success btn-gap",
        cancelButton: "btn btn-danger btn-gap",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, update it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          await fetch(`http://localhost:8000/manager/updateTaskStatus/`, {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataobj),
          });
          swalWithBootstrapButtons
            .fire({
              title: "Deleted!",
              text: "Your task has been updated.",
              icon: "success",
            })
            .then(async (result2) => {
              if (result2.isConfirmed) {
                showComments();
              }
            });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your date is safe :)",
            icon: "error",
          });
        }
      });
  } catch (error) {
    console.log(error);
  }
};

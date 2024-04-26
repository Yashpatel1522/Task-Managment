const showComments = async () => {
  let href = window.location.pathname;
  let data = href.split("/")[3];
  pagignation(`${window.location.origin}/manager/getcomments/${data}`);
};

const getDataGrid = async (elements) => {
  let table = document.getElementById("comment-table");
  let dataadd = `<thead>
                <th>CommentId</th>
                <th>Employee</th>
                <th>Task_Status</th>
                <th>Comment</th>
                <th>Attechments</th>
                </thead>`;
  // <th>Confirm Status</th>;
  elements.forEach((element) => {
    dataadd += `<tr>
                <td>${element.id}</td>
                <td>${element.first_name}</td>
                <td>${element.task_status}</td>
                <td>${element.comment}</td>
                ${
                  element.attechment == null
                    ? "<td> - </td>"
                    : ` <td><a href="
                  ${window.location.origin} +
                  /assets/taskdetailfiles/ 
                  ${element.attechment}
                " target="_blank">${element.attechment}</a></td>`
                }
                </tr>`;
    // <td>
    //   <button
    //     class="btn btn-primary"
    //     onclick="updateTaskStatus(${
    //       element.task_id
    //     },'${element.task_status}', ${
    //   element.employee_id
    // })"
    //   >
    //     Confirm Stutas
    //   </button>
    // </td>;
  });
  table.innerHTML = dataadd;
};

const searchComments = async (value) => {
  let filterArray = [];
  if (value.trim() === "") {
    filterArray = teamDataGlobal;
    searchPagignation(filterArray, 1);
    console.log(filterArray);
  } else if (value.trim()) {
    console.log(teamDataGlobal);
    teamDataGlobal.forEach((commentData) => {
      for (let key in commentData) {
        if (commentData[key] != null) {
          let values = commentData[key].toString().toLowerCase();
          let status = values.includes(value.toString().toLowerCase());
          if (status) {
            filterArray.push(commentData);
          }
        }
      }
    });
    if (filterArray.length > 0) {
      searchPagignation(filterArray, 1);
    } else {
      document.getElementById("comment-table").innerHTML = " ";
      document.getElementById("comment-table").innerHTML +=
        '<div class="alert alert-info"><strong>Comments not found</strong></div>';
    }
  }
};

const searchPagignation = (filterArray, currPage) => {
  arrayPagignation = [];
  for (let element of filterArray) {
    arrayPagignation.push(element);
  }
  maxLength = arrayPagignation.length;
  currentPage = currPage;
  startIndex = (currentPage - 1) * pageLimit;
  endIndex = Math.min(startIndex + pageLimit, maxLength);
  pageCount = Math.ceil(maxLength / pageLimit);
  let array = arrayPagignation.slice(startIndex, endIndex);
  getDataGrid(array);
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
              title: "Updated!",
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

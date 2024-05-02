const socket = io();

socket.on("msg2", async (data) => {
  let userData = await (await fetch("/employee/getUser")).json();
  data.AssignTaskTo.forEach((element) => {
    if (element == userData.user.id) {
      Swal.fire({
        title: ` you have assigned ${data.taskName} task`,
        icon: "info",
      });
    }
  });
  data.empOfTeam.forEach((element) => {
    if (element.emp_id == userData.user.id) {
      Swal.fire({
        title: ` you have assigned ${data.taskName} task`,
        icon: "info",
      });
    }
  });
});


// NOTIFICATION of employee due date task 



const fetchNotificationData = async () => {
  try {
    await fetch(`/employee/notification`, {
      method: "get", // *GET, POST, PUT, DELETE, etc.
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (typeof data !== "undefined") {
          socket.emit("notification-data", {
            data: data,
          });
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  } catch (error) {
    console.log(error);
  }
  socket.on(`send-notification-data`, (data) => {
    let notificatiodata = "";
    if (data.data.length != 0) {

      data.data.forEach((element) => {
        notificatiodata += `<h3>Today is due date of <b>${element.task_name}</b> task<h3>`;
      });
    } else {
      notificatiodata += "<h3>There is no due date of any task today</h3>";
    }

    Swal.fire({
      title: ` ${notificatiodata}`,
      icon: "info",
    });
  });
};







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

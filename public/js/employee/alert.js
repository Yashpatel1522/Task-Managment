const socket = io();

socket.on("msg2", async (data) => {
  let userData = await (await fetch("/employee/getUser")).json();
  data.AssignTaskTo.forEach((element) => {
    if (element == userData.user.id) {
      alert(`your have assigned ${data.taskName}`);
    }
  });
});

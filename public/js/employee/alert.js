const socket = io();

socket.on("msg2", (data) => {
  alert("your have assigned" + data.taskName);
  console.log("recieved");
  console.log(data.AssignTaskTo);
  console.log(data.managerId);
  console.log(data.taskName);
});

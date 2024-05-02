const socket = io();

const getUser = async () => {
  let user = await (await fetch("/login/user")).json();
  if (user.id != undefined) {
    document.getElementById("sender_id").value = user.id;

    let email = window.location.href.split("/").pop();
    formdata = new FormData();
    formdata.append("email", email);
    let response1 = await fetch("/admin/checkuseremail", {
      method: "POST",
      body: new URLSearchParams(formdata),
      headers: { "context-type": "application/x-www-form-urlencoded" },
    });
    let result1 = await response1.json();
    if (result1.flag == true) {
      const msg = document.getElementById("msg");
      document.getElementById("zone").innerHTML = "";
      document.getElementById(
        "msg-zone"
      ).innerHTML += `<div id="sender-msg" class="d-flex align-items-end flex-column">
                  <p class="alert alert-info p-3" style="width:fit-content;">${msg.value}</p>
                </div>`;
      document.getElementById("reciver_id").value = result1.msg;
      const data = new URLSearchParams(
        new FormData(document.getElementById("socket-form"))
      );
      let response = await fetch("/admin/socket", {
        method: "POST",
        body: data,
        headers: { "context-type": "application/x-www-form-urlencoded" },
      });
      const result = await response.json();
      if (result.flag == true) {
        alert("yes");
        // document.getElementById("msg-zone").scroll=document.getElementById("msg-zone").scrollHeight;
        socket.emit("recmsg", {
          msg: msg.value,
          senderId: user.id,
          reciverId: result1.msg,
        });
      }
    }
    document.getElementById("msg").value = "";
  }
};

socket.on(`sendmsg`, async (data) => {
  if (document.getElementById("reciver_id").value == data.senderId) {
    document.getElementById("msg-zone").innerHTML += "";
    document.getElementById(
      "msg-zone"
    ).innerHTML += `<div id="recver-msg" class="d-flex align-items-start flex-column">
                    <p class="alert alert-info p-3" style="width:fit-content;">${data.msg}</p>
                  </div>`;

    // document.getElementById("msg-zone").scroll=document.getElementById("msg-zone").scrollHeight;
  }
});

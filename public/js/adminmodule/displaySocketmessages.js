displaymessages = async () => {
  let email = window.location.href.split("/").pop();
  formdata = new FormData();
  formdata.append("email", email);
  let response = await fetch("/admin/checkuseremail", {
    method: "POST",
    body: new URLSearchParams(formdata),
    headers: { "context-type": "application/x-www-form-urlencoded" },
  });
  let result = await response.json();
  if (result.flag == true) {
    let user = await (await fetch("/login/user")).json();
    if (user.id != undefined) {
      let formdata = new FormData();
      formdata.append("sender_id", user.id);
      formdata.append("reciver_id", result.msg);
      let response = await fetch("/admin/messagedisplay", {
        method: "POST",
        body: new URLSearchParams(formdata),
        headers: { "context-type": "application/x-www-form-urlencoded" },
      });
      result = await response.json();
      let displaymasseges = document.getElementById("msg-zone");
      displaymasseges.innerHTML = "";
      if (result.flag == true) {
        result.data.forEach((msg) => {
          if (user.id == msg.sender_id) {
            displaymasseges.innerHTML += `<div id="sender-msg" class="d-flex align-items-end flex-column">
            <p class="alert alert-info p-3" style="width: fit-content">${msg.content}</p>
          </div>`;
          } else {
            displaymasseges.innerHTML += `<div id="recver-msg" class="d-flex align-items-start flex-column">
              <p class="alert alert-info p-3" style="width: fit-content">${msg.content}</p>
            </div>`;
          }
        });
      } else {
        document.getElementById("zone").innerHTML = "";
        document.getElementById(
          "zone"
        ).innerHTML = `<div class="position-absolute top-50 start-50 translate-middle"><img src="/assets/loginmodule/msgerror.jpg" height="500" ></div>`;
      }
    } else {
      window.location.href = "/admin/messages";
    }
  } else {
    window.location.href = "/admin/messages";
  }
};

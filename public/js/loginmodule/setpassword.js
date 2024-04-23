const isValidSetPassword = async () => {
  if (isValidPassword()) {
    let acticationCode = window.location.href.split("/").pop();
    const form = document.getElementById("set_password");
    let data = new URLSearchParams(new FormData(form));
    let url = `/login/newpassword/${acticationCode}`;
    let res = await fetch(url, {
      method: "post",
      body: data,
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    });
    console.log(res);
    res = await res.json();
    console.log(res);
    if (res.flag == false) {
      Swal.fire({
        title: "Oops...",
        text: res.msg,
        icon: "error",
      });
    } else if (res.flag == true && res.source == "1") {
      Swal.fire({
        title: "Good job!",
        text: res.msg,
        icon: "success",
        // confirmButtonText:"ok"
      }).then((res) => {
        if (res.isConfirmed) {
          window.location.href = "/";
        }
      });
    }
  }
};

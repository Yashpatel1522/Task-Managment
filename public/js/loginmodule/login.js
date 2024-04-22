const isLogin = async () => {
  if (isValidLogin) {
    const form = document.getElementById("login_form");
    let data = new URLSearchParams(new FormData(form));
    let url = "/login/";
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
    } else if (res.flag == true) {
      Swal.fire({
        title: "Good job!",
        text: res.msg,
        icon: "success",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = window.location.href.replace(
            "/login/",
            res.url
          );
        }
      });
    }
  }
};

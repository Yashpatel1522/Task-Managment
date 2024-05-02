const isValidForget = async () => {


  const form = document.getElementById('forget_password')
  let data = new URLSearchParams(new FormData(form))
  let url = '/login/forget'
  let res = await fetch(url, {
    method: 'post',
    body: data,
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    }
  })
  res = await res.json();
  let error = document.getElementById("error")
  if (res.flag == false) {
    error.style.display = "block"
    error.innerHTML = res.msg
  }
  else {
    url = `/login/newpassword/${res.activationkey}`
    error.style.display = "block"
    error.className = "alert alert-success text-center"
    Swal.fire({
      title: "Auto close alert!",
      html: `Change Your Password?<br>Activation Key:${res.activationkey}<br><p id='time' class='text-danger'></p>`,
      icon: "success",
      showConfirmButton: false,
      footer: `<a href="${url}">Click Me</a>`
    });
    timer("time", 120)
  }
}

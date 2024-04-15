//id and other changes will be required
const isRegistration = async () => {
    if (isValidRegistration()) {
        const form = document.getElementById('registration-form')
        let data = new URLSearchParams(new FormData(form))
        let url = '/login/registration'
        let res = await fetch(url, {
            method: 'post',
            body: data,
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        })
        console.log(res)
        res = await res.json();
        console.log(res)
        if (res.flag == false) {
            Swal.fire({
                title: "Oops...",
                text: res.msg,
                icon: "error"
            });
        }
        else {
            Swal.fire({
                title: "Good job!",
                text: res.msg,
                icon: "success"
            });
            // location.href=`/main-login-project/dashboard/${res.id}` 
        }
    }

}


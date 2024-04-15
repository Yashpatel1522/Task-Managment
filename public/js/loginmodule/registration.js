//id and other changes will be required
const isRegistration = async () => {
    if (isValidRegistration()) {
        // let FormData = new FormData();
        let role=document.getElementById('user_role').value;
        let first_name=document.getElementById('first_name').value;
        let last_name=document.getElementById('last_name').value;
        let email=document.getElementById('email').value;
        let contact=document.getElementById('contact').value;
        let date_of_birth=document.getElementById('date_of_birth').value;
        let employee_role=document.getElementById('employee_role').value;
        let img=document.getElementsByName('img')[0].files[0];

        let formdata=new FormData()
        formdata.append("role_id",role)
        formdata.append("first_name",first_name)
        formdata.append("last_name",last_name)
        formdata.append("email",email)
        formdata.append("contact",contact)
        formdata.append("date_of_birth",date_of_birth)
        formdata.append("employee_role",employee_role)
        formdata.append("img",img)
        console.log(formdata)
        // const form = document.getElementById('registration-form')
        // let data = new URLSearchParams(new FormData(form))
        let url = '/login/registration'
        let res = await fetch(url, {
            method: 'post',
            body: formdata,
            // headers: {
            //     'content-type': 'application/x-www-form-urlencoded'
            // }
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


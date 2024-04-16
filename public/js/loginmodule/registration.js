
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
        let error=document.getElementById("error")
        if (res.flag == false) {
            console.log(error)
            error.style.display="block"
            error.innerHTML=res.msg
        }
        else {
            let url=`/login/newpassword/${res.activationkey}`
            error.style.display="block"
            error.className="alert alert-success text-center"
            closePopup()
            Swal.fire({
                title: "Auto close alert!",
                html:`register Success<br>Activation Key:${res.activationkey}<br><p id='time' class='text-danger'></p>`,
                icon:"success",
                showConfirmButton:false,
                footer:`<a href="${url}">Click Me</a>`    
              });
            timer("time",120)
        }
    }

}

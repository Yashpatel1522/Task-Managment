const isLogin=async()=>{

    const form=document.getElementById('login_form')
    let data=new URLSearchParams(new FormData(form))
    let url='/login/'
    let res=await fetch(url,{   
        method:'post',
        body:data,
        headers:{
            'content-type':'application/x-www-form-urlencoded'
        }  
    })
    console.log(res)
    res=await res.json();
    console.log(res)
    if(res.flag==false)
        {
            Swal.fire({
                title: "Oops...",
                text: res.msg,
                icon: "error"
              });
        }
        else
        {
            Swal.fire({
                title: "Good job!",
                text: res.msg,
                icon: "success"
              });
        }
}


function requireValidation(allfields, reqfields) {
    let flag = true;
    for (var i = 0; i < reqfields.length; i++) {
      if (reqfields[i].value.trim().length === 0) {
        allfields[i].innerHTML = "* required";
        flag = false;
      }
    }
    return flag;
}
  
function onReset() {
    document.getElementById("taskForm").reset();
}

function DataINsertedSuccessfully() {
    Swal.fire({
        title: "Done",
        text: "Task inserted Succesfully",
        icon: "success",
    }).then(function(){
        window.location.href = '/manager/'
    });
}
  
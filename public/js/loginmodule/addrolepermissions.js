const addPermissions = async () => {  
  const isChecked = Array.from(document.getElementsByName('permissions')).map(node=>node.checked);
  if(isChecked.indexOf(true) < 0){
    Swal.fire({
      title: 'ERROR',
      text: 'Please select permissions...',
      icon: 'error',
    });
  }

  const rolePermissionData = new URLSearchParams(new FormData(document.getElementById("addRolePermissionForm")));
  let response = await fetch("/login/updatepermissions", {
    method: "POST",
    body: rolePermissionData,
    headers: {
      'Content-Type': "application/x-www-form-urlencoded",
    }
  })
  const result = await response.json();
  if(response.status == 200){
    Swal.fire({
      title: 'Success...',
      text: result.message,
      icon: 'success',
    });
  }
  else{
    Swal.fire({
      title: 'Opps...',
      text: result.message,
      icon: 'error',
    });
  }
}
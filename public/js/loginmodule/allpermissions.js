// const createTable = (data, id, ischecked) => {
//   let count =1;
//   const table = document.getElementById(id);
//   let cells = document.querySelectorAll(`#${id} tbody tr td`);
//   cells.forEach(cell => {
//     cell.remove();
//   })
//   data.forEach(permission => {
//     const tr= document.createElement("tr").innerHTML = `
//     <td class='text-center'>${count++}</td>
//     <td class='text-center'>${permission.permission_name}</td>
//     <td class='text-center'>${permission.api_url}</td>
//     <td class='text-center'>${permission.method}</td>
//     <td class='text-center'>${permission.create_at}</td>
//     <td class='text-center'><input type='checkbox' value='${permission.id}' oninput='updatePermission(this)' ${permission.is_delete == 0 && ischecked == 1?'checked':null}></td>
//     `
//     table.innerHTML += tr;
//   });
// }

// const displayPermission = async(roleName) => {
//   const response = await fetch(`/kartezy/rolepermission/getPermissions/${roleName}`);
//   let result = await response.json();
//   if(response.status == 200){
//     createTable(result.message, "displayRolePermission", 1);
//   }
//   else{
//     Swal.fire({
//       title: 'Opps...',
//       text: result.message,
//       icon: 'error',
//     });
//   }
// }

const displayAllPermissions = async () => {
  const response = await fetch(`/login/allpermissions`);
  let result = await response.json();
  console.log(result);
  if (result.length > 0) {
    let count = 1;
    const table = document.getElementById("displaypermissions");
    let cells = document.querySelectorAll(`#displaypermissions tbody tr td`);
    cells.forEach((cell) => {
      cell.remove();
    });
    result.forEach((permission) => {
      const tr = (document.createElement("tr").innerHTML = `
      <td class='text-center'>${count++}</td>
      <td class='text-center'>${permission.permission}</td>
      <td class='text-center'>${permission.api}</td>
      <td class='text-center'>${permission.type}</td>
      <td class='text-center'>${permission.create_at}</td>
      <td class='text-center'><input type='checkbox' name='permissions' value='${
        permission.id
      }'></td>
      `);
      table.innerHTML += tr;
    });
  } else {
    Swal.fire({
      title: "Opps...",
      text: "data Not Found",
      icon: "error",
    });
  }
};

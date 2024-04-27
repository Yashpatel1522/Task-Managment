
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

var comboTeamEmployees = async () => {
  try {
    let data = await (await fetch(`/admin/employeesapi`)).json();
    let empcombo = document.getElementById("emp_select");
    data.result.forEach(data => {
      let option = document.createElement("option");
      option.setAttribute("value", `${data.id}`);
      option.setAttribute("id", `${data.id}`);
      option.textContent = `${data.first_name} ${data.last_name}`;
      empcombo.appendChild(option);
    });
  } catch (error) {
    console.log(error);
  }
}
comboTeamEmployees();

var notTeamEmployees = async (id) => {
  try {
    let data = await (await fetch(`/admin/teamapi/${id}`)).json();
    let empcombo = document.getElementById("emp_select");
    data.notSelectedEmp.forEach(data => {
      let option = document.createElement("option");
      option.setAttribute("value", `${data.id}`);
      option.setAttribute("id", `${data.id}`);
      option.textContent = `${data.first_name} ${data.last_name}`;
      empcombo.appendChild(option);
    });
  } catch (error) {
    console.log(error);
  }
}

var isTeamForm = () => {
  try {
    let err = true;
    let team_Name = document.getElementById("team_name").value;
    if (team_Name.trim().length === 0) {
      document.getElementById("tnameerr").style.color = "Red"
      document.getElementById("tnameerr").innerHTML = "* required";
      err = false;
    }
    let selectvalue = document.getElementById("emp_select").value;
    if (selectvalue == 0) {
      document.getElementById("toptionerr").style.color = "Red"
      document.getElementById("toptionerr").innerHTML = "* required";
      err = false;
    }
    return err;
  } catch (error) {
    console.log(error);
  }
}
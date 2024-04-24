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

var isTeamForm = () => {
  try {
    let err = true;
    if (document.getElementById("team_name").value.trim().length === 0) {
      document.getElementById("tnameerr").style.color = "Red"
      document.getElementById("tnameerr").innerText = "* required"
      err = false;
    } else {
      document.getElementById("tnameerr").innerText = ""
      err = true;
    }
    if (document.getElementById("emp_select").value == 0) {
      document.getElementById("toptionerr").style.color = "Red"
      document.getElementById("toptionerr").innerHTML = "* required";
      err = false;
    } else {
      document.getElementById("toptionerr").innerHTML = "";
      err = true;
    }
    return err;
  } catch (error) {
    console.log(error);
  }
}



var isTeamSubmit = async () => {
  try {
    if (isTeamForm()) {
      let team_name = document.getElementById("team_name").value;
      let memberArray = [];
      let team_member = document.getElementById("emp_select");
      for (i = 0; i < team_member.options.length; i++) {
        if (team_member.options[i].selected) {
          memberArray.push(team_member.options[i].value);
        }
      }
      let team_form_data = new FormData()
      team_form_data.append("team_name", team_name);
      team_form_data.append("member_id", memberArray);

      let res = await fetch('http://localhost:8000/admin/newteam', {
        method: 'post',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(team_form_data),
      })

      let result = await res.json();
      if (result.status === 500) {
        Swal.fire({
          icon: "success",
          title: "Team Added!",
          text: result.msg
        }).then(async (result2) => {
          if (result2.isConfirmed) {
            window.location.reload();
          }
        });
      } else {
        Swal.fire({
          title: "Error",
          text: result.msg,
          icon: "error"
        }).then(errorres => {
          if (errorres.isConfirmed) {
            window.location.reload();
          }
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
}


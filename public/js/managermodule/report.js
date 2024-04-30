async function loadProf() {
  let profData = await (await fetch('/manager/getManagerProfile/2')).json();

  if(profData.imageResult && profData.result) {
    document.getElementById('profImg').src = `/assets/userprofiles/${profData.imageResult[0].newimage_name}`;
    document.getElementById('userName').innerText = `${profData.result[0].first_name}`+" "+`${profData.result[0].last_name}`;
  }

  let url = window.location.origin + `/manager/getReportData`;
  let response = await fetch(url);
  let data = await response.json();
  console.log(data);
  let str = ``;
  if (data.employeeRes) {
    let count = 0;
    for (let i = 0; i < Math.ceil(data.employeeRes.length / 3); i++) {
      str += `<div class="row pb-3">`;
      for (let j = 0; j < 3; j++) {
        if (data.employeeRes[count]) {
          str += `
                    <div class="col-4 ">
                        <div class="card" style="width: 100%;">
                            <img src="" class="card-img-top" alt="">
                            <div class="card-body bg-light cardview" style="border-radius: 10px;">
                                <h5 class="card-title textview" style="font-size: 25px;">${data.employeeRes[count].first_name} ${data.employeeRes[count].last_name}</h5>
                                <br>
                                <p class="card-text textview"><b>Email - </b>${data.employeeRes[count].email}</p>
                                <p class="card-text textview"><b>Productivity Ratio - </b>${data.reportData[count]}%</p>
                                <button class="btn btn-primary btnview" style = "background-color:#0A1828; margin-top:15px" onclick="getReport(${data.employeeRes[count].id})">Download</button>
                            </div>
                        </div>
                    </div>
                    `;
          count++;
        }
      }
      str += `</div>`;
    }
  }

  document.getElementById('employeeReport').innerHTML = str;

}

async function getReport(id) {
  alert(id)
}

let flag = true;

const showOption = async () => {
  if (
    document.getElementById("profClk").style.display == "none" ||
    document.getElementById("profClk").style.display == ""
  ) {
    document.getElementById("profClk").style.display = "block";
  } else {
    document.getElementById("profClk").style.display = "none";
  }
  flag = false;
};


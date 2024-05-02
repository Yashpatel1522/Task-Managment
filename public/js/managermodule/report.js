async function loadProf() {
  let profData = await (await fetch('/manager/getManagerProfile/2')).json();

  if(profData.imageResult && profData.result) {
    document.getElementById('profImg').src = `/assets/userprofiles/${profData.imageResult[0].newimage_name}`;
    document.getElementById('userName').innerText = `${profData.result[0].first_name}`+" "+`${profData.result[0].last_name}`;
  }

  let url = window.location.origin + `/manager/getReportData`;
  let response = await fetch(url);
  let data = await response.json();
  let str = ``;
  if (data.employeeRes) {
    let count = 0;
    for (let i = 0; i < Math.ceil(data.employeeRes.length / 3); i++) {
      str += `<div class="row pb-3">`;
      for (let j = 0; j < 3; j++) {
        if (data.employeeRes[count]) {
          if(!data.reportData[count]) {
            data.reportData[count] = '0.00'
          }
          str += `
                    <div class="col-4 ">
                        <div class="card" style="width: 100%;">
                            <img src="" class="card-img-top" alt="">
                            <div class="card-body bg-light cardview" style="border-radius: 10px;">
                                <h5 class="card-title textview" style="font-size: 25px;">${data.employeeRes[count].first_name} ${data.employeeRes[count].last_name}</h5>
                                <br>
                                <p class="card-text textview"><b>Email - </b>${data.employeeRes[count].email}</p>
                                <p class="card-text textview"><b>Productivity Ratio - </b>${data.reportData[count]}%</p>
                                <button class="btn btn-primary btnview" style = "background-color:#0A1828; margin-top:15px" onclick="getReport(${data.employeeRes[count].id})">Generate</button>
                                <div id="${data.employeeRes[count].id}"></div>
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
  
  let name =  await (await fetch(`/manager/getPdfData?id=${id}`)).json();
  let timerInterval;
  await Swal.fire({
    title: "PDF is Being Generated",
    html: "It will close in <b></b> milliseconds.",
    timer: 2000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
      const timer = Swal.getPopup().querySelector("b");
      timerInterval = setInterval(() => {
        timer.textContent = `${Swal.getTimerLeft()}`;
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    }
  });

  Swal.fire({
    html: `<embed src="/assets/pdfs/${name.filename}" style="height: 600px; width: 100%">`,
    // icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, download it!"
  }).then(async (result) => {
    if (result.isConfirmed) {
      window.open(`/assets/pdfs/${name.filename}`, '_blank');
    }
    else {
      window.location.href = `/manager/deletePdf?name=${name.filename}`;
    }
  });



}
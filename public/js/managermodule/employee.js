async function setData() {
    let url = window.location.origin+`/manager/getEmployees`
	let response = await fetch(url);
    let data = await response.json();
    let str = ``;
    if(data.result) {
        let count =0;
        for(let i=0; i<Math.ceil(data.result.length/3); i++) {
            str += `<div class="row pb-3">`;
            for(let j=0; j<3; j++) {
                if(data.result[count]) {
                    console.log(data.result[count].last_name);
                    str+=`
                    <div class="col-4">
                        <div class="card" style="width: 100%;">
                            <img src="" class="card-img-top" alt="">
                            <div class="card-body bg-light" style="border-radius: 10px;">
                                <h5 class="card-title">${data.result[count].first_name} ${data.result[count].last_name}</h5>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <a href="#" class="btn btn-primary">View More</a>
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
    document.getElementsByClassName('employeeList')[0].innerHTML = str
}

async function getProfile() {
    let url = window.location.origin + '/manager/getManagerProfile';
    let response = await fetch(url);
    let data = await response.json();
	document.getElementById('id').value = data.result[0].id;
	document.getElementById('firstname').value = data.result[0].first_name;
	document.getElementById('lastname').value = data.result[0].last_name;
	document.getElementById('email1').value = data.result[0].email;
	document.getElementById('phone_input').value = data.result[0].contact;
	document.getElementById('dob_input').value = data.result[0].date_of_birth;
}

function profOption() {
	document.getElementById('profClk').style.display = 'block';
}

function remOption() {
	document.getElementById('profClk').style.display = 'none';
}

function showNotifications() {
    Swal.fire({
		title: "Notifications",
		text: "You clicked the button!",
		icon: "success"
	});
}
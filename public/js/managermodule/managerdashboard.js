async function getData() {
	
	let url = window.location.origin+`/manager/getManagerTaskCount`
	let response = await fetch(url);
	let data = await response.json();
	document.getElementsByClassName('count')[0].innerText = data.todoResult[0].count;
	document.getElementsByClassName('count')[1].innerText = data.progressResult[0].count;
	document.getElementsByClassName('count')[2].innerText = data.compleatedResult[0].count;
}

async function getProfile() {
    let url = window.location.origin + '/manager/getManagerProfile';
    let response = await fetch(url);
    let data = await response.json();

	let spanEle = document.getElementsByClassName('msg');
	Object.keys(spanEle).forEach(element => {
		spanEle[element].innerText = ``;
	});
	document.getElementById('imgMsg').innerText = ``;

	document.getElementById('id').value = data.result[0].id;
	document.getElementById('firstname').value = data.result[0].first_name;
	document.getElementById('lastname').value = data.result[0].last_name;
	document.getElementById('email1').value = data.result[0].email;
	document.getElementById('phone_input').value = data.result[0].contact;
	document.getElementById('dob_input').value = data.result[0].date_of_birth;

	console.log();
	if(data.imageResult[0]) {
		document.getElementById('selectedImage').src = `/assets/userprofiles/${data.imageResult[0].newimage_name}`
	}
}

function showNotifications() {
	Swal.fire({
		title: "Notifications",
		text: "You clicked the button!",
		icon: "success"
	});
}

function profOption() {
	document.getElementById('profClk').style.display = 'block';
}

function remOption() {
	document.getElementById('profClk').style.display = 'none';
}

//pop-up js of addtask.ejs
let popup = document.getElementById('popup');

function openPopup(){
  popup.classList.add("open-popup");
}

function closePopup(){
  popup.classList.remove("open-popup");
}


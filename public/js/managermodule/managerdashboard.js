async function getData() {
	
	let url = window.location.origin+`/manager/getManagerTaskCount`
	let response = await fetch(url);
	let data = await response.json();
	document.getElementsByClassName('count')[0].innerText = data.todoResult[0].count;
	document.getElementsByClassName('count')[1].innerText = data.progressResult[0].count;
	document.getElementsByClassName('count')[2].innerText = data.compleatedResult[0].count;
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


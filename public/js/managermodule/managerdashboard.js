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

function requireValidation(allfields,reqfields){
	let flag = true;
	for (var i = 0; i < reqfields.length; i++) {
		if (reqfields[i].value.trim().length === 0) {
				allfields[i].innerHTML = "* required";
				flag = false
			}}
			return flag;
}

function dateValidation(date){
	let flag = true;
	const validdob = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/gm;
	if(date.trim().length === 0){
	document.getElementById('dateerr2').innerHTML = "* required";
		flag = false
}
else if (!validdob.test(date) ) {
	document.getElementById('dateerr2').innerHTML = "Please enter valid date";
	flag = false
} 
return flag;
}

function addTaskValidation(){
	let err = true;
	const allfields = document.querySelectorAll('.errclass');
  const reqfields = document.querySelectorAll('.reqfieled');
	const startdate = document.getElementById('task_start_date').value;
	const enddate = document.getElementById('task_end_date').value;
	if(!requireValidation(allfields,reqfields)){
		err = false;
	}
	if(!dateValidation(startdate)){
		err = false;
	}
	if(!dateValidation(enddate)){
		err = false;
	}
    
	return err;
}

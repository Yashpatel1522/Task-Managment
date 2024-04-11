function addUserList()
{
    console.log("hii");
	fetch('http://localhost:8000/getdataapi',
        {
            method: "get", // *GET, POST, PUT, DELETE, etc.
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*'
            }
        })
        .then(response => {
            // if (!response.ok) {
            //     throw new Error('Network response was not ok');
            // }
            return response.json();
        })
        .then(data => {
            console.log('Data received:', data);
            employeeDynamicCombo(data.empdata);
            catagoryDynamicCombo(data.categorydata);
            importantLevelCombo(data.importancyData);
            urgencyLevelCombo(data.urgencyData)
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });

}
addUserList()


// dataobj.empdata = empdata;
//     dataobj.categorydata = categorydata;
//     dataobj.urgencyData = urgencyData;
//     dataobj.importancyData = importancyData;

function employeeDynamicCombo(data) {
	let empcombo = document.getElementById('Assin_task_to');
	for (var i = 0; i < data.length; i++) {
            let option = document.createElement('option');
			option.setAttribute('value', `${data[i].first_name}`);
			option.setAttribute('id', `${data[i].id}`);
			option.textContent = `${data[i].first_name}`;
			empcombo.appendChild(option);
	}

}

function catagoryDynamicCombo(data){
    let categoryCombo = document.getElementById('task_category');
	for (var i = 0; i < data.length; i++) {
            let option = document.createElement('option');
			option.setAttribute('value', `${data[i].category}`);
			option.setAttribute('id', `${data[i].id}`);
			option.textContent = `${data[i].category}`;
			categoryCombo.appendChild(option);
	}
}

function importantLevelCombo(data){
    let importantCombo = document.getElementById('impotant_level');
	for (var i = 0; i < data.length; i++) {
            let option = document.createElement('option');
			option.setAttribute('value', `${data[i].type}`);
			option.setAttribute('id', `${data[i].id}`);
			option.textContent = `${data[i].type}`;
			importantCombo.appendChild(option);
	}
}

function urgencyLevelCombo(data){
    let urgencyCombo = document.getElementById('urgency_level');
	for (var i = 0; i < data.length; i++) {
            let option = document.createElement('option');
			option.setAttribute('value', `${data[i].type}`);
			option.setAttribute('id', `${data[i].id}`);
			option.textContent = `${data[i].type}`;
			urgencyCombo.appendChild(option);
	}
}
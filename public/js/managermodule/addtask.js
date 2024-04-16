
function requireValidation(allfields, reqfields) {
    let flag = true;
    for (var i = 0; i < reqfields.length; i++) {
        if (reqfields[i].value.trim().length === 0) {
            allfields[i].innerHTML = "* required";
            flag = false
        }
    }
    return flag;
}

function addTaskValidation() {
    let err = true;
    const validdob = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/gm;
    const allfields = document.querySelectorAll('.errclass');
    const reqfields = document.querySelectorAll('.reqfieled');
    const reqselect = document.querySelectorAll('.reqselect');
    const reqselecterr = document.querySelectorAll('.reqselecterr');
    const startdate = document.getElementById('task_start_date').value;
    const enddate = document.getElementById('task_end_date').value;
    if (!requireValidation(allfields, reqfields)) {
        err = false;
    }

    for (let i = 0; i < reqselect.length; i++) {
        if (reqselect[i].value == 0) {
            reqselecterr[i].innerHTML = "* required";
            err = false
        }
    }
    if (startdate.trim().length === 0) {
        document.getElementById('dateerr').innerHTML = "* required";
        err = false
    }
    else if (!validdob.test(startdate)) {
        document.getElementById('dateerr').innerHTML = "Please enter valid date";
        err = false
    }
    if (enddate.trim().length === 0) {
        document.getElementById('dateerr2').innerHTML = "* required";
        err = false
    }
    // else if(!validdob.test(enddate)) {
    //     document.getElementById('dateerr2').innerHTML = "Please enter valid date";
    //     err = false
    // }

    return err;
}

function addUserList() {
    try {
        fetch(`${window.location.origin}/manager/getdataapi`,
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
    } catch (error) {
        console.log(error);
    }
}
addUserList()


function employeeDynamicCombo(data) {
    let empcombo = document.getElementById('Assin_task_to');
    for (var i = 0; i < data.length; i++) {
        let option = document.createElement('option');
        option.setAttribute('value', `${data[i].id}`);
        option.setAttribute('id', `${data[i].id}`);
        option.textContent = `${data[i].first_name}`;
        empcombo.appendChild(option);
    }

}

function catagoryDynamicCombo(data) {
    let categoryCombo = document.getElementById('task_category');
    for (var i = 0; i < data.length; i++) {
        let option = document.createElement('option');
        option.setAttribute('value', `${data[i].id}`);
        option.setAttribute('id', `${data[i].id}`);
        option.textContent = `${data[i].category}`;
        categoryCombo.appendChild(option);
    }
}

function importantLevelCombo(data) {
    let importantCombo = document.getElementById('impotant_level');
    for (var i = 0; i < data.length; i++) {
        let option = document.createElement('option');
        option.setAttribute('value', `${data[i].id}`);
        option.setAttribute('id', `${data[i].id}`);
        option.textContent = `${data[i].type}`;
        importantCombo.appendChild(option);
    }
}

function urgencyLevelCombo(data) {
    let urgencyCombo = document.getElementById('urgency_level');
    for (var i = 0; i < data.length; i++) {
        let option = document.createElement('option');
        option.setAttribute('value', `${data[i].id}`);
        option.setAttribute('id', `${data[i].id}`);
        option.textContent = `${data[i].type}`;
        urgencyCombo.appendChild(option);
    }
}



function insertTaskData() {
    // let err = addTaskValidation()
    // if (err === true) {
        let Taskdata = {};
        let formTd = document.forms.taskForm;
        let formData = new FormData(formTd);
        let selectedArray = new Array();
        let count = 0;
        let usres = document.getElementById('Assin_task_to');
        for (i = 0; i < usres.options.length; i++) {
            if (usres.options[i].selected) {
                selectedArray[count] = usres.options[i].value;
                count++;
            }
        }

        for (let [key, value] of formData) {
            Taskdata[key] = value;
        }
        Taskdata.emp_id = selectedArray;
        try {
            fetch(`${window.location.origin}/manager/inserttask`, {
                method: "post", // *GET, POST, PUT, DELETE, etc.
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(Taskdata)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Data received:', data);
                    serverValidation(data);
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });
        } catch (error) {
            console.log(error);
        // }

    }

}

function onReset() {
    document.getElementById("taskForm").reset();
}

function serverValidation(data){
    if(typeof data.task_name_err !== "undefined"){
        document.getElementById('tnerr').innerHTML = data.task_name_err;
    }
    if(typeof data.Assin_task_to_err !== "undefined"){
        document.getElementById('aterr').innerHTML = data.Assin_task_to_err;
    }
    if(typeof data.task_status_err !== "undefined"){
        document.getElementById('tserr').innerHTML = data.task_status_err
    }
    if(typeof data.task_category !== "undefined"){
        document.getElementById('cterr').innerHTML = data.task_category
    }
    if(typeof data.start_date_err !== "undefined"){
        document.getElementById('dateerr').innerHTML = data.start_date_err
    }
    if(typeof data.end_date_err !== "undefined"){
        document.getElementById('dateerr2').innerHTML = data.end_date_err
    }
    if(typeof data.description_err !== "undefined"){
        document.getElementById('descriptionserr').innerHTML = data.description_err 
    }
    if(typeof data.impotant_level_err !== "undefined"){
        document.getElementById('ilerr').innerHTML = data.impotant_level_err
    }
    if(typeof data.urgency_level_err !== "undefined"){
        document.getElementById('ulerr').innerHTML = data.urgency_level_err
    }
}


function DataINsertedSuccessfully() {
	Swal.fire({
		title: "Notifications",
		text: "You clicked the button!",
		icon: "success"
	});
}


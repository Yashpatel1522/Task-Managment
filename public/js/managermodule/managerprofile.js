const imageInput = document.getElementById("change");
const selectedImage = document.getElementById("selectedImage");

imageInput.addEventListener("change", function (event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
    selectedImage.src = event.target.result;
    };

    reader.readAsDataURL(file);
});

function validation() {
    let first_name = document.getElementById('firstname').value.trim();
    let last_name = document.getElementById('lastname').value.trim();
    let phone_input = document.getElementById('phone_input').value.trim();
    let dob = document.getElementById('dob_input').value.trim();

    let spanEle = document.getElementsByClassName('msg');
    console.log();
    Object.keys(spanEle).forEach(element => {
        spanEle[element].innerText = ``;
    });
    let errorArr = [];
    errorMsg = [];
    let flag = true;


    // First Name Validation
    if(first_name == ``) {
        console.log('false');
        if(!errorArr.includes(0)) {
            errorArr.push(0);
            errorMsg.push(`First name Can't be blank`)
        }
        flag = false;
    }
    for(let i=0; i<first_name.length; i++) {
        if(!isNaN(first_name[i])) {
            console.log('false');
            if(!errorArr.includes(0)) {
                errorArr.push(0);
                errorMsg.push(`Invalid first name`)
            }
            flag = false;
        }
    }

    // Last Name Validation
    if(last_name == ``) {
        console.log('false');
        if(!errorArr.includes(1)) {
            errorArr.push(1);
            errorMsg.push(`Last name can't be blank`)
        }
        flag = false;
    }
    for(let i=0; i<last_name.length; i++) {
        if(!isNaN(last_name[i])) {
            console.log('false');
            if(!errorArr.includes(1)) {
                errorArr.push(1);
                errorMsg.push(`Invalid last name`)
            }
            flag = false;
        }
    }

    // Contact No. Validation
    if(phone_input == ``) {
        console.log('false');
        if(!errorArr.includes(2)) {
            errorArr.push(2);
            errorMsg.push(`Contact number can't be blank`)
        }
        flag = false;
    }
    else if(phone_input.length != 10 || isNaN(phone_input)) {
        console.log('false');
        if(!errorArr.includes(2)) {
            errorArr.push(2);
            errorMsg.push(`Invalid contact number`)
        }
        flag = false;
    }

    //Date Validation
    if(dob == ``) {
        console.log('false');
        if(!errorArr.includes(3)) {
            errorArr.push(3);
            errorMsg.push(`Date of birth can't be blank`)
        }
        flag = false;
    }
    else if(dob.length != 10) {
        console.log('false');
        if(!errorArr.includes(3)) {
            errorArr.push(3);
            errorMsg.push(`Invalid date of birth`)
        }
        flag = false;
    }
    for(let i=0; i<dob.length; i++) {
        if((i==4 && dob[i]!='-') || (i==7 && dob[i]!='-')) {
            console.log('false');
            if(!errorArr.includes(3)) {
                errorArr.push(3);
                errorMsg.push(`Invalid date format`)
            }
            flag = false;
        }
        else if(i!=4 && i!=7 && isNaN(dob[i])) {
            console.log('false');
            if(!errorArr.includes(3)) {
                errorArr.push(3);
                errorMsg.push(`Invalid date of birth`)
            }
            flag = false;
        }
    }
    if(dob.slice(0, 4) > 2024) {
        console.log('false');
        if(!errorArr.includes(3)) {
            errorArr.push(3);
            errorMsg.push(`Invalid year of birth`)
        }
        flag = false;
    }
    if(dob.slice(5, 7) > 12) {
        console.log('false');
        if(!errorArr.includes(3)) {
            errorArr.push(3);
            errorMsg.push(`Invalid month of birth`)
        }
        flag = false;
    }
    if(dob.slice(8, 10) > 31) {
        console.log('false');
        if(!errorArr.includes(3)) {
            errorArr.push(3);
            errorMsg.push(`Invalid date of birth`)
        }
        flag = false;
    }
    else if(dob.slice(5, 7)==4 || dob.slice(5, 7)==6 || dob.slice(5, 7)==9 || dob.slice(5, 7)==11) {
        if(dob.slice(8, 10) > 30) {
            console.log('false');
            if(!errorArr.includes(3)) {
                errorArr.push(3);
                errorMsg.push(`Invalid date of birth`)
            }
            flag = false;
        }
    }
    else if(dob.slice(5, 7)==2) {
        if(dob.slice(0, 4)%4==0) {
            if(dob.slice(8, 10) > 29) {
                console.log('false');
                if(!errorArr.includes(3)) {
                    errorArr.push(3);
                    errorMsg.push(`Invalid date of birth`)
                }
                flag = false;
            }
        }
        else {
            if(dob.slice(8, 10) > 28) {
                console.log('false');
                if(!errorArr.includes(3)) {
                    errorArr.push(3);
                    errorMsg.push(`Invalid date of birth`)
                }
                flag = false;
            }
        }
    }

    console.log(errorArr);
    console.log(errorMsg);
    if(errorArr) {
        errorArr.forEach(function (element, index) {
            spanEle[element].innerText = errorMsg[index]
        });
    }
    
    return flag;
}
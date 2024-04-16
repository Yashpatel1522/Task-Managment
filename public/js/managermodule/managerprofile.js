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
    alert('Wait ..')
    let first_name = document.getElementById('firstname').value;
    let last_name = document.getElementById('lastname').value;
    let phone_input = document.getElementById('phone_input').value;
    let dob = document.getElementById('dob_input').value;

    // First Name Validation
    if(first_name.trim() == ``) {
        console.log('false');
        return false;
    }
    for(let i=0; i<first_name.length; i++) {
        if(!isNaN(first_name[i])) {
            console.log('false');
            return false;
        }
    }

    // Last Name Validation
    if(last_name.trim() == ``) {
        console.log('false');
        return false;
    }
    for(let i=0; i<last_name.length; i++) {
        if(!isNaN(last_name[i])) {
            console.log('false');
            return false;
        }
    }

    // Contact No. Validation
    if(phone_input.trim() == ``) {
        console.log('false');
        return false;
    }
    else if(phone_input.length != 10 || isNaN(phone_input)) {
        console.log('false');
        return false;
    }

    //Date Validation
    if(dob.trim() == ``) {
        console.log('false');
        return false;
    }
    else if(dob.length != 10) {
        console.log('false');
        return false;
    }
    for(let i=0; i<dob.length; i++) {
        if((i==4 && dob[i]!='-') || (i==7 && dob[i]!='-')) {
            console.log('false');
            return false;
        }
        else if(i!=4 && i!=7 && isNaN(dob[i])) {
            console.log('false');
            return false;
        }
    }
    if(dob.slice(0, 4) > 2024) {
        console.log('false');
        return false;
    }
    if(dob.slice(5, 7) > 12) {
        console.log('false');
        return false;
    }
    if(dob.slice(8, 10) > 31) {
        console.log('false');
        return false;
    }
    else if(dob.slice(5, 7)==4 || dob.slice(5, 7)==6 || dob.slice(5, 7)==9 || dob.slice(5, 7)==11) {
        if(dob.slice(8, 10) > 30) {
            console.log('false');
            return false;
        }
    }
    else if(dob.slice(5, 7)==2) {
        if(dob.slice(0, 4)%4==0) {
            if(dob.slice(8, 10) > 29) {
                console.log('false');
                return false;
            }
        }
        else {
            if(dob.slice(8, 10) > 28) {
                console.log('false');
                return false;
            }
        }
    }

    console.log(true);
    return false;
}
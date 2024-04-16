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
    if(first_name.trim() == ``) {
        return false;
    }
    console.log(first_name);
    first_name.forEach(element => {
        console.log(element);
    });
    alert('Wait ..')
}
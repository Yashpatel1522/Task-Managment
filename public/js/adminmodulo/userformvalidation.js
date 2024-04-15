let formpopup = document.getElementById('formpopup');
let rightbar = document.querySelector(".rightbar");

function openPopup(){
  formpopup.classList.add("open-popup");
  rightbar.style.opacity = "0.5";
}

function closePopup(){
  formpopup.classList.remove("open-popup");
  rightbar.style.opacity = "1";
}

function addemployee(){
  console.log("hello")
}

function sc(act,id){
  let row = document.getElementsByClassName('carddetails')[id];
  if(act=='next'){
    row.scrollLeft +=200;
  }
  else{
    row.scrollLeft -=200;
  }
}
function showuserdetails(){
  
}
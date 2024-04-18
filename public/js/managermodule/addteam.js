function onReset() {
  document.getElementById("teamForm").reset();
}

function addTeamValidations(){
      let team_Name = document.getElementById("team_name").Value;
      if(team_Name.trim().length === 0)
      {
        document.getElementById("tnerr").innerHTML = "* required"
      }
      let selectvalue = document.getElementById("select").Value;
      if(selectvalue == 0)
      {
        document.getElementById("tmerr").innerHTML = "* required"
      }

}
// pop-up js of addtask.ejs
let popup = document.getElementById("popup");

function openPopup() {
  popup.classList.add("open-popup");
}

function closePopup() {
  popup.classList.remove("open-popup");
}

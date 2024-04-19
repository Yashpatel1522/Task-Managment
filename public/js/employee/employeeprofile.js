const renderProfileData = (profileData) => {
  let keys = Object.keys(profileData[0]);

  keys.map((key) => {
    if (!(document.getElementById(`${key}`) == null)) {
      document.getElementById(`${key}`).value = profileData[0][key];
    } else if (key == "employee_role") {
      document.getElementById(`${key}`).value = profileData[0][key];
    }
  });
  let profileImageName = profileData[0].img_url.split("/");
  // document.getElementById('selectedImage').src = `/assets/userprofiles/${profileData[0].id}/${profileImageName[3]}`
};
function showDropdown() {
  document.getElementById("dropdown").classList.toggle("show");
}

async function loadProfile() {
  let response = await fetch("/employee/getprofiledata")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      profileData = data.result;
      renderProfileData(profileData);
    });
}

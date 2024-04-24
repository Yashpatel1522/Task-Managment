const renderProfileData = (profileData) => {
  let keys = Object.keys(profileData.userdata[0]);
  keys.map((key) => {
    if (!(document.getElementById(`${key}`) == null)) {
      document.getElementById(`${key}`).value = profileData.userdata[0][key];
    }
  });
  let profileImageName = profileData.imagename[0].newimage_name;
  document.getElementById('selectedImage').src = `/assets/userprofiles/${profileImageName}`
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

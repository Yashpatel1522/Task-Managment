const showNotification = () => {
  Swal.fire({
    title: "Notifications",
    text: "Click!",
    icon: "success",
    button: "oh yes!",
  });
}

const logoutPopup = () => {
  try {
    Swal.fire({
      title: "Are you sure?",
      text: "You Logout this page !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        }).then((result2) => {
          if (result2.isConfirmed) {
            window.location.href = '/'
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
}


const renderProfileData = (profileData) => {
  let keys = Object.keys(profileData.userdata[0]);
  keys.map((key) => {
    if (!(document.getElementById(`profile_${key}`) == null)) {
      document.getElementById(`profile_${key}`).value = profileData.userdata[0][key];
    }
  });
  let profileImageName = profileData.imagename[0].newimage_name;
  document.getElementById('selectedImage').src = `/assets/userprofiles/${profileImageName}`
  document.getElementById('employee_dashboard_img').src = `/assets/userprofiles/${profileImageName}`
  document.getElementById('employee_name').innerHTML = `<strong>${profileData.userdata[0]["first_name"] + " " + profileData.userdata[0]["last_name"]}</strong>`
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

loadProfile();


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

const showDropdown = () => {
  document.getElementById("dropdown").classList.toggle("show");
}

const renderAdminProfile = (profileimg, profilevalue) => {
  let keys = Object.keys(profilevalue[0]);
  keys.map((key) => {
    if (!(document.getElementById(`profile_${key}`) == null)) {
      document.getElementById(`profile_${key}`).value = profilevalue[0][key];
    }
  });

  document.getElementById('selectedImage').src = `/assets/userprofiles/${profileimg[0].newimage_name}`
  document.getElementById('admin_dashboard_img').src = `/assets/userprofiles/${profileimg[0].newimage_name}`
  document.getElementById("user_name").innerHTML = `<strong>${profilevalue[0]["first_name"] + " " + profilevalue[0]["last_name"]}</strong>`

}

const loadAdminProfile = async () => {
  let response = await fetch(`/admin/profiledata`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      profileimg = data.imageadmin;
      profilevalue = data.result;
      renderAdminProfile(profileimg, profilevalue);
    });
}

loadAdminProfile();

const adminProfile = async () => {
  if (isValidProfilDetails()) {
    let adminForm = document.getElementById('adminprofileform');
    let adminFormData = new FormData(adminForm);
    fetch(`/admin/profile`, {
      method: 'POST',
      body: adminFormData
    }).then(
      (response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      }
    )
      .then((data) => {
        if (data.message == "updated") {
          Swal.fire({
            title: "Done",
            text: "Profile Updated Succesfully",
            icon: "success",
          }).then(function () {
            window.location.reload();
          });
        } else {
          Swal.fire({
            title: "Done",
            text: "Profile is not Updated",
            icon: "error",
          })
        }
      })
  }
}



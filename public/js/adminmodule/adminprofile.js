const showNotification = () => {
  Swal.fire({
    title: "Notifications",
    text: "Click!",
    icon: "success",
    button: "oh yes!",
  });
}

document.getElementById("change").addEventListener("change", function (event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function (event) {
    document.getElementById("selectedImage").src = event.target.result;
  };

  reader.readAsDataURL(file);
});



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
            window.location.href = '/login/logout'
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
    let res = await fetch(`/admin/profile`, {
      method: 'POST',
      body: adminFormData
    })
    let result = await res.json();
    if (result.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: result.message
      }).then(async (result2) => {
        if (result2.isConfirmed) {
          window.location.reload();
        }
      });
    } else {
      Swal.fire({
        title: "Error",
        text: result.message,
        icon: "error"
      })
    }
  }
}
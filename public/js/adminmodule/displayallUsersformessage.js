const fetchdata = async () => {
  return await (await fetch("/admin/allusers")).json();
};

const displayAllUsers = async () => {
  let users = await fetchdata();
  let displayArea = document.getElementById("display-users");
  displayArea.innerHTML = "";
  users.forEach((user) => {
    if (user.role_id == 1) {
      user.role_id = "Admin";
    } else if (user.role_id == 2) {
      user.role_id = "Mnager";
    } else {
      user.role_id = "Employee";
    }
    displayArea.innerHTML += `<div class="container bootstrap snippets bootdey col-md-4" style="margin: 0 auto;">
    <div class="col-md-12">
      <!-- Begin user profile -->
      <div class="box-info text-center user-profile-2">
        <div class="user-profile-inner">
          <h4 class="text-balck">${user.first_name + " " + user.last_name}</h4>
          <img src="/assets/userprofiles/${
            user.newimage_name
          }" class="img-circle profile-avatar" alt="User avatar" style="border-radius: 50px;">
          <h5>${user.role_id}</h5>
            
          <!-- User button -->
          <div class="user-button">
            <div class="row">
              <div class="col-12">
                <a  href="/admin/socket/${user.email}" class="btn btn-primary btn-sm btn-block"><i class="fa fa-envelope"></i> Send Message</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> 
</div>`;
  });
};


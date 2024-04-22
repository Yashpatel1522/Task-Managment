const fetchNotificationData = async () => {
  try {
    await fetch(`${window.location.origin}/manager/notification`, {
      method: "get", // *GET, POST, PUT, DELETE, etc.
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (typeof data !== "undefined") {
          showNotifications(data);
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  } catch (error) {
    console.log(error);
  }
};

const showNotifications = (data) => {
  let notificatiodata = "";
  data.forEach((element) => {
    notificatiodata += `<h3>Today is due date of <b>${element.task_name}</b> task<h3>`;
  });
  Swal.fire({
    title: ` ${notificatiodata}`,
    icon: "info",
  });
};

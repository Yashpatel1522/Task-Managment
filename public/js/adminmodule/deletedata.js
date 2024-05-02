const deleteAllData = async (api, id, apifetch) => {
  try {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success btn-gap",
        cancelButton: "btn btn-danger btn-gap",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          await fetch(`${api}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });
          swalWithBootstrapButtons
            .fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            })
            .then(async (result2) => {
              if (result2.isConfirmed) {
                if (id = "category") {
                  window.location.reload();
                } else {
                  fetchData(`${apifetch}`, `${id}`);
                }
              }
            });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your date is safe :)",
            icon: "error",
          });
        }
      });
  } catch (error) {
    console.log(error);
  }
};

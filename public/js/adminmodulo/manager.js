
const getData = async () => {
    try {
        let data = await (await fetch(`/admin/managersapi`)).json();
        let table = document.getElementById("man-table")
        let dataadd = `<thead>
                <th>FirstName</th>
                <th>LastName</th>
                <th>Email</th>
                <th>Contact No</th>
                <th>View Details</th>
                </thead>`
        if (data.result.length != 0) {
            data.result.forEach(element => {
                dataadd += (`<tr>
                <td>${element.first_name}</td>
                <td>${element.last_name}</td>
                <td>${element.email}</td>
                <td>${element.contact}</td>
                <td>
                <input type="button" value="view" class="btn btn-secondary px-3" onclick="openPopup1(${element.id})">
                </td>`)
            });
            table.innerHTML = dataadd;
        }
    } catch (error) {
        // logger.error(error)
        console.log(error);
    }
}

let popup = document.getElementById("show-detail");
const openPopup = () => {
    try {
        popup.classList.add("open-popup");
    } catch (error) {
        console.log(error);
    }
}

const closePopup = () => {
    try {
        popup.classList.remove("open-popup")
    } catch (error) {
        console.log(error);
    }
}

const openPopup1 = async (id) => {
    try {
        popup.classList.add("open-popup");
        console.log(id);
        let data = await (await fetch(`/admin/managersapi/${id}`)).json();

        if (data.managerDetail.length != 0) {
            document.getElementById("manager-form").innerHTML =
            `<table>
                <tr>
                  <td>
                    FirstName: <input type="text" value="${data.managerDetail[0].first_name}" name="fname">
                  </td>
                  <td>
                    LastName: <input type="text" value="${data.managerDetail[0].last_name}" name="fname">
                  </td>
                </tr>
                <tr>
                  <td>
                    Email: <input type="text" value="${data.managerDetail[0].email}" name="email">
                  </td>
                  <td>
                    Contact No: <input type="text" value="${data.managerDetail[0].contact}" name="contact">
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="button" value="Close"  onclick="closePopup()">
                  </td>
                  <td>
                    <input type="button" value="Edit"   onclick="alert('edit')">
                  </td>
                  <td>
                    <input type="button" value="Delete" onclick="alert('delete')">
                  </td>
                </tr>
            </table>`
        }
    } catch (error) {
        console.log(error);
    }
}
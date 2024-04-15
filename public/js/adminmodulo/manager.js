
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
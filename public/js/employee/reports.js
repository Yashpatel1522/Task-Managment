const fun = async () => {
  let data = await (await fetch(`/employee/comeletedTasks`)).json();
  data = data.map((ele) => {
    let obj = {
      task_name: ele.task_name,
      start_date: ele.comment[0]["startet_at"],
      end_date: ele.comment[0]["finished_at"],
    };
    if (ele.comment.length != 0) {
      let managerdiff =
        (new Date(ele.task_end_date) - new Date(ele.task_start_date)) /
        (1000 * 60 * 60 * 24);
      let employeediff =
        (new Date(ele.comment[0].finished_at) -
          new Date(ele.comment[0].startet_at)) /
        (1000 * 60 * 60 * 24);
      let diff = managerdiff - employeediff;
      if (diff < 0) {
        obj.status = "Low";
      } else if (diff == 0) {
        obj.status = "Medium";
      } else {
        obj.status = "High";
      }
    } else {
      obj.status = "Not Working";
    }
    return obj;
  });
  return data;
};

const printPerformance = async () => {
  const flags = await fun();
  let color, low = 0, medium = 0, high = 0;
  let cards = document.getElementById("reports");
  cards.innerHTML = "";
  flags.forEach((card) => {
    if (card.status == "High") {
      color = "green";
      high += 1;
    } else if (card.status == "Medium") {
      color = "yellow";
      medium += 1;
    } else {
      color = "red";
      low += 1;
    }
    cards.innerHTML += `<div class="card m-3 p-2">
    <div class="card-body">
      <p class="h4 p-2 text-center fs-2">${card.task_name}</p>
      <div class="d-flex ">
      <p class="fs-6 h4 p-2">Task Start Date :</p>
      <p class="h4 p-2 fs-6">${card.start_date}</p>
      </div>
      <div class="d-flex ">
      <p class="h4 p-2 fs-6">Task End Date :</p>
      <p class="h4 p-2 fs-6">${card.end_date}</p>
      </div>
      <div class="d-flex">
      <p class="h4 p-2 fs-6">Performance :</p>
      <p class="h4 p-2 fs-6 ${color}">${card.status}</p>
      </div>
    </div>
  </div>`;
    document.getElementById("cards1").innerHTML = "";
    document.getElementById("cards1").innerHTML += `<div class="card text-center mx-4">
  <div class="card-bod my-3 text-dark">
    <p class="card-text h1">${high}</p>
    <h5 class="card-title">High</h5>
  </div>
</div>
<div class="card text-center mx-4">
  <div class="card-bod my-3 text-dark">
    <p class="card-text h1">${medium}</p>
    <h5 class="card-title">Medium</h5>
  </div>
</div>
<div class="card text-center mx-4">
  <div class="card-bod my-3 text-dark">
    <p class="card-text h1">${low}</p>
    <h5 class="card-title">Low</h5>
  </div>
</div>`
  });
};

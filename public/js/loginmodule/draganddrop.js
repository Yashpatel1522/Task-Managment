const dragEvent = async () => {
  // let inprogressDraggables = document.getElementById('inprogressTask').children
  // inprogressDraggables = Array.from(inprogressDraggables)

  // let todoDragables = document.getElementById('todoTask').children
  // todoDragables = Array.from(todoDragables)

  // let completedDragables = document.getElementById('completedTask').children
  // completedDragables = Array.from(completedDragables)

  let dropzones = document.getElementsByClassName("swim-lane");
  dropzones = Array.from(dropzones);

  let tasks = document.querySelectorAll(".tasks");
  tasks = Array.from(tasks);
  //drag start and add one class to change color
  tasks.forEach((task) => {
    task.addEventListener("dragstart", () => {
      task.classList.add("is-dragging");
    });
  });

  // completedDragables.forEach(task => {
  //   task.addEventListener("dragstart", () => {
  //     task.classList.add("is-dragging")
  //   });
  // });

  // inprogressDraggables.forEach(task => {
  //   task.addEventListener("dragstart", () => {
  //     task.classList.add("is-dragging")
  //   });
  // });

  //dragend classremove
  tasks.forEach(async (task) => {
    await task.addEventListener("dragend", async () => {
      task.classList.remove("is-dragging");
      let formdata = new FormData();
      formdata.append("taskId", task.id);
      formdata.append("task_status", task.parentNode.id);
      let data = new URLSearchParams(formdata);
      let url = "/login/updateKanban";
      let res = await fetch(url, {
        method: "post",
        body: data,
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
      });
    });
  }); 

  // completedDragables.forEach(task => {
  //   task.addEventListener("dragend", () => {
  //     task.classList.remove("is-dragging")
  //   });
  // });

  // inprogressDraggables.forEach(task => {
  //   task.addEventListener("dragend", () => {
  //     task.classList.remove("is-dragging")
  // if(task.parentNode.id!=undefined)
  // {
  // console.log(task)
  // }
  // });
  // });

  dropzones.forEach((zone) => {
    zone.addEventListener("dragover", (event) => {
      event.preventDefault();

      // const bottomTask = insetAboveTask(zone, event.clienty);
      const curTask = document.querySelector(".is-dragging");
      // console.log(curTask)
      // if (!bottomTask) {
      zone.appendChild(curTask);
      // }
    });
  });
};

// const insetAboveTask = (zone, mouse) => {
// const els = zone.querySelectorAll(".tasks:not(.is-dragging)");
// // console.log(els);
// let closestTask;
// let closestOffSet = Number.NEGATIVE_INFINITY;
// els.forEach((task) => {
//   console.log(els);
//   const { top } = task.getBoundingClientRect();
//   console.log(mouse - top);
//   // const offset = mouse - top;
//   if (offset < 0 && offset > closestOffSet) {
//     closestOffSet = offset;
//     closestTask = task;
//   }
// });
// };

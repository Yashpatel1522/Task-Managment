const fun = async () => {
  let data = await (await fetch(`/employee/comeletedTasks`)).json();
};
fun();

function sc(act,id){
  let row = document.getElementsByClassName('carddetails')[id];
  if(act=='next'){
    row.scrollLeft +=200;
  }
  else{
    row.scrollLeft -=200;
  }
}



async function fetchData(){

response = await fetch(`http://127.0.0.1:8000/employee/employeetasklist`)
data = await response.json()
function setCard(id,element){
  document.getElementById(`${id}`).innerHTML += `
      <div class="card1" >
                <div class="field">
                  <h4>${element.task_name}</h4>
                </div>
                <div class="field">
                  <label>Description:</label>
                  <p>${element.task_description}</p>
                </div>
                <div class="field">
                  <label>due date :</label>
                  <p>${element.task_end_date}</p>
                </div>
              </div >`
}
  data.forEach(element => { 
    console.log(element,"elementic ")
    if (element.task_status=='todo'){
      setCard('todo',element)
    }

    else if (element.task_status == 'inprogress'){
      setCard('inprogress', element)

    }
    else if (element.task_status == 'completed') {
      setCard('completed', element)
  
    }
});


console.log(data, "all ")

  let path = window.location.pathname.split("/")
  let id = path[path.length - 1]

response = await fetch(`http://127.0.0.1:8000/employee/employeetasklist/${id}`)
data = await response.json()
console.log(data,"data is ")

}
fetchData()
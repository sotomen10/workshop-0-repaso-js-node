import "../scss/style.scss"


const url = 'http://localhost:3000/tareas';

let form = document.querySelector("#form")
let imageTask = document.querySelector("#image")
let nameTask = document.querySelector("#nameTask")
let descriptionTask = document.querySelector("#description")
let button=document.querySelector("#button")
let main = document.querySelector("#main")
let id
form.addEventListener("click", (e) => {
  e.preventDefault()
  if(e.target.classList.contains("btn-success")){
    newData()
  }else if(e.target.classList.contains("btn-warning")){
    editData(id)
  }
})

main.addEventListener("click",async(e)=>{
    e.preventDefault()
    id=e.target.getAttribute("id")
    if(e.target.classList.contains("btn-danger")){
      alert("vas a eliminar la tarea")
    }else if(e.target.classList.contains("btn-warning")){
      alert("vas a editar la tarea")
      writeValues(id)
      button.classList.replace("btn-success", "btn-warning")
      button.textContent=`actualizar`

    }else if(e.target.classList.contains("btn-danger")){
      alert("vas a eliminar")
      del(id)
    }

})

let index = async (main, url) => {
  const data = await fetch(url)
  const dataReal = await data.json()
  for (let i = 0; i < dataReal.length; i++) {
    main.innerHTML += `
      
      <div class="card m-3" style="width: 18rem;">
          <img src=${dataReal[i].image}
              class="card-img-top" alt="...">
              <div class="card-body">
              <h5 class="card-title">tarea: ${dataReal[i].nameTask}</h5>
              <p>descripcion: ${dataReal[i].description} </p>
              <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked>
              <label class="form-check-label" for="flexCheckChecked">
              ¿importante?
              </label>
              </div>
              <div>
                  <button type="button" class="btn btn-danger m-2" id="${dataReal[i].id}">delete</button>
                  <button type="button" class="btn btn-warning" id="${dataReal[i].id}">edit</button>
              </div>
          </div>
      </div> `
  }

}

index(main, url)

async function newData() {
  let newobject = {
    nameTask: nameTask.value,
    description: descriptionTask.value,
    image: imageTask.value,
    complete: false
  }
  await fetch(url, {
    method: 'POST',
    headers: {
      'content-Type': 'application/json'
    },
    body: JSON.stringify(newobject)
  })
  location.reload()
}

async function editData(id) {
  let updatedObject = {
    nameTask: nameTask.value,
    description: descriptionTask.value,
    image: imageTask.value,
    complete: false
  };
  await fetch(`${url}/${id}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedObject)
  });
  
}


async function writeValues(id){
  const data = await fetch(`${url}/${id}`)
  const dataReel = await data.json()
  nameTask.value = dataReel.nameTask
  descriptionTask.value = dataReel.description
  imageTask.value = dataReel.image

}

async function del(id){
  await fetch(`${url}/${id}`, { 
      method: "DELETE",
      headers: {
          "Content-Type": "application/json"
      }
  })
  location.reload()
}








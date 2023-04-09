let gorevListesi = [
  { id: 1, gorevAdi: "Görev 1" },
  { id: 2, gorevAdi: "Görev 2" },
  { id: 3, gorevAdi: "Görev 3" },
  { id: 4, gorevAdi: "Görev 4" },
];

let editId
let isEditTask = false

let taskInput = document.querySelector("#txtTaskName");

displayTask();

function displayTask() {
  let ul = document.getElementById("task-list");
  ul.innerHTML = "";

  for (let gorev of gorevListesi) {
    let li = `
                <li class="task list-group-item">
                    <div class="form-check">
                        <input type="checkbox" id="${gorev.id}" class="form-check-input">
                        <label for="${gorev.id}" class="form-check-label ">${gorev.gorevAdi}</label>
                        
                        <div class="dropdown float-end ">
                            <button class="btn-sm btn btn btn-outline-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fa-solid fa-ellipsis"></i>
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><a onclick="deleteTask(${gorev.id})" href="#" class="dropdown-item"> <i class=" fa-solid fa-xmark "></i> Sil</a></li>
                                <li><a onclick='editTask(${gorev.id}, "${gorev.gorevAdi}")' href="#" class="dropdown-item"> <i class="fa-solid fa-pencil"></i> Düzenle</a></li>
                            </ul>
                        </div>
                    </div>
                </li>
        `;

    ul.insertAdjacentHTML("afterbegin", li);
  }
}

function newTask(event) {
  

  if (taskInput.value == "") {
    alert("Görev Alanı Boş Olamaz");
  } else {
      if(!isEditTask){
                gorevListesi.push({
                id: gorevListesi.length + 1,
                gorevAdi: taskInput.value,
            });
      } else{
            for(let gorev of gorevListesi){
                if(gorev.id == editId){
                    gorev.gorevAdi = taskInput.value
                }
                isEditTask = false 
            }
      }  
      
    taskInput.value = "";
    displayTask();
  }
  event.preventDefault();
}

let btnEkle = document
  .querySelector("#btnAddNewTask")
  .addEventListener("click", newTask);






let btnSil = document
  .querySelector("#btnClear")
  .addEventListener("click", function (event) {
    console.log("click event: Cleat Task");

    event.preventDefault();
  });


  function deleteTask(id){

    let deleteID

    for(let index in gorevListesi){
        if(gorevListesi[index].id == id){
            deleteID = index
        }
    }

    gorevListesi.splice(deleteID, 1)
    displayTask()
  }


  function editTask(taskId, taskName){
    editId= taskId
    isEditTask = true
    taskInput.value = taskName
    taskName.focus()
    taskInput.classList.add("active")

    
  }

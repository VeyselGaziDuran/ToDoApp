const gorevListesi = [
  { id: 1, gorevAdi: "Görev 1", durum: "completed" },
  { id: 2, gorevAdi: "Görev 2", durum: "pending"},
  { id: 3, gorevAdi: "Görev 3", durum: "completed"},
  { id: 4, gorevAdi: "Görev 4", durum: "pending"},
];
let editId;
let isEditTask = false;
const taskInput = document.querySelector("#txtTaskName");
const btnClear = document.querySelector("#btnClear");
displayTask();
function displayTask() {
  const ul = document.getElementById("task-list");
  ul.innerHTML = "";
  if (gorevListesi.length === 0) {
    ul.innerHTML = '<h1 class="empty-task-list">Görev listeniz boş</h1>';
  } else {
    for (const gorev of gorevListesi) {

      let completed = gorev.durum == "completed" ? "checked":""

      let li = `
        <li class="task list-group-item">
          <div class="form-check">
            <input type="checkbox" onclick="updateStatus(this)" id="${gorev.id}" class="form-check-input" ${completed}>
            <label for="${gorev.id}" class="form-check-label ${completed}">${gorev.gorevAdi}</label>
            <div class="dropdown float-end ">
              <button class="btn-sm btn btn btn-outline-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fa-solid fa-ellipsis"></i>
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li>
                  <a onclick="deleteTask(${gorev.id})" href="#" class="dropdown-item"><i class="fas fa-trash-alt me-2"></i>Sil</a>
                </li>
                <li>
                  <a onclick='editTask(${gorev.id},"${gorev.gorevAdi}")' href="#" class="dropdown-item"><i class="fas fa-edit me-2"></i>Düzenle</a>
                </li>
              </ul>
            </div>
          </div>
        </li>`;
      ul.insertAdjacentHTML("afterbegin", li);
    }
  }
}

function newTask(event) {
  event.preventDefault();
  if (taskInput.value === "") {
    alert("Görev Alanı Boş Olamaz");
  } else {
    if (!isEditTask) {
      gorevListesi.push({
        id: gorevListesi.length + 1,
        gorevAdi: taskInput.value,
      });
    } else {
      for (const gorev of gorevListesi) {
        if (gorev.id === editId) {
          gorev.gorevAdi = taskInput.value;
        }
      }
      isEditTask = false;
    }
    taskInput.value = "";
    displayTask();
  }
}

document.querySelector("#btnAddNewTask").addEventListener("click", newTask);
btnClear.addEventListener("click", function (event) {
  event.preventDefault();
  gorevListesi.splice(0, gorevListesi.length);
  displayTask();
});

function editTask(taskId, taskName) {
  editId = taskId;
  isEditTask = true;
  const editTaskInput = document.querySelector("#editTaskInput");
  editTaskInput.value = taskName;
  const editTaskModal = new bootstrap.Modal(
    document.getElementById("editTaskModal")
  );
  editTaskModal.show()
  document
    .querySelector("#saveEditTask")
    .addEventListener("click", function () {
      for (const gorev of gorevListesi) {
        if (gorev.id === editId) {
          gorev.gorevAdi = editTaskInput.value;
        }
      }
      isEditTask = false;
      editTaskModal.hide()
      displayTask()
    })
  document.querySelector("#editTaskInput").addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      event.preventDefault()
      document.querySelector("#saveEditTask").click()
    }
  });
}


function deleteTask(id) {
  const deleteID = gorevListesi.findIndex((gorev) => gorev.id === id);
  if (deleteID !== -1) {
    gorevListesi.splice(deleteID, 1);
    displayTask();
  }
}



function updateStatus(selectedTask){

  let label = selectedTask.nextElementSibling
  let durum

  if(selectedTask.checked){
    label.classList.add("checked")
    durum = "completed"
  }else{
    label.classList.remove("checked")
    durum = "pending"
  }

  for(let gorev of gorevListesi){
    if(gorev.id == selectedTask.id){
      gorev.durum = durum
    }
  }

  console.log(gorevListesi)
}

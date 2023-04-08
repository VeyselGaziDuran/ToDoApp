let gorevListesi = [
  { id: 1, gorevAdi: "Görev 1" },
  { id: 2, gorevAdi: "Görev 2" },
  { id: 3, gorevAdi: "Görev 3" },
  { id: 4, gorevAdi: "Görev 4" },
];

displayTask();

function displayTask() {
  let ul = document.getElementById("task-list");
  ul.innerHTML = "";

  for (let gorev of gorevListesi) {
    let li = `
                <li class="task list-group-item">
                    <div class="form-check">
                        <input type="checkbox" id="${gorev.id}" class="form-check-input">
                        <label for="${gorev.id}" class="form-check-label">${gorev.gorevAdi}</label>
                    </div>
                </li>
        `;

    ul.insertAdjacentHTML("afterbegin", li);
  }
}

function newTask(event) {
  let taskInput = document.querySelector("#txtTaskName");

  if (taskInput.value == "") {
    alert("Görev Alanı Boş Olamaz");
  } else {
    gorevListesi.push({
      id: gorevListesi.length + 1,
      gorevAdi: taskInput.value,
    });
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

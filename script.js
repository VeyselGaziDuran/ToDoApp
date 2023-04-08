

let gorevListesi = [
    {id: 1, gorevAdi: "Görev 1"},
    {id: 2, gorevAdi: "Görev 2"},
    {id: 3, gorevAdi: "Görev 3"},
    {id: 4, gorevAdi: "Görev 4"}
    ]

let ul = document.getElementById("task-list")



for (let gorev of gorevListesi ){

    let li =  `
        <li class="task list-group-item">
            <div class="form-check">
                <input type="checkbox" id="${gorev.id}" class="form-check-input">
                <label for="${gorev.id}" class="form-check-label">${gorev.gorevAdi}</label>
            </div>
        </li>
`

ul.insertAdjacentHTML("afterbegin", li)
}






function newTask(event){
    console.log("click event: New Task")
    console.log(event.target)
    event.preventDefault()
}




let btnEkle = document.querySelector("#btnAddNewTask").addEventListener("click", newTask)




let btnSil = document.querySelector("#btnClear").addEventListener("click", function(event){
    console.log("click event: Cleat Task")

    event.preventDefault()
})





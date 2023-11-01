function renderCardWeek1() {
  let eListItem = document.querySelector("[data-board='backlog']");

  let str = "";
  for (i = 0; i < cardWeek1.length; i++) {
    str += `
    <div
    id="todotarget${cardWeek1[i].id}"
    class="box"
    ondragstart="dragStart(event)"
    draggable="true"
    onclick="handleEditCard('${cardWeek1[i].id}')"
  >
    <button type="button" class="ui-state-default">${cardWeek1[i].name}</button>
  </div>
        `;
  }

  eListItem.innerHTML = str;
}
renderCardWeek1();

function handleClickTaskWeek(value) {
  if (value == "w1") {
    let boardWeek = document.getElementById("board-w1");
    let chevronIcon = document.querySelector(".weekend-1 label i");

    if (boardWeek.style.display === "flex") {
      boardWeek.style.display = "none";
      chevronIcon.classList.remove("fa-chevron-down");
      chevronIcon.classList.add("fa-chevron-up");
    } else {
      boardWeek.style.display = "flex";

      chevronIcon.classList.remove("fa-chevron-up");
      chevronIcon.classList.add("fa-chevron-down");
    }
  }
  if (value == "w2") {
    let boardWeek = document.getElementById("board-w2");
    let chevronIcon = document.querySelector(".weekend-2 label i");

    if (boardWeek.style.display === "flex") {
      boardWeek.style.display = "none";
      chevronIcon.classList.remove("fa-chevron-down");
      chevronIcon.classList.add("fa-chevron-up");
    } else {
      boardWeek.style.display = "flex";

      chevronIcon.classList.remove("fa-chevron-up");
      chevronIcon.classList.add("fa-chevron-down");
    }
  }
}

function allowDrop(event) {
  event.preventDefault();
}

function dragStart(event) {
  console.log(event.target.id);
  event.dataTransfer.setData("Text", event.target.id);
}

function drop(event) {
  event.preventDefault();
  const taskId = event.dataTransfer.getData("Text");

  if (event.currentTarget.id == "backlog") {
    document
      .querySelector("#backlog>.list-item")
      .appendChild(document.getElementById(taskId));
  }
  if (event.currentTarget.id == "today") {
    document
      .querySelector("#today>.list-item")
      .appendChild(document.getElementById(taskId));
  }
  if (event.currentTarget.id == "doing") {
    document
      .querySelector("#doing>.list-item")
      .appendChild(document.getElementById(taskId));
  }
  if (event.currentTarget.id == "reviewing") {
    document
      .querySelector("#reviewing>.list-item")
      .appendChild(document.getElementById(taskId));
  }
  if (event.currentTarget.id == "done") {
    document
      .querySelector("#done>.list-item")
      .appendChild(document.getElementById(taskId));
  }

  // console.log("aaaaa");
  // console.log(event.target);
  // if (event.target.id != "") {
  //   document.querySelector("#today>.list-item").appendChild(document.getElementById(taskId));
  //   // event.target.appendChild(document.getElementById(data));
  //   // todo list
  //   // if (event.target.id == "todo") {
  //   //   document
  //   //     .getElementById(data)
  //   //     .classList.remove("border-warning", "border-success");
  //   //   document.getElementById(data).classList.add("border-primary");
  //   //   document
  //   //     .getElementById(data)
  //   //     .getElementsByClassName("project-name")[0]
  //   //     .classList.remove("bg-warning", "bg-success");
  //   //   document
  //   //     .getElementById(data)
  //   //     .getElementsByClassName("project-name")[0]
  //   //     .classList.add("bg-primary");
  //   // }
  //   // // progress list
  //   // if (event.target.id == "progress") {
  //   //   document
  //   //     .getElementById(data)
  //   //     .classList.remove("border-primary", "border-success");
  //   //   document.getElementById(data).classList.add("border-warning");
  //   //   document
  //   //     .getElementById(data)
  //   //     .getElementsByClassName("project-name")[0]
  //   //     .classList.remove("bg-primary", "bg-success");
  //   //   document
  //   //     .getElementById(data)
  //   //     .getElementsByClassName("project-name")[0]
  //   //     .classList.add("bg-warning");
  //   // }
  //   // // completed list
  //   //   if (event.target.id == "completed") {
  //   //     document
  //   //       .getElementById(data)
  //   //       .classList.remove("border-warning", "border-success");
  //   //     document.getElementById(data).classList.add("border-success");
  //   //     document
  //   //       .getElementById(data)
  //   //       .getElementsByClassName("project-name")[0]
  //   //       .classList.remove("bg-warning", "bg-success");
  //   //     document
  //   //       .getElementById(data)
  //   //       .getElementsByClassName("project-name")[0]
  //   //       .classList.add("bg-success");
  //   //   }
  //   // }
  // }
  // document.querySelector("#doing>.list-item").appendChild(document.getElementById(taskId));
}

function handleAddCard(id) {
  let formCreate = document.querySelector(`#${id} .add-card`);
  

  formCreate.innerHTML = `<div class="create-task">
  <textarea
    name=""
    id=""
    cols="30"
    rows="10"
    placeholder="Enter to add a new task"
  ></textarea>
  <div>
  <button type="button" id="btnCreate" onclick="handleCreateCard('${id}')">Create Task</button>
  <button type="button" id="btnCancel" onclick="handleCancel('${id}')"><i class="fa-solid fa-xmark"></i></button>
</div>
</div>`;
}

function handleCancel(id){
  let btnCancel = document.querySelector(`#${id} .add-card`);

  btnCancel.innerHTML = `
  <button type="button" onclick="handleAddCard('${id}')">Add a card</button>
  `
}

function handleCreateCard(id){
  let name = document.querySelector(`#${id} .add-card textarea`).value;
  let newCard = new Card(cardWeek1.length + 1, name)
  
  if(validateCard(newCard)){
    cardWeek1.push(newCard);
    renderCardWeek1();
    handleCancel(id);
  }else {
    alert("Can't add card");
  }
}
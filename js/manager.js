function renderAccountManager() {
  let eTbodyMain = document.querySelector("#tbodyMain");

  let str = "";
  for (let i = 0; i < accounts.length; i++) {
    str += `
            <tr id='tr_${accounts[i].id}'>
            <td>${accounts[i].id}</td>
            <td>${accounts[i].name}</td>
            <td>${accounts[i].usname}</td>
            <td>${accounts[i].psw}</td>
            <td>
            <a  class="btn btn-edit" onclick="handleItemClick(${accounts[i].id})"
                ><i class="fa-solid fa-pen-to-square"></i
            ></a>
            <a class="btn btn-delete" onclick="handleRemoveItemClick(${accounts[i].id})"
                ><i class="fa-solid fa-trash"></i
            ></a>
            </td>
        </tr>
        `;
  }

  eTbodyMain.innerHTML = str;
}
renderAccountManager();

function handleBtnAdd() {
  if (isEditing == false) {
    let name = document.querySelector(".frmCreate input[name='txtName']").value;
    let usname = document.querySelector(
      ".frmCreate input[name='txtUsername']"
    ).value;
    let password = document.querySelector(
      ".frmCreate input[name='txtPassword']"
    ).value;

    let accNew = new Account(accounts.length + 1, name, usname, password);

    if (validateAccount(accNew)) {
      accounts.push(accNew);
      localStorage.setItem("KEY_ACCOUNTS", JSON.stringify(accounts));
      renderAccountManager();
    }
  }
}

let isEditing = false;

function handleItemClick(id) {
  if (isEditing == false) {
    isEditing = true;
    let account = findAccountById(id);
    let tdName = document.querySelectorAll(`#tr_${id} td`)[1];
    let tdUsername = document.querySelectorAll(`#tr_${id} td`)[2];
    let tdPassword = document.querySelectorAll(`#tr_${id} td`)[3];
    let tdAction = document.querySelectorAll(`#tr_${id} td`)[4];

    if (account.usname == "admin") {
      tdName.innerHTML = `<input name="itemName" type='text' value='${account.name}' readonly/>`;
      tdUsername.innerHTML = `<input name="itemUsername" type='text' value='${account.usname}' readonly/>`;
      tdPassword.innerHTML = `<input name="itemPassword" type='text' value='${account.psw}' readonly/>`;
    } else {
      tdName.innerHTML = `<input name="itemName" type='text' value='${account.name}' />`;
      tdUsername.innerHTML = `<input name="itemUsername" type='text' value='${account.usname}' />`;
      tdPassword.innerHTML = `<input name="itemPassword" type='text' value='${account.psw}' />`;
    }

    tdAction.innerHTML = `
        <a class="btn btn-edit" onclick="handleUpdate(${id})">
        <i class="fa-solid fa-check"></i>
        </a>
        <a class="btn btn-delete" onclick='handleCancel(${id})'>
            <i class="fa-solid fa-xmark"></i>
        </a>
        `;
  }
}

function handleUpdate(id) {
  let name = document.querySelector("input[name='itemName']").value;
  let usname = document.querySelector("input[name='itemUsername']").value;
  let password = document.querySelector("input[name='itemPassword']").value;

  let accountUpd = new Account(id, name, usname, password);
  // if (validateAccountUpd(accountUpd)) {
  if (validateAccountUpd(accountUpd)) {
    updateAccount(id, accountUpd);
    localStorage.setItem(KEY_ACCOUNTS, JSON.stringify(accounts));
    renderAccountManager();
  } else {
    return false;
  }

  // }
}

function updateAccount(id, accountUpdate) {
  for (let i = 0; i < accounts.length; i++) {
    if (accounts[i].id == id) {
      accounts[i].name = accountUpdate.name;
      accounts[i].usname = accountUpdate.usname;
      accounts[i].psw = accountUpdate.psw;
    }
  }
  isEditing = false;
}

function handleCancel(id) {
  isEditing = false;
  let account = findAccountById(id);
  document.querySelectorAll(`#tr_${id} td`)[1].innerText = account.name;
  document.querySelectorAll(`#tr_${id} td`)[2].innerText = account.usname;
  document.querySelectorAll(`#tr_${id} td`)[3].innerText = account.psw;

  document.querySelectorAll(`#tr_${id} td`)[4].innerHTML = `
        <a  class="btn btn-edit" onclick="handleItemClick(${account.id})"
                ><i class="fa-solid fa-pen-to-square"></i>
        </a>
        <a class="btn btn-delete" onclick="handleRemoveItemClick(${account.id})"
                ><i class="fa-solid fa-trash"></i>
        </a>`;
}

function handleRemoveItemClick(id) {
  if (isEditing == false) {
    let account = findAccountById(id);
    if (account.usname != "admin") {
      let check = confirm(`Are you sure you want to remove ${account.usname}`);
      if (check) {
        deleteAccountById(id);
        localStorage.setItem(KEY_ACCOUNTS, JSON.stringify(accounts));
        renderAccountManager();
      }
    }
  }
}
function deleteAccountById(id) {
  for (let i = 0; i < accounts.length; i++) {
    if (accounts[i].id === id) {
      accounts.splice(i, 1);
      break;
    }
  }
}

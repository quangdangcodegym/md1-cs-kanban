/*
class Card {
  constructor(id, name) {
    (this.id = id), (this.name = name);
  }
}

class Board {
  constructor() {
    this.name = "";
    this.cards = [];
  }
}

class GroupBoard {
  constructor() {
    this.boards = [];
    this.name = "";
  }
}

let gb1 = new GroupBoard("Week1"); // gb1
let gb2 = new GroupBoard("Week2");

let bBackLog = new Board("Backlog");
let bToday = new Board("Today");
let bDoing = new Board("Doing");
a;
let t1 = new Card(1, "Hello"); // Backlog:  cards: [], Todo: cards[hello]
let t2 = new Card(2, "Hello2");
*/

class Card {
  constructor(id, name) {
    (this.id = id), (this.name = name);
  }
}

class Account {
  constructor(id, name, usname, psw) {
    this.id = id;
    this.name = name;
    this.usname = usname;
    this.psw = psw;
  }
}

let cardWeek1 = [];
let accounts = [];
let KEY_ACCOUNTS = "KEY_ACCOUNTS";
let KEY_CARDS_W1 = "KEY_CARDWEEK1";

initData();

function initData() {
  if (localStorage.getItem(KEY_CARDS_W1) != null) {
    cardWeek1 = JSON.parse(localStorage.getItem(KEY_CARDS_W1));
  } else {
    const card1 = new Card(1, "[Thực Hành] CASE TODO LIST");
    const card2 = new Card(2, "ABC");
    const card3 = new Card(3, "XYZ");
    cardWeek1 = [card1, card2, card3];

    localStorage.setItem("KEY_CARDS_W1", JSON.stringify(cardWeek1));
  }

  if (localStorage.getItem(KEY_ACCOUNTS) !== null) {
    accounts = JSON.parse(localStorage.getItem(KEY_ACCOUNTS));
  } else {
    const acc1 = new Account(1, "Admin", "admin", "password");
    accounts = [acc1];

    localStorage.setItem("KEY_ACCOUNTS", JSON.stringify(accounts));
  }
}

function findAccountById(id) {
  for (i = 0; i < accounts.length; i++) {
    if (accounts[i].id == id) {
      return accounts[i];
    }
  }
  return null;
}

function validateAccountUpd(accountUpd){
  if (accountUpd.name == "" || accountUpd.name == null) {
    alert("Name is a required");
    return false;
  }
  if (accountUpd.usname == "" || accountUpd.usname == null) {
    alert("User name is a required");
    return false;
  }
  if (accountUpd.psw == "" || accountUpd.psw == null) {
    alert("Password is a required");
    return false;
  }
  return true;
}

function validateAccount(account) {
  if (account.name == "" || account.name == null) {
    alert("Name is a required");
    return false;
  }
  if (account.usname == "" || account.usname == null) {
    alert("User name is a required");
    return false;
  }
  if (account.psw == "" || account.psw == null) {
    alert("Password is a required");
    return false;
  }

  for (i = 0; i < accounts.length; i++) {
    if (accounts[i].usname == account.usname) {
      alert("Username already exists");
      return false;
    }
  }
  return true;
}

function validateCard(card) {
  if (card.name == "") {
    return false;
  }
  return true;
}

function handleClickProf() {
  document.querySelector(".profile-option").style.display = "flex";
}

let modal = document.querySelector(".icon-prof");
let iProfile = document.querySelector("#iProfile");

function handleClickSet() {
  document.querySelector(".setting").style.display = "block";
}
let iSetting = document.querySelector("#iSetting");
window.onclick = function (evt) {
  if (evt.target !== modal && evt.target !== iProfile) {
    document.querySelector(".profile-option").style.display = "none";
  }
  if (evt.target !== iSetting) {
    document.querySelector(".setting").style.display = "none";
  }
};

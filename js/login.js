function handleClickEye() {
  let eyeIcon = document.querySelector(".eye i");
  if (eyeIcon.classList.contains("fa-eye")) {
    eyeIcon.classList.replace("fa-eye", "fa-eye-slash");
  } else if (eyeIcon.classList.contains("fa-eye-slash")) {
    eyeIcon.classList.replace("fa-eye-slash", "fa-eye");
  }
  let statusPsw = document.querySelector(".form-password");
  statusPsw.classList.toggle("open");
  if (statusPsw.classList.contains("open")) {
    statusPsw.querySelector("input").type = "text";
  } else {
    statusPsw.querySelector("input").type = "password";
  }
}

function handleLogin() {
  let usname = document.querySelector(".form-uname input").value;
  let password = document.querySelector(".form-password input").value;

  let accounts = JSON.parse(localStorage.getItem(KEY_ACCOUNTS));
  

  let loggedIn = false;
  let isAdmin = false;
  for (i = 0; i < accounts.length; i++) {
    let account = accounts[i];
    if(usname == "admin" && password == "password"){
      loggedIn = true;
      isAdmin = true;
      break;
    }else if(usname == account.usname && password == account.psw){
      loggedIn = true;
      break;
    }
  }

  if (loggedIn && isAdmin) {
    alert("Login Success!");
    window.location.href = "manager.html";
  }else if(loggedIn && isAdmin == false){
    alert("Login Success!");
    window.location.href = "main-menu.html";
  }
  else {
    alert('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin!');
  }
}

function handleRegister(){
    document.querySelector('.form-register').style.display = "flex"
}

function handleCancelRegis(){
    document.querySelector('.form-register').style.display = "none"
}

function handleBtnRegis(){
    let name = document.querySelectorAll(".form-register input")[0].value;
    let usname = document.querySelectorAll(".form-register input")[1].value;
    let password = document.querySelectorAll(".form-register input")[2].value;
    
    let accNew = new Account(accounts.length + 1, name, usname, password);
    if(validateAccount(accNew)){
        accounts.push(accNew);
        localStorage.setItem("KEY_ACCOUNTS", JSON.stringify(accounts));
        alert("Success Register!")
        window.location.href = "login.html"
    }
    
}
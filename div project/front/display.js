const login = document.getElementById("login_content");
const signup = document.getElementById("signup_contetnt");
const signupbox = document.getElementById("left");
const loginbox = document.getElementById("loginbox");
const back_signup = document.getElementById("back_signup");
const btnhaveaccount = document.getElementById("btn_haveaccount");
const forgetbox = document.getElementById("forgetbox");
const forget = document.getElementById("forget");
const back_login = document.getElementById("back_login");
back_login.addEventListener("click", (e) => {
  if (loginbox.style.display == "none") {
    signupbox.style.display = "none";
    loginbox.style.display = "block";
    forgetbox.style.display = "none";
    forgetbox.style.display = "none";
  } else {
    signupbox.style.display = "none";
  }
});
forget.addEventListener("click", (e) => {
  if (forgetbox.style.display == "none") {
    loginbox.style.display = "none";
    signupbox.style.display = "none";
    forgetbox.style.display = "block";
  } else {
    forgetbox.style.display = "none";
  }
});
btnhaveaccount.addEventListener("click", (e) => {
  if (loginbox.style.display == "none") {
    loginbox.style.display = "block";
    signupbox.style.display = "none";
    forgetbox.style.display = "none";
  } else {
    loginbox.style.display = "none";
  }
});
back_signup.addEventListener("click", (e) => {
  if (signupbox.style.display == "none") {
    signupbox.style.display = "block";
    loginbox.style.display = "none";
    forgetbox.style.display = "none";
  } else {
    signupbox.style.display = "none";
  }
});
signup.addEventListener("click", (e) => {
  if (signupbox.style.display == "none") {
    signupbox.style.display = "block";
    loginbox.style.display = "none";
    forgetbox.style.display = "none";
  } else {
    signupbox.style.display = "none";
  }
});

login.addEventListener("click", (e) => {
  if (loginbox.style.display == "none") {
    loginbox.style.display = "block";
    signupbox.style.display = "none";
    forgetbox.style.display = "none";
  } else {
    loginbox.style.display = "none";
  }
});

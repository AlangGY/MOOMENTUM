const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

const User_LS = "currentUser",
    SHOWING_CN = "showing";


function saveName(text){
    localStorage.setItem(User_LS, text);
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = input.value;
    saveName(currentValue);
    paintGreeting(currentValue);

}
function askForName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}


function paintGreeting(text) {
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;

}
function loadName() {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser === null) {
        //Greeting 미표시
        //Ask for Name
        askForName();
    } else {
        //Greeting 표시
        paintGreeting(currentUser)
    }
}
function init() {
    loadName();
}

init();
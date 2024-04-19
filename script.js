const addButton = document.getElementById("addButton");
const listType = document.getElementById("listType");
const textInForm = document.getElementById("listtext");
const formInput = document.getElementById("formInput");

function storage() {
  if (localStorage.length) {
    let session = localStorage.getItem("tasks");
    return JSON.parse(session);
  } else {
    return [];
  }
}

formInput.addEventListener("submit", (event) => {
  event.preventDefault();
  addLi();
});
addButton.addEventListener("click", addLi);

function addLi() {
  if (textInForm.value !== "") {
    // let liElement = document.createElement("li");
    // liElement.className = "listyle";
    // liElement.innerHTML = `<span>${textInForm.value}</span><div class="buttonBlock"><button class="editButton">ed</button><button class="delButton" >x</button></div>`;
    let sessionNow = storage();
    sessionNow.push(textInForm.value);
    localStorage.clear();
    localStorage.setItem("tasks", JSON.stringify(sessionNow));
    // listType.append(liElement);
    textInForm.value = "";
    oldSession();
  }
}

function del(event) {
  let session = storage();
  let textFromList = event.target
    .closest("li")
    .querySelector("span").textContent;
  let index = session.indexOf(textFromList);
  if (index !== "-1") {
    session.splice(index, 1);
  }
  localStorage.clear();
  localStorage.setItem("tasks", JSON.stringify(session));
  oldSession();
}

function edit(event) {
  let textToEdit = event.target.closest("li").querySelector("span");
  textToEdit.style.display = "none";
  let newInput = document.createElement("input");
  newInput.value = textToEdit.textContent;
  textToEdit.before(newInput);
  newInput.focus();
  event.target.style.backgroundColor = "rgba(25, 208, 64, 0.533)";
  event.target.textContent = "✓";
  document.removeEventListener("click", choose);
  document.addEventListener("click", editChoose);
}

function editChoose(event) {
  if (event.target.matches(".delButton")) {
    oldSession();
    document.addEventListener("click", choose);
  }
  if (event.target.matches(".editButton")) {
    if (
      event.target.closest("li").querySelector("span").textContent ==
      event.target.closest("li").querySelector("input").value
    ) {
      oldSession();
      document.addEventListener("click", choose);
    } else {
      let session = storage();
      let textofText = event.target
        .closest("li")
        .querySelector("span").textContent;
      let index = session.indexOf(textofText);
      if (index !== "-1") {
        session[index] = event.target
          .closest("li")
          .querySelector("input").value;
        localStorage.clear();
        localStorage.setItem("tasks", JSON.stringify(session));
        oldSession();
        document.addEventListener("click", choose);
      }
    }
  }
}

function oldSession() {
  if (localStorage.length) {
    let arraySession = storage();
    listType.innerHTML = arraySession
      .map(
        (value) =>
          `<li class="listyle"><span class='forSpan'>${value}</span><div class="buttonBlock"><button class="editButton">ed</button><button class="delButton">x</button></div></li>`
      )
      .join("");
  }
}

oldSession();

function choose(event) {
  if (event.target.matches(".delButton")) {
    del(event);
  }
  if (event.target.matches(".editButton")) {
    edit(event);
  }
}

document.addEventListener("click", choose);

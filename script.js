"use strict";

const todoContainer = document.querySelector(".todo-content");
const doingContainer = document.querySelector(".doing-content");
const doneContainer = document.querySelector(".done-content");
const createCardBtn = document.querySelector(".btn-create");
const modal = document.querySelector(".modal");
const type_value = document.querySelector(".type");
const openModal = document.querySelector(".name-work");
const title = document.getElementById("title-input");
const description = document.getElementById("description-input");
const time = document.getElementById("date-input");
const moveToDoToDoing = document.querySelector(".next");
const closeModal = document.querySelector(".close");
const blur = document.querySelector(".overlay");

let todo = [];
let doing = [];
let done = [];

const html = function (arr) {
  const card = document.createElement("div");
  card.classList.add("curt-style");
  if (arr.type === "todo") todoContainer.append(card);
  if (arr.type === "doing") doingContainer.append(card);
  if (arr.type === "done") doneContainer.append(card);

  const titleCard = document.createElement("h4");
  titleCard.textContent = `💫Title :${arr.title}`;
  titleCard.classList.add("dis-style");
  card.prepend(titleCard);
  const descriptionCard = document.createElement("h5");
  descriptionCard.textContent = `🖋️Description :${arr.description}`;
  descriptionCard.classList.add("dis-style");

  card.append(descriptionCard);
  const dateCard = document.createElement("h5");
  dateCard.textContent = `⏰Due time :${arr.time}`;
  dateCard.classList.add("date-style");
  card.append(dateCard);
  if (arr.type === "doing") {
    const next = document.createElement("a");
    next.classList.add("next");
    next.setAttribute("onclick", "moveDoing(event)");
    next.textContent = "➜";
    card.append(next);
  }
  if (arr.type === "done" || arr.type === "doing") return;
  const next = document.createElement("a");
  next.classList.add("next");
  next.setAttribute("onclick", "moveToDo(event)");
  next.textContent = "➜";
  card.append(next);
};
//recreate h1
const createToDo = function () {
  todoContainer.textContent = "";
  const h1 = document.createElement("h1");
  h1.textContent = "To Do";
  todoContainer.append(h1);
};
const createDoing = function () {
  doingContainer.textContent = "";
  const h1 = document.createElement("h1");
  h1.textContent = "Doing";
  doingContainer.append(h1);
};
const createDone = function () {
  doneContainer.textContent = "";
  const h1 = document.createElement("h1");
  h1.textContent = "Done";
  doneContainer.append(h1);
};
//open modal
openModal.addEventListener("click", function () {
  modal.classList.remove("hidden");
  modal.classList.add("transform");
  blur.classList.add("overlay-hidden");
});
//closeModal
closeModal.addEventListener("click", function () {
  modal.classList.add("hidden");
  modal.classList.remove("transform");
  blur.classList.remove("overlay-hidden");
});
//create card
createCardBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    (title.value === "" && description.value === "") ||
    description.value === "" ||
    time.value === ""
  ) {
    alert("please enter the requested information");
    return;
  }
  //add to todo
  if (type_value.value === "todo") {
    todo.push({
      title: title.value,
      description: description.value,
      time: time.value,
      type: type_value.value,
    });
    todo.length === 3 ? todoContainer.classList.add("overflow") : "";
    createToDo();
    title.value = description.value = " ";
    todo.forEach((e, i) => html(e));
    modal.classList.add("hidden");
    blur.classList.remove("overlay-hidden");
  }

  //add to doing
  if (type_value.value === "doing") {
    doing.push({
      title: title.value,
      description: description.value,
      time: time.value,
      type: type_value.value,
    });
    console.log(doing);
    doing.length === 4 ? doingContainer.classList.add("overflow") : "";
    createDoing();
    title.value = description.value = " ";
    doing.forEach((e, i) => html(e));
    modal.classList.add("hidden");
    blur.classList.remove("overlay-hidden");
  }
  //add to done
  if (type_value.value === "done") {
    done.push({
      title: title.value,
      description: description.value,
      time: time.value,
      type: type_value.value,
    });
    done.length === 2 ? doneContainer.classList.add("overflow") : "";
    doneContainer.textContent = "";
    const h1 = document.createElement("h1");
    h1.textContent = "Done";
    doneContainer.append(h1);
    title.value = description.value = " ";
    done.forEach((e, i) => html(e));
    modal.classList.add("hidden");
    blur.classList.remove("overlay-hidden");
  }
});
//move from todo to doing
function moveToDo(event) {
  let getTitle = event.target
    .closest(".curt-style")
    .firstElementChild.innerHTML.slice(9);
  const getDate = event.target
    .closest(".curt-style")
    .children[2].innerHTML.slice(11);
  const getDescription = event.target
    .closest(".curt-style")
    .children[1].innerHTML.slice(16);
  const findItem = todo.filter((e) => e.title !== getTitle);
  todo = findItem;
  createToDo();
  findItem.forEach((e, i) => html(e));
  doing.push({
    title: getTitle,
    description: getDescription,
    time: getDate,
    type: "doing",
  });
  createDoing();
  doing.forEach((e, i) => html(e));
  doing.length === 4 ? doingContainer.classList.add("overflow") : "";
}
//move doing to done
function moveDoing(event) {
  let getTitle = event.target
    .closest(".curt-style")
    .firstElementChild.innerHTML.slice(9);
  const getDate = event.target
    .closest(".curt-style")
    .children[2].innerHTML.slice(9);
  const getDescription = event.target
    .closest(".curt-style")
    .children[1].innerHTML.slice(14);
  const findItem = doing.filter((e) => e.title !== getTitle);
  doing = findItem;
  createDoing();
  findItem.forEach((e, i) => html(e));
  done.push({
    title: getTitle,
    description: getDescription,
    time: getDate,
    type: "done",
  });
  createDone();
  done.forEach((e, i) => html(e));
  done.length === 2 ? doneContainer.classList.add("overflow") : "";
}

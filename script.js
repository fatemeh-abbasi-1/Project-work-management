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

/////
const todo = [];
const doing = [];
const done = [];

/////////
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
  if (arr.type === "done") return;
  const next = document.createElement("a");
  next.classList.add("next");
  next.setAttribute("onclick", "moveToDo(event)");
  next.textContent = "➡️";
  card.append(next);
};
// console.log(html);

//open modal
openModal.addEventListener("click", function () {
  modal.classList.remove("hidden");
  modal.classList.add("transform");
});

//create card
createCardBtn.addEventListener("click", function (e) {
  e.preventDefault();
  console.log(type_value.value);
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
    console.log(todo);
    todo.length === 3 ? todoContainer.classList.add("overflow") : "";

    todoContainer.textContent = "";
    const h1 = document.createElement("h1");
    h1.textContent = "To Do";
    todoContainer.append(h1);

    title.value = description.value = " ";
    todo.forEach((e, i) => html(e));
    modal.classList.add("hidden");
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
    doingContainer.textContent = "";
    doingContainer.textContent = "";
    const h1 = document.createElement("h1");
    h1.textContent = "Doing";
    doingContainer.append(h1);
    title.value = description.value = " ";
    doing.forEach((e, i) => html(e));
    modal.classList.add("hidden");
  }
  //add to done
  if (type_value.value === "done") {
    done.push({
      title: title.value,
      description: description.value,
      time: time.value,
      type: type_value.value,
    });
    console.log(done);
    done.length === 2 ? doneContainer.classList.add("overflow") : "";
    doneContainer.textContent = "";
    const h1 = document.createElement("h1");
    h1.textContent = "Done";
    doneContainer.append(h1);
    title.value = description.value = " ";
    done.forEach((e, i) => html(e));
    modal.classList.add("hidden");
  }
});

//move from todo to doing
// moveToDoToDoing.addEventListener("click", function (e) {
//   console.log(e.target);
// });
function moveToDo(e) {
  const getTitle = e.target
    .closest(".curt-style")
    .firstElementChild.innerHTML.slice(9);
  console.log(getTitle);
  const findIndex = todo.findIndex((e) => e.title === getTitle);
  console.log(findIndex);

  todo.splice(todo[findIndex], 1);
  console.log(todo);

  // todoContainer.textContent = "";
  // const h1 = document.createElement("h1");
  // h1.textContent = "To Do";
  // todoContainer.append(h1);
  // todo.forEach((e, i) => html(e));
}
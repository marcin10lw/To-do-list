{
  let tasks = [
    {
      content: "Zjeść kanapkę",
      done: true,
    },

    {
      content: "Zrobić prace domową",
      done: false,
    },
  ];

  const render = () => {
    const listOfTasksElement = document.querySelector(".js-listOfTasks");

    let list = "";
    for (const task of tasks) {
      list += `
            <li class="section__task">
                <div class="section__contentContainer">
                    <button>1</button>    
                    ${task.content}
                </div>
                    <button class="js-deleteButton">usuń</button>
            </li>
        `;
    }

    listOfTasksElement.innerHTML = list;

    const deleteButtonElements = document.querySelectorAll(".js-deleteButton");
    deleteButtonElements.forEach((deleteButton, index) => {
      deleteButton.addEventListener("click", () => {
        tasks.splice(index, 1);
        render();
      });
    });
  };

  const addNewTask = (event) => {
    event.preventDefault();

    const inputContent = document.querySelector(".js-inputTask").value.trim();

    if (inputContent === "") {
      return;
    }

    tasks.push({ content: inputContent });
    render();
  };

  const setFocus = () => {
    const inputElement = document.querySelector(".js-inputTask");
    inputElement.focus();
  };

  const clearField = () => {
    let inputContent = document.querySelector(".js-inputTask");
    inputContent.value = "";
  };

  const init = () => {
    render();

    const buttonElement = document.querySelector(".js-inputButton");
    buttonElement.addEventListener("click", setFocus);
    buttonElement.addEventListener("click", addNewTask);
    buttonElement.addEventListener("click", clearField);
  };

  init();
}

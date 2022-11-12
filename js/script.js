{
  let tasks = [];

  const setFocus = () => {
    const inputElement = document.querySelector(".js-inputTask");
    inputElement.focus();
  };

  const clearField = () => {
    let inputContent = document.querySelector(".js-inputTask");
    inputContent.value = "";
  };

  const addNewTask = (event) => {
    event.preventDefault();
    setFocus();

    const inputContent = document.querySelector(".js-inputTask").value.trim();

    if (inputContent === "") {
      return;
    }

    tasks.push({ content: inputContent });
    render();

    clearField();
  };

  const toggleDone = () => {
    const toggleDoneButton = document.querySelectorAll(".js-toggleButton");

    toggleDoneButton.forEach((toggleButton, index) => {
      toggleButton.addEventListener("click", () => {
        tasks[index].done = !tasks[index].done;
        render();
      });
    });
  };

  const deleteTask = () => {
    const deleteButtonElements = document.querySelectorAll(".js-deleteButton");

    deleteButtonElements.forEach((deleteButton, index) => {
      deleteButton.addEventListener("click", () => {
        tasks.splice(index, 1);
        render();
      });
    });
  };

  const render = () => {
    const listOfTasksElement = document.querySelector(".js-listOfTasks");

    let list = "";
    for (const task of tasks) {
      list += `
        <li class="section__task">
            <div class="section__contentContainer">
                <button class="section__listButton js-toggleButton 
                   ${
                     task.done
                       ? "section__toggleButton--done"
                       : "section__toggleButton--notDone"
                   }">
                </button>
                        
                <p class="section__paragraph ${
                  task.done ? "section__paragraph--done" : ""
                }">
                    ${task.content}
                </p>
            </div>
                    <button class="
                      section__listButton 
                      section__listButton--delete 
                      js-deleteButton">
                    </button>
        </li>
        `;
    }

    listOfTasksElement.innerHTML = list;

    deleteTask();
    toggleDone();
  };

  const init = () => {
    render();

    const buttonElement = document.querySelector(".js-inputButton");
    buttonElement.addEventListener("click", addNewTask);
  };

  init();
}

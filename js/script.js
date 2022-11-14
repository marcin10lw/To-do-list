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

  const bindToggleDone = () => {
    const toggleDoneButton = document.querySelectorAll(".js-toggleButton");

    toggleDoneButton.forEach((toggleButton, index) => {
      toggleButton.addEventListener("click", () => {
        tasks[index].done = !tasks[index].done;
        render();
      });
    });
  };

  const bindDeleteTask = () => {
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

    let tasksListHtmlContent = "";
    for (const task of tasks) {
      tasksListHtmlContent += `
        <li class="listOfTasks__task">
            <div class="listOfTasks__contentContainer">
                <button class="listOfTasks__listButton js-toggleButton 
                   ${
                     task.done
                       ? "listOfTasks__toggleButton--done"
                       : "listOfTasks__toggleButton--notDone"
                   }">
                </button>
                        
                <span class="listOfTasks__content ${
                  task.done ? "listOfTasks__content--done" : ""
                }">
                    ${task.content}
                </span>
            </div>
                    <button class="
                      listOfTasks__listButton 
                      listOfTasks__listButton--delete 
                      js-deleteButton">
                    </button>
        </li>
        `;
    }

    listOfTasksElement.innerHTML = tasksListHtmlContent;

    bindDeleteTask();
    bindToggleDone();
  };

  const init = () => {
    render();

    const buttonElement = document.querySelector(".js-inputButton");
    buttonElement.addEventListener("click", addNewTask);
  };

  init();
}

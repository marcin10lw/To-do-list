{
  let tasks = [];
  let hideDoneTasks = false;

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

    tasks = [...tasks, { content: inputContent }];
    render();

    clearField();
  };

  let doneValue = false;

  const toggleDone = (taskIndex) => {
    doneValue = !doneValue;

    tasks = tasks.map((task) => {
      if (task === tasks[taskIndex]) {
        return { ...task, done: doneValue };
      }

      return task;
    });

    render();
  };

  const bindToggleDone = () => {
    const toggleDoneButton = document.querySelectorAll(".js-toggleButton");

    toggleDoneButton.forEach((toggleButton, index) => {
      toggleButton.addEventListener("click", () => {
        toggleDone(index);
      });
    });
  };

  const deleteTask = (taskIndex) => {
    tasks = [...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex + 1)];
    render();
  };

  const bindDeleteTask = () => {
    const deleteButtonElements = document.querySelectorAll(".js-deleteButton");

    deleteButtonElements.forEach((deleteButton, index) => {
      deleteButton.addEventListener("click", () => {
        deleteTask(index);
      });
    });
  };

  const bindButtonsEvents = () => {
    if (tasks.length !== 0) {
      const hideButtonElement = document.querySelector(".js-hideDoneButton");

      hideButtonElement.addEventListener("click", () => {
        hideDoneTasks = !hideDoneTasks;
        render();
      });
    }
    return;
  };

  const renderTasks = () => {
    const listOfTasksElement = document.querySelector(".js-listOfTasks");

    let tasksListHtmlContent = "";
    for (const task of tasks) {
      tasksListHtmlContent += `
        <li class="listOfTasks__task ${
          task.done && hideDoneTasks ? "listOfTasks__task--hiden" : ""
        }">
            
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
            
                <button class="
                  listOfTasks__listButton 
                  listOfTasks__listButton--delete 
                  js-deleteButton">
                </button>
        </li>
        `;
    }

    listOfTasksElement.innerHTML = tasksListHtmlContent;
  };

  const renderButtons = () => {
    const buttonsContainerElement = document.querySelector(
      ".js-eventButtonsContainer"
    );

    if (tasks.length !== 0) {
      let tasksEventButtonsContent = `
      <button class="js-hideDoneButton">Hide completed</button>
      <button class="js-completeAllButton">Complete all</button>
    `;

      buttonsContainerElement.innerHTML = tasksEventButtonsContent;
    } else {
      buttonsContainerElement.innerHTML = "";
    }
  };

  const render = () => {
    renderTasks();
    renderButtons();

    bindDeleteTask();
    bindToggleDone();
    bindButtonsEvents();
  };

  const init = () => {
    render();
    const buttonElement = document.querySelector(".js-inputButton");
    buttonElement.addEventListener("click", addNewTask);
  };

  init();
}

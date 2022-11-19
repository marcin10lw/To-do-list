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

  const addNewTask = () => {
    const inputContent = document.querySelector(".js-inputTask").value.trim();

    if (inputContent === "") {
      return;
    }

    tasks = [...tasks, { content: inputContent }];
    render();

    clearField();
  };

  const onAddTaskButtonClick = (event) => {
    event.preventDefault();

    addNewTask();
    setFocus();
  };

  const toggleDone = (taskIndex) => {
    tasks = tasks.map((task) => {
      return task === tasks[taskIndex] ? { ...task, done: !task.done } : task;
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

  const isAnyCompleted = () => {
    return tasks.some(({ done }) => done);
  };

  const hideDone = () => {
    if (isAnyCompleted()) {
      hideDoneTasks = !hideDoneTasks;
      render();
    }
    return;
  };

  const bindHideDone = () => {
    if (tasks.length !== 0) {
      const hideDoneButton = document.querySelector(".js-hideDoneButton");

      hideDoneButton.addEventListener("click", hideDone);
    }
    return;
  };

  const completeAllTasks = () => {
    tasks = tasks.map((task) => {
      return { ...task, done: true };
    });

    render();
  };

  const bindCompleteAll = () => {
    if (tasks.length !== 0) {
      const completeAllButton = document.querySelector(".js-completeAllButton");

      completeAllButton.addEventListener("click", completeAllTasks);
    }
  };

  const bindButtonsEvents = () => {
    bindHideDone();
    bindCompleteAll();
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
      <button class="section__button js-hideDoneButton">
        ${hideDoneTasks ? "Pokaż ukończone" : "Ukryj ukończone"}
      </button>

      <button 
        class="section__button ${
          tasks.every(({ done }) => done) ? "section__button--completed" : ""
        } js-completeAllButton"

        ${tasks.every(({ done }) => done) ? "disabled" : ""}
      >
          Ukończ wszystkie
      </button>
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
    buttonElement.addEventListener("click", onAddTaskButtonClick);
  };

  init();
}

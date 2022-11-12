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
                <div>
                    <button>1</button>    
                    ${task.content}
                </div>
                    <button>2</button>
            </li>
        `;
    }

    listOfTasksElement.innerHTML = list;
  };

  const init = () => {
    render();
  };

  init();
}

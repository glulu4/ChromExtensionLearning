let taskArr = []

function updateTime() {
    chrome.storage.local.get(["timer", "timeOption", "isRunning"], (res) => {
        const time = document.getElementById("time")
        const minutes = `${res.timeOption - Math.ceil(res.timer / 60)}`.padStart(2, "0")
        let seconds = "00"
        if (res.timer % 60 != 0) {
            seconds = `${60 - res.timer % 60}`.padStart(2, "0")
        }
        time.textContent = `${minutes}:${seconds}`
        startTimerBtn.textContent = res.isRunning ? "Pause Timer" : "Start Timer"
    })
}
updateTime()
setInterval(updateTime, 1000 )



const startTimerBtn = document.getElementById("start-timer-btn")
startTimerBtn.addEventListener("click", () => {
  chrome.storage.local.get(["isRunning"], (res) => {
    chrome.storage.local.set({
      isRunning: !res.isRunning
    }, () => {
        startTimerBtn.textContent = !res.isRunning ? "Pause Timer" : "Start Timer"
        // .textContent reaches into the html and updates the name of the button depending on the truthiness of ' !res.isRunning '
    })
  })
})


const resetTimerBtn = document.getElementById("reset-timer-btn")
resetTimerBtn.addEventListener("click", () => {
  chrome.storage.local.set({
    timer : 0,
    isRunning : false
  }, () => {
    startTimerBtn.textContent = "Start Timer"
  })
})

const addTaskBtn = document.getElementById("add-task-btn")
addTaskBtn.addEventListener("click", () => addTask() )

// pulls from the set method below... same thingies
chrome.storage.sync.get(["tasks"], (resOfCbk) => {
  taskArr = resOfCbk.tasks ? resOfCbk.tasks : []
  renderTasks()
})


function saveTask(){
  chrome.storage.sync.set({
    tasks: taskArr // if the array was called ' tasks' i could've written 'tasks,' where it would equal
  })               // tasks ( somehting i need a name for ) : tasks
}




function renderTask(taskArrLength){
  const taskRow = document.createElement("div")
  const text = document.createElement("input")
  text.type = "text"
  text.placeholder = "Enter a task..."
  text.value = taskArr[taskArrLength]
  text.className = "task-input" // adding a class name so that we can design it in the css
  text.addEventListener("change", () => {
    taskArr[taskArrLength] = text.value
    saveTask()
  })

  const deleteBtn = document.createElement("input")
  deleteBtn.type = "button"
  deleteBtn.value = "X"
  deleteBtn.className = "task-delete" // adding a class name so that we can design it in the css
  deleteBtn.addEventListener("click", () => {
    deleteTask(taskArrLength)
  })


  taskRow.appendChild(text)
  taskRow.appendChild(deleteBtn)
  const taskContainer = document.getElementById("task-container")
  taskContainer.appendChild(taskRow)


}

function addTask(){
  const taskArrLength = taskArr.length // storing length so that the task can be stored at teh indexed length
  taskArr.push("") // everytime a task is added, an empty sttring is added to array
  renderTask(taskArrLength)
  saveTask()
}

function deleteTask(taskArrLength){
  taskArr.splice(taskArrLength, 1)
  renderTasks()
  saveTask()
}

function renderTasks(){
  const taskContainer = document.getElementById("task-container")
  taskContainer.textContent = "" // removes all children of the element
  taskArr.forEach((item, taskArrLength) => {
    renderTask(taskArrLength)
  });

}

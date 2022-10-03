
const timeElem = document.getElementById("time")
const timerElem = document.getElementById("timer")





function updateTimeElements(){

  chrome.storage.local.get( ["timer"], (result) => {
    const time = result.timer ?? 0
    timerElem.textContent = `Timer is at ${time} seconds`
  })

  const currTime = new Date().toLocaleTimeString()
  timeElem.textContent = `The time is: ${currTime}`


}




updateTimeElements() // calling it beforehand because setInterval takes a second
setInterval(updateTimeElements, 1000)


const nameElem = document.getElementById("name")
// explained in options.js
chrome.storage.sync.get(["name"], (resultOfCallBack) => {
  const name = resultOfCallBack.name ?? "No name yet" // ?? operator:  if the left side evaluates to null, var gets the string
  nameElem.textContent = `Your name is ${name}`
})




const startBtn = document.getElementById("start")
const stopBtn = document.getElementById("stop")
const resetBtn = document.getElementById("reset")

startBtn.addEventListener("click", () => {
  chrome.storage.local.set({
    isRunning: true,

  })
})

stopBtn.addEventListener("click", () => {
  chrome.storage.local.set({
    isRunning: false,
  })
})

resetBtn.addEventListener("click", () => {
  chrome.storage.local.set({
    timer: 0,
    isRunning: false,
  })
})

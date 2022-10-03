const timeOption = document.getElementById("time-option")
timeOption.addEventListener("change", (event) => {
  const val = event.target.value // value of whatever the number is the input field
  if ( val < 1 || val > 60 ){
    timeOption.value = 25 // default
  }
})

const saveBtn = document.getElementById("save-button")

saveBtn.addEventListener("click", () => {
  chrome.storage.local.set({
    timeOption: timeOption.value,
    timer:0,
    isRunning:false // setting the timer and running variables back to starter values if user is chnaging the time

  })
})

chrome.storage.local.get(["timeOption"], (res) => {
  timeOption.value = res.timeOption

})

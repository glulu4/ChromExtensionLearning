
chrome.alarms.create("Pomodor Timer", {
  periodInMinutes: 1/60
})


chrome.alarms.onAlarm.addListener((alarm) => {
  if ( alarm.name === "Pomodor Timer" ){
    chrome.storage.local.get(["timer", "isRunning", "timeOption"], (res) => {
      if (res.isRunning){
        let timer = res.timer + 1
        let isRunning = true
        if ( timer === 60*res.timeOption){
          this.registration.showNotification("Pomodoro Timer", {
            body: `${res.timeOption} minutes have passed`,
            icon: "icon.png"
          })
          timer = 0
          isRunning = false
        }
        chrome.storage.local.set({
          timer, // shorthand for saying timer: timer
          isRunning,
        })
      }
    })
  }
})


chrome.storage.local.get(["timer","isRunning","timeOption"], (res) => {
  chrome.storage.local.set({
    timer: "timer" in res ? res.timer: 0, // "timer" in res checks to see if key 'timer' is in the res object
    isRunning :"isRunning" in res? res.isRunning : false,
    timeOption: "timeOption" in res? res.timeOption: 25

  })
})


chrome.alarms.create({
  periodInMinutes: 1/60,

})
chrome.alarms.onAlarm.addListener( (alarm) => {

  chrome.storage.local.get(["timer","isRunning"], (result) => {
    const time = result.timer ?? 0 // sets time to zero if result.timer is null
    const isRunning = result.isRunning ?? true // timer runs by default

    if ( !isRunning )
      return


    chrome.storage.local.set({
      timer: time + 1
    })
    chrome.action.setBadgeText({
      text: `${time +1}`
    })

    chrome.storage.sync.get(["name","notificationTime"], (res) => {
      const notificationTime = res.notificationTime ?? 1000
      if ( time % notificationTime == 0 ){
        this.registration.showNotification("Chrome Timer Extension", {
          body: `${notificationTime} seconds has passed`, // text inside notification
          icon: "icon.png",
        })
      }

    })
  })
})



//console.log(this) //'this' has a buncg of elements

// let time = 0

// 1st param is a function, second is how oftern it shoudl be called in milli seconds... 1 sec = 1000
// setInterval( () => {
//   time += 1
//   console.log(time)
// }, 1000)

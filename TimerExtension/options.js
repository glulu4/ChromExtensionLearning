
const nameInput = document.getElementById("name-input")
const submitBtn = document.getElementById("name-button")
const timeInput = document.getElementById("time-input")

submitBtn.addEventListener("click" , () => { // "click" is for the clikc event; second parama is callback function
  const name = nameInput.value
  const notificationTime = timeInput.value
  chrome.storage.sync.set({      // 1st param: object to be stored(name), second is the callback function
    name, // could have been name : nameInput.value
    notificationTime,
  })
})
// first param is array of key-value we want oto get, in our case name is teh key and teh vaklue is whsatver
// second is callabck with a param...
// the array in the get function is connected to the set above with the same
chrome.storage.sync.get(["name", "notificationTime"], (resultOfCallBack) => {
  nameInput.value = resultOfCallBack.name ?? "No name yet either" // explained in popup.js
  // the plain resultOfCallBack gives: {name: inputted name} so we tap into the data feild with.name
  timeInput.value = resultOfCallBack.notificationTime ?? 1000
})


console.log("hello wokrd")

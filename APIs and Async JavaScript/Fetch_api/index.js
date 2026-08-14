
fetch("https://dog.ceo/api/breeds/image/random")
    .then(response => response.json())
    .then(data => {
        console.log(data)
        document.getElementById("image-container").innerHTML = `
            <img src="${data.message}" />
        `
    })

/**
Challenge: 

1. Fetch a random activity from the Bored API
url: https://apis.scrimba.com/bored/api/activity

2. Display the text of the activity in the browser
*/

fetch("https://apis.scrimba.com/bored/api/activity")
    .then(response => response.json())
    .then(data =>{
        console.log(data)
        document.getElementById("activity-container").innerHTML = `
            <p>${data.activity}</p>
        `                   
    })
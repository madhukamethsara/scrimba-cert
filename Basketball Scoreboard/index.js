const home = document.getElementById("home-score")
let homeScore = 0
home.textContent = homeScore

const guest = document.getElementById("guest-score")
let guestScore = 0
guest.textContent = guestScore


function add(amount){
    homeScore += amount
    home.textContent = homeScore
}


function add1(amount){
    guestScore += amount
    guest.textContent =guestScore
}
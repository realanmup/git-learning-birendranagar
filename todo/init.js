document.addEventListener("DOMContentLoaded", init())

function init() {
    updateDay();
    showClock();
}

function updateDay() {
    const startDate = new Date('2026-06-06')
    const today = new Date() 
    const diffinMS = Math.abs(today - startDate)
    const diffInDays = Math.floor(diffinMS / (1000*60*60*24))
    const dayCountSpan = document.getElementById('dayCount')
    dayCountSpan.textContent = diffInDays
}

const colorPallate = ["purple", "aqua", "#1F51FF", "red", "skyblue"];


function showClock() {
    const h2Tag = document.querySelector("h2")

    
    setInterval(function() {
        h2Tag.textContent = new Date().toLocaleTimeString();
        const randomValue = Math.floor(Math.random()*10);
        

        h2Tag.style.color = colorPallate[colorPallate.length%randomValue]
    }, 1000)
}

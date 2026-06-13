import axios from 'axios'

function printConsole() {
    console.log('ok')
}

function getPost() {
    try {
        axios.get("https://api.thecatapi.com/v1/images/search?limit=10").then(function(response) {

            console.log("data", response.data);
        })
    } catch(error) {
        console.error('request error')
    }
}


getPost()
printConsole()
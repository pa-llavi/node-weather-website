

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })



//getting data form the user through form
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

//to show data to user for which they searched
const messageOne = document.querySelector('#message-1')
//messageOne.textContent = 'text to show'
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    //used to pervent the page from refreshing just after event listner and allow the user to see the result
    e.preventDefault()

    //"value" extracts the input that was provided for searching and that is stored in the locn variable
    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    
    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error
        } else {
            messageOne.textContent =  data.location
            messageTwo.textContent = data.forecast
        }
    })
})
})
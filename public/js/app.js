console.log('Client side js file is loaded')


fetch('http://localhost:3000/weather?address=Boston').then((response) => {
  response.json().then((data) => {
    if (data.error) {
      console.log(data.error)
    } else {
      console.log(data.location)
      console.log(data.forecast)
    }
  })
})

const weatherFrom = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherFrom.addEventListener('submit',(e) => {
  e.preventDefault()

  const location = search.value

  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''
  fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
      messageOne.textContent = ''
      if (data.error) {
        messageTwo.textContent = data.error
        console.log(data.error)
      } else {
        messageTwo.textContent = 'In ' + data.location + ' it is currently ' + data.temperature
        console.log(data.location)
        console.log(data.temperature)
      }
    })
  })
})

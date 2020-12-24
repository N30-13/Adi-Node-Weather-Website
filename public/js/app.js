const weatherFrom = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherFrom.addEventListener('submit',(e) => {
  e.preventDefault()

  const location = search.value

  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''
  fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
      messageOne.textContent = ''
      if (data.error) {
        messageTwo.textContent = data.error
        console.log(data.error)
      } else {
        messageTwo.textContent = 'In ' + data.location + ' it is currently ' + data.temperature + "° farenheight. It feels like " + data.feels_like
        console.log(data.location)
        console.log(data.temperature)
      }
    })
  })
})

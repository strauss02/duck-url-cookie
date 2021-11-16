import './style.css'
import axios from 'axios'
import './modal.js'
import './elements.js'
// const baseURL = 'http://localhost:3000'
const baseURL = window.location.href
// TODO: DECIDE BASE URL BASED ON ENV

const inputField = document.getElementById('url_input')
const submitBtn = document.getElementById('submit-btn')
const sampleText = document.querySelector('h3')
const copyButton = document.getElementById('btn-copy-url')
const alertBox = document.getElementById('alert-box')
// const newUrlsection = document.getElementById('new-url-container')
const alertSection = document.getElementById('alert-container')
const newUrlBox = document.getElementById('new-url')
const logInButton = document.querySelector('.login-button')
const LoginModal = document.querySelector('.login-modal-container')

copyButton.addEventListener('click', handleCopy)
submitBtn.addEventListener('click', handleSubmit)
logInButton.addEventListener('click', handleLogInClick)

async function handleSubmit(e) {
  try {
    const inputURL = inputField.value
    assertUrlFilled(inputURL)
    console.log(inputURL)
    const newURL = await axios
      .post(
        `/`,
        { userURL: inputURL },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
          },
        }
      )
      .then((res) => {
        console.log(res.data)
        return res.data
      })

    // REPLACE BEFORE DEPLOYMENT
    newUrlBox.innerText = `${baseURL}/${newURL}`
    newUrlBox.href = `${baseURL}${newURL}`
    displayAlert('Success! Try out your new URL now!')
    toggleVisibility(alertSection, true)
    toggleAlertStyle(false)
    toggleVisibility(copyButton, true)
    toggleVisibility(newUrlBox, true)
    toggleVisibility(sampleText, false)
  } catch (error) {
    displayAlert(error.response ? error.response.data : error)
    toggleVisibility(alertSection, true)
    toggleAlertStyle(true)
  }
}

function handleCopy() {
  navigator.clipboard.writeText(newUrlBox.innerText)
}

function handleLogInClick() {
  toggleVisibility(LoginModal, true)
}

function assertUrlFilled(url) {
  if (!url) {
    throw new Error('Huh? Theres nothing to convert here...')
  }
}

function displayAlert(message) {
  alertBox.innerText = message
}

function toggleAlertStyle(isError) {
  if (document.querySelector('.success') && isError) {
    alertBox.classList.toggle('failure')
    alertBox.classList.remove('success')
  } else if (document.querySelector('.failure') && !isError) {
    alertBox.classList.toggle('success')
    alertBox.classList.remove('failure')
  }
}

function toggleVisibility(element, isVisible) {
  if (isVisible && element.classList.contains('hider')) {
    element.classList.remove('hider')
    return
  }
  if (!isVisible && !element.classList.contains('hider')) {
    element.classList.add('hider')
  }
}

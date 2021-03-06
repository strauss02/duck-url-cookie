import axios from 'axios'
import Elements from './elements'
import Utility from './utility'

const LoginModal = document.querySelector('.login-modal-container')

const displayModalLoginButton = document.querySelector('.modal-login-button')
const displayModalSignupButton = document.querySelector('.modal-signup-button')

const modalContentLogin = document.querySelector('.modal-content-login')
const modalContentSignup = document.querySelector('.modal-content-signup')

const modalLoginButton = document.querySelector('.login-user-button')
const modalSignupButton = document.querySelector('.create-user-button')

const modalLoginUsernameInput = document.querySelector('#login-username')
const modalLoginPasswordInput = document.querySelector('#login-password')

const modalSignupUsernameInput = document.querySelector('#signup-username')
const modalSignupPasswordInput = document.querySelector('#signup-password')

modalLoginPasswordInput.type = 'password'
modalSignupPasswordInput.type = 'password'

/* ========================== */

displayModalLoginButton.addEventListener('click', handleModalDisplayLoginClick)
displayModalSignupButton.addEventListener(
  'click',
  handleModalDisplaySignupClick
)

modalLoginButton.addEventListener('click', handleLoginClick)
modalSignupButton.addEventListener('click', handleSignupClick)

Elements.exitButton.addEventListener('click', handleModalExit)

function handleModalDisplayLoginClick() {
  Utility.toggleVisibility(modalContentLogin, true)
  Utility.toggleVisibility(modalContentSignup, false)
}

function handleModalDisplaySignupClick() {
  Utility.toggleVisibility(modalContentLogin, false)
  Utility.toggleVisibility(modalContentSignup, true)
}

async function handleSignupClick() {
  const reqUsername = modalSignupUsernameInput.value
  const reqPassword = modalSignupPasswordInput.value
  if (reqUsername === '' || reqPassword === '') {
    Utility.toggleVisibility(Elements.modalAlert, true)
    Elements.modalAlert.innerText =
      'Please fill the missing data before clicking sign up'
    return
  }

  await axios
    .post('/new-user', { username: reqUsername, password: reqPassword })
    .then((res) => {
      Utility.toggleVisibility(LoginModal, false)
      Utility.toggleVisibility(Elements.alertSection, true)
      Utility.displayAlert('User successfuly created!')
    })
    .catch((err) => {
      Utility.toggleVisibility(Elements.modalAlert, true)
      Elements.modalAlert.innerText = err.response.data
      console.log(err)
    })
}

function handleModalExit() {
  Utility.toggleVisibility(LoginModal, false)
}

function handleLoginClick() {
  const reqUsername = modalLoginUsernameInput.value
  const reqPassword = modalLoginPasswordInput.value

  axios
    .post('/user/login', { username: reqUsername, password: reqPassword })
    .then((res) => {
      console.log(res)
      Utility.toggleVisibility(LoginModal, false)
      Utility.toggleVisibility(Elements.alertSection, true)
      Utility.displayAlert('Logged in! Welcome back!')
      localStorage.setItem('accessToken', res.data.accessToken)
      localStorage.setItem('refreshToken', res.data.refreshToken)
    })
    .catch((err) => {
      console.log(`Wow! ${err}`)
      Utility.toggleVisibility(Elements.modalAlert, true)
    })
}

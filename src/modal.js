import axios from 'axios'
import Utility from './utility'

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

/* ========================== */

displayModalLoginButton.addEventListener('click', handleModalDisplayLoginClick)
displayModalSignupButton.addEventListener(
  'click',
  handleModalDisplaySignupClick
)

modalLoginButton.addEventListener('click', handleLoginClick)
modalSignupButton.addEventListener('click', handleSignupClick)

function handleModalDisplayLoginClick() {
  Utility.toggleVisibility(modalContentLogin, true)
  Utility.toggleVisibility(modalContentSignup, false)
}

function handleModalDisplaySignupClick() {
  Utility.toggleVisibility(modalContentLogin, false)
  Utility.toggleVisibility(modalContentSignup, true)
}

function handleSignupClick() {
  const reqUsername = modalSignupUsernameInput.value
  const reqPassword = modalSignupPasswordInput.value

  axios.post('/new-user', { username: reqUsername, password: reqPassword })
}
function handleLoginClick() {}

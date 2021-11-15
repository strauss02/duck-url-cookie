import Utility from './utility'

const displayModalLoginButton = document.querySelector('.modal-login-button')
const displayModalSignupButton = document.querySelector('.modal-signup-button')

const modalContentLogin = document.querySelector('.modal-content-login')
const modalContentSignup = document.querySelector('.modal-content-signup')

const modalLoginButton = document.querySelector('.modal-content-signup')
const modalSignupButton = document.querySelector('.modal-content-signup')

displayModalLoginButton.addEventListener('click', handleModalDisplayLoginClick)
displayModalSignupButton.addEventListener(
  'click',
  handleModalDisplaySignupClick
)

modalLoginButton.addEventListener('click', handleSignupClick)
modalSignupButton.addEventListener('click', handleLoginClick)

function handleModalDisplayLoginClick() {
  Utility.toggleVisibility(modalContentLogin, true)
  Utility.toggleVisibility(modalContentSignup, false)
}

function handleModalDisplaySignupClick() {
  Utility.toggleVisibility(modalContentLogin, false)
  Utility.toggleVisibility(modalContentSignup, true)
}

function handleSignupClick() {}
function handleLoginClick() {}

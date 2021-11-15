class Elements {
  static inputField = document.getElementById('url_input')
  static submitBtn = document.getElementById('submit-btn')
  static sampleText = document.querySelector('h3')
  static copyButton = document.getElementById('btn-copy-url')
  static alertBox = document.getElementById('alert-box')
  //  newUrlsection = document.getElementById('new-url-container')
  static alertSection = document.getElementById('alert-container')
  static newUrlBox = document.getElementById('new-url')
  static logInButton = document.querySelector('.login-button')
  static LoginModal = document.querySelector('.login-modal-container')
}

console.log(
  'hey this is from elments.js, here is an element',
  Elements.alertBox
)

export default Elements

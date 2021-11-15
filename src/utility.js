import Elements from './elements'

class Utility {
  static toggleVisibility(element, isVisible) {
    if (isVisible && element.classList.contains('hider')) {
      element.classList.remove('hider')
      return
    }
    if (!isVisible && !element.classList.contains('hider')) {
      element.classList.add('hider')
    }
  }

  static displayAlert(message) {
    Elements.alertBox.innerText = message
  }

  static toggleAlertStyle(isError) {
    if (document.querySelector('.success') && isError) {
      Elements.alertBox.classList.toggle('failure')
      Elements.alertBox.classList.remove('success')
    } else if (document.querySelector('.failure') && !isError) {
      Elements.alertBox.classList.toggle('success')
      Elements.alertBox.classList.remove('failure')
    }
  }
}

export default Utility

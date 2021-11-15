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
}

export default Utility

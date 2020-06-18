/**
 * Block ads every 30 seconds for 30 minutes
 */
function blocker() {
  let interval = null
  let timeout = null
  return function blockAds () {
    clearInterval(interval)
    clearTimeout(timeout)
    interval = setInterval(() => {
      const adIFrames = [...document.querySelectorAll('iframe:not([id])')]
      // Move ads away from screen
      adIFrames.forEach((iframe) => (iframe.style.bottom = '-10000px'))
    }, 1000 * 15)
    timeout = setTimeout(() => {
      clearInterval(interval)
    }, 1000 * 60 * 30)
  }
}

const adBlocker = blocker()
adBlocker()

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === 'TabUpdated') {
    adBlocker()
  }
})

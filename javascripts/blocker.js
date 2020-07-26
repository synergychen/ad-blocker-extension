/**
 * Block ads every 30 seconds for 30 minutes
 */
function blocker() {
  const intervalTime = 5 * 1000
  const duration = 3 * 60 * 60 * 1000
  let interval = null
  let timeout = null
  return function blockAds () {
    clearInterval(interval)
    clearTimeout(timeout)
    interval = setInterval(() => {
      const adIFrames = [...document.querySelectorAll('iframe:not([id])')]
      // Move ads away from screen
      adIFrames.forEach((iframe) => (iframe.style.bottom = '-10000px'))
    }, intervalTime)
    timeout = setTimeout(() => {
      clearInterval(interval)
    }, duration)
  }
}

const adBlocker = blocker()
adBlocker()

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === 'TabUpdated') {
    adBlocker()
  }
})

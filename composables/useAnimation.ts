export default function useAnimation() {
  const ANIMATION_KEY = 'nuxt-loading-enable-animation'
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)

  let isLowPerformance = checkIsLowPerformance()
  let enableAnimation =
    localStorage.getItem(ANIMATION_KEY) === 'false'
      ? false
      : localStorage.getItem(ANIMATION_KEY) === 'true'
      ? true
      : !isLowPerformance

  const mouseLight = window.document.getElementById('mouseLight')
  const nuxtImg = window.document.getElementById('nuxtImg')
  const animationToggle = window.document.getElementById('animation-toggle')
  const body = window.document.body
  let bodyRect

  function checkIsLowPerformance() {
    return (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      navigator.hardwareConcurrency < 2 ||
      navigator.deviceMemory < 1 ||
      // Safari has some performance issue on the blur filter. Remove this when it's fixed.
      isSafari
    )
  }
  function calculateDistance(
    elem: HTMLElement,
    mouseX: number,
    mouseY: number
  ) {
    return Math.floor(
      Math.sqrt(
        Math.pow(mouseX - (elem.x + elem.width / 2), 2) +
          Math.pow(mouseY - (elem.top + elem.height / 2), 2)
      )
    )
  }
  function onFocusOut() {
    if (!enableAnimation) {
      return
    }
    mouseLight.style.opacity = 0
    nuxtImg.style.opacity = 0.7
  }
  function onMouseMove(e) {
    if (!enableAnimation) {
      return
    }
    const pointerRect = nuxtImg.getBoundingClientRect()
    if (!bodyRect) {
      bodyRect = body.getBoundingClientRect()
    }
    const distance = calculateDistance(pointerRect, e.pageX, e.pageY)
    const size = Math.max((1000 - distance) / 2 / 100, 1)

    mouseLight.style.top = `${
      e.clientY - bodyRect.y - mouseLight.clientHeight / 2
    }px`
    mouseLight.style.left = `${e.clientX - mouseLight.clientWidth / 2}px`
    mouseLight.style.width = mouseLight.style.height = `${Math.max(
      Math.round(size * 100),
      300
    )}px`
    mouseLight.style.filter = `blur(${Math.min(
      Math.max(size * 50, 100),
      160
    )}px)`
    mouseLight.style.opacity = Math.min(Math.max(size / 4, 0.6), 1)

    const dx = e.pageX - pointerRect.left
    const dy = e.pageY - pointerRect.top
    const logoGradient = `radial-gradient(circle at ${dx}px ${dy}px, black 75%, transparent 100%)`
    nuxtImg.style['-webkit-mask-image'] = logoGradient
    nuxtImg.style['mask-image'] = logoGradient
    nuxtImg.style.opacity = Math.min(Math.max(size / 4, 0.7), 1)
  }

  function toggleAnimation(value = !enableAnimation) {
    enableAnimation = value
    document.body.classList.toggle('visual-effects', enableAnimation)
    if (value) {
      onFocusOut()
    } else {
      mouseLight.style.opacity = 0
      nuxtImg.style.opacity = 1
      nuxtImg.style['mask-image'] = ''
      nuxtImg.style['-webkit-mask-image'] = ''
    }
    localStorage.setItem(ANIMATION_KEY, enableAnimation ? 'true' : 'false')
  }

  animationToggle.addEventListener('click', () => toggleAnimation(), {
    passive: true,
  })
  body.addEventListener('mousemove', onMouseMove, { passive: true })
  body.addEventListener('mouseleave', onFocusOut, { passive: true })

  toggleAnimation(enableAnimation)
}

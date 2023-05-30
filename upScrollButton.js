const scrollButton = document.querySelector('.scrollButton')
const anchor = {
    top: 0,
    left: 0,
    behavior: "smooth"
}
const windowHeight = Math.ceil(window.innerHeight/100) + 200
let isHide = true

scrollButton.addEventListener('click', () => {
    window.scroll(anchor)
})

window.addEventListener('scroll', () => {
    if (Math.round(window.scrollY) <= windowHeight && !isHide) {
        scrollButton.style.display = 'none'
        isHide = !isHide
    }
    if (Math.round(window.scrollY) > windowHeight && isHide) {
        scrollButton.style.display = 'block'
        isHide = !isHide
    }
})
const $zone = document.querySelector('.zone')
const $blocs = document.querySelectorAll('.bloc')

let dragSrcEl = null

$blocs.forEach(el => {
    el.addEventListener('dragstart', e => {
        dragSrcEl = e.target
        e.target.classList.add('active')
        e.dataTransfer.effectAllowed = 'move'

        e.dataTransfer.setData('text/plain', e.target)
    }, false)
    
});

$zone.addEventListener('dragover', e =>{
    e.preventDefault()
    e.target.classList.add('active')
}, false)

$zone.addEventListener('drop', e => {
    e.preventDefault()
    e.stopPropagation()
    e.target.appendChild(dragSrcEl, e.target)
    dragSrcEl.classList.remove('active')
}, false)
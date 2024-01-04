const $zone = document.querySelector('.zone')
const $blocs = document.querySelectorAll('.bloc')

let dragSrcEl = null

$blocs.forEach(el => {
    el.addEventListener('dragstart', e => {
        dragSrcEl = e.target
        e.target.classList.add('active')
        e.dataTransfer.effectAllowed = 'copy'

        e.dataTransfer.setData('text/plain', e.target)
    }, false)
    
});

$zone.addEventListener('dragover', e =>{
    e.preventDefault()
    e.target.classList.add('active')
}, false)

$zone.addEventListener('dragleave', e =>{
    e.preventDefault()
    e.target.classList.remove('active')
}, false)


$zone.addEventListener('drop', e => {
    e.preventDefault()
    e.stopPropagation()
    let clonedElement = dragSrcEl.cloneNode(true)
    e.target.appendChild(clonedElement, e.target)
    clonedElement.classList.remove('active')
    dragSrcEl.classList.remove('active')
    $zone.classList.remove('active')
    clonedElement.removeAttribute('draggable')
}, false)
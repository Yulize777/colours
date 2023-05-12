let cols = document.querySelectorAll('.col')
document.addEventListener('keydown', (e) => {
    e.preventDefault()
    if (e.code.toLowerCase() === 'space'){
        setRandomColors()
    }
})
document.addEventListener('click', event => {
    const type = event.target.dataset.type
    const text = event.target.textContent
    if (type === 'lock'){
        const node = event.target.tagName.toLowerCase() === 'i' ? event.target : event.target.children[0]
        node.classList.toggle('fa-lock-open')
        node.classList.toggle('fa-lock')
    } else if (type === 'copy'){
        copyToClickBoard(event.target.textContent)
            .then(() => {
                event.target.textContent = 'copied'
                setTimeout(() => {
                    event.target.textContent = text
                },3000)
            })
    }
})
function generateRandomColor() {
    const hexCode = '0123456789ABCDEF'
    let color = ''
    for (let i = 0; i < 6; i++){
        color += hexCode[Math.floor(Math.random() * hexCode.length)]
    }
    return '#' + color
}
function setRandomColors() {
    cols.forEach(col => {
        const isLocked = col.querySelector('i').classList.contains('fa-lock-open')
        if (isLocked){
            const text = col.querySelector('h2')
            const btn = col.querySelector('button')
            const color = chroma.random()
            text.textContent = color
            col.style.background = color
            setTextColor(text,color,btn)
        }

    })
}
setRandomColors()
function setTextColor(text,color,btn) {
    const luminance = chroma(color).luminance()
    text.style.color = luminance > 0.5 ? 'black' : 'white'
    btn.style.color = luminance > 0.5 ? 'black' : 'white'
}
function copyToClickBoard(text){
    return  navigator.clipboard.writeText(text)
}


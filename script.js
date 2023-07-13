const DEFAULT_COLOR = '#000000'
const DEFAULT_SIZE = 16
const DEFAULT_MODE = 'color'

let currentSize = DEFAULT_SIZE
let currentColor = DEFAULT_COLOR
let currentMode = DEFAULT_MODE

function setCurrentColor(newColor) {
    currentColor = newColor;
}

function setCurrentMode(newMode) {
    activateButton(newMode)
    currentMode = newMode;
}

function setCurrentSize(newSize) {
    currentSize = newSize
}

// Inputs
const colorPicker = document.querySelector("#colorPicker")
const colorBtn = document.querySelector("#colorBtn")
const rainbowBtn = document.querySelector("#rainbowBtn")
const eraseBtn = document.querySelector("#eraseBtn")
const darkenBtn = document.querySelector("#darkenBtn")
const gridSlider = document.querySelector("#gridSlider")
const progressBar = document.querySelector("#progressBar")
const gridSizeDisplay = document.querySelector("#gridSizeDisplay")
const gridLinesBtn = document.querySelector("#gridLinesBtn")
const clearBtn = document.querySelector("#clearBtn")
//Container Grid
const container = document.querySelector(".container");

colorPicker.oninput = (e) => setCurrentColor(e.target.value)
colorBtn.onclick = () => setCurrentMode('color')
rainbowBtn.onclick = () => setCurrentMode('rainbow')
eraseBtn.onclick = () => setCurrentMode('erase')
darkenBtn.onclick = () => setCurrentMode('darken')
gridSlider.oninput = (e) => updateGridValue(e.target.value)
gridSlider.onchange = (e) => updateGrid(e.target.value)
gridLinesBtn.onclick = () => toggleGridLines()
clearBtn.onclick = () => reloadGrid()

let mouseDown = false;
document.body.onmousedown = () => {mouseDown = true};
document.body.onmouseup = () => {mouseDown = false};

function updateGridValue(value) {
    gridSizeDisplay.textContent = `${value} x ${value}`
    progressBar.style.width = `${value}%`
}

function updateGrid(value) {
    setCurrentSize(value)
    reloadGrid()
}

function reloadGrid() {
    container.innerHTML = ''
    setupGrid(currentSize)
}

function toggleGridLines() {
    gridLinesBtn.classList.toggle('active')
    grid = container.querySelectorAll(".column")
    grid.forEach(e => {e.classList.toggle('border-top-left')});
}

function setupGrid(size) {
    for(let i=0; i<size; i++) {
        const gridRow = document.createElement("div");
        gridRow.classList.add("row")
        gridRow.setAttribute("draggable", "false")
        container.appendChild(gridRow);
        for(let j=0; j<size; j++){
            const gridColumn = document.createElement("div");
            gridColumn.setAttribute("draggable", "false")
            gridColumn.classList.add("column", "border-top-left")
            gridColumn.style.backgroundColor = '#ffffff'
            gridColumn.addEventListener('mouseover', paintGrid);
            gridColumn.addEventListener('mousedown', paintGrid);
            gridRow.appendChild(gridColumn)        
        }
    }
}

function paintGrid(e) {
    if(e.type === 'mouseover' && !mouseDown) return;  
    if(currentMode === 'color') {
        e.target.style.backgroundColor = currentColor;
    }else if(currentMode === 'rainbow') {
        const randomR = Math.floor(Math.random() * 256)
        const randomG = Math.floor(Math.random() * 256)
        const randomB = Math.floor(Math.random() * 256)
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
    }else if(currentMode === 'erase') {
        e.target.style.backgroundColor = '#ffffff'
    }else if(currentMode === 'darken') {
        const rgb = e.target.style.backgroundColor
        const rgbSub = rgb.substring(4, rgb.length-1)
        const rgbArray = rgbSub.split(",").map(e => Math.max(0, e-26))
        e.target.style.backgroundColor = `rgb(${rgbArray[0]}, ${rgbArray[1]}, ${rgbArray[2]})`
    }
}

function activateButton(newMode) {
    if(currentMode === 'color') {
        colorBtn.classList.remove('active')
    }else if(currentMode === 'rainbow') {
        rainbowBtn.classList.remove('active')
    }else if(currentMode === 'erase') {
        eraseBtn.classList.remove('active')
    }else if(currentMode === 'darken') {
        darkenBtn.classList.remove('active')
    }

    if(newMode === 'color') {
        colorBtn.classList.add('active')
    }else if(newMode === 'rainbow') {
        rainbowBtn.classList.add('active')
    }else if(newMode === 'erase') {
        eraseBtn.classList.add('active')
    }else if(newMode === 'darken') {
        darkenBtn.classList.add('active')
    }
}

window.onload = () => {
    setupGrid(DEFAULT_SIZE)
    activateButton(DEFAULT_MODE)
    gridLinesBtn.classList.add('active')
}
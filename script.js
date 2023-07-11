const container = document.querySelector(".container")

let mouseDown = false;
document.body.onmousedown = () => {mouseDown = true};
document.body.onmouseup = () => {mouseDown = false};

for(let i=0; i<30; i++) {
    const gridRow = document.createElement("div");
    gridRow.classList.add("row")
    gridRow.setAttribute("draggable", "false")
    container.appendChild(gridRow);
    for(let j=0; j<30; j++){
        const gridColumn = document.createElement("div");
        gridColumn.setAttribute("draggable", "false")
        gridColumn.classList.add("column", "border-top-left")
        gridRow.appendChild(gridColumn)        
    }
    console.log("done");
}

const columns = document.querySelectorAll(".column");
let penColor = "#000000";
columns.forEach(column => {
    column.addEventListener('mouseover', paintGrid);
    column.addEventListener('mousedown', paintGrid);
});

function paintGrid(e) {
    if(e.type === 'mouseover' && !mouseDown) return;  
    e.target.style.backgroundColor = penColor;
}
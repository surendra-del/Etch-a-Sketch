const container = document.querySelector(".container")

for(let i=0; i<16; i++) {
    const gridRow = document.createElement("div");
    gridRow.classList.add("row")
    container.appendChild(gridRow);
    for(let j=0; j<16; j++){
        const gridColumn = document.createElement("div");
        gridColumn.classList.add("column", "border-top-left")
        gridRow.appendChild(gridColumn)        
    }
    console.log("done");
}
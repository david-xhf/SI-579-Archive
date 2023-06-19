// Below will be the *broad* strokes of what you need:

// 1) You'll need an event listener for the "Enable Drawing" checkbox so you
// can keep track of whether arrow clicks will draw or not

// 2) You'll need event listener(s?) so that when a table cell is focused
// the "fill-black" class is added to it (IF 'Enable Drawing' is checked).

// 3) You'll need keydown listener(s?) so when an arrow key is pressed on
// a table cell, it moves the focus up/down/right/left unless you're at
// the top/bottom/left/right boundary already
// @see https://unixpapa.com/js/testkey.html to get keycodes.

// 4) You'll need an event listener for the 'erase' button that clears
// away every black box.

// Tip: understanding https://javascript.info/bubbling-and-capturing could make
// this slightly easier, but it isn't essential for solving this.

// If you're confused regarding a requirement, use the working example as a reference.
let isDrawing = true;
document.querySelector("#enable-drawing").addEventListener("change", (e) => {
    isDrawing = e.target.checked;
})
document.querySelectorAll("td").forEach(element => {element.addEventListener("focus", (e)=> {
    if(isDrawing) e.target.classList.add("fill-black");
})});
document.querySelector("button").addEventListener("click", () => {
    document.querySelectorAll("td").forEach(element => element.classList.remove("fill-black"));
})

const setFocus = (x, y) => {
    document.querySelector(`[data-row = "${x}"][data-column = "${y}"]`).focus();
}
document.addEventListener('keydown', (e) => {
    const name = e.key;
    const currentRow = document.activeElement.dataset['row'];
    const currentCol = document.activeElement.dataset['column'];
    if(name == "ArrowDown" && currentRow != 7) setFocus(Number(currentRow) + 1, Number(currentCol))
    if(name == "ArrowUp" && currentRow != 1) setFocus(Number(currentRow) - 1, Number(currentCol))
    if(name == "ArrowLeft" && currentCol != 1) setFocus(Number(currentRow), Number(currentCol) - 1)
    if(name == "ArrowRight" && currentCol != 8) setFocus(Number(currentRow), Number(currentCol) + 1)
  });

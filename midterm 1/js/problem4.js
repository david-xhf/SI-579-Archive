// The DOM elements you need are already added for you.

const typeHere = document.querySelector('#problem-4-input')
const colorBox = document.querySelector('#color-box')

/*
@todo When you type into the "class to add" input (typeHere) whatever you type
should be a class added to the colorBox square. If you type any of the following, the background color will
change (the CSS is already set up): red, blue, green, purple, violet, orange, yellow, indigo, black, brown

Things to keep in mind:
- colorBox has a `color-box-border` class, what you do should not mess with
  that class
- what you type into typeHere should only result in one class added to colorBox
  so if you type `green`, make sure there aren't  'g' 'gr' 'gre' 'gree' classes in
  addition to the expected 'green' class
 */
let prev = ''
typeHere.addEventListener('input', (e) => {
  // Add the thing that happens when you type here!
  prev && colorBox.classList.remove(prev)
  e.target.value && colorBox.classList.add(e.target.value)
  prev = e.target.value
})
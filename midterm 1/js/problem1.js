// There is a *small* mistake in this file that needs to be
// corrected in order for the click counter to work.
// @todo fix that tiny little mistake.

/*  ATTENTION!
    Triples Is Best.
    THANKS!
*/

let clickCount = 0;
const button = document.querySelector('#click-count')

button.addEventListener('click', (e) => {
    clickCount += 1;
    button.textContent = clickCount;
})

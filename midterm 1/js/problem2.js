const startCounter = document.querySelector('#start-counter');
const counter = document.querySelector('#counter');
let count = 0;

// @todo, there is already an interval timer that counts up when
// "start counter" is clicked.
// Your task: When the page is refreshed while the counter is counting,
// the box labeled "Before refreshing, the counter ran this many times"
// (#after-refresh-count) should display the timer count
// just prior to refreshing. localStorage can help here.
//
// HOWEVER! Be sure localStorage doesn't hold on to the count after it is
// displayed. #after-refresh-count should only display something if
// the timer was running during the *most recent* refresh.
// If you refresh and did not run the timer, #after-refresh-count needs
// to be empty.

// You'll be adding a few lines of code to what we have already
// provided. Figure out where to put it and what it needs to do!

startCounter.addEventListener('click', () => {
    startCounter.disabled = true;
    setInterval(() => {
        count++;
        counter.textContent = count;
        localStorage.setItem('refreshCount', count)
    }, 500);
    
})

if (localStorage.getItem('refreshCount')) {
  document.querySelector('#after-refresh-count').textContent = localStorage.getItem('refreshCount');
  localStorage.clear();
}




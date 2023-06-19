// The DOM elements you need have already been retrieved.
const getYesNo = document.querySelector('#get-yes-no');
const displayYesNo = document.querySelector('#display-yes-no');
const yesCount = document.querySelector('#yes-count');
const noCount = document.querySelector('#no-count');

/*
@todo when you click on getYesNo make a fetch request to 'https://yesno.wtf/api'
With the parsed JSON from the result:
For every 'no', update the value shown by noCount by +1
For every 'yes', update the value shown by noCount by +1

displayYesNo should have the following HTML
   <h3>THE ANSWER (it wil either be yes or no)</h3>
   <img src="THE IMAGE URL" alt="THE ANSWER (again)" />


 */
// UNCOMMENT 👇BELOW AND HANDLE THAT CLICK EVENT 👊👊👊👊👊
getYesNo.addEventListener('click', (e) => {
  fetch('https://yesno.wtf/api')
  .then(res => res.json())
  .then(json => {
    displayYesNo.innerHTML = `<h3>${json.answer}</h3><img src="${json.image}" />`
    json.answer === 'yes' ? yesCount.textContent++ : noCount.textContent++;
  })
})

// DON'T CHANGE THE CONTENTS OF defaultEntries.
const defaultEntries = [
  {
    title: 'Water',
    date: 1149566400000,
    description: 'I went to a pool and swam around and splashed a few times and jumped off the diving board.'
  },
  {
    title: 'Coaster',
    date: 655531200000,
    description: 'Zoomed around on a roller coaster, going up down and on curves. Went way fast and did not drop my phone.'
  },
  {
    title: 'Leaves',
    date: 1046667600000,
    description: 'Raked some leaves and my lawn looked pretty good. The air smelled really good too.'
  },
];

// Every DOM element you need is already written to variables here. There's enough additional work to do.
const memoryContainer = document.querySelector('#memory-container');
const titleInput = document.querySelector("#title");
const dateInput = document.querySelector("#date");
const descriptionInput = document.querySelector("#description");
const addMemoryButton = document.querySelector("#add-memory");

// We also create the memoryList for you. If localStorage has a 'memory.list' item, it uses that,
// otherwise it uses defaultEntries.
let memoryList = localStorage.getItem('memory.list') ? JSON.parse(localStorage.getItem('memory.list')) : defaultEntries;

/**
 * Takes the value of a date input and formats it in the manner required by the memory list.
 *
 * @param {string} dateString
 *   The date input value.
 * @return {string}
 *   The date formatted like "Monday, Mar 3, 2003".
 */
const formatDateForMemory = (dateString) => {
  return new Date(dateString).toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "short", day: "numeric" })
}

/**
 * Converts a date string into a timestamp that accounts for the current time zone.
 *
 * @param {string} dateString
 *   The value of a date input.
 *
 * @return {number}
 *   A JS-friendly millisecond timestamp.
 */
const localizedTimestamp = (dateString) => {
  return new Date(dateString).getTime() + new Date(dateString).getTimezoneOffset() * 60000
}

// YOUR WORK BEGINS HERE, finish the functions below.

/**
 * Renders the memory list. Should be called on initial load
 * and anytime the memory list changes.
 */

const renderMemories = () => {
  // @todo
  // - clear the memory container element
  // - get a version of memoryList sorted by date
  // - save the sorted memories to localStorage 'memory.list'
  // - iterate through the date-sorted memories and each one should be added to memoryContainer as
  memoryContainer.innerHTML = '';
  memoryList.sort((a, b) => a.date - b.date);
  localStorage.setItem('memory.list', JSON.stringify(memoryList));
  memoryContainer.innerHTML = memoryList.map(obj =>
    `<div class="position-relative col-12 border border-secondary rounded my-3 p-3 bg-white">
      <div class="d-flex">
        <h3>${obj.title}</h3>
        <small class="px-1 text-muted align-self-center">${formatDateForMemory(obj.date)}</small>
      </div>
      <button data-date="${obj.date}" class="close-button">Ⓧ</button>
      <p>${obj.description}</p>
    </div>`).join('')
}
// @todo we need to render those memories 👆 on pageload (as well as when the button is clicked), that can happen
// by adding a single line below 👇
window.addEventListener('load', renderMemories);
// This is the event handler that fires when you click
// 'Add memory'
addMemoryButton.addEventListener('click', (submit) => {
  titleInput.classList.toggle('is-invalid', !titleInput.value || titleInput.value.split(/\s+/).length > 1);
  dateInput.classList.toggle('is-invalid', !dateInput.value || memoryList.map(obj => obj.date).includes(localizedTimestamp(dateInput.value)));
  descriptionInput.classList.toggle('is-invalid', !descriptionInput.value);
  if (!titleInput.classList.contains("is-invalid") && !dateInput.classList.contains("is-invalid") && !descriptionInput.classList.contains("is-invalid")) {
    memoryList.push({
      title: titleInput.value,
      date: localizedTimestamp(dateInput.value),
      description: descriptionInput.value
    });
    titleInput.value = "";
    dateInput.value = "";
    descriptionInput.value = "";
    renderMemories();
  }
  // @todo we need to validate titleInput, dateInput, descriptionInput
  // If validation does not pass for a given input:
  //   - The memory should not be created.
  //   - The input with a validation problem gets the "is-invalid" class
  //     added to it.
  // VALIDATION CRITERIA:
  //   titleInput: must not be empty, and must be one word (i.e. no spaces)
  //   dateInput: must not be empty, and must not be a date used by another memory
  //     @tip use localizedTimestamp() to convert the date input value into something
  //     you can compare to a memory date field
  //   descriptionInput: must not be empty

  // If the form is resubmitted, any previously-validation-failing input that now
  // passes should have the `is-invalid` class removed

  // @todo if all validation passes
  // - Add the new memory to the memoryList
  //   @tip, the localizedTimestamp() function will convert the dateInput value to the proper timestamp.
  // - Clear titleInput, dateInput, descriptionInput
  // - Render the memory list on the page again.
})

// This is the event handler that fires when you click
// the Ⓧ remove button for a memory, it removes
// a memory from the list
memoryContainer.addEventListener('click', (e) => {
  if (e.target.hasAttribute('data-date')) {
    memoryList = memoryList.filter(obj => obj.date !== Number(e.target.attributes['data-date'].value));
    renderMemories();
    // We've done *almost* everything that is needed in this condition
    // for you already. If this condition is reached, it means the Ⓧ remove button
    // was clicked.
    // @todo Remove the entry from memoryList with the .date property matching
    // the value e.target's data-date attribute.
    // @tip the data-date attribute is a string, and the items in memoryList
    // store the dates as number, so we need to convert a number to string or
    // vice versa to get a match.

    // @todo after removing the memory from the list we need to re-render the list on the page
    // so the shows the current list (of which an item was just removed).

    // @tip only 2-4 lines need to be added inside this condition to accomplish
    // what is needed.
  }
})




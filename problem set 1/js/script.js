//////////// PROBLEM 1, FINISH THIS FUNCTION 👇 ////////////
/**
 * Returns a message based on the date being a weekday or weekend.
 *
 * @param {string} dateString
 *   A date string, formatted as an iso compliant string
 *   YYYY-MM-DDTHH:MM:SS
 *   Ex: '1995-12-17T03:24:00'
 *
 * @return {string}
 *    If a weekday:
 *    - 'The date YYYY-MM-DD is a weekday'
 *    If a weekend:
 *       'The date YYYY-MM-DD is a weekend'
 *    Where YYYY-MM-DD corresponds to the year/month/date of dateString.
 *
 *    @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDay
 *    @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice
 *
 */
const weekdayOrWeekend = (dateString) => {
// @todo complete this function
const date = new Date(dateString);
if(date.getDay() == 0 || date.getDay() == 1) return 'The date ' + dateString.slice(0, 10) + ' is a weekend';
else return 'The date ' + dateString.slice(0, 10) + ' is a weekday';
}


//////////// PROBLEM 2, FINISH THIS FUNCTION 👇 ////////////
/**
 * Checks an object for firstName and lastName properties and returns
 * a name identification
 *
 * @param studentObject
 *    An object that *might* have firstName and lastName properties
 * @return {string}
 *    If studentObject.firstName and studentObject.lastName exist:
 *      - "Student name is: <firstName> <lastname>"
 *    If studentObject.firstName exists but not studentObject.lastName:
 *      - "Student name is: <firstName> CLASSIFIED"
 *    If studentObject.firstName doesn't exist but studentObject.lastName does:
 *      - "Student name is: CLASSIFIED <lastname>"
 *    If both studentObject.firstName and studentObject.lastName are missing:
 *      - 'No name available'
 *
 *  @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects
 */
const studentName = (studentObject) => {
  // @todo complete this function
  if(!studentObject.firstName && !studentObject.lastName) return "No name available"
  return "Student name is: " + (studentObject.firstName||'CLASSIFIED') + " " + (studentObject.lastName||'CLASSIFIED');
}


//////////// PROBLEM 3, FINISH THIS FUNCTION 👇 ////////////
/**
 * Takes an array of four strings and turn it into a proper sentence
 * @param itemArray
 *   An Array of four strings
 * @return {string}
 *   The first three items separated by a comma, with the word 'and' separating the final
 *   So if itemArray had 'earth', 'wind', 'fire', 'water', this would return
 *   'earth, wind, fire and water'
 */
const fourItems = (itemArray) => {
  // @todo complete this function
  return itemArray.slice(0, itemArray.length - 2).join(", ").concat(", ") + itemArray.slice(itemArray.length - 2, itemArray.length).join(" and ");
}


//////////// PROBLEM 4, FINISH THIS FUNCTION 👇 ////////////
/**
 * Takes an array and returns an array with only the items that have a given letter in it.
 *
 * @param {Array} itemsArray
 *    An array of strings.
 * @param {String} letter
 *    The letter to look for.
 * @return {Array}
 *    The filtered array.
 */
const itemsWithLetter = (itemsArray, letter) => {
  // @todo complete this function
  return itemsArray.filter(word => word.toLowerCase().includes(letter.toLowerCase()));
}


// DON'T MAKE CHANGES BELOW THIS LINE OR THE AUTOGRADER WILL GET MAD
if(typeof module !== 'undefined') {
  module.exports = {
    weekdayOrWeekend,
    studentName,
    fourItems,
    itemsWithLetter,
  }
}

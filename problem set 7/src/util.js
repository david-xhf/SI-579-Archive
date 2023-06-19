export const defaultEntries = [
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

/**
 * Takes the value of a date input and formats it in the manner required by the memory list.
 *
 * @param {string} dateString
 *   The date input value.
 * @return {string}
 *   The date formatted like "Monday, Mar 3, 2003".
 */
export const formatDateForMemory = (dateString) =>  {
  return new Date(dateString).toLocaleDateString(undefined, { weekday:"long", year:"numeric", month:"short", day:"numeric"})
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
export const localizedTimestamp = (dateString) => {
  return new Date(dateString).getTime() + new Date(dateString).getTimezoneOffset() * 60000
}
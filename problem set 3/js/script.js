// This builds on the Dog Machine you created in Lecture 5.
// You'll be adding some new features.

// @HINT @HINT @HINT
// Look through all the code we've provided here before starting the problem, and USE IT
// as part of your solution. It's there to make things easier, even if it doesn't seem
// like it at first.
// Points deducted if you don't use the starter code unless your solution is *clearly* more efficient.

// FEATURE 1
// The number of images added must equal the value of #how-many'
// Many of you may have done this already in exercise 5 as a
// stretch goal

// FEATURE 2
// There's a new "CATS PLEASE" button next to "DOGS PLEASE",
// when you click that, the grid needs to update with random images
// from The Cat API using this endpoint: https://api.thecatapi.com/v1/images/search
// (note this endpoint only returns one image at a time, for multiple images you'll need to request 
// from it multiple times)
//
// The Cat API URL provided is free to use, but if your access to CatAPI
// is cut off *after it was previously working*, you can probably address it by
// registering with the Cat API to get an API key
// https://thecatapi.com/signup
// Info on using your API key with requests:
// https://developers.thecatapi.com/view-account/ylX4blBYT9FaoVd6OhvR?report=bOoHBz-8t

// FEATURE 3
// When you click MORE CATS/DOGS, you must also update #rhyme-box with a comma
// separated list of words that rhyme with cat/dog by fetching data from datamuse.
// Cat Rhymes: https://api.datamuse.com/words?rel_rhy=cat
// Dog Rhymes: https://api.datamuse.com/words?rel_rhy=dog
// This will appear above the images. The number of words should equal the number
// of images, and the words should display in the same order from the api fetch.
// Datamuse is free and does not require registration.

// Check the "completed" example in your assignment if clarification is needed.

// These are the two elements you'll be updating with animals/rhymes.
// This part is taken care of for you.
const animalGrid = document.querySelector('#animal-grid');
const rhymeBox = document.querySelector('#rhyme-box');

// Declaring the fetch url and animal type here means they can be used/updated
// inside any functions or callbacks below. We created these already, and it
// serves as a hint for how to best complete this.
let fetchUrl = '';
let animalType = '';

const addAnimals = async (animalType, fetchURl) => {
  // @todo
  // Here is a recommended approach:
  // - clear the animalGrid
  animalGrid.innerHTML = "";
  let howMany = document.querySelector('input').valueAsNumber
  // - fetch the dog/cat images depending on the button pushed. The number of images should = the number in #how-many
  // - each image you get should be added to animalGrid with this structure:
  //     `<div class="col p-0"><img  src="{DOG/CAT IMAGE URL}" alt="{ANIMAL TYPE (dog/cat)}" /></div>`
  while(howMany--){
    fetch(fetchURl)
    .then(res => res.json())
    .then(json => animalGrid.innerHTML += `<div class="col p-0"><img src="${animalType === "dog"?json.message:json[0].url}" alt="${animalType}" /></div>`)}
  // - fetch the words that rhyme with the selected animal from Datamuse.
  // - Slice the results array you get from datamuse so it is only as long as the number of animals selected
  // - The results array should not include the word 'dog' or 'cat'. No rhyming a word with itself.
  // - Update rhymeBox with a comma separated list of words from the just-sliced array. 
  fetch(`https://api.datamuse.com/words?rel_rhy=${animalType}`)
  .then(res => res.json())
  .then(json => rhymeBox.textContent = json.map(j => j.word).slice(0, document.querySelector('input').valueAsNumber).join(', '))
 }

// @hint you do not need to add any event listeners beyond what is added below,
// you just need to address the @todo items inside it.
 document.querySelector('#more-dogs').addEventListener('click', () => {
  // @todo, some additional things should happen before addAnimals()
  fetchUrl = 'https://dog.ceo/api/breeds/image/random';
  animalType = 'dog';
  addAnimals(animalType, fetchUrl)
 });
 document.querySelector('#more-cats').addEventListener('click', () => {
   // @todo, some additional things should happen before addAnimals()
   fetchUrl = 'https://api.thecatapi.com/v1/images/search';
   animalType = 'cat';
   addAnimals(animalType, fetchUrl)
 });


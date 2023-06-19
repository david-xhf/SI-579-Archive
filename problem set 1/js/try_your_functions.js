// PROBLEM 1 TESTING: Uncomment below to see results of sending various args to weekdayOrWeekend()
// console.log('Sent: 1995-12-17T03:24:00 -- ', weekdayOrWeekend('1995-12-17T03:24:00'))
// console.log('Sent: 1995-12-18T03:24:00 -- ', weekdayOrWeekend('1995-12-18T03:24:00'))
// console.log('Sent: 1995-12-19T03:24:00 -- ', weekdayOrWeekend('1995-12-19T03:24:00'))
// console.log('Sent: 1995-12-20T03:24:00 -- ', weekdayOrWeekend('1995-12-20T03:24:00'))
// console.log('Sent: 1995-12-21T03:24:00 -- ', weekdayOrWeekend('1995-12-21T03:24:00'))
// console.log('Sent: 1995-12-22T03:24:00 -- ', weekdayOrWeekend('1995-12-22T03:24:00'))
// console.log('Sent: 1995-12-23T03:24:00 -- ', weekdayOrWeekend('1995-12-23T03:24:00'))

// PROBLEM 2 TESTING: Uncomment below to see results of sending various args to studentName()
// console.log('first and last', studentName({firstName: 'Cool', lastName: 'Person'}))
// console.log('only first', studentName({firstName: 'Horsemaster', job: 'General'}))
// console.log('only last', studentName({food: 'Apple', lastName: 'Stonewhistle'}))
// console.log('no first, no last', studentName({troy: 'Abed', inThe: 'Morning'}))

// PROBLEM 3 TESTING: Uncomment below to see results of sending various args to fourItems()
// console.log('beatles names', fourItems(['Paul', 'Ringo', 'John', 'George']));
// console.log('cardinal directions', fourItems(['North', 'South', 'East', 'West']));

// PROBLEM 4 TESTING: Uncomment below to see results of sending various args to fourItems()
const animals = [
  "Aardvark",
  "Albatross",
  "Alligator",
  "Alpaca",
  "Ant",
  "Anteater",
  "Antelope",
  "Ape",
  "Armadillo",
  "Donkey",
  "Baboon",
  "Badger",
  "Barracuda",
  "Bat",
  "Bear",
  "Beaver",
  "Bee",
  "Bison",
  "Boar",
  "Buffalo",
  "Butterfly",
  "Camel",
  "Capybara",
  "Caribou",
  "Cassowary",
  "Cat",
  "Caterpillar",
  "Cattle",
  "Chamois",
  "Cheetah",
  "Chicken",
  "Chimpanzee",
  "Chinchilla",
  "Chough",
  "Clam",
  "Cobra",
  "Cockroach",
  "Cod",
  "Cormorant",
  "Coyote",
  "Crab",
  "Crane",
  "Crocodile",
  "Crow",
  "Curlew",
  "Deer",
  "Dinosaur",
  "Dog",
  "Dogfish",
  "Dolphin",
  "Dotterel",
  "Dove",
  "Dragonfly",
  "Duck",
  "Dugong",
  "Dunlin",
  "Eagle",
  "Echidna",
  "Eel",
  "Eland",
  "Elephant",
  "Elk",
  "Emu",
  "Falcon",
  "Ferret",
  "Finch",
  "Fish",
  "Flamingo",
  "Fly",
  "Fox",
  "Frog",
  "Gaur",
  "Gazelle",
  "Gerbil",
  "Giraffe",
  "Gnat",
  "Gnu",
  "Goat",
  "Goldfinch",
  "Goldfish",
  "Goose",
  "Gorilla",
  "Goshawk",
  "Grasshopper",
  "Grouse",
  "Guanaco",
  "Gull",
  "Hamster",
  "Hare",
  "Hawk",
  "Hedgehog",
  "Heron",
  "Herring",
  "Hippopotamus",
  "Hornet",
  "Horse",
  "Human",
  "Hummingbird",
  "Hyena",
  "Ibex",
  "Ibis",
  "Jackal",
  "Jaguar",
  "Jay",
  "Jellyfish",
  "Kangaroo",
  "Kingfisher",
  "Koala",
  "Kookabura",
  "Kouprey",
  "Kudu",
  "Lapwing",
  "Lark",
  "Lemur",
  "Leopard",
  "Lion",
  "Llama",
  "Lobster",
  "Locust",
  "Loris",
  "Louse",
  "Lyrebird",
  "Magpie",
  "Mallard",
  "Manatee",
  "Mandrill",
  "Mantis",
  "Marten",
  "Meerkat",
  "Mink",
  "Mole",
  "Mongoose",
  "Monkey",
  "Moose",
  "Mosquito",
  "Mouse",
  "Mule",
  "Narwhal",
  "Newt",
  "Nightingale",
  "Octopus",
  "Okapi",
  "Opossum",
  "Oryx",
  "Ostrich",
  "Otter",
  "Owl",
  "Oyster",
  "Panther",
  "Parrot",
  "Partridge",
  "Peafowl",
  "Pelican",
  "Penguin",
  "Pheasant",
  "Pig",
  "Pigeon",
  "Pony",
  "Porcupine",
  "Porpoise",
  "Quail",
  "Quelea",
  "Quetzal",
  "Rabbit",
  "Raccoon",
  "Rail",
  "Ram",
  "Rat",
  "Raven",
  "Red deer",
  "Red panda",
  "Reindeer",
  "Rhinoceros",
  "Rook",
  "Salamander",
  "Salmon",
  "Sand Dollar",
  "Sandpiper",
  "Sardine",
  "Scorpion",
  "Seahorse",
  "Seal",
  "Shark",
  "Sheep",
  "Shrew",
  "Skunk",
  "Snail",
  "Snake",
  "Sparrow",
  "Spider",
  "Spoonbill",
  "Squid",
  "Squirrel",
  "Starling",
  "Stingray",
  "Stinkbug",
  "Stork",
  "Swallow",
  "Swan",
  "Tapir",
  "Tarsier",
  "Termite",
  "Tiger",
  "Toad",
  "Trout",
  "Turkey",
  "Turtle",
  "Viper",
  "Vulture",
  "Wallaby",
  "Walrus",
  "Wasp",
  "Weasel",
  "Whale",
  "Wildcat",
  "Wolf",
  "Wolverine",
  "Wombat",
  "Woodcock",
  "Woodpecker",
  "Worm",
  "Wren",
  "Yak",
  "Zebra",
];
//const states = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming']
console.log("animals z", itemsWithLetter(animals, "z"));
// console.log('animals Z', itemsWithLetter(animals, 'Z'))
// console.log('animals q', itemsWithLetter(animals, 'q'))
// console.log('animals Q', itemsWithLetter(animals, 'Q'))
// console.log('states y', itemsWithLetter(states, 'y'))
// console.log('states Y', itemsWithLetter(states, 'Y'))
// console.log('states k', itemsWithLetter(states, 'k'))
// console.log('states K', itemsWithLetter(states, 'K'))
// global variables

function getData() {
  return fetch('./dino.json')
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.log(err));
}

// Create Dino Constructor
function Dino(species, weight, height, diet, origin, when, fact) {
  this.species = species;
  this.weight = weight;
  this.height = height;
  this.diet = diet;
  this.origin = origin;
  this.when = when;
  this.fact = fact;
}

// Create Dino Objects
async function createDinoObject() {
  const dinos = await getData();
  dinosObjects = dinos['Dinos'].map(
    (dino) =>
      new Dino(
        dino.species,
        dino.weight,
        dino.height,
        dino.diet,
        dino.where,
        dino.when,
        dino.fact
      )
  );

  console.log(dinosObjects);
}

createDinoObject();

// Create Human Object

// Use IIFE to get human data from form

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.

// Generate Tiles for each Dino in Array

// Add tiles to DOM

// Remove form from screen

// On button click, prepare and display infographic
document.getElementById('btn').addEventListener(
  'click',
  (function () {
    const form = document.getElementById('dino-compare');
    // IIFE returning a function which is closing over the form variable
    // the returned can access the IIFE's score because of closure even
    // after being returned.
    return function () {
      form.style.display = 'none';
    };
  })()
);

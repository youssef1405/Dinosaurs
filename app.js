// global variables

async function getData() {
  return fetch('./dino.json')
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.log(err));
}

// console.log(getData());

// Create Dino Constructor

// Create Dino Objects

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

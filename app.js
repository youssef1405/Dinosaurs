// global variables

/**
 * extract dinos data from the dino.json file
 */
function getData() {
  return fetch('./dino.json')
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.log(err));
}

// Super class. Dino and Human classes inherit from it
function Creature(weight, height, diet) {
  this.weight = weight;
  this.height = height;
  this.diet = diet;
}

// Human constructor function. It inherits from the Creature
function Human(name, weight, height, diet) {
  Creature.apply(this, [weight, height, diet]);
  this.name = name;
}

// Dino Constructor function. It inherits from the Creature
function Dino(species, weight, height, diet, origin, when, fact) {
  Creature.apply(this, [weight, height, diet]);
  this.species = species;
  this.origin = origin;
  this.when = when;
  this.fact = fact;
}

// This IIFE initialize the app by setting the prorotypal inheritance
(function initializeApp() {
  Human.prototype = Object.create(Creature.prototype);
  Dino.prototype = Object.create(Creature.prototype);
  Creature.prototype.compareHeight = function (obj) {
    console.log(this.height);
  };
  Creature.prototype.compareWeight = function () {
    return this.weight;
  };
  Creature.prototype.compareDiet = function (obj) {
    console.log(this.diet);
  };
})();

// Create Dino Objects
async function createDinoObject() {
  const dinos = await getData();
  const dinosObjects = dinos['Dinos'].map(
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
  console.log(dinosObjects[0].compareWeight());
  return dinosObjects;
}

// Create Human Object
function createHumanObject(name, weight, height, diet) {
  return new Human(name, weight, height, diet);
}

// Generate Tiles for each Dino in Array
function createGrid(dinos, human) {
  const grid = document.getElementById('grid');
  const creatures = [human, ...dinos];
  grid.innerHTML = creatures
    .map((creature) => {
      let dinoChecker = creature instanceof Dino;
      return `
        <div class='grid-item'>
            <h3>${dinoChecker ? creature.species : creature.name}</h3>
            <img src='images/${
              dinoChecker ? creature.species.toLowerCase() : 'human'
            }.png'/>
            <p>${dinoChecker ? creature.fact : ''}</p>
        </div>
    `;
    })
    .join('');
}

// Add tiles to DOM

// Remove form from screen
function hideElement(element) {
  element.style.display = 'none';
}

// On button click, prepare and display infographic
document.getElementById('btn').addEventListener(
  'click',
  (function () {
    const form = document.getElementById('dino-compare');
    const nameInput = document.getElementById('name');
    const feetInput = document.getElementById('feet');
    const inchesInput = document.getElementById('inches');
    const weightInput = document.getElementById('weight');
    const dietSelect = document.getElementById('diet');
    // IIFE returning a function which is closing over the form variable.
    // the returned can access the IIFE's score because of closure even
    // after being returned.
    return async function () {
      hideElement(form);
      const human = createHumanObject(
        nameInput.value,
        weightInput.value,
        feetInput.value,
        diet.value
      );
      const dinos = await createDinoObject();
      createGrid(dinos, human);
    };
  })()
);

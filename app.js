// global variables
const tilesOrder = [1, 2, 3, 4, 6, 7, 8, 9];

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
  this.facts = [];
}

// This IIFE initialize the app by setting the prorotypal inheritance
// Human and Dino inherit from Creature class
// The three compare methods are added to the Creature's prototype
(function initializeApp() {
  Human.prototype = Object.create(Creature.prototype);
  Dino.prototype = Object.create(Creature.prototype);

  Creature.prototype.compareHeight = function (human) {
    return this.height > human.height
      ? `${this.species} is ${this.height} inches. It is taller than you (${human.height} inches)`
      : `${this.species} is ${this.height} inches. It is shorter than you (${human.height} inches)`;
  };

  Creature.prototype.compareWeight = function (human) {
    return this.weight > human.weight
      ? `${this.species} is heavier (${this.weight}lbs) than you. You have chance to escape 😎`
      : `${this.species} is lighter than you. They are ${this.weight}lbs`;
  };

  Creature.prototype.compareDiet = function (human) {
    if (this.diet === 'herbavor')
      return `${this.species} was a ${this.diet} and you are ${human.diet}. You are safe, they eat plants only 😀`;
    else if (this.diet === 'ominvor')
      return `${this.species} was a ${this.diet} and you are ${human.diet}. They eat plants and animals 😒`;
    else
      return `${this.species} was a ${this.diet} and you are ${human.diet}. Be carful, they eat animals only 😲`;
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
  return dinosObjects;
}

// Create Human Object
function createHumanObject(name, weight, feet, inches, diet) {
  const humanHeight = 12 * parseInt(feet) + parseInt(inches);
  return new Human(name, parseInt(weight), humanHeight, diet);
}

/**
 * fills the facts array of each dino with 6 facts
 * @param {[object]} dinos - array of dinos objects
 * @param {object} human - human object
 */
function createFacts(dinos, human) {
  dinos.forEach(function (dino) {
    dino.species === 'Pigeon'
      ? (dino.facts = [dino.fact])
      : (dino.facts = [
          dino.fact,
          dino.compareWeight(human),
          dino.compareDiet(human),
          dino.compareHeight(human),
          `${dino.species} lived in ${dino.origin}`,
          `${dino.species} was born during ${dino.when}`,
        ]);
  });
}

/**
 * returns a random fact from the facts array of each dino
 * @param {Object} dino
 * @returns {string} fact about dino
 */
function getRandomFact(dino) {
  return dino.facts[Math.floor(Math.random() * dino.facts.length)];
}

/**
 * Randomize the order of the tiles
 * @returns{Number} -  order of the tile
 */
function getTileOrder() {
  const random = Math.floor(Math.random() * tilesOrder.length);
  return tilesOrder.splice(random, 1)[0];
}

// Generate Tiles for each Dino in Array
function createGrid(dinos, human) {
  const grid = document.getElementById('grid');
  const creatures = [human, ...dinos];
  grid.innerHTML = creatures
    .map((creature) => {
      let dinoChecker = creature instanceof Dino;
      return `
        <div class='grid-item' style="order:${
          dinoChecker ? getTileOrder() : 5
        }">
            <h3>${dinoChecker ? creature.species : creature.name}</h3>
            <img src='images/${
              dinoChecker ? creature.species.toLowerCase() : 'human'
            }.png'/>
            <p>${dinoChecker ? getRandomFact(creature) : ''}</p>
        </div>
    `;
    })
    .join('');
}

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

    return async function () {
      hideElement(form);
      const human = createHumanObject(
        nameInput.value,
        weightInput.value,
        feetInput.value,
        inchesInput.value,
        dietSelect.value
      );
      const dinos = await createDinoObject();
      createFacts(dinos, human);
      createGrid(dinos, human);
    };
  })()
);

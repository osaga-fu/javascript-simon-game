const redButton = document.querySelector(".red");
const blueButton = document.querySelector(".blue");
const greenButton = document.querySelector(".green");
const yellowButton = document.querySelector(".yellow");

const panels = [redButton, blueButton, greenButton, yellowButton];

const getRandomPanel = () => {
  const randomIndex = Math.floor(Math.random() * 4);
  return panels[randomIndex];
};

const flash = (panel) => {
  return new Promise((resolve, reject) => {
    panel.className += " active";
    setTimeout(() => {
      panel.className = panel.className.replace("active", "");
      setTimeout(() => {
        resolve();
      }, 250);
    }, 1000);
  });
};

const sequence = [getRandomPanel()];
let sequenceToGuess = [...sequence];
let canClick = false;

const panelClicked = (panelClicked) => {
  if (!canClick) return;
  console.log(panelClicked);

  const expectedPanel = sequenceToGuess.shift();
  if (expectedPanel === panelClicked) {
    if (sequenceToGuess.length === 0) {
      //start new round
      sequence.push(getRandomPanel());
      sequenceToGuess = [...sequence];
      startFlashing();
    }
  } else {
    //end game
    alert("Game over!");
  }
};

const startFlashing = async () => {
  canClick = false;
  for (let panel of sequence) {
    await flash(panel);
  }
  canClick = true;
};

const main = () => {
  startFlashing();
};

main();

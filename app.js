const redButton = document.querySelector(".red");
const blueButton = document.querySelector(".blue");
const greenButton = document.querySelector(".green");
const yellowButton = document.querySelector(".yellow");

const panels = [redButton, blueButton, greenButton, yellowButton];
const sounds = {
  red: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
  blue: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"),
  green: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
  yellow: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3")
}

const getRandomPanel = () => {
  const randomIndex = Math.floor(Math.random() * 4);
  return panels[randomIndex];
};

const playSound = (panel) =>{
  if (panel.classList.contains('red')) {
    sounds.red.play();
  } else if (panel.classList.contains('blue')) {
    sounds.blue.play();
  } else if (panel.classList.contains('green')) {
    sounds.green.play();
  } else if (panel.classList.contains('yellow')) {
    sounds.yellow.play();
  }
}

const flash = (panel) => {
  return new Promise((resolve, reject) => {
    playSound(panel);

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

  playSound(panelClicked);

  const expectedPanel = sequenceToGuess.shift();
  if (expectedPanel === panelClicked) {
    if (sequenceToGuess.length === 0) {
      //start new round
      setTimeout(() => {
        sequence.push(getRandomPanel());
        sequenceToGuess = [...sequence];
        startFlashing();
      }, 1300);
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

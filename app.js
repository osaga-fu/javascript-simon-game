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

const sequence = [getRandomPanel(), getRandomPanel(), getRandomPanel()];
let canClick = false;

const panelClicked = (panel) => {
  if (!canClick) return;
  console.log(panel);
};

const main = async () => {
  for (let panel of sequence) {
    await flash(panel);
  }
  canClick = true;
};

main();

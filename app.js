const redButton = document.querySelector('.red')
const blueButton = document.querySelector('.blue');
const greenButton = document.querySelector('.green');
const yellowButton = document.querySelector('.yellow');

const sequence = [redButton, blueButton, greenButton, yellowButton];

const flash = (panel) => {
  return new Promise((resolve, reject) => {
    panel.className += " active";
    setTimeout(() => {
      panel.className = panel.className.replace("active", "");
      resolve();
    }, 1000);
  });
};

const main = async () => {
  for (let panel of sequence) {
    await flash(panel);
  }
};

main();

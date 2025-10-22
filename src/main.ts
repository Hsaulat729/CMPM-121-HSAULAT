console.log("🎮 CMPM 121 - Starting...");

// Counter state
let counter: number = 0;
let growthRate: number = 0; // start at 0 (no auto growth at first)

// Upgrade data
const upgrades = [
  { id: "upgradeA", name: "🐝 Worker Bee", cost: 10, rate: 0.1, count: 0 },
  { id: "upgradeB", name: "🍯 Beekeeper", cost: 100, rate: 2.0, count: 0 },
  {
    id: "upgradeC",
    name: "🏡 Hive Expansion",
    cost: 1000,
    rate: 50.0,
    count: 0,
  },
];

// Create basic HTML structure
document.body.innerHTML = `
  <h1>Honey Harvester 🍯</h1>

  <p>Grow your buzzing empire and produce the sweetest honey in the hive!</p>

  <div id="honeyDisplay">0 honey collected</div>

  <div id="rateDisplay">Production rate: 0.0 honey/sec</div>

  <button id="harvest"></button>

  <div id="upgrades"></div>
`;

// Grab DOM references
const button = document.getElementById("harvest")!;
const honeyDisplay = document.getElementById("honeyDisplay")!;
const rateDisplay = document.getElementById("rateDisplay")!;
const upgradesContainer = document.getElementById("upgrades")!;

// Add emoji to the main harvest button
button.innerHTML = "🍯";

// Dynamically create upgrade buttons
upgrades.forEach((u) => {
  const btn = document.createElement("button");
  btn.id = u.id;
  btn.textContent = `${u.name} (${u.cost.toFixed(1)} honey)`;
  btn.disabled = true;
  upgradesContainer.appendChild(btn);

  // Upgrade purchase logic with price scaling
  btn.addEventListener("click", () => {
    if (counter >= u.cost) {
      counter -= u.cost;
      u.count++;
      growthRate += u.rate;

      // Price increases by 15% after each purchase
      u.cost = parseFloat((u.cost * 1.15).toFixed(2));

      updateDisplay();
      console.log(
        `${u.name} purchased! Total: ${u.count}, new cost: ${u.cost}`,
      );
    }
  });
});

// Function to update all displays
function updateDisplay() {
  honeyDisplay.textContent = `${counter.toFixed(1)} honey collected`;
  rateDisplay.textContent = `Production rate: ${
    growthRate.toFixed(1)
  } honey/sec`;

  upgrades.forEach((u) => {
    const btn = document.getElementById(u.id)! as HTMLButtonElement;
    btn.disabled = counter < u.cost;
    btn.textContent = `${u.name} (${
      u.cost.toFixed(1)
    } honey) — Owned: ${u.count}`;
  });
}

// Manual harvest click
button.addEventListener("click", () => {
  counter++;
  updateDisplay();
  console.log("Manual harvest:", counter);
});

let lastTime = performance.now();

function update(currentTime: number) {
  const deltaTime = (currentTime - lastTime) / 1000;
  lastTime = currentTime;

  counter += growthRate * deltaTime;
  updateDisplay();

  requestAnimationFrame(update);
}

requestAnimationFrame(update);
updateDisplay(); // Initialize display once at startup

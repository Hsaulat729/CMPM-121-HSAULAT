console.log("🎮 CMPM 121 - Starting...");

// Counter state
let honey: number = 0;
let productionRate: number = 0; // honey per second

// Rename Item → Upgrade for domain clarity
interface Upgrade {
  id: string;
  name: string;
  cost: number;
  rate: number;
  count: number;
  description: string;
}

// Rename availableItems → availableUpgrades
const availableUpgrades: Upgrade[] = [
  {
    id: "workerBee",
    name: "🐝 Worker Bee",
    cost: 10,
    rate: 0.1,
    count: 0,
    description: "A loyal worker that gathers small drops of honey.",
  },
  {
    id: "beekeeper",
    name: "🍯 Beekeeper",
    cost: 100,
    rate: 2.0,
    count: 0,
    description: "An expert caretaker who doubles honey output.",
  },
  {
    id: "hiveExpansion",
    name: "🏡 Hive Expansion",
    cost: 1000,
    rate: 50.0,
    count: 0,
    description: "Expands your hive, allowing for industrial-scale honey flow.",
  },
  {
    id: "queenBee",
    name: "👑 Queen Bee",
    cost: 5000,
    rate: 200.0,
    count: 0,
    description: "The royal heart of the colony, inspiring faster production.",
  },
  {
    id: "honeyPlanet",
    name: "🪐 Honey Planet",
    cost: 25000,
    rate: 1000.0,
    count: 0,
    description:
      "An entire planet devoted to harvesting endless golden nectar.",
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
const harvestButton = document.getElementById("harvest")!;
const honeyDisplay = document.getElementById("honeyDisplay")!;
const rateDisplay = document.getElementById("rateDisplay")!;
const upgradesContainer = document.getElementById("upgrades")!;

// Main harvest button
harvestButton.innerHTML = "🍯";

// Create buttons for all upgrades
availableUpgrades.forEach((upgrade) => {
  const btn = document.createElement("button");
  btn.id = upgrade.id;
  btn.textContent = `${upgrade.name} (${upgrade.cost.toFixed(1)} honey)`;
  btn.disabled = true;

  btn.title = upgrade.description;
  upgradesContainer.appendChild(btn);

  // Purchase logic
  btn.addEventListener("click", () => {
    if (honey >= upgrade.cost) {
      honey -= upgrade.cost;
      upgrade.count++;
      productionRate += upgrade.rate;

      // cost inflation
      upgrade.cost = parseFloat((upgrade.cost * 1.15).toFixed(2));

      updateDisplay();
      console.log(
        `${upgrade.name} purchased! Total: ${upgrade.count}, new cost: ${upgrade.cost}`,
      );
    }
  });
});

// Update UI elements and button availability
function updateDisplay() {
  honeyDisplay.textContent = `${honey.toFixed(1)} honey collected`;
  rateDisplay.textContent = `Production rate: ${
    productionRate.toFixed(
      1,
    )
  } honey/sec`;

  availableUpgrades.forEach((upgrade) => {
    const btn = document.getElementById(upgrade.id)! as HTMLButtonElement;
    btn.disabled = honey < upgrade.cost;
    btn.textContent = `${upgrade.name} (${
      upgrade.cost.toFixed(
        1,
      )
    } honey) — Owned: ${upgrade.count}`;
    btn.title = upgrade.description;
  });
}

// Manual harvest
harvestButton.addEventListener("click", () => {
  honey++;
  updateDisplay();
  console.log("Manual harvest:", honey);
});

let lastTime = performance.now();

function update(currentTime: number) {
  const deltaTime = (currentTime - lastTime) / 1000;
  lastTime = currentTime;

  honey += productionRate * deltaTime;
  updateDisplay();

  requestAnimationFrame(update);
}

updateDisplay();
requestAnimationFrame(update);

console.log("🎮 CMPM 121 - Starting..."); // ❌ Removed for deployment

/* ----------------------------------------------------
    GAME STATE
----------------------------------------------------- */
let honey: number = 0;
let productionRate: number = 0;

/* ----------------------------------------------------
    UPGRADE INTERFACE
----------------------------------------------------- */
interface Upgrade {
  id: string;
  name: string;
  cost: number;
  rate: number;
  count: number;
  description: string;
}

/* ----------------------------------------------------
    UPGRADE DATA
----------------------------------------------------- */
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
    description: "Expands your hive for industrial-scale honey flow.",
  },
  {
    id: "queenBee",
    name: "👑 Queen Bee",
    cost: 5000,
    rate: 200.0,
    count: 0,
    description: "The heart of the colony, inspiring faster production.",
  },
  {
    id: "honeyPlanet",
    name: "🪐 Honey Planet",
    cost: 25000,
    rate: 1000.0,
    count: 0,
    description: "A whole planet dedicated to honey harvesting.",
  },
];

/* ----------------------------------------------------
    HTML SETUP
----------------------------------------------------- */
document.body.innerHTML = `
  <h1>Honey Harvester 🍯</h1>
  <p>Grow your buzzing empire and produce the sweetest honey in the hive!</p>

  <div id="honeyDisplay">0 honey collected</div>
  <div id="rateDisplay">Production rate: 0.0 honey/sec</div>

  <button id="harvest"></button>

  <div id="upgrades"></div>
`;

/* ----------------------------------------------------
    DOM REFERENCES
----------------------------------------------------- */
const harvestButton = document.getElementById("harvest")!;
const honeyDisplay = document.getElementById("honeyDisplay")!;
const rateDisplay = document.getElementById("rateDisplay")!;
const upgradesContainer = document.getElementById("upgrades")!;

harvestButton.innerHTML = "🍯";

/* ----------------------------------------------------
    CREATE UPGRADE BUTTONS
----------------------------------------------------- */
availableUpgrades.forEach((upgrade) => {
  const btn = document.createElement("button");
  btn.id = upgrade.id;
  btn.textContent = `${upgrade.name} (${upgrade.cost.toFixed(1)} honey)`;
  btn.disabled = true;
  btn.title = upgrade.description;

  upgradesContainer.appendChild(btn);

  btn.addEventListener("click", () => {
    if (honey >= upgrade.cost) {
      honey -= upgrade.cost;
      upgrade.count++;
      productionRate += upgrade.rate;

      // Cost increases by 15%
      upgrade.cost = parseFloat((upgrade.cost * 1.15).toFixed(2));

      updateDisplay();
    }
  });
});

/* ----------------------------------------------------
    UI UPDATE FUNCTION
----------------------------------------------------- */
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

/* ----------------------------------------------------
    MANUAL HARVESTING (NO LOGS)
----------------------------------------------------- */
harvestButton.addEventListener("click", () => {
  honey++;
  updateDisplay();
});

/* ----------------------------------------------------
    GAME LOOP
----------------------------------------------------- */
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

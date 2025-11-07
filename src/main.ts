console.log("Honey Harvester Starting...");

/* ----------------------------------------------------
    GAME STATE
----------------------------------------------------- */
let honey: number = 0;
let productionRate: number = 0;
let manualClicks: number = 0;
let totalHoneyHarvested: number = 0; // tracks all honey ever produced

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
  icon: string;
}

/* ----------------------------------------------------
    UPGRADE DATA
----------------------------------------------------- */
const availableUpgrades: Upgrade[] = [
  {
    id: "workerBee",
    name: "Worker Bee",
    cost: 10,
    rate: 0.1,
    count: 0,
    description: "A loyal worker that gathers small drops of honey.",
    icon: "🐝",
  },
  {
    id: "beekeeper",
    name: "Beekeeper",
    cost: 100,
    rate: 2.0,
    count: 0,
    description: "An expert caretaker who doubles honey output.",
    icon: "🧑‍🌾",
  },
  {
    id: "hiveExpansion",
    name: "Hive Expansion",
    cost: 1000,
    rate: 50.0,
    count: 0,
    description: "Expands your hive for industrial-scale honey flow.",
    icon: "🏡",
  },
  {
    id: "queenBee",
    name: "Queen Bee",
    cost: 5000,
    rate: 200.0,
    count: 0,
    description: "The heart of the colony, inspiring faster production.",
    icon: "👑",
  },
  {
    id: "honeyPlanet",
    name: "Honey Planet",
    cost: 25000,
    rate: 1000.0,
    count: 0,
    description: "A whole planet dedicated to honey harvesting.",
    icon: "🪐",
  },
];

/* ----------------------------------------------------
    HTML SETUP
----------------------------------------------------- */
document.body.innerHTML = `
  <h1>Honey Harvester</h1>
  <p>Grow your buzzing empire and produce the sweetest honey in the hive!</p>

  <div id="honeyDisplay">0 honey collected</div>
  <div id="rateDisplay">Production rate: 0.0 honey/sec</div>

  <button id="harvest"></button>
  <button id="statsBtn" style="margin-left: 10px;">Stats</button>

  <div id="statsPanel"
       style="
         display:none;
         background:#222; 
         padding:10px;
         margin-top:10px;
         width:260px;
         border-radius:8px;
         color:#fff;">
     <h3>Stats</h3>
     <p id="statClicks">Manual Clicks: 0</p>
     <p id="statHPS">Honey/sec: 0</p>
     <p id="statTotalHoney">Total Honey Harvested: 0</p>
  </div>

  <div id="upgrades"></div>
`;

/* ----------------------------------------------------
    DOM REFERENCES
----------------------------------------------------- */
const harvestButton = document.getElementById("harvest")!;
const honeyDisplay = document.getElementById("honeyDisplay")!;
const rateDisplay = document.getElementById("rateDisplay")!;
const upgradesContainer = document.getElementById("upgrades")!;
const statsBtn = document.getElementById("statsBtn")!;
const statsPanel = document.getElementById("statsPanel")!;
const statClicks = document.getElementById("statClicks")!;
const statHPS = document.getElementById("statHPS")!;
const statTotalHoney = document.getElementById("statTotalHoney")!;

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

      // cost increases by 15 percent per purchase
      upgrade.cost = parseFloat((upgrade.cost * 1.15).toFixed(2));

      spawnFloatingUpgrade(upgrade.icon);

      updateDisplay();
    }
  });
});

/* ----------------------------------------------------
    FLOATING UPGRADE ICONS
----------------------------------------------------- */
function spawnFloatingUpgrade(icon: string) {
  const elem = document.createElement("div");
  elem.textContent = icon;

  elem.style.position = "absolute";
  elem.style.left = Math.random() * (globalThis.innerWidth - 50) + "px";
  elem.style.top = Math.random() * (globalThis.innerHeight - 50) + "px";
  elem.style.fontSize = "30px";

  document.body.appendChild(elem);

  let dx = (Math.random() * 2 - 1) * 2;
  let dy = (Math.random() * 2 - 1) * 2;

  function move() {
    const x = elem.offsetLeft;
    const y = elem.offsetTop;

    if (x < 0 || x > globalThis.innerWidth - 40) dx = -dx;
    if (y < 0 || y > globalThis.innerHeight - 40) dy = -dy;

    elem.style.left = x + dx + "px";
    elem.style.top = y + dy + "px";

    requestAnimationFrame(move);
  }

  requestAnimationFrame(move);
}

/* ----------------------------------------------------
    UI UPDATE FUNCTION
----------------------------------------------------- */
function updateDisplay() {
  honeyDisplay.textContent = `${honey.toFixed(1)} honey collected`;
  rateDisplay.textContent = `Production rate: ${
    productionRate.toFixed(1)
  } honey/sec`;

  statClicks.textContent = `Manual Clicks: ${manualClicks}`;
  statHPS.textContent = `Honey/sec: ${productionRate.toFixed(1)}`;
  statTotalHoney.textContent = `Total Honey Harvested: ${
    totalHoneyHarvested.toFixed(1)
  }`;

  availableUpgrades.forEach((upgrade) => {
    const btn = document.getElementById(upgrade.id)! as HTMLButtonElement;
    btn.disabled = honey < upgrade.cost;
    btn.textContent = `${upgrade.name} (${
      upgrade.cost.toFixed(1)
    } honey) — Owned: ${upgrade.count}`;
  });
}

/* ----------------------------------------------------
    MANUAL HARVESTING
----------------------------------------------------- */
harvestButton.addEventListener("click", () => {
  honey++;
  manualClicks++;
  totalHoneyHarvested++;

  updateDisplay();
});

/* ----------------------------------------------------
    STATS TOGGLE BUTTON
----------------------------------------------------- */
statsBtn.addEventListener("click", () => {
  statsPanel.style.display = statsPanel.style.display === "none"
    ? "block"
    : "none";
});

/* ----------------------------------------------------
    GAME LOOP
----------------------------------------------------- */
let lastTime = performance.now();

function update(currentTime: number) {
  const deltaTime = (currentTime - lastTime) / 1000;
  lastTime = currentTime;

  const autoHoney = productionRate * deltaTime;

  honey += autoHoney;
  totalHoneyHarvested += autoHoney;

  updateDisplay();

  requestAnimationFrame(update);
}

updateDisplay();
requestAnimationFrame(update);

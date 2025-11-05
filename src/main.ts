console.log("🎮 CMPM 121 - Starting...");

/* ----------------------------------------------------
    GAME STATE
   Tracks the player's current honey and total production
----------------------------------------------------- */
let honey: number = 0; // Current honey owned
let productionRate: number = 0; // Honey earned per second

/* ----------------------------------------------------
    UPGRADE INTERFACE (formerly "Item")
   Represents a purchasable upgrade that boosts production
----------------------------------------------------- */
interface Upgrade {
  id: string;
  name: string;
  cost: number;
  rate: number; // Honey/sec provided by this upgrade
  count: number; // How many of this upgrade have been purchased
  description: string;
}

/* ----------------------------------------------------
    DATA-DRIVEN UPGRADE LIST
   All upgrades are defined here so UI + logic are created automatically.
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

/* ----------------------------------------------------
    INITIAL HTML LAYOUT
   Injected here so no external HTML file is required.
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
   Caching important HTML elements for performance + readability.
----------------------------------------------------- */
const harvestButton = document.getElementById("harvest")!;
const honeyDisplay = document.getElementById("honeyDisplay")!;
const rateDisplay = document.getElementById("rateDisplay")!;
const upgradesContainer = document.getElementById("upgrades")!;

// Set main click button appearance
harvestButton.innerHTML = "🍯";

/* ----------------------------------------------------
    UPGRADE BUTTON CREATION
   Automatically creates one button per upgrade using data-driven design.
----------------------------------------------------- */
availableUpgrades.forEach((upgrade) => {
  const btn = document.createElement("button");
  btn.id = upgrade.id;
  btn.textContent = `${upgrade.name} (${upgrade.cost.toFixed(1)} honey)`;
  btn.disabled = true;
  btn.title = upgrade.description;

  upgradesContainer.appendChild(btn);

  /* -----------------------------------------------
      PURCHASE LOGIC
     Runs whenever the player buys an upgrade
  ------------------------------------------------ */
  btn.addEventListener("click", () => {
    if (honey >= upgrade.cost) {
      honey -= upgrade.cost;
      upgrade.count++;
      productionRate += upgrade.rate;

      // Cost inflation (15% increase per purchase)
      upgrade.cost = parseFloat((upgrade.cost * 1.15).toFixed(2));

      updateDisplay();

      console.log(
        `${upgrade.name} purchased! Total: ${upgrade.count}, new cost: ${upgrade.cost}`,
      );
    }
  });
});

/* ----------------------------------------------------
    UPDATE DISPLAY FUNCTION
   Refreshes honey count, production rate, and button states.
----------------------------------------------------- */
function updateDisplay() {
  honeyDisplay.textContent = `${honey.toFixed(1)} honey collected`;
  rateDisplay.textContent = `Production rate: ${
    productionRate.toFixed(
      1,
    )
  } honey/sec`;

  // Enable or disable buttons depending on honey
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
    MANUAL HARVESTING
   Player clicks the button to generate 1 honey.
----------------------------------------------------- */
harvestButton.addEventListener("click", () => {
  honey++;
  updateDisplay();
  console.log("Manual harvest:", honey);
});

/* ----------------------------------------------------
    GAME LOOP (PASSIVE INCOME)
   Uses requestAnimationFrame for smooth incremental updates.
----------------------------------------------------- */
let lastTime = performance.now();

function update(currentTime: number) {
  const deltaTime = (currentTime - lastTime) / 1000; // Convert ms → sec
  lastTime = currentTime;

  honey += productionRate * deltaTime; // Auto-production based on time
  updateDisplay();

  requestAnimationFrame(update); // Continue loop
}

// Initial UI setup + start game loop
updateDisplay();
requestAnimationFrame(update);

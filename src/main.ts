console.log("🎮 CMPM 121 - Starting...");

// Counter state
let honey: number = 0;
let productionRate: number = 0; // honey per second

// Define the Item interface
interface Item {
  id: string;
  name: string;
  cost: number;
  rate: number;
  count: number;
  description: string;
}

// Data-driven list of all purchasable items
const availableItems: Item[] = [
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

  <div id="items"></div>
`;

// Grab DOM references
const harvestButton = document.getElementById("harvest")!;
const honeyDisplay = document.getElementById("honeyDisplay")!;
const rateDisplay = document.getElementById("rateDisplay")!;
const itemsContainer = document.getElementById("items")!;

// Main harvest button
harvestButton.innerHTML = "🍯";

// Dynamically create buttons for all items
availableItems.forEach((item) => {
  const btn = document.createElement("button");
  btn.id = item.id;
  btn.textContent = `${item.name} (${item.cost.toFixed(1)} honey)`;
  btn.disabled = true;

  // Tooltip / hover text shows description
  btn.title = item.description;

  itemsContainer.appendChild(btn);

  // Purchase logic
  btn.addEventListener("click", () => {
    if (honey >= item.cost) {
      honey -= item.cost;
      item.count++;
      productionRate += item.rate;

      // Increase cost by 15% after each purchase
      item.cost = parseFloat((item.cost * 1.15).toFixed(2));

      updateDisplay();
      console.log(
        `${item.name} purchased! Total: ${item.count}, new cost: ${item.cost}`,
      );
    }
  });
});

// Update displays and enable/disable buttons
function updateDisplay() {
  honeyDisplay.textContent = `${honey.toFixed(1)} honey collected`;
  rateDisplay.textContent = `Production rate: ${
    productionRate.toFixed(1)
  } honey/sec`;

  availableItems.forEach((item) => {
    const btn = document.getElementById(item.id)! as HTMLButtonElement;
    btn.disabled = honey < item.cost;
    btn.textContent = `${item.name} (${
      item.cost.toFixed(1)
    } honey) — Owned: ${item.count}`;
    btn.title = item.description;
  });
}

// Manual harvest (clicking)
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

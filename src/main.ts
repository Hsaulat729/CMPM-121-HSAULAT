console.log("🎮 CMPM 121 - Starting...");

// Counter state
let counter: number = 0;
let growthRate: number = 0; //  start at 0 (no auto growth at first)

// ✅ Upgrade data
const upgrades = [
  { id: "upgradeA", name: "👅 Tongue Trainee", cost: 10, rate: 0.1, count: 0 },
  {
    id: "upgradeB",
    name: "😎 Professional Licker",
    cost: 100,
    rate: 2.0,
    count: 0,
  },
  { id: "upgradeC", name: "🏭 Lick Factory", cost: 1000, rate: 50.0, count: 0 },
];

// Create basic HTML structure
document.body.innerHTML = `
  <h1>Lollipop Licker 🍭</h1>

  <!-- New div to show tongue licks -->
  <div id="licksDisplay">0 tongue licks</div>

  <!-- Added growth rate display -->
  <div id="rateDisplay">Growth rate: 0.0 licks/sec</div>

  <button id="increment"></button>

  <!-- Added multiple upgrade buttons dynamically below -->
  <div id="upgrades"></div>
`;

// Grab DOM references
const button = document.getElementById("increment")!;
const licksDisplay = document.getElementById("licksDisplay")!;
const rateDisplay = document.getElementById("rateDisplay")!;
const upgradesContainer = document.getElementById("upgrades")!;

// 🍭 Added emoji to the button
button.innerHTML = "🍭";

// ✅ Dynamically create upgrade buttons
upgrades.forEach((u) => {
  const btn = document.createElement("button");
  btn.id = u.id;
  btn.textContent = `${u.name} (${u.cost} licks)`;
  btn.disabled = true;
  upgradesContainer.appendChild(btn);

  // Add click event for each upgrade button
  btn.addEventListener("click", () => {
    if (counter >= u.cost) {
      counter -= u.cost; // spend licks
      u.count++; // track how many purchased
      growthRate += u.rate; // increase growth rate
      updateCounterDisplay();
      console.log(`${u.name} purchased! Total: ${u.count}`);
    }
  });
});

// Function to update the counter display
function updateCounterDisplay() {
  licksDisplay.textContent = `${counter.toFixed(1)} tongue licks`;
  rateDisplay.textContent = `Growth rate: ${growthRate.toFixed(1)} licks/sec`;

  //  Enable or disable each upgrade button based on lick count
  upgrades.forEach((u) => {
    const btn = document.getElementById(u.id)! as HTMLButtonElement;
    btn.disabled = counter < u.cost;
    btn.textContent = `${u.name} (${u.cost} licks) — Owned: ${u.count}`;
  });
}

// Add click handler to increment the counter
button.addEventListener("click", () => {
  counter++;
  updateCounterDisplay();
  console.log("Manual Lick:", counter);
});

let lastTime = performance.now();

function update(currentTime: number) {
  const deltaTime = (currentTime - lastTime) / 1000; // convert ms → seconds
  lastTime = currentTime;

  counter += growthRate * deltaTime;
  updateCounterDisplay();

  requestAnimationFrame(update);
}

requestAnimationFrame(update);
updateCounterDisplay(); // Initialize display once at startup

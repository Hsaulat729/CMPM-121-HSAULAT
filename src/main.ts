console.log("🎮 CMPM 121 - Starting...");

// Counter state
let counter: number = 0;
let growthRate: number = 0; // ✅ start at 0 (no auto growth at first)

// Create basic HTML structure
document.body.innerHTML = `
  <h1>Lollipop Licker 🍭</h1>

  <!-- New div to show tongue licks -->
  <div id="licksDisplay">0 tongue licks</div>

  <button id="increment"></button>

  <!-- ✅ New upgrade button -->
  <button id="upgrade" disabled>Buy Upgrade (10 licks)</button>
`;

// Grab DOM references
const button = document.getElementById("increment")!;
const licksDisplay = document.getElementById("licksDisplay")!;
const upgradeButton = document.getElementById("upgrade")!;

// 🍭 Added emoji to the button
button.innerHTML = "🍭";

// Function to update the counter display
function updateCounterDisplay() {
  licksDisplay.textContent = `${counter.toFixed(1)} tongue licks`;

  // ✅ Enable or disable upgrade button based on lick count
  if (counter >= 10) {
    upgradeButton.removeAttribute("disabled");
  } else {
    upgradeButton.setAttribute("disabled", "true");
  }
}

// Add click handler to increment the counter
button.addEventListener("click", () => {
  counter++;
  updateCounterDisplay();
  console.log("Manual Lick:", button, licksDisplay, counter);
});

// ✅ Upgrade button logic
upgradeButton.addEventListener("click", () => {
  if (counter >= 10) {
    counter -= 10; // spend 10 licks
    growthRate += 1; // add +1 per second
    updateCounterDisplay();
    console.log("Upgrade purchased! Growth rate is now:", growthRate);
  }
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

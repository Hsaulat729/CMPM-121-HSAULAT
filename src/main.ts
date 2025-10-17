console.log("🎮 CMPM 121 - Starting...");

// Counter state
let counter: number = 0;
const growthRate: number = 1; // licks per second

// Create basic HTML structure
document.body.innerHTML = `
  <h1>Lollipop Licker 🍭</h1>

  <!-- New div to show tongue licks -->
  <div id="licksDisplay">0 tongue licks</div>

  <button id="increment"></button>
`;

// Grab DOM references
const button = document.getElementById("increment")!;
const licksDisplay = document.getElementById("licksDisplay")!;

// 🍭 Added emoji to the button
button.innerHTML = "🍭";

// Function to update the counter display
function updateCounterDisplay() {
  licksDisplay.textContent = `${counter.toFixed(1)} tongue licks`;
}

// Add click handler to increment the counter
button.addEventListener("click", () => {
  counter++;
  updateCounterDisplay();
  console.log("Manual Lick:", button, licksDisplay, counter);
});

let lastTime = performance.now();

function update(currentTime: number) {
  const deltaTime = (currentTime - lastTime) / 1000; // convert ms → seconds
  lastTime = currentTime;

  counter += growthRate * deltaTime; // use growthRate variable instead of hardcoding 1
  updateCounterDisplay(); // ✅ only call once per frame

  requestAnimationFrame(update);
}

requestAnimationFrame(update);

updateCounterDisplay(); // ✅ initialize display once at startup

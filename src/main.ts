console.log("🎮 CMPM 121 - Starting...");

// Counter state
let counter: number = 0;

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
  licksDisplay.textContent = `${counter} tongue licks`;
}

// Add click handler to increment the counter
button.addEventListener("click", () => {
  counter++;
  updateCounterDisplay();
  console.log("I have these thingies:", button, licksDisplay, counter);
});

// Initialize the display once at startup
updateCounterDisplay();

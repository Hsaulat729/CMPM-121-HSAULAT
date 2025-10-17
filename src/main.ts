/**
 * Main entry point for the CMPM 121 Section Activity
 * Simple starter template - customize to your heart's content!
 */

console.log("🎮 CMPM 121 - Starting...");

// Simple counter for demonstration

let counter: number = 0;

// Create basic HTML structure
document.body.innerHTML = `
  <h1>Lollipop Licker 🍭</h1>
  <p>Counter: <span id="counter">0</span></p>
  <button id="increment">Click Me!</button>
`;

// Add click handler
const button = document.getElementById("increment")!;

button.innerHTML = "🍭"; // added emoji
const counterElement = document.getElementById("counter")!;

function updateCounterDisplay() {
  if (counterElement) {
    counterElement.textContent = `${counter}`;
  }
}

button.addEventListener("click", () => {
  // This looks like to a good place to add some logic!

  counter++;
  updateCounterDisplay();
  console.log("I have these thingies:", button, counterElement, counter);
});

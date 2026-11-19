const products = [
  { name: "Daily Glow Serum", price: 24 },
  { name: "Cloud Cream", price: 28 },
  { name: "Gentle Cleanser", price: 18 },
  { name: "Overnight Balm", price: 26 }
];

const bag = [];
const bagCount = document.getElementById("bagCount");
const bagDialog = document.getElementById("bagDialog");
const bagItems = document.getElementById("bagItems");
const bagTotal = document.getElementById("bagTotal");

function money(value) {
  return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(value);
}

function renderBag() {
  bagCount.textContent = bag.length;
  if (!bag.length) {
    bagItems.innerHTML = '<p class="empty-bag">Your bag is empty. Find something lovely.</p>';
  } else {
    bagItems.innerHTML = bag.map((item, index) =>
      `<div class="bag-line"><span>${item.name}</span><span>${money(item.price)} <button class="remove-item" data-index="${index}" aria-label="Remove ${item.name}">×</button></span></div>`
    ).join("");
  }
  bagTotal.textContent = money(bag.reduce((sum, item) => sum + item.price, 0));
}

document.querySelectorAll(".add-button").forEach(button => {
  button.addEventListener("click", () => {
    bag.push({ name: button.dataset.product, price: Number(button.dataset.price) });
    renderBag();
    button.textContent = "ADDED ✓";
    setTimeout(() => button.textContent = "ADD TO BAG", 1100);
  });
});

document.getElementById("openBag").addEventListener("click", () => {
  renderBag();
  bagDialog.showModal();
});
document.getElementById("closeBag").addEventListener("click", () => bagDialog.close());

bagItems.addEventListener("click", event => {
  const button = event.target.closest(".remove-item");
  if (!button) return;
  bag.splice(Number(button.dataset.index), 1);
  renderBag();
});

document.querySelectorAll(".choose-plan").forEach(button => {
  button.addEventListener("click", () => {
    const plan = button.dataset.plan;
    localStorage.setItem("beautyLoopPlan", plan);
    document.getElementById("accountMessage").textContent = `Your selected plan is ${plan}. Welcome to your BeautyLoop!`;
    button.textContent = "PLAN SELECTED ✓";
    document.querySelectorAll(".choose-plan").forEach(other => {
      if (other !== button) other.textContent = "CHOOSE PLAN";
    });
  });
});

const savedPlan = localStorage.getItem("beautyLoopPlan");
if (savedPlan) document.getElementById("accountMessage").textContent = `Your selected plan is ${savedPlan}. Welcome back to BeautyLoop!`;

document.getElementById("clearPlan").addEventListener("click", () => {
  localStorage.removeItem("beautyLoopPlan");
  document.getElementById("accountMessage").textContent = "Choose a skincare plan to start your loop.";
  document.querySelectorAll(".choose-plan").forEach(button => button.textContent = "CHOOSE PLAN");
});

document.getElementById("contactForm").addEventListener("submit", event => {
  event.preventDefault();
  document.getElementById("formNote").textContent = "Thank you! This prototype form is not connected to email.";
  event.target.reset();
});

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.textContent = open ? "×" : "☰";
});
mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.textContent = "☰";
}));

renderBag();

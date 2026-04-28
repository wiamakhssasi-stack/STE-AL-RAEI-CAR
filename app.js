const cars = [
  {
    name: "Dacia Logan",
    category: "economic",
    label: "Économique",
    seats: "5 places",
    gearbox: "Manuelle",
    fuel: "Essence",
    price: 250,
    image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "Hyundai i10",
    category: "economic",
    label: "Économique",
    seats: "4 places",
    gearbox: "Auto",
    fuel: "Essence",
    price: 280,
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "Renault Clio",
    category: "economic",
    label: "Économique",
    seats: "5 places",
    gearbox: "Manuelle",
    fuel: "Diesel",
    price: 300,
    image: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "Toyota Corolla",
    category: "sedan",
    label: "Berline",
    seats: "5 places",
    gearbox: "Auto",
    fuel: "Hybride",
    price: 450,
    image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "Volkswagen Passat",
    category: "sedan",
    label: "Berline",
    seats: "5 places",
    gearbox: "Auto",
    fuel: "Diesel",
    price: 520,
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "Kia Sportage",
    category: "suv",
    label: "SUV",
    seats: "5 places",
    gearbox: "Auto",
    fuel: "Diesel",
    price: 650,
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "Hyundai Tucson",
    category: "suv",
    label: "SUV",
    seats: "5 places",
    gearbox: "Auto",
    fuel: "Diesel",
    price: 680,
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "Mercedes Classe C",
    category: "premium",
    label: "Premium",
    seats: "5 places",
    gearbox: "Auto",
    fuel: "Diesel",
    price: 950,
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "Range Rover Evoque",
    category: "premium",
    label: "Premium",
    seats: "5 places",
    gearbox: "Auto",
    fuel: "Diesel",
    price: 1200,
    image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "Dacia Dokker",
    category: "van",
    label: "Familiale",
    seats: "5 places",
    gearbox: "Manuelle",
    fuel: "Diesel",
    price: 420,
    image: "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "Ford Tourneo",
    category: "van",
    label: "Familiale",
    seats: "7 places",
    gearbox: "Manuelle",
    fuel: "Diesel",
    price: 700,
    image: "https://images.unsplash.com/photo-1570733577524-3a047079e80d?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "Toyota Prado",
    category: "suv",
    label: "SUV",
    seats: "7 places",
    gearbox: "Auto",
    fuel: "Diesel",
    price: 1100,
    image: "https://images.unsplash.com/photo-1511994477422-b69e44bd4ea9?auto=format&fit=crop&w=900&q=80"
  }
];

const fleetGrid = document.querySelector("#fleetGrid");
const vehicleSelect = document.querySelector("#vehicleSelect");
const filterButtons = document.querySelectorAll(".filter");
const quickSearchForm = document.querySelector("#quickSearchForm");
const bookingForm = document.querySelector("#bookingForm");
const formNote = document.querySelector("#formNote");
const menuToggle = document.querySelector(".menu-toggle");
const header = document.querySelector(".site-header");

function renderFleet(category = "all") {
  const visibleCars = category === "all" ? cars : cars.filter((car) => car.category === category);

  fleetGrid.innerHTML = visibleCars
    .map(
      (car) => `
        <article class="car-card" data-category="${car.category}">
          <div class="car-image" style="background-image: url('${car.image}')" role="img" aria-label="${car.name}"></div>
          <div class="car-body">
            <div class="car-meta">
              <h3>${car.name}</h3>
              <span class="badge">${car.label}</span>
            </div>
            <div class="specs" aria-label="Caractéristiques">
              <span>${car.seats}</span>
              <span>${car.gearbox}</span>
              <span>${car.fuel}</span>
            </div>
            <div class="price-row">
              <p class="price"><strong>${car.price}</strong> <span>DHS / jour</span></p>
              <a class="btn btn-primary" href="#booking" data-car="${car.name}">Choisir</a>
            </div>
          </div>
        </article>
      `
    )
    .join("");
}

function populateVehicles() {
  vehicleSelect.innerHTML = cars
    .map((car) => `<option value="${car.name}">${car.name} - ${car.label}</option>`)
    .join("");
}

function setMinimumDates() {
  const today = new Date().toISOString().split("T")[0];
  document.querySelectorAll('input[type="date"]').forEach((input) => {
    input.min = today;
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderFleet(button.dataset.category);
  });
});

fleetGrid.addEventListener("click", (event) => {
  const target = event.target.closest("[data-car]");
  if (!target) return;

  vehicleSelect.value = target.dataset.car;
});

quickSearchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(quickSearchForm);
  const category = formData.get("category");

  filterButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.category === category);
  });

  renderFleet(category);
  document.querySelector("#fleet").scrollIntoView({ behavior: "smooth" });
});

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(bookingForm);
  const name = formData.get("fullName");
  const phone = formData.get("phone");
  const vehicle = formData.get("vehicle");
  const pickupDate = formData.get("pickupDate");
  const returnDate = formData.get("returnDate");

  formNote.textContent = `Merci ${name}. Votre demande pour ${vehicle} du ${pickupDate} au ${returnDate} est prête. Appelez le 05-37-69-15-57 pour confirmation rapide.`;

  const request = [
    "Demande de réservation - STE AL RAEI CAR",
    `Nom: ${name}`,
    `Téléphone: ${phone}`,
    `Véhicule: ${vehicle}`,
    `Départ: ${pickupDate}`,
    `Retour: ${returnDate}`,
    `Message: ${formData.get("message") || "-"}`
  ].join("\n");

  navigator.clipboard?.writeText(request).catch(() => {});
});

menuToggle.addEventListener("click", () => {
  const isOpen = header.classList.toggle("menu-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    header.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();

setMinimumDates();
populateVehicles();
renderFleet();

const places = {
  drury: {
    title: "Drury",
    copy:
      "A major future urban growth area where planning decisions will shape how streams, wetlands, tree corridors, and new neighbourhoods fit together.",
    pressure: "Housing growth and transport infrastructure",
    risk: "Habitat fragmentation and sediment entering waterways",
  },
  papakura: {
    title: "Papakura",
    copy:
      "A fast-changing community where restoration groups are working to strengthen parks, stream edges, and everyday neighbourhood green spaces.",
    pressure: "Intensification, roads, and reduced backyard canopy",
    risk: "Urban heat, lower canopy cover, and pressure on local streams",
  },
  takanini: {
    title: "Takanini",
    copy:
      "A growth corridor where housing, retail, and transport expansion need to be balanced with ecological connections and water-sensitive design.",
    pressure: "Large-scale development and expanding hard surfaces",
    risk: "Runoff, flooding pressure, and fragmented habitat patches",
  },
  manukau: {
    title: "Manukau",
    copy:
      "A major urban centre where transport corridors, commercial land, and dense development make shade, tree cover, and green corridors especially important.",
    pressure: "Commercial growth, roads, and limited urban canopy",
    risk: "Heat, stormwater pressure, and reduced ecological connectivity",
  },
};

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const number = entry.target;
      const target = Number(number.dataset.count);
      const duration = 1500;
      const start = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(target * eased);

        number.textContent =
          target >= 100000 ? current.toLocaleString("en-NZ") : current;

        if (progress < 1) {
          requestAnimationFrame(tick);
        }
      };

      requestAnimationFrame(tick);
      countObserver.unobserve(number);
    });
  },
  { threshold: 0.7 }
);

document.querySelectorAll("[data-count]").forEach((number) => {
  countObserver.observe(number);
});

const placePanel = document.querySelector("#place-panel");
const pins = document.querySelectorAll(".map-pin");

pins.forEach((pin) => {
  pin.addEventListener("click", () => {
    const place = places[pin.dataset.place];

    pins.forEach((item) => item.classList.remove("active"));
    pin.classList.add("active");

    placePanel.innerHTML = `
      <p class="kicker">Selected area</p>
      <h3>${place.title}</h3>
      <p>${place.copy}</p>
      <dl>
        <div>
          <dt>Pressure</dt>
          <dd>${place.pressure}</dd>
        </div>
        <div>
          <dt>Risk</dt>
          <dd>${place.risk}</dd>
        </div>
      </dl>
    `;
  });
});

document.querySelectorAll(".impact-card").forEach((card) => {
  card.addEventListener("click", () => {
    const expanded = card.getAttribute("aria-expanded") === "true";
    card.setAttribute("aria-expanded", String(!expanded));
  });
});

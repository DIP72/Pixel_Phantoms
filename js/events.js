document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("events-container");

  fetch("data/events.json")
    .then(response => response.json())
    .then(events => {
      container.innerHTML = "";

      if (!events.length) {
        container.innerHTML = "<p>No events available.</p>";
        return;
      }

      events.forEach(event => {
        const card = document.createElement("div");
        card.className = "event-card";

        card.innerHTML = `
          <div class="event-header">
            <h3>${event.title}</h3>
            <span class="event-type">${event.type}</span>
          </div>

          <div class="event-meta">
            <p><strong>Date:</strong> ${event.date}</p>
            <p><strong>Location:</strong> ${event.location}</p>
            <p><strong>Status:</strong> ${event.status}</p>
          </div>

          <p class="event-desc">${event.description}</p>
        `;

        container.appendChild(card);
      });
    })
    .catch(error => {
      console.error("Error loading events:", error);
      container.innerHTML = "<p>Failed to load events.</p>";
    });
});

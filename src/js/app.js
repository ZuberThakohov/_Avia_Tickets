import "../css/style.css";
import "./plugins";
import locations from "./store/locations";
import formUI from "./views/form";
import ticketsUI from "./views/tickets";
import currencyUI from "./views/currency";
import favoritesUI from "./store/favotites";

document.addEventListener("DOMContentLoaded", e => {
  const form = formUI.form;
  const ticketsContainer = document.querySelector(".tickets-sections .row");
  const favoritesTicketsContainer = document.querySelector(".dropdown-content");

  // Events
  initApp();
  form.addEventListener("submit", e => {
    e.preventDefault();
    onFormSubmit();
  });

  ticketsContainer.addEventListener("click", e => {
    if (e.target.classList.contains("add-favorite")) {
      const ticketId = e.target.closest("[data-ticket-id]").dataset.ticketId;
      favoritesUI.addFavoriteTickets(ticketId);
      e.target.textContent = 'Ticket Added';
      e.target.classList.remove('green');
      e.target.classList.add('orange');
    }
  });

  favoritesTicketsContainer.addEventListener("click", e => {
    if (e.target.classList.contains("delete-favorite")) {
      const ticketElement = e.target.closest("[data-ticket-id]");
      const ticketId = ticketElement.dataset.ticketId;
      favoritesUI.removeTicket(ticketId, ticketElement);
    }
  });

  // handlers
  async function initApp() {
    await locations.init();
    formUI.setAutocompleteData(locations.shortCities);
  }

  async function onFormSubmit() {
    const origin = locations.getCityCodeByKey(formUI.originValue);
    const destination = locations.getCityCodeByKey(formUI.destinationValue);
    const depart_date = formUI.departDateValue;
    const return_date = formUI.returnDateValue;
    const currency = currencyUI.currencyValue;

    await locations.fetchTickets({
      origin,
      destination,
      depart_date,
      return_date,
      currency
    });

    ticketsUI.renderTickets(locations.lastSearch);
    console.log(locations.lastSearch);
  }
});


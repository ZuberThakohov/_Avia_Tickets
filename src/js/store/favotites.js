import locations from "../store/locations";
import currencyUI from "../views/currency";

class FavoritesUI {
  constructor(currency) {
    this.getCurrencySymbol = currency.getCurrencySymbol.bind(currency);
    this.favoriteTickets = [];
  }
  addFavoriteTickets(id) {
    const selectedTicket = locations.lastSearch.find(
      item => item.ticket_id === id
    );
    if (!this.favoriteTickets.includes(selectedTicket))
      this.favoriteTickets.push(selectedTicket);
    this.renderFavoriteTickets(this.favoriteTickets);
  }

  renderFavoriteTickets(tickets) {
    const favoritesTicketsContainer = document.querySelector(
      ".dropdown-content"
    );
    let fragmet = "";
    const currencySymbol = this.getCurrencySymbol();
    tickets.forEach(item => {
      fragmet += this.ticketTemplate(item, currencySymbol);
    });
    favoritesTicketsContainer.innerHTML = "";
    favoritesTicketsContainer.insertAdjacentHTML("afterbegin", fragmet);
  }

  ticketTemplate(
    {
      airline_logo,
      origin_name,
      destination_name,
      departure_at,
      price,
      transfres,
      flight_number,
      ticket_id
    },
    currency
  ) {
    return `
    <div class="favorite-item  d-flex align-items-start" data-ticket-id="${ticket_id}">
        <img src="${airline_logo}" class="favorite-item-airline-img" />
        <div class="favorite-item-info d-flex flex-column">
          <div class="favorite-item-destination d-flex align-items-center">
            <div class="d-flex align-items-center mr-auto">
              <span class="favorite-item-city">${origin_name}</span>
              <i class="medium material-icons">flight_takeoff</i>
            </div>
            <div class="d-flex align-items-center">
              <i class="medium material-icons">flight_land</i>
              <span class="favorite-item-city">${destination_name}</span>
            </div>
          </div>
          <div class="ticket-time-price d-flex align-items-center">
            <span class="ticket-time-departure">${departure_at}</span>
            <span class="ticket-price ml-auto">${currency}${price}</span>
          </div>
          <div class="ticket-additional-info">
            <span class="ticket-transfers">Пересадок: ${transfres}</span>
            <span class="ticket-flight-number">
              Номер рейса: ${flight_number}
            </span>
          </div>
          <a class="waves-effect waves-light btn-small pink darken-3 delete-favorite ml-auto">
            Delete
          </a>
        </div>
      </div>`;
  }

  removeTicket(id, htmlElement) {
    this.favoriteTickets.splice(
      this.favoriteTickets.findIndex(item => item.ticket_id == id),
      1
    );
    htmlElement.remove();
  }
}

const favoritesUI = new FavoritesUI(currencyUI);

export default favoritesUI;

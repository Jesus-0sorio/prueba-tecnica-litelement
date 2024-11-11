import { LitElement, html, css } from "lit";
import "./pokemon-duplicate-alert-ui.js";

class PokemonEditModalUI extends LitElement {
  static get properties() {
    return {
      evolution: { type: Object },
      pokemon: { type: Object },
      isOpenModal: { type: Boolean },
      _showAlert: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.evolution = {};
    this.pokemon = {};
    this.isOpenModal = false;
    this._showAlert = false;
  }

  get textAlert() {
    return this.pokemon.quantity > 1
      ? "Este pokemón está repetido, puede cambiarlo en el punto más cercano"
      : "Este pokemón no está repetido";
  }

  get typeAlert() {
    return this.pokemon.quantity > 1 ? "warning" : "success";
  }

  handleCheckboxChange(e) {
    this._showAlert = e.target.checked;
  }

  render() {
    return this.isOpenModal
      ? html`
          <div class="modal">
            <div class="modal-content">
              <span class="close" @click=${this.closeModal}>&times;</span>
              <h2>Editar ${this.evolution?.name}</h2>
              <form>
                <label for="name">Nombre</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  .value=${this.evolution?.name}
                />
                <label for="image">Imagen</label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  .value=${this.evolution?.image.split("/")[4]}
                />
                <label for="types">Tipos</label>
                <input
                  type="text"
                  id="types"
                  name="types"
                  .value=${this.evolution?.types}
                />
                <div class="checkbox">
                  <input
                    type="checkbox"
                    id="repeatPokemon"
                    name="repeatPokemon"
                    @change=${this.handleCheckboxChange}
                  />
                  <label for="repeatPokemon">
                    ¿<strong>${this.pokemon?.name}</strong> está repetido?
                  </label>
                </div>
                ${this._showAlert
                  ? html`<pokemon-duplicate-alert-ui
                      .textContent=${this.textAlert}
                      .type=${this.typeAlert}
                    ></pokemon-duplicate-alert-ui>`
                  : ""}
                <button type="button" @click=${this.closeModal}>Guardar</button>
              </form>
            </div>
          </div>
        `
      : "";
  }

  static get styles() {
    return css`
      .modal {
        display: block;
        position: fixed;
        z-index: 1;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.4);
      }

      .modal-content {
        background-color: #fefefe;
        margin: 10% auto;
        padding: 20px;
        border: 1px solid #888;
        width: 80%;
        max-width: 500px;
        border-radius: 8px;
      }

      .close {
        color: #aaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
        cursor: pointer;
      }

      .checkbox {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-top: 0.8rem;
      }

      button {
        padding: 0.5rem;
        cursor: pointer;
        border: none;
        background: #a5251c;
        color: white;
        border-radius: 0.25rem;
        width: 100%;
        margin-top: 1rem;
        transition: background 0.2s;
      }

      button:hover,
      button:focus {
        background: #8f2018;
      }

      form {
        display: flex;
        flex-direction: column;
      }

      label {
        margin-top: 1rem;
      }

      input {
        padding: 0.5rem;
        margin-top: 0.5rem;
      }
    `;
  }

  closeModal() {
    this.evolution = {};
    this.pokemon = {};
    this.isOpenModal = false;
  }

  openModal(pokemon) {
    this.evolution = pokemon.evolution;
    this.pokemon = {
      name: pokemon.name,
      quantity: pokemon.quantity,
    };
    this.isOpenModal = true;
  }
}

customElements.define("pokemon-edit-modal-ui", PokemonEditModalUI);

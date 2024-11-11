import { LitElement, css, html } from "lit";
import "./components/ui/pokemon-header-ui.js";
import "./components/dm/pokemon-dm-manager.js";
import "./components/ui/pokemon-edit-modal-ui.js";
import "./pages/pokemon-home.js";
import "./pages/pokemon-detail.js";

export class PokemonApp extends LitElement {
  static get properties() {
    return {
      pokemonSelected: { type: String },
      pokemon: { type: Array },
      pokemons: { type: Array },
    };
  }

  constructor() {
    super();
    this.pokemonSelected = "";
    this.pokemon = [{}];
    this.pokemons = [];
  }
  
  _listenPokemonSelected(event) {
    this.pokemonSelected = event.detail;
    const manager = this.shadowRoot.querySelector("pokemon-dm-manager");
    manager.fetchPokemonByName(this.pokemonSelected);
  }

  _listenPokemonsData(event) {
    this.pokemons = event.detail;
  }

  _listenPokemonData(event) {
    this.pokemon = event.detail;
  }


  _setListeners() {
    this.addEventListener("pokemon-selected", this._listenPokemonSelected);
    this.addEventListener("pokemon-data", this._listenPokemonData);
    this.addEventListener("pokemons-data", this._listenPokemonsData);
    this.addEventListener("back-to-home", () => {
      this.pokemonSelected = "";
    });
  }

  connectedCallback() {
    super.connectedCallback();
    this._setListeners();
  }

  render() {
    return html`
      <pokemon-dm-manager></pokemon-dm-manager>
      <pokemon-header-ui></pokemon-header-ui>

      <div class="content">
        ${this.pokemonSelected
          ? html`<pokemon-detail .pokemon=${this.pokemon}></pokemon-detail>`
          : html`<pokemon-home .pokemons=${this.pokemons}></pokemon-home>`}
      </div>
    `;
  }

  static get styles() {
    return css`
      :host {
        display: block;
        height: 100vh;
        width: 100vw;
        margin: 0;
        padding: 0;
        font-family: Arial, sans-serif;
        background-color: #f5f5f5;
      }

      .content {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: 20px;
      }

      pokemon-dm-manager {
        display: none;
      }

      pokemon-header-ui {
        margin-bottom: 20px;
      }
    `;
  }
}

window.customElements.define("pokemon-app", PokemonApp);

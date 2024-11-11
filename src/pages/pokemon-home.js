import { LitElement, html, css } from "lit";
import '../components/dm/pokemon-dm-manager.js';
import '../components/ui/pokemon-card-ui.js';

class PokemonHome extends LitElement {
  static get properties() {
    return {
      pokemons: { type: Array },
    };
  }

  constructor() {
    super();
    this.pokemons = [];
  }

  render() {
    return html`
      <div class="container">
        ${this.pokemons.map(
          (pokemon) => html`
            <pokemon-card-ui .pokemon=${pokemon}></pokemon-card-ui>
          `
        )}
      </div>
    `;
  }

  static get styles() {
    return css`
      .container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 0.1rem;
      }

      @media (min-width: 768px) {
        .container {
          justify-content: left;
          padding: 1rem 1rem;
        }
      }
    `;
  }
}

customElements.define("pokemon-home", PokemonHome);
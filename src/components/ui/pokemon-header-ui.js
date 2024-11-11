import { css, html, LitElement } from "lit";

class PokemonHeaderUi extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      subtitle: { type: String },
    };
  }

  static get styles() {
    return css`
      header {
        background-color: #c43026;
        color: white;
        padding: 0.2rem;
        text-align: center;
      }

      img {
        width: 200px;
      }
    `;
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <header>
        <img class="" src="./src/assets/logo/pokedex.webp" alt="Pokémon logo" />
      </header>
    `;
  }
}

customElements.define("pokemon-header-ui", PokemonHeaderUi);
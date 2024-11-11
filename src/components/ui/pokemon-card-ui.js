import { LitElement, html, css } from "lit";

class PokemonCardUi extends LitElement {
  static get properties() {
    return {
      pokemon: { type: Object },
      type: { type: String },
    };
  }

  constructor() {
    super();
    this.pokemon = {};
    this.type = "";
  }

  _onClick() {
    if (this.type !== "view") {
      this.dispatchEvent(
        new CustomEvent("pokemon-selected", {
          detail: this.pokemon.name,
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  _renderTypes() {
    return this.pokemon?.types?.map(
      (type) => html`<li class="type">${type}</li>`
    );
  }

  render() {
    return html`
      <div class="card" @click=${this._onClick}>
        <img
          src="${this.pokemon?.image}"
          alt="Image of ${this.pokemon?.name}"
        />
        <h2>${this.pokemon?.name}</h2>
        <ul>
          ${this._renderTypes()}
        </ul>
        <slot></slot>
      </div>
    `;
  }

  static get styles() {
    return css`
      .card {
        border: 1px solid #e1e1e1;
        border-radius: 0.5rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        margin: 0.5rem;
        padding: 1rem;
        width: 200px;
        cursor: pointer;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }

      .card:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
      }

      .card img {
        width: 100%;
        border-radius: 0.25rem;
      }

      .card h2 {
        font-size: 1.5rem;
        margin: 0.5rem 0;
        text-align: center;
      }

      .card ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
        text-align: center;
      }

      .card ul .type {
        display: inline-block;
        margin-right: 0.5rem;
        padding: 0.25rem 0.5rem;
        background-color: #f1f1f1;
        border-radius: 0.25rem;
        font-size: 0.9rem;
      }

      @media (max-width: 768px) {
        .card {
          width: 150px;
        }
        .card h2 {
          font-size: 1.25rem;
        }
      }
    `;
  }
}

customElements.define("pokemon-card-ui", PokemonCardUi);

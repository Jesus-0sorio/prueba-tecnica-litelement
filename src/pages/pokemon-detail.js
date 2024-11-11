import { LitElement, html, css } from "lit";
import "../components/ui/pokemon-card-ui.js";
import "../components/ui/pokemon-edit-modal-ui.js";

class PokemonDetail extends LitElement {
  static get properties() {
    return {
      pokemon: { type: Array },
    };
  }

  constructor() {
    super();
    this.pokemon = [{}];
  }

  _dispatchEvent(eventName, detail) {
    this.dispatchEvent(
      new CustomEvent(eventName, {
        detail,
        bubbles: true,
        composed: true,
      })
    );
  }

  _openModal(pokemon) {
    const modal = this.shadowRoot.querySelector("pokemon-edit-modal-ui");
    modal.openModal(pokemon);
  }

  render() {
    return html`
      <pokemon-edit-modal-ui></pokemon-edit-modal-ui>

      <div class="container">
        <div>
          <button
            class="btn-back"
            @click=${() =>
              this._dispatchEvent("back-to-home", { backToHome: true })}
          >
            &#8592; Regresar a la lista
          </button>
        </div>

        <div class="cards">
          <div>
            <h3>${this.pokemon[0]?.name}</h3>
            <div class="card-pokemon">
              <pokemon-card-ui
                .pokemon=${this.pokemon[0]}
                type="view"
              ></pokemon-card-ui>
            </div>
          </div>

          <div class="evolutions">
            ${this.pokemon[0]?.evolutions?.length > 0
              ? html`
                  <h3>Evoluciones</h3>
                  <div class="cards-evolutions">
                    ${this.pokemon[0]?.evolutions.map(
                      (evolution) => html`
                        <pokemon-card-ui .pokemon=${evolution} type="view">
                          <button
                            class="btn-edit-evolution"
                            type="button"
                            @click=${() =>
                              this._openModal({
                                evolution,
                                quantity: this.pokemon.length,
                                name: this.pokemon[0]?.name,
                              })}
                          >
                            Editar
                          </button>
                        </pokemon-card-ui>
                      `
                    )}
                  </div>
                `
              : html`<div class="no-evolutions">
                  <p>Este Pokémon no tiene evoluciones</p>
                </div>`}
          </div>
        </div>
      </div>
    `;
  }

  static get styles() {
    return css`
      .container {
        display: flex;
        flex-direction: column;
      }

      .btn-back {
        padding: 0.5rem;
        margin: 0.5rem;
        cursor: pointer;
        background-color: #a5251c;
        color: white;
        border: none;
        border-radius: 0.4rem;
      }

      .cards {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
      }

      .evolutions {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      .cards-evolutions {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
      }

      .btn-edit-evolution {
        padding: 0.5rem;
        cursor: pointer;
        border: none;
        background: #a5251c;
        color: white;
        border-radius: 0.25rem;
        width: 100%;
        margin-top: 0.5rem;
      }

      .btn-edit-evolution:hover,
      .btn-edit-evolution:focus,
      .btn-edit-evolution:active {
        background: #8f2018;
      }

      .no-evolutions {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 1.5rem;
        margin: 0.5rem 0;
        text-align: center;
        color: #555;
      }

      @media (min-width: 768px) {
        .evolutions {
          grid-column-start: 2;
          grid-column-end: span 2;
          grid-row-start: 1;
          grid-row-end: span 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
        }
        .cards {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-template-rows: 1fr;
          justify-items: center;
          align-items: center;
          gap: 1rem;
          place-content: center;
          height: 100%;
        }
      }
    `;
  }
}

customElements.define("pokemon-detail", PokemonDetail);

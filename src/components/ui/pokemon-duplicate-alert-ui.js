import { LitElement, html, css } from "lit";

class PokemonDuplicateAlertUI extends LitElement {
  static get properties() {
    return {
      type: { type: String },
      textContent: { type: String },
    };
  }

  constructor() {
    super();
    this.type = "";
    this.textContent = "";
  }

  render() {
    return this.textContent
      ? html`
          <div class="alert ${this.type}">
            <p>${this.textContent}</p>
          </div>
        `
      : null;
  }

  static get styles() {
    return css`
      .alert {
        padding: 8px;
        border-radius: 8px;
        border: 1px solid lightgray;
        margin: 8px 0;
        box-sizing: border-box;
      }

      p {
        margin: 0;
        font-weight: 500;
      }

      .success {
        color: #155724;
        background-color: #d4edda;
        border-color: #c3e6cb;
      }

      .warning {
        color: #856404;
        background-color: #fff3cd;
        border-color: #ffeeba;
      }
    `;
  }
}

customElements.define("pokemon-duplicate-alert-ui", PokemonDuplicateAlertUI);

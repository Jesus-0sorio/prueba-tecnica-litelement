import { LitElement } from "lit";

export class PokemonDmManager extends LitElement {
  static get properties() {
    return {
      API_URL: { type: String },
      IMG_PATH: { type: String },
    };
  }

  constructor() {
    super();
    this.API_URL = "http://localhost:3001/pokemon";
    this.IMG_PATH = "./src/assets/pokemons/";
  }

  async fetchPokemons() {
    try {
      const pokemonList = await this._requestPokemonData();
      this._dispatchEvent("pokemons-data", pokemonList);
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
    }
  }

  async fetchPokemonByName(name) {
    try {
      const pokemonList = await this._requestPokemonData(name);
      this._dispatchEvent("pokemon-data", pokemonList);
    } catch (error) {
      console.error("Error fetching Pokémon by name:", error);
    }
  }

  async _requestPokemonData(name = "") {
    const url = name ? `${this.API_URL}?name=${name}` : this.API_URL;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch data");
    const jsonData = await response.json();
    return this._transformPokemonData(jsonData);
  }

  _transformPokemonData(data) {
    return data.map((pokemon, index) => ({
      id: index + 1,
      name: pokemon.name,
      image: `${this.IMG_PATH}${pokemon.image}`,
      types: pokemon.type.split("/"),
      evolutions: pokemon.evolutions?.map((evolution, idx) => ({
        id: idx + 1,
        name: evolution.name,
        image: `${this.IMG_PATH}${evolution.image}`,
        types: evolution.type.split("/"),
      })),
    }));
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

  connectedCallback() {
    super.connectedCallback();
    this.fetchPokemons();
  }
}

customElements.define("pokemon-dm-manager", PokemonDmManager);

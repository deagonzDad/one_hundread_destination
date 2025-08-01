import {
  QUERYSTRING_CONTINENT,
  QUERYSTRING_COUNTRY_NAME,
  QUERYSTRING_PLACE_TO_VISIT,
} from "@constants/worldMapConstants";
import { generateUrl } from "./urlGenerator";

class HTMLPlaceElement extends HTMLElement {
  public country: string | null = null;
  public place: string | null = null;
  public continent: string | null = null;
  connectedCallback() {
    this._parseUrlParams();
    this._setImageInPlace();
  }
  private _parseUrlParams() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    this.place = urlParams.get(QUERYSTRING_PLACE_TO_VISIT);
    this.country = urlParams.get(QUERYSTRING_COUNTRY_NAME);
    this.continent = urlParams.get(QUERYSTRING_CONTINENT);
  }
  private _setImageInPlace() {
    const continentImg = this.querySelector(
      "#continentImg",
    ) as HTMLImageElement;
    const imgUrl = `images/continents/${this.continent}.webp`;
    continentImg.src = generateUrl(imgUrl);
  }
}
customElements.define("place-component", HTMLPlaceElement);

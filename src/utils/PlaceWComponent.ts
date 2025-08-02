import {
  QUERYSTRING_CONTINENT,
  QUERYSTRING_COUNTRY_NAME,
  QUERYSTRING_PLACE_TO_VISIT,
} from "@constants/worldMapConstants";
import { generateUrl, GetJson } from "./urlGenerator";
import {
  generateRandomNumber,
  randomColorGen,
  randomIndexGen,
  validCircles,
} from "./RandomFiller";
import { SetDataAttributes } from "./DataParsers";
import "@utils/SelectorCityWComponent";
import type { Places } from "src/types/continents";
class HTMLPlaceElement extends HTMLElement {
  public country: string | null = null;
  public place: string | null = null;
  public continent: string | null = null;
  connectedCallback() {
    this._parseUrlParams();
    this._setImageInPlace();
    this._setSelectorCity();
    this._fillDataPlaces();
    this._injectStyles();
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
  private _setSelectorCity() {
    const selectorCtn = this.querySelector("#selectorCityCtn");
    if (selectorCtn) {
      const mainColor = randomColorGen();
      const secondaryColor = randomColorGen();
      const randomNumberTemp = generateRandomNumber();
      const selectorCity = document.createElement("selector-city");
      SetDataAttributes(selectorCity, {
        placeKey: this.place ?? "",
        countryKey: this.country?.toLowerCase().replace(/\s/g, "-") ?? "",
        continentName: this.continent ?? "",
        placeName: this.country ?? "",
        weather: "test",
        firstLineMain: mainColor,
        firstLineSecondary: secondaryColor,
        secondLine: `${randomNumberTemp}`,
        thirdLine: `${validCircles[randomIndexGen()]}`,
      });
      selectorCtn.appendChild(selectorCity);
    }
  }

  private async _fillDataPlaces() {
    const file = (await GetJson(`json/${this.continent}.json`)) as Places;
    const scrollCtn = this.querySelector("#placesScroll") as HTMLDivElement;
    if (file && scrollCtn) {
      const place = file[this.place ?? ""];

      const htmlData = place?.placesToVisit
        .map(({ placeName, description }) =>
          this._createDetails(placeName, description),
        )
        .join("");
      scrollCtn.innerHTML = htmlData ?? "";
    }
  }

  private _createDetails = (
    title: string,
    content: string,
  ) => `<details class="accordion-item" open>
            <summary class="accordion-header">${title}</summary>
            <div class="accordion-content">
              <p>${content}</p>
            </div>
          </details>`;

  private _injectStyles() {
    const style = document.createElement("style");
    style.textContent = `
      .accordion-container {
        border: 2px solid red;
        display: flex;
        gap: 20px; 
        flex-wrap: wrap;
      }
      .accordion-item {
        background-color: #8e44ad;
        color: white;
        border-radius: 8px; 
        padding: 16px;
        width: 300px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        transition: background-color 0.3s ease;
        overflow: hidden;
      }
      .accordion-item[open]{
        background-color: #8e44ad;
        overflow: hidden;
      }
    `;
    this.appendChild(style);
  }
}
customElements.define("place-component", HTMLPlaceElement);

import styles from "@styles/webComponents/selectorCityWComponent.css?raw";
import { generateUrl } from "@utils/urlGenerator";
import { getPositiveInteger } from "@utils/DataParsers";
import {
  QUERYSTRING_CONTINENT,
  QUERYSTRING_COUNTRY_NAME,
  QUERYSTRING_PLACE_TO_VISIT,
} from "@constants/worldMapConstants";
const sheet = new CSSStyleSheet();
sheet.replaceSync(styles);

const ringType = {
  doubleRing: `<div class="outer-ring"><div class="inner-ring"></div></div>`,
  smallRing: `<div class="small-ring"></div>`,
  bigRing: `<div class="small-ring big-ring"></div>`,
};

const patterns = {
  1: ["x", "x", "x", "x", "o", "x", "x", "x", "x"],
  2: ["x", "x", "x", "o", "o", "x", "x", "x", "x"],
  3: ["x", "o", "x", "o", "x", "x", "x", "o", "x"],
  4: ["x", "o", "x", "o", "x", "o", "x", "o", "x"],
};

type ringKeys = keyof typeof ringType;
type baseDataset = string | undefined;
class HTMLPlaceElement extends HTMLElement {
  private countryKey: baseDataset;
  private placeKey: baseDataset;
  private continentName: baseDataset;
  private placeName: baseDataset;
  private weatherType: baseDataset;
  private firstLineMain: baseDataset;
  private firstLineSecondary: baseDataset;
  private secondLine: number | null = null;
  private thirdLine: ringKeys = "doubleRing";
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot!.adoptedStyleSheets = [sheet];

    this.shadowRoot!.innerHTML = `
    <div class="flex-item" id="weather-ctn"></div>
    <div class="flex-item item-2">
      <div id="title-ctn">
      </div>
      <div class="charger-ctn">
        <div class="charger-main"></div>
      </div>
    </div>
    <div class="flex-item" id="first-line"></div>
    <div class="flex-item diamond" id="second-line"></div>
    <div class="flex-item" id="third-line"></div>
    `;
  }

  connectedCallback() {
    this._extractAndFilterData();
    this._createNewElements();
    this.addEventListener("click", this._createEventListener);
  }

  disconnectCallback() {
    this.removeEventListener("click", this._createEventListener);
  }

  private _extractAndFilterData() {
    this.countryKey = this.dataset.countryKey;
    this.placeKey = this.dataset.placeKey;
    this.continentName = this.dataset.continentName;
    this.placeName = this.dataset.placeName;
    this.weatherType = this.dataset.weather;
    this.firstLineMain = this.dataset.firstLineMain;
    this.firstLineSecondary = this.dataset.firstLineSecondary;
    this.secondLine = getPositiveInteger(this.dataset.secondLine);
    this.thirdLine = this.dataset.thirdLine as ringKeys;
  }

  private _createNewElements() {
    const imgDivCtn = this.shadowRoot!.querySelector(
      "#weather-ctn",
    ) as HTMLDivElement;
    const textDivCtn = this.shadowRoot!.querySelector(
      "#title-ctn",
    ) as HTMLDivElement;
    const firstLineDivCtn = this.shadowRoot!.querySelector(
      "#first-line",
    ) as HTMLDivElement;
    const secondLineDivCtn = this.shadowRoot!.querySelector(
      "#second-line",
    ) as HTMLDivElement;
    const thirdLineDivCtn = this.shadowRoot!.querySelector(
      "#third-line",
    ) as HTMLDivElement;
    if (
      this.weatherType &&
      imgDivCtn &&
      textDivCtn &&
      firstLineDivCtn &&
      secondLineDivCtn &&
      thirdLineDivCtn
    ) {
      const imgCtn = document.createElement("img") as HTMLImageElement;
      imgCtn.src = generateUrl(
        `/images/components/weather_${this.weatherType}.png`,
      );
      imgCtn.classList.add("weather-img");
      imgDivCtn.appendChild(imgCtn);

      textDivCtn.innerHTML = `<p>${this.placeKey}</p><small>${this.countryKey}</small>`;

      firstLineDivCtn.innerHTML = `<div class="sphere" style="--var-main:${this.firstLineMain}; --var-secondary:${this.firstLineSecondary}"></div>`;

      thirdLineDivCtn.innerHTML = ringType[this.thirdLine];

      const dotLayout: string = patterns[
        (this.secondLine as keyof typeof patterns) ?? 1
      ]
        .map((cellType) => {
          if (cellType === "o") {
            return `<div class="dot"></div>`;
          } else {
            return `<div class="dot empty"></div>`;
          }
        })
        .join("");

      secondLineDivCtn.innerHTML = dotLayout;
    }
  }
  private _createEventListener() {
    if (
      this.countryKey &&
      this.placeKey &&
      this.continentName &&
      this.placeName
    ) {
      const redirectionUrl = generateUrl(
        `/continents/place/?${QUERYSTRING_COUNTRY_NAME}=${this.countryKey}&${QUERYSTRING_PLACE_TO_VISIT}=${this.placeKey}&${QUERYSTRING_CONTINENT}=${this.continentName}`,
      );

      window.location.href = redirectionUrl;
    } else {
      console.error("Missing data attributes on selector-city element.");
    }
  }
}

customElements.define("selector-city", HTMLPlaceElement);

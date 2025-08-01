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
  2: ["x", "x", "x", "o", "x", "o", "x", "x", "x"],
  3: ["x", "o", "x", "o", "x", "x", "x", "o", "x"],
  4: ["x", "o", "x", "o", "x", "o", "x", "o", "x"],
};

type ringKeys = keyof typeof ringType;

class HTMLPlaceElement extends HTMLElement {
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
    const countryKey = this.dataset.countryKey;
    const placeKey = this.dataset.placeKey;
    const continentName = this.dataset.continentName;
    const placeName = this.dataset.placeName;
    const weatherType = this.dataset.weather;
    const firstLineMain = this.dataset.firstLineMain;
    const firstLineSecondary = this.dataset.firstLineSecondary;

    const secondLine = getPositiveInteger(this.dataset.secondLine);
    const thirdLine = this.dataset.thirdLine as ringKeys;

    // const thirdLine = this.dataset.thirdLine;
    // const extraThirdLine = this.dataset.extraThirdLine;
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
      weatherType &&
      imgDivCtn &&
      textDivCtn &&
      firstLineDivCtn &&
      secondLineDivCtn &&
      thirdLineDivCtn
    ) {
      const imgCtn = document.createElement("img") as HTMLImageElement;
      imgCtn.src = generateUrl(`/images/components/weather_${weatherType}.png`);
      imgCtn.classList.add("weather-img");
      imgDivCtn.appendChild(imgCtn);

      textDivCtn.innerHTML = `<p>${placeKey}</p><small>${countryKey}</small>`;

      firstLineDivCtn.innerHTML = `<div class="sphere" style="--var-main:${firstLineMain}; --var-secondary:${firstLineSecondary}"></div>`;

      thirdLineDivCtn.innerHTML = ringType[thirdLine!];

      const dotLayout: string = patterns[
        (secondLine as keyof typeof patterns) ?? 1
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
    console.log(continentName);

    this.addEventListener("click", () => {
      if (countryKey && placeKey && continentName && placeName) {
        // const timestamp = Date.now();
        const redirectionUrl = generateUrl(
          `/continents/place/?${QUERYSTRING_COUNTRY_NAME}=${countryKey}&${QUERYSTRING_PLACE_TO_VISIT}=${placeKey}&${QUERYSTRING_CONTINENT}=${continentName}`,
        );

        window.location.href = redirectionUrl;
      } else {
        console.error("Missing data attributes on selector-city element.");
      }
    });
  }
}

customElements.define("selector-city", HTMLPlaceElement);

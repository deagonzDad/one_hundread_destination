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

  private _scroller: HTMLElement | null = null;
  private _handleMouseEnter: () => void = () =>
    this._scroller?.setAttribute("data-paused", "true");
  private _handleMouseLeave: () => void = () =>
    this._scroller?.removeAttribute("data-paused");

  connectedCallback() {
    this._parseUrlParams();
    this._setImageInPlace();
    this._setSelectorCity();
    this._fillDataPlaces();
    this._injectStyles();
    this._injectAnimationStyles();
    this._setupPauseOnHover();
  }

  disconnectedCallback() {
    this._scroller?.removeEventListener("mouseenter", this._handleMouseEnter);
    this._scroller?.removeEventListener("mouseleave", this._handleMouseLeave);
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
        .map(({ placeName, description }, idx) =>
          this._createDetails(placeName, description, idx + 1),
        )
        .join("");
      const totalItems = place?.placesToVisit.length;
      const baseCardWidth = 150;
      scrollCtn.innerHTML = `<div class="scroller__inner" style="--width-card:${baseCardWidth}px;--quantity:${totalItems};">${htmlData}</div>`;
      this._setupInfiniteScroll();
    }
  }

  private _setupInfiniteScroll() {
    const scroller = this.querySelector("#placesScroll");
    if (scroller) {
      // Future infinite scroll setup can go here
    }
  }

  private _setupPauseOnHover() {
    this._scroller = this.querySelector("#placesScroll");
    if (this._scroller) {
      this._scroller.addEventListener("mouseenter", this._handleMouseEnter);
      this._scroller.addEventListener("mouseleave", this._handleMouseLeave);
    }
  }

  private _createDetails = (
    title: string,
    content: string,
    idx: number,
  ) => `<details class="accordion-item" style="--position: ${idx}" open>
            <summary class="accordion-header">${title}</summary>
            <div class="accordion-content">
              <p>${content}</p>
            </div>
          </details>`;

  private _injectStyles() {
    const style = document.createElement("style");
    style.textContent = `
      .accordion-container {
        display: flex;
        gap: 20px; 
        flex-wrap: wrap;
        align-items:stretch;
      }

      .accordion-item {
        background-color: #8e44ad;
        color: white;
        border-radius: 8px; 
        padding: 16px;
        width: var(--width-card);
        height:50%;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        transition: background-color 0.3s ease;
        display:flex;
        flex-direction:column;
      }

      .accordion-item > summary {
        overflow: visible;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .accordion-item[open] > summary {
        overflow:visible;
        white-space: initial;
        text-overflow: ellipsis;
      }

      .accordion-item[open]{
        background-color: #8e44ad;
        
      }
      .accordion-content {
        flex-grow:1;
        overflow-y:auto;
      }
      
    `;
    this.appendChild(style);
  }

  private _injectAnimationStyles() {
    const style = document.createElement("style");
    style.textContent = `
      .scroller__inner {
        display:flex;
        width:100%;
        height: 100%;
        min-width: calc(var(--width-card) * var(--quantity));
        position:relative;
      }
      .scroller__inner .accordion-item {
        --base-time: 10s;
        width: var(--width-card);
        position: absolute;
        animation: autoRun var(--base-time) linear infinite;
        animation-delay: calc(
          (var(--base-time) / var(--quantity)) * (var(--position) - 1) * -1
        );
      }

      @keyframes autoRun {
        from{
          left:100%;
        }
        to{
          left:calc(var(--width-card) * -1);
          
        }
      }
        #placesScroll[data-paused="true"] .accordion-item {
          animation-play-state: paused;
        }
    `;
    this.appendChild(style);
  }
}
customElements.define("place-component", HTMLPlaceElement);

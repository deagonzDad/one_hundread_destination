export class HTMLPointerElement extends HTMLElement {
  constructor() {
    super();
  }
  static get observedAttributes() {
    return ["data-img-src", "data-alt-desc", "data-x", "data-y"];
  }

  connectedCallback() {}
  disconnectedCallback() {}
  attributeChangedCallback(
    name: string,
    _oldValue: string | null,
    _newValue: string | null,
  ) {
    switch (name) {
      case "data-x":
        break;
      case "data-y":
        this._updatePoint();
        break;
      case "data-img-src":
        break;
      case "data-alt-desc":
        this._updateImg();
        break;
      default:
        break;
    }
  }
  private _updatePoint() {
    const svgElement = this.querySelector("#pointerSvg") as SVGElement;
    if (svgElement) {
      svgElement.style.setProperty(
        "--circle-center-x",
        this.dataset.x as string,
      );
      svgElement.style.setProperty(
        "--circle-center-y",
        this.dataset.y as string,
      );
    }
  }
  private _updateImg() {
    const imgCtn = this.querySelector("#pointerImg") as HTMLImageElement;
    const svgElement = this.querySelector("#pointerSvg") as SVGElement;
    if (imgCtn && svgElement) {
      imgCtn.onload = () => {
        // Use naturalWidth and naturalHeight to get the original image dimensions
        const originalWidth = imgCtn.naturalWidth;
        const originalHeight = imgCtn.naturalHeight;

        svgElement.setAttribute(
          "viewBox",
          `0 0 ${originalWidth} ${originalHeight}`,
        );

        // Make the image visible only after it has loaded successfully
        imgCtn.style.visibility = "visible";
      };

      imgCtn.onerror = () => {
        // Hide the image if it fails to load
        imgCtn.style.visibility = "hidden";
        console.error(`Failed to load image: ${imgCtn.src}`);
      };

      imgCtn.src = this.dataset.imgSrc as string;
      imgCtn.alt = this.dataset.altDesc as string;
    }
  }
}
customElements.define("pointer-element", HTMLPointerElement);

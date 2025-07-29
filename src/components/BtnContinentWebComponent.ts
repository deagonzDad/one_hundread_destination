class BtnContinentWebComponent extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const keyAbbr = this.dataset.continentAbbr;
    const button = this.querySelector(".btn--button") as HTMLAnchorElement;
    const textSpan = this.querySelector(".btn--text") as HTMLAnchorElement;
    if (button && keyAbbr && textSpan) {
      const width = textSpan.offsetWidth + 20 * 2;
      const height = button.offsetHeight;
      console.log(
        textSpan.offsetWidth,
        button.offsetWidth,
        width,
        textSpan.innerHTML,
      );

      const event = new CustomEvent("continent-button-rendered", {
        detail: {
          keyAbbr: keyAbbr,
          width,
          height,
        },
      });
      console.log("creating events");
      window.dispatchEvent(event);
    }
  }
}

customElements.define("btn-continent-web-component", BtnContinentWebComponent);

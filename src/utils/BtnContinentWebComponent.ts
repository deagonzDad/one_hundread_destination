class BtnContinentWebComponent extends HTMLAnchorElement {
  connectedCallback() {
    const keyAbbr = this.dataset.continentAbbr;
    const textSpan = this.querySelector(".btn--text") as HTMLAnchorElement;
    if (keyAbbr && textSpan) {
      const padding = 20 * 2;
      const width = textSpan.offsetWidth + padding;
      const height = this.offsetHeight + padding;

      const event = new CustomEvent("continent-button-rendered", {
        detail: {
          keyAbbr: keyAbbr,
          width,
          height,
        },
      });
      window.dispatchEvent(event);
    }
  }
}

customElements.define("btn-continent-extend", BtnContinentWebComponent, {
  extends: "a",
});

window.addEventListener("continent-button-rendered", ((event: CustomEvent) => {
  console.log("Hola");
  const { keyAbbr, width, height } = event.detail;
  const foreignObject = document.querySelector(
    `foreignObject[data-continent-abbr="${keyAbbr}"]`,
  );
  console.log("base data", event.detail);
  if (foreignObject) {
    foreignObject.setAttribute("width", `${width}px`);
    foreignObject.setAttribute("height", `${height}px`);
  }
}) as EventListener);

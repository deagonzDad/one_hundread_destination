window.addEventListener("continent-button-rendered", ((event: CustomEvent) => {
  const { keyAbbr, width, height } = event.detail;
  const foreignObject = document.querySelector(
    `foreignObject[data-continent-abbr="${keyAbbr}"]`,
  );
  if (foreignObject) {
    foreignObject.setAttribute("width", `${width}px`);
    foreignObject.setAttribute("height", `${height}px`);
  }
}) as EventListener);

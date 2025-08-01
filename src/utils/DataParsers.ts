export const SetDataAttributes = (
  element: HTMLElement,
  attributes: Record<string, string>,
) => {
  for (const key in attributes) {
    element.dataset[key] = attributes[key];
  }
};

export const getPositiveInteger = (
  value: string | undefined,
): number | null => {
  if (typeof value !== "string" || value.trim() === "") {
    return null;
  }
  const num = Number(value);
  if (Number.isInteger(num) && num > 0) {
    return num;
  }
  return null;
};

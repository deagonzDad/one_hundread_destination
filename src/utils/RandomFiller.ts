export const randomColorGen = () =>
  "#" + Math.floor(Math.random() * 16777215).toString(16);

export const validCircles = ["doubleRing", "smallRing", "bigRing"];
const keys = Object.keys(validCircles);
export const randomIndexGen = () => Math.floor(Math.random() * keys.length);
export const generateRandomNumber = () => Math.floor(Math.random() * 5);

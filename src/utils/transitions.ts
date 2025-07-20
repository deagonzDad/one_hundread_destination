import type {
  TransitionAnimationPair,
  TransitionDirectionalAnimations,
} from "astro";

const KeyFrameNames = {
  zoomOut: "animation-zoom-out",
  textFadeOut: "text-fade-out",
} as const;

const IndexLayoutTransition: TransitionAnimationPair = {
  old: {
    name: KeyFrameNames.zoomOut,
    duration: "2s",
    easing: "ease-in",
  },
  new: {
    name: KeyFrameNames.zoomOut,
    duration: "2s",
    easing: "ease-in-out",
    direction: "reverse",
  },
};
export const IndexLayoutAnimation: TransitionDirectionalAnimations = {
  forwards: IndexLayoutTransition,
  backwards: IndexLayoutTransition,
};

const TextTransition: TransitionAnimationPair = {
  old: {
    //forward
    name: KeyFrameNames.textFadeOut,
    duration: "5s",
    easing: "ease-in",
  },
  new: {
    //backward
    name: KeyFrameNames.textFadeOut,
    duration: "5s",
    easing: "ease-in-out",
    direction: "reverse",
  },
};

export const TextAnimation: TransitionDirectionalAnimations = {
  forwards: TextTransition,
  backwards: TextTransition,
};

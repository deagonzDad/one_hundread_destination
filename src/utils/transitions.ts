import type {
  TransitionAnimationPair,
  TransitionDirectionalAnimations,
} from "astro";

const KeyFrameNames = {
  zoomOut: "animation-zoom-out",
  // textFadeOut: "text-fade-out",
  textMoveUpper: "text-move-upper",
  textDisappear: "text-disappear",
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
  //this is to return to the old page <== goForward()
  //for the new page(next page) ->  old page(old page(goForward or goBack))
  old: [],
  // {
  //   name: KeyFrameNames.textDisappear,
  //   duration: "2s",
  //   easing: "ease-in",
  // },
  // this is to return to the new page <== goBack() it'll work
  // for the old page(recent page) -> new page(next page(goForward or goBack))
  new: {
    //backward
    name: KeyFrameNames.textMoveUpper,
    duration: "2s",
    easing: "ease-in-out",
    direction: "reverse",
  },
};

const TextTransitionUpper: TransitionAnimationPair = {
  old: [],
  // {
  //   name: KeyFrameNames.textMoveUpper, //this when u => goForward()
  //   duration: "2s",
  //   easing: "ease-out",
  // },
  // this is to return to the new page <=< goBack() it'll work
  // for the old page(recent page) -> new page(next page(goForward or goBack))
  new: [],
  // {
  //   name: KeyFrameNames.textDisappear,
  //   duration: "2s",
  //   easing: "ease-in-out",
  //   direction: "reverse",
  // },
};
export const TextAnimationMix: TransitionDirectionalAnimations = {
  forwards: TextTransition,
  backwards: TextTransitionUpper,
};

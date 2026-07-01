export function buildInfiniteSlides(slides) {
  if (slides.length <= 1) {
    return slides;
  }

  return [slides[slides.length - 1], ...slides, slides[0]];
}

export function getRealSlideIndex(trackPosition, slideCount) {
  if (slideCount <= 1) {
    return 0;
  }

  if (trackPosition === 0) {
    return slideCount - 1;
  }

  if (trackPosition === slideCount + 1) {
    return 0;
  }

  return trackPosition - 1;
}

export function resolveInfiniteLoopPosition(trackPosition, slideCount) {
  if (slideCount <= 1) {
    return {
      nextPosition: 0,
      shouldDisableTransition: false,
    };
  }

  if (trackPosition === 0) {
    return {
      nextPosition: slideCount,
      shouldDisableTransition: true,
    };
  }

  if (trackPosition === slideCount + 1) {
    return {
      nextPosition: 1,
      shouldDisableTransition: true,
    };
  }

  return {
    nextPosition: trackPosition,
    shouldDisableTransition: false,
  };
}

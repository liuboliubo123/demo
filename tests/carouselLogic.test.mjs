import assert from "node:assert/strict";
import test from "node:test";
import {
  buildInfiniteSlides,
  getNextTrackPosition,
  getRealSlideIndex,
  resolveInfiniteLoopPosition,
} from "../src/carouselLogic.mjs";

const slides = ["first", "second", "third"];

test("builds a track with cloned end caps for seamless looping", () => {
  assert.deepEqual(buildInfiniteSlides(slides), [
    "third",
    "first",
    "second",
    "third",
    "first",
  ]);
});

test("maps cloned track positions back to real dot indexes", () => {
  assert.equal(getRealSlideIndex(0, slides.length), 2);
  assert.equal(getRealSlideIndex(1, slides.length), 0);
  assert.equal(getRealSlideIndex(3, slides.length), 2);
  assert.equal(getRealSlideIndex(4, slides.length), 0);
});

test("jumps from cloned slides back to real slides without animation", () => {
  assert.deepEqual(resolveInfiniteLoopPosition(0, slides.length), {
    nextPosition: 3,
    shouldDisableTransition: true,
  });
  assert.deepEqual(resolveInfiniteLoopPosition(4, slides.length), {
    nextPosition: 1,
    shouldDisableTransition: true,
  });
  assert.deepEqual(resolveInfiniteLoopPosition(2, slides.length), {
    nextPosition: 2,
    shouldDisableTransition: false,
  });
});

test("ignores repeated next clicks while a slide transition is active", () => {
  const slideCount = slides.length;
  const firstClickTarget = getNextTrackPosition(3, slideCount, false);

  assert.equal(firstClickTarget, 4);
  assert.equal(getNextTrackPosition(firstClickTarget, slideCount, true), 4);
});

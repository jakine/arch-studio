import { gsap } from './gsap';

// The blob lives in a 400×400 box; every circle is r=BLOB_RADIUS at scale 1
export const BLOB_SIZE = 400;
export const BLOB_RADIUS = 60;
export const BLOB_CENTER = BLOB_SIZE / 2;

// Three circles per pose: [x, y, scale]. Each phase takes a loose letter
// shape: Design is a D, Structure the solid O, Monitor an M.
// Two rules keep the goo clean at rest:
// - neighbouring circles either overlap or keep an edge gap of 40+ units; in
//   between, the filter draws pointed "teardrops" that look broken when still
//   (the M's outer pair is the one exception: bridged by the middle circle,
//   their cusp is the M's V)
// - scale stays at 0.3 or more; smaller circles blur below the filter's
//   threshold and show up faint or not at all
export const BLOB_POSES = {
  // D: two circles melt into a straight spine, a big one makes the bowl
  design: [[150, 170, 0.67], [150, 230, 0.67], [205, 200, 1.17]],
  // O: everything settles into one solid round mass
  structure: [[200, 200, 1.15], [186, 192, 0.9], [214, 208, 0.9]],
  // M: two peaks with a V between them over a flat base
  monitor: [[142, 190, 0.74], [258, 190, 0.74], [200, 208, 0.5]],
};

// The order the letters appear in, for ambient loops
export const BLOB_LETTERS = ['design', 'structure', 'monitor'];

export const BLOB_CIRCLE_COUNT = BLOB_POSES.design.length;

/**
 * Put circle groups straight into a named pose
 * @param {Element[]} circles - The blob's pose layers (one <g> per circle)
 * @param {string} pose - Key of BLOB_POSES
 */
export const setPose = (circles, pose) => gsap.set(circles, {
  x: (i) => BLOB_POSES[pose][i][0],
  y: (i) => BLOB_POSES[pose][i][1],
  scale: (i) => BLOB_POSES[pose][i][2],
});

/**
 * Liquid change between two poses: the circles first gather and melt into one
 * mass, then pull apart into the new shape.
 * @returns {gsap.core.Timeline} - Plain timeline, so it can be scrubbed or nested
 */
export const morphPose = (circles, fromPose, toPose, { duration = 1.4 } = {}) => {
  const from = BLOB_POSES[fromPose];
  const to = BLOB_POSES[toPose];
  const gather = 0.45; // how far the midpoint is pulled toward the center
  const mid = (i, axis) => {
    const halfway = (from[i][axis] + to[i][axis]) / 2;
    return halfway + (BLOB_CENTER - halfway) * gather;
  };
  const stagger = { each: 0.02, from: 'center' };

  return gsap.timeline()
    .to(circles, {
      x: (i) => mid(i, 0),
      y: (i) => mid(i, 1),
      scale: (i) => Math.max(from[i][2], to[i][2]) * 1.1,
      duration: duration * 0.5,
      ease: 'sine.inOut',
      stagger,
    })
    .to(circles, {
      x: (i) => to[i][0],
      y: (i) => to[i][1],
      scale: (i) => to[i][2],
      duration: duration * 0.5,
      ease: 'sine.inOut',
      stagger,
    });
};

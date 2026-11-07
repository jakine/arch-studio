import React from 'react';

// Geometry of the ARCH wordmark: four letters in one row, each drawn in its
// own 240×240 cell. The A is an arch with a doorway; the C and H share its
// rounded cut.
const CELL = 240;
const GAP = 24;
const LETTERS = [
  // A
  'M0 120A120 120 0 0 1 240 120V232A8 8 0 0 1 232 240H152V162A32 32 0 0 0 88 162V240H8A8 8 0 0 1 0 232Z',
  // R
  'M8 0H168A72 72 0 0 1 168 144L240 240H168L96 144V232A8 8 0 0 1 88 240H8A8 8 0 0 1 0 232V8A8 8 0 0 1 8 0Z',
  // C
  'M235.65 88A120 120 0 1 0 235.65 152H140A32 32 0 0 1 140 88Z',
  // H
  'M8 0H88V56A32 32 0 0 0 152 56V0H232A8 8 0 0 1 240 8V232A8 8 0 0 1 232 240H152V184A32 32 0 0 0 88 184V240H8A8 8 0 0 1 0 232V8A8 8 0 0 1 8 0Z',
];
const LOGO_WIDTH = LETTERS.length * CELL + (LETTERS.length - 1) * GAP;

function LogoInline({ ref, className = 'arch-logo', title = 'ARCH', ...props }) {
  return (
    <svg
      ref={ref}
      className={className}
      viewBox={`0 0 ${LOGO_WIDTH} ${CELL}`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
      {...props}
    >
      <g fill="currentColor">
        {LETTERS.map((d, i) => (
          <path key={d} d={d} transform={`translate(${i * (CELL + GAP)} 0)`} />
        ))}
      </g>
    </svg>
  );
}

export default LogoInline;

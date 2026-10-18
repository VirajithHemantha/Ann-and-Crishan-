import React, { useMemo } from 'react';

// Slow-falling gilded olive leaves and gold-leaf flakes across the invitation.
// Pure CSS animation (see index.css: gold-fall / gold-sway / gold-tumble) so it stays smooth on phones.

type Piece = {
  kind: 'leaf' | 'flake';
  left: number;     // vw
  size: number;     // px
  fall: number;     // s
  sway: number;     // s
  delay: number;    // s
  tumble: number;   // s
  opacity: number;
  variant: number;
};

const COUNT = 16;

// Deterministic pseudo-random so the layout doesn't jump between renders
const rand = (seed: number) => {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
};

const flakeShapes = [
  'M2,6 L9,1 L17,4 L15,12 L6,14 Z',
  'M1,4 L11,1 L16,8 L8,15 L3,11 Z',
  'M3,2 L14,3 L12,10 L16,15 L4,13 L1,8 Z',
];

const Leaf: React.FC<{ id: string }> = ({ id }) => (
  <svg viewBox="0 0 24 40" className="w-full h-full" aria-hidden>
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#E8CF8E" />
        <stop offset="45%" stopColor="#B08A45" />
        <stop offset="100%" stopColor="#664A1C" />
      </linearGradient>
    </defs>
    <path d="M12 1 C21 10 21 28 12 39 C3 28 3 10 12 1 Z" fill={`url(#${id})`} />
    <path d="M12 4 L12 37" stroke="#6B4E1E" strokeWidth="0.8" strokeOpacity="0.55" fill="none" />
  </svg>
);

const Flake: React.FC<{ id: string; d: string }> = ({ id, d }) => (
  <svg viewBox="0 0 18 16" className="w-full h-full" aria-hidden>
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FFF1C9" />
        <stop offset="50%" stopColor="#C29A4E" />
        <stop offset="100%" stopColor="#7E5F2C" />
      </linearGradient>
    </defs>
    <path d={d} fill={`url(#${id})`} />
  </svg>
);

export const FallingGoldLeaf: React.FC = () => {
  const pieces = useMemo<Piece[]>(
    () =>
      Array.from({ length: COUNT }, (_, i) => {
        const kind = i % 3 === 0 ? 'flake' : 'leaf';
        return {
          kind,
          left: rand(i + 1) * 100,
          size: kind === 'leaf' ? 13 + rand(i + 11) * 9 : 9 + rand(i + 21) * 6,
          fall: 16 + rand(i + 31) * 14,
          sway: 3.5 + rand(i + 41) * 3,
          delay: -rand(i + 51) * 30,
          tumble: 5 + rand(i + 61) * 6,
          opacity: 0.8 + rand(i + 71) * 0.2,
          variant: i % flakeShapes.length,
        };
      }),
    []
  );

  return (
    <div className="gold-leaf-layer fixed inset-0 z-40 pointer-events-none overflow-hidden" aria-hidden>
      {pieces.map((p, i) => (
        <div
          key={i}
          className="absolute -top-12"
          style={{
            left: `${p.left}vw`,
            animation: `gold-fall ${p.fall}s linear ${p.delay}s infinite`,
          }}
        >
          <div style={{ animation: `gold-sway ${p.sway}s ease-in-out ${p.delay}s infinite alternate` }}>
            <div
              style={{
                width: p.size,
                height: p.kind === 'leaf' ? p.size * 1.7 : p.size,
                opacity: p.opacity,
                animation: `gold-tumble ${p.tumble}s ease-in-out ${p.delay}s infinite`,
                filter: 'drop-shadow(0 2px 3px rgba(60,40,15,0.25))',
              }}
            >
              {p.kind === 'leaf' ? <Leaf id={`gl-${i}`} /> : <Flake id={`gf-${i}`} d={flakeShapes[p.variant]} />}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

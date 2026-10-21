// Stylised qamariya (Sana'a stained-glass fanlight): gypsum lattice over teal, ruby and saffron glass.
export function Qamariya({ className = "" }: { className?: string }) {
  const rays = 9;
  const colors = ["#1f5c5b", "#d99a2b", "#8e2b3a", "#d99a2b", "#1f5c5b", "#d99a2b", "#8e2b3a", "#d99a2b", "#1f5c5b"];
  const segs = Array.from({ length: rays }, (_, i) => {
    const a0 = Math.PI + (i * Math.PI) / rays;
    const a1 = Math.PI + ((i + 1) * Math.PI) / rays;
    const r = 96, ri = 34;
    const p = (a: number, rr: number) => `${(100 + rr * Math.cos(a)).toFixed(2)} ${(100 + rr * Math.sin(a)).toFixed(2)}`;
    return { d: `M${p(a0, ri)} L${p(a0, r)} A${r} ${r} 0 0 1 ${p(a1, r)} L${p(a1, ri)} A${ri} ${ri} 0 0 0 ${p(a0, ri)}Z`, c: colors[i]! };
  });
  return (
    <svg viewBox="0 0 200 104" className={className} aria-hidden>
      {segs.map((s, i) => (
        <path key={i} d={s.d} fill={s.c} opacity={0.85} />
      ))}
      <path d="M66 100a34 34 0 0 1 68 0Z" fill="#d99a2b" opacity={0.9} />
      <g fill="none" stroke="#fbf7f0" strokeWidth={3}>
        <path d="M4 100a96 96 0 0 1 192 0" />
        <path d="M66 100a34 34 0 0 1 68 0" />
        {segs.map((_, i) => {
          const a = Math.PI + (i * Math.PI) / rays;
          return <line key={i} x1={100 + 34 * Math.cos(a)} y1={100 + 34 * Math.sin(a)} x2={100 + 96 * Math.cos(a)} y2={100 + 96 * Math.sin(a)} />;
        })}
        <path d="M30 100a70 70 0 0 1 140 0" strokeWidth={1.6} />
        <line x1={2} y1={101} x2={198} y2={101} />
      </g>
    </svg>
  );
}

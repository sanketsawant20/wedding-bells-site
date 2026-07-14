interface MandalaProps {
  className?: string;
}

export function Mandala({ className }: MandalaProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g fill="none" stroke="currentColor" strokeWidth="0.6">
        <circle cx="100" cy="100" r="90" />
        <circle cx="100" cy="100" r="72" />
        <circle cx="100" cy="100" r="54" />
        <circle cx="100" cy="100" r="36" strokeDasharray="2 3" />
        <circle cx="100" cy="100" r="18" />
        {Array.from({ length: 16 }).map((_, i) => {
          const a = (i * Math.PI) / 8;
          const x1 = 100 + Math.cos(a) * 36;
          const y1 = 100 + Math.sin(a) * 36;
          const x2 = 100 + Math.cos(a) * 90;
          const y2 = 100 + Math.sin(a) * 90;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
        })}
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i * Math.PI) / 4;
          const cx = 100 + Math.cos(a) * 72;
          const cy = 100 + Math.sin(a) * 72;
          return <circle key={i} cx={cx} cy={cy} r="8" />;
        })}
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i * Math.PI) / 4 + Math.PI / 8;
          const cx = 100 + Math.cos(a) * 54;
          const cy = 100 + Math.sin(a) * 54;
          return (
            <path
              key={i}
              d={`M ${cx} ${cy - 6} Q ${cx + 5} ${cy}, ${cx} ${cy + 6} Q ${cx - 5} ${cy}, ${cx} ${cy - 6} Z`}
            />
          );
        })}
      </g>
    </svg>
  );
}

export function Divider({ className }: MandalaProps) {
  return (
    <div className={`divider-ornament my-8 ${className ?? ""}`}>
      <svg width="42" height="20" viewBox="0 0 42 20" fill="none" aria-hidden="true">
        <path
          d="M21 2 C 15 8, 5 8, 2 10 C 5 12, 15 12, 21 18 C 27 12, 37 12, 40 10 C 37 8, 27 8, 21 2 Z"
          stroke="currentColor"
          strokeWidth="0.8"
          fill="currentColor"
          fillOpacity="0.15"
        />
        <circle cx="21" cy="10" r="1.6" fill="currentColor" />
      </svg>
    </div>
  );
}

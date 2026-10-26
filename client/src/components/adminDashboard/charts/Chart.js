import React from "react";

const Chart = () => {
  const points = [
    { label: "Mon", val: 8 },
    { label: "Tue", val: 5 },
    { label: "Wed", val: 7 },
    { label: "Thu", val: 9 },
    { label: "Fri", val: 4 },
    { label: "Sat", val: 7 },
    { label: "Sun", val: 6 },
  ];

  const max = 10;
  const width = 340;
  const height = 180;
  const padding = 28;

  // Generate SVG path points
  const coords = points.map((p, i) => {
    const x = padding + (i * (width - 2 * padding)) / (points.length - 1);
    const y = height - padding - (p.val / max) * (height - 2 * padding);
    return { x, y, ...p };
  });

  const pathD = coords.reduce((acc, c, i) => (i === 0 ? `M ${c.x} ${c.y}` : `${acc} L ${c.x} ${c.y}`), "");
  const areaD = `${pathD} L ${coords[coords.length - 1].x} ${height - padding} L ${coords[0].x} ${height - padding} Z`;

  return (
    <div style={{ marginTop: "15px", width: "100%", maxWidth: "380px" }}>
      <svg viewBox={`0 0 ${width} ${height}`} style={{ width: "100%", height: "auto", overflow: "visible" }}>
        <defs>
          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C25E3E" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#C25E3E" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0, 0.5, 1].map((pct, i) => {
          const y = height - padding - pct * (height - 2 * padding);
          return (
            <line
              key={i}
              x1={padding}
              y1={y}
              x2={width - padding}
              y2={y}
              stroke="var(--border-color, #EAE5DE)"
              strokeDasharray="4 4"
              strokeWidth="1"
            />
          );
        })}

        {/* Filled Area */}
        <path d={areaD} fill="url(#chartGrad)" />

        {/* Line */}
        <path d={pathD} fill="none" stroke="#C25E3E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

        {/* Dots */}
        {coords.map((c, i) => (
          <circle key={i} cx={c.x} cy={c.y} r="4" fill="#ffffff" stroke="#C25E3E" strokeWidth="2" />
        ))}

        {/* Labels */}
        {coords.map((c, i) => (
          <text
            key={i}
            x={c.x}
            y={height - 8}
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-muted, #78716C)"
            fontWeight="500"
          >
            {c.label}
          </text>
        ))}
      </svg>
    </div>
  );
};

export default Chart;

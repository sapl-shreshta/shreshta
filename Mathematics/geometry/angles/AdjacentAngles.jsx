import React, { useState } from "react";

export default function AdjacentAngles() {
  const [angle1, setAngle1] = useState(30);
  const [angle2, setAngle2] = useState(50);

  const maxAngle = 180;
  const totalAngle = angle1 + angle2;

  const getAngle1Path = () => {
    const rad1 = (angle1 * Math.PI) / 180;
    const x1 = 70 + 40 * Math.cos(rad1);
    const y1 = 70 - 40 * Math.sin(rad1);
    return `M 70 70 L 110 70 A 40 40 0 0 1 ${x1} ${y1} Z`;
  };

  const getAngle2Path = () => {
    const rad1 = (angle1 * Math.PI) / 180;
    const rad2 = ((angle1 + angle2) * Math.PI) / 180;
    const x1 = 70 + 40 * Math.cos(rad1);
    const y1 = 70 - 40 * Math.sin(rad1);
    const x2 = 70 + 40 * Math.cos(rad2);
    const y2 = 70 - 40 * Math.sin(rad2);
    return `M 70 70 L ${x1} ${y1} A 40 40 0 0 1 ${x2} ${y2} Z`;
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>👫 Adjacent Angles</h2>

      <div style={styles.content}>
        <p style={styles.description}>
          Adjacent angles are two angles that <b>share a common vertex</b> and <b>share a common side</b>, but do not overlap.
        </p>

        <div style={styles.diagramSection}>
          {/* Interactive Diagram */}
          <svg viewBox="0 0 200 180" style={styles.svg}>
            {/* Base line */}
            <line x1="70" y1="70" x2="150" y2="70" stroke="#1d2b53" strokeWidth="3" />

            {/* Angle 1 (green) */}
            <path d={getAngle1Path()} fill="#06d6a0" opacity="0.6" />

            {/* Angle 2 (blue) */}
            <path d={getAngle2Path()} fill="#4cc9f0" opacity="0.6" />

            {/* Common side */}
            <line
              x1="70"
              y1="70"
              x2={70 + 40 * Math.cos((angle1 * Math.PI) / 180)}
              y2={70 - 40 * Math.sin((angle1 * Math.PI) / 180)}
              stroke="#1d2b53"
              strokeWidth="3"
            />

            {/* Second side */}
            <line
              x1="70"
              y1="70"
              x2={70 + 40 * Math.cos(((angle1 + angle2) * Math.PI) / 180)}
              y2={70 - 40 * Math.sin(((angle1 + angle2) * Math.PI) / 180)}
              stroke="#1d2b53"
              strokeWidth="3"
            />

            {/* Vertex point */}
            <circle cx="70" cy="70" r="4" fill="#ff6ec7" />

            {/* Labels */}
            <text x="95" y="55" fontSize="14" fontWeight="bold" fill="#06d6a0">
              {angle1}°
            </text>
            <text x="85" y="40" fontSize="14" fontWeight="bold" fill="#4cc9f0">
              {angle2}°
            </text>
            <text x="65" y="90" fontSize="12" fill="#ff6ec7" fontWeight="bold">
              Vertex
            </text>
          </svg>
        </div>

        {/* Sliders */}
        <div style={styles.controlsSection}>
          <div style={styles.control}>
            <label style={styles.label}>
              Angle 1 (Green): <b style={styles.value}>{angle1}°</b>
            </label>
            <input
              type="range"
              min="0"
              max={maxAngle - angle2}
              value={angle1}
              onChange={(e) => setAngle1(Number(e.target.value))}
              style={styles.slider}
            />
          </div>

          <div style={styles.control}>
            <label style={styles.label}>
              Angle 2 (Blue): <b style={styles.value}>{angle2}°</b>
            </label>
            <input
              type="range"
              min="0"
              max={maxAngle - angle1}
              value={angle2}
              onChange={(e) => setAngle2(Number(e.target.value))}
              style={styles.slider}
            />
          </div>
        </div>

        {/* Key Rules */}
        <div style={styles.rulesBox}>
          <h3 style={styles.rulesTitle}>💡 Key Points:</h3>
          <ul style={styles.rulesList}>
            <li><b>Share a common vertex</b> - Both angles meet at the same point</li>
            <li><b>Share a common side</b> - One side is shared between the angles</li>
            <li><b>Do not overlap</b> - They are separate, non-overlapping angles</li>
            <li><b>Can be any size</b> - Their sum can be any value (not fixed!)</li>
            <li style={{ marginTop: "10px", fontSize: "16px", color: "#a06cd5" }}>
              <b>Current sum: {angle1}° + {angle2}° = {totalAngle}°</b>
            </li>
          </ul>
        </div>

        {/* Example */}
        <div style={styles.exampleBox}>
          <p><b>🎯 Try This:</b> Drag the sliders to create different adjacent angles. Notice how they share the middle side (common side) but never overlap!</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "100%"
  },
  title: {
    fontSize: "28px",
    color: "#a06cd5",
    marginBottom: "15px",
    textAlign: "center"
  },
  content: {
    width: "100%"
  },
  description: {
    fontSize: "16px",
    lineHeight: "1.6",
    marginBottom: "20px",
    color: "#1d2b53"
  },
  diagramSection: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "30px"
  },
  svg: {
    maxWidth: "100%",
    height: "auto",
    width: "300px",
    border: "2px solid #4cc9f0",
    borderRadius: "12px",
    padding: "10px",
    background: "#f0f9ff"
  },
  controlsSection: {
    background: "#fff5e6",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "20px"
  },
  control: {
    marginBottom: "20px"
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#1d2b53"
  },
  value: {
    color: "#a06cd5",
    fontSize: "18px"
  },
  slider: {
    width: "100%",
    height: "8px",
    borderRadius: "5px",
    background: "#a06cd5",
    outline: "none",
    cursor: "pointer"
  },
  rulesBox: {
    background: "#eef6ff",
    border: "3px solid #4cc9f0",
    borderRadius: "12px",
    padding: "15px",
    marginBottom: "20px"
  },
  rulesTitle: {
    color: "#4cc9f0",
    marginBottom: "10px"
  },
  rulesList: {
    marginLeft: "20px",
    lineHeight: "1.8",
    color: "#1d2b53",
    fontSize: "15px"
  },
  exampleBox: {
    background: "#fff5d6",
    border: "3px solid #ffd166",
    borderRadius: "12px",
    padding: "15px",
    textAlign: "center",
    color: "#1d2b53",
    fontWeight: "bold"
  }
};

import React, { useState } from "react";

export default function VerticalAngles() {
  const [angle, setAngle] = useState(65);
  const oppositeAngle = angle;
  const adjacentAngle = 180 - angle;

  const rad1 = (angle * Math.PI) / 180;
  const rad2 = (rad1 + Math.PI); // Opposite angle
  const rad3 = (rad1 + Math.PI / 2); // Adjacent angle
  const rad4 = (rad1 - Math.PI / 2); // Adjacent angle on other side

  const drawArc = (startRad, endRad, size) => {
    const x1 = 70 + size * Math.cos(startRad);
    const y1 = 70 - size * Math.sin(startRad);
    const x2 = 70 + size * Math.cos(endRad);
    const y2 = 70 - size * Math.sin(endRad);
    const largeArc = Math.abs(endRad - startRad) > Math.PI ? 1 : 0;
    return `M ${x1} ${y1} A ${size} ${size} 0 ${largeArc} 1 ${x2} ${y2}`;
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🔄 Vertically Opposite Angles</h2>

      <div style={styles.content}>
        <p style={styles.description}>
          When two lines intersect, they create <b>four angles</b>. The <b>angles across from each other</b> are called vertically opposite angles (or vertical angles).
        </p>

        <div style={styles.diagramSection}>
          {/* Interactive Diagram */}
          <svg viewBox="30 20 120 120" style={styles.svg}>
            {/* First line */}
            <line x1="35" y1="35" x2="125" y2="125" stroke="#1d2b53" strokeWidth="3" />

            {/* Second line */}
            <line x1="125" y1="35" x2="35" y2="125" stroke="#1d2b53" strokeWidth="3" />

            {/* Angle 1 (top right - purple) */}
            <path
              d={drawArc(0, rad1, 25)}
              stroke="#a06cd5"
              strokeWidth="2.5"
              fill="none"
            />
            <path
              d={`M 70 70 L ${70 + 25 * Math.cos(0)} ${70} A 25 25 0 0 ${rad1 > Math.PI / 2 ? 1 : 0} ${70 + 25 * Math.cos(rad1)} ${70 - 25 * Math.sin(rad1)} Z`}
              fill="#a06cd5"
              opacity="0.5"
            />

            {/* Angle 2 (bottom left - purple, opposite to angle 1) */}
            <path
              d={`M 70 70 L ${70 + 25 * Math.cos(rad2)} ${70 - 25 * Math.sin(rad2)} A 25 25 0 0 1 ${70 + 25 * Math.cos(Math.PI)} ${70} Z`}
              fill="#a06cd5"
              opacity="0.5"
            />

            {/* Angle 3 (top left - yellow) */}
            <path
              d={`M 70 70 L ${70 + 25 * Math.cos(Math.PI)} ${70} A 25 25 0 0 1 ${70 + 25 * Math.cos(rad1)} ${70 - 25 * Math.sin(rad1)} Z`}
              fill="#ffd166"
              opacity="0.5"
            />

            {/* Angle 4 (bottom right - yellow) */}
            <path
              d={`M 70 70 L ${70 + 25 * Math.cos(rad1)} ${70 - 25 * Math.sin(rad1)} A 25 25 0 0 1 ${70 + 25 * Math.cos(rad2)} ${70 - 25 * Math.sin(rad2)} Z`}
              fill="#ffd166"
              opacity="0.5"
            />

            {/* Center point */}
            <circle cx="70" cy="70" r="3" fill="#ff6ec7" />

            {/* Labels */}
            <text x="85" y="50" fontSize="12" fontWeight="bold" fill="#a06cd5">
              {angle}°
            </text>
            <text x="50" y="95" fontSize="12" fontWeight="bold" fill="#a06cd5">
              {oppositeAngle}°
            </text>
            <text x="35" y="60" fontSize="12" fontWeight="bold" fill="#ffd166">
              {adjacentAngle}°
            </text>
            <text x="85" y="95" fontSize="12" fontWeight="bold" fill="#ffd166">
              {adjacentAngle}°
            </text>
          </svg>
        </div>

        {/* Slider */}
        <div style={styles.controlsSection}>
          <div style={styles.control}>
            <label style={styles.label}>
              Rotate the angles: <b style={styles.value}>{angle}°</b>
            </label>
            <input
              type="range"
              min="0"
              max="90"
              value={angle}
              onChange={(e) => setAngle(Number(e.target.value))}
              style={styles.slider}
            />
          </div>
        </div>

        {/* Key Rules */}
        <div style={styles.rulesBox}>
          <h3 style={styles.rulesTitle}>💡 Key Rule:</h3>
          <div style={styles.ruleHighlight}>
            <p style={{ fontSize: "18px", marginBottom: "10px" }}>
              <b>⭐ Vertically Opposite Angles are ALWAYS EQUAL!</b>
            </p>
            <div style={styles.angleComparison}>
              <div style={styles.anglePair}>
                <span style={{ color: "#a06cd5" }}>Purple angles:</span>
                <b style={{ fontSize: "16px", color: "#a06cd5" }}> {angle}° = {oppositeAngle}°</b>
              </div>
              <div style={styles.anglePair}>
                <span style={{ color: "#ffd166" }}>Yellow angles:</span>
                <b style={{ fontSize: "16px", color: "#ffd166" }}> {adjacentAngle}° = {adjacentAngle}°</b>
              </div>
            </div>
          </div>
        </div>

        {/* Properties */}
        <div style={styles.propertiesBox}>
          <h3 style={styles.propertiesTitle}>📋 Properties:</h3>
          <ul style={styles.propertiesList}>
            <li>✓ Formed when <b>two lines intersect</b></li>
            <li>✓ Located <b>across from each other</b></li>
            <li>✓ Always <b>equal in measure</b></li>
            <li>✓ If you know one angle, the opposite angle is the same!</li>
            <li style={{ marginTop: "8px" }}>
              <b>Bonus:</b> Adjacent angles (not opposite) add up to 180°
            </li>
          </ul>
        </div>

        {/* Example */}
        <div style={styles.exampleBox}>
          <p><b>🎯 Try This:</b> Rotate the lines using the slider and watch how the vertically opposite angles (same color) always stay equal. Try any angle - it's a perfect geometric law!</p>
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
    border: "2px solid #a06cd5",
    borderRadius: "12px",
    padding: "10px",
    background: "#f5f0ff"
  },
  controlsSection: {
    background: "#fff5e6",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "20px"
  },
  control: {
    marginBottom: "0"
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
    background: "#fff5f0",
    border: "3px solid #ff6ec7",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "20px"
  },
  rulesTitle: {
    color: "#ff6ec7",
    marginBottom: "15px"
  },
  ruleHighlight: {
    background: "#fff9f5",
    padding: "15px",
    borderRadius: "8px",
    textAlign: "center",
    color: "#1d2b53"
  },
  angleComparison: {
    marginTop: "12px"
  },
  anglePair: {
    marginBottom: "8px",
    fontSize: "15px"
  },
  propertiesBox: {
    background: "#eef6ff",
    border: "3px solid #4cc9f0",
    borderRadius: "12px",
    padding: "15px",
    marginBottom: "20px"
  },
  propertiesTitle: {
    color: "#4cc9f0",
    marginBottom: "10px"
  },
  propertiesList: {
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

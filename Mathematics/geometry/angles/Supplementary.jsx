import React, { useState } from "react";

export default function Supplementary() {
  const [angle1, setAngle1] = useState(120);
  const angle2 = 180 - angle1;
  const sum = angle1 + angle2;

  const rad1 = (angle1 * Math.PI) / 180;

  const x1 = 70 + 50 * Math.cos(rad1);
  const y1 = 70 - 50 * Math.sin(rad1);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>➕ Supplementary Angles</h2>

      <div style={styles.content}>
        <p style={styles.description}>
          Two angles are <b>supplementary</b> if their <b>sum equals 180°</b>. They form a <b>straight line</b> together!
        </p>

        <div style={styles.diagramSection}>
          {/* Interactive Diagram */}
          <svg viewBox="0 0 200 160" style={styles.svg}>
            {/* Straight line */}
            <line x1="20" y1="70" x2="140" y2="70" stroke="#1d2b53" strokeWidth="3" />

            {/* First ray */}
            <line x1="70" y1="70" x2={x1} y2={y1} stroke="#1d2b53" strokeWidth="3" />

            {/* Angle 1 (red) */}
            <path
              d={`M 70 70 L 110 70 A 40 40 0 0 ${angle1 > 90 ? 1 : 0} ${x1} ${y1} Z`}
              fill="#ef476f"
              opacity="0.6"
            />

            {/* Angle 2 (orange) */}
            <path
              d={`M 70 70 L ${x1} ${y1} A 40 40 0 0 ${angle2 > 90 ? 1 : 0} 140 70 Z`}
              fill="#ff9e45"
              opacity="0.6"
            />

            {/* Center point */}
            <circle cx="70" cy="70" r="4" fill="#ff6ec7" />

            {/* Labels */}
            <text x={x1 - 15} y={y1 - 15} fontSize="14" fontWeight="bold" fill="#ef476f">
              {angle1}°
            </text>
            <text x="90" y="55" fontSize="14" fontWeight="bold" fill="#ff9e45">
              {angle2}°
            </text>

            {/* Straight line label */}
            <text x="50" y="90" fontSize="11" fill="#1d2b53" fontWeight="bold">
              180° (Straight Line)
            </text>
          </svg>
        </div>

        {/* Sliders */}
        <div style={styles.controlsSection}>
          <div style={styles.control}>
            <label style={styles.label}>
              Angle 1 (Red): <b style={styles.value}>{angle1}°</b>
            </label>
            <input
              type="range"
              min="0"
              max="180"
              value={angle1}
              onChange={(e) => setAngle1(Number(e.target.value))}
              style={styles.slider}
            />
          </div>

          <div style={{ ...styles.control, marginBottom: "0" }}>
            <label style={styles.label}>
              Angle 2 (Orange): <b style={styles.value}>{angle2}°</b>
            </label>
            <input
              type="range"
              min="0"
              max="180"
              value={angle2}
              disabled
              style={{ ...styles.slider, opacity: "0.5", cursor: "not-allowed" }}
            />
          </div>
        </div>

        {/* Key Rule */}
        <div style={styles.rulesBox}>
          <h3 style={styles.rulesTitle}>💡 Key Rule:</h3>
          <div style={styles.ruleHighlight}>
            <p style={{ fontSize: "18px", marginBottom: "15px" }}>
              <b>⭐ Supplementary Angles ADD UP TO 180°</b>
            </p>
            <div style={styles.calculation}>
              <p style={{ fontSize: "16px" }}>
                <b>{angle1}° + {angle2}° = {sum}°</b>
              </p>
              <p style={{ marginTop: "8px", fontSize: "14px", color: "#666" }}>
                ✓ Verified! These are supplementary.
              </p>
            </div>
          </div>
        </div>

        {/* Comparison Box */}
        <div style={styles.comparisonBox}>
          <h3 style={styles.comparisonTitle}>🔍 Complementary vs Supplementary:</h3>
          <div style={styles.comparisonTable}>
            <div style={styles.comparisonRow}>
              <div style={styles.comparisonCell}>
                <b style={{ color: "#06d6a0" }}>Complementary</b>
                <p>Sum = 90°</p>
                <p style={{ fontSize: "13px" }}>Right angle</p>
              </div>
              <div style={styles.comparisonCell}>
                <b style={{ color: "#ff9e45" }}>Supplementary</b>
                <p>Sum = 180°</p>
                <p style={{ fontSize: "13px" }}>Straight line</p>
              </div>
            </div>
          </div>
        </div>

        {/* Important Facts */}
        <div style={styles.factsBox}>
          <h3 style={styles.factsTitle}>📝 Important Facts:</h3>
          <ul style={styles.factsList}>
            <li>
              <b>Supplementary angles</b> always sum to exactly <b>180°</b>
            </li>
            <li>
              They can be <b>adjacent</b> (forming a linear pair) or <b>separate</b>
            </li>
            <li>
              If you know one angle, find the supplement: <b>180° - known angle</b>
            </li>
            <li>
              A supplementary pair always forms or represents a <b>straight line</b>
            </li>
          </ul>
        </div>

        {/* Example Problems */}
        <div style={styles.examplesBox}>
          <h3 style={styles.examplesTitle}>🎯 Example Problems:</h3>
          <div style={styles.examplesList}>
            <p>If one angle is <b>60°</b>, its supplement is → <b>180° - 60° = 120°</b> ✓</p>
            <p>If one angle is <b>90°</b>, its supplement is → <b>180° - 90° = 90°</b> ✓</p>
            <p>If one angle is <b>135°</b>, its supplement is → <b>180° - 135° = 45°</b> ✓</p>
          </div>
        </div>

        {/* Try it */}
        <div style={styles.exampleBox}>
          <p><b>🎯 Try This:</b> Adjust the red angle using the slider. The orange angle automatically becomes its supplement! They always sum to exactly 180°, forming a perfect straight line!</p>
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
    width: "350px",
    border: "2px solid #ff9e45",
    borderRadius: "12px",
    padding: "10px",
    background: "#fff5f0"
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
  calculation: {
    marginTop: "10px"
  },
  comparisonBox: {
    background: "#f0f9ff",
    border: "3px solid #4cc9f0",
    borderRadius: "12px",
    padding: "15px",
    marginBottom: "20px"
  },
  comparisonTitle: {
    color: "#4cc9f0",
    marginBottom: "12px",
    textAlign: "center"
  },
  comparisonTable: {
    display: "flex",
    gap: "15px"
  },
  comparisonRow: {
    display: "flex",
    gap: "15px",
    width: "100%"
  },
  comparisonCell: {
    flex: 1,
    background: "white",
    padding: "12px",
    borderRadius: "8px",
    textAlign: "center",
    fontSize: "14px",
    color: "#1d2b53",
    border: "2px solid #4cc9f0"
  },
  factsBox: {
    background: "#eef6ff",
    border: "3px solid #4cc9f0",
    borderRadius: "12px",
    padding: "15px",
    marginBottom: "20px"
  },
  factsTitle: {
    color: "#4cc9f0",
    marginBottom: "10px"
  },
  factsList: {
    marginLeft: "20px",
    lineHeight: "1.8",
    color: "#1d2b53",
    fontSize: "15px"
  },
  examplesBox: {
    background: "#f0f9ff",
    border: "2px solid #06d6a0",
    borderRadius: "12px",
    padding: "15px",
    marginBottom: "20px"
  },
  examplesTitle: {
    color: "#06d6a0",
    marginBottom: "10px"
  },
  examplesList: {
    fontSize: "15px",
    color: "#1d2b53",
    lineHeight: "2"
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

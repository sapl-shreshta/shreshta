import React, { useState } from "react";

export default function LinearPair() {
  const [angle1, setAngle1] = useState(110);
  const angle2 = 180 - angle1;

  const rad1 = (angle1 * Math.PI) / 180;
  const rad2 = ((180 - angle1) * Math.PI) / 180;

  const x1 = 70 + 50 * Math.cos(rad1);
  const y1 = 70 - 50 * Math.sin(rad1);
  const x2 = 70 + 50 * Math.cos(rad2);
  const y2 = 70 - 50 * Math.sin(rad2);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📏 Linear Pair</h2>

      <div style={styles.content}>
        <p style={styles.description}>
          A linear pair consists of <b>two adjacent angles</b> whose <b>non-common sides form a straight line</b>.
        </p>

        <div style={styles.diagramSection}>
          {/* Interactive Diagram */}
          <svg viewBox="0 0 200 160" style={styles.svg}>
            {/* Straight line */}
            <line x1="20" y1="70" x2="140" y2="70" stroke="#1d2b53" strokeWidth="3" />

            {/* First ray */}
            <line x1="70" y1="70" x2={x1} y2={y1} stroke="#1d2b53" strokeWidth="3" />

            {/* Angle 1 (purple) */}
            <path
              d={`M 70 70 L 110 70 A 40 40 0 0 ${angle1 > 90 ? 1 : 0} ${x1} ${y1} Z`}
              fill="#a06cd5"
              opacity="0.6"
            />

            {/* Angle 2 (yellow) */}
            <path
              d={`M 70 70 L ${x1} ${y1} A 40 40 0 0 ${angle2 > 90 ? 1 : 0} 140 70 Z`}
              fill="#ffd166"
              opacity="0.6"
            />

            {/* Vertex */}
            <circle cx="70" cy="70" r="4" fill="#ff6ec7" />

            {/* Labels */}
            <text x={x1 - 20} y={y1 - 10} fontSize="14" fontWeight="bold" fill="#a06cd5">
              {angle1}°
            </text>
            <text x={80} y={50} fontSize="14" fontWeight="bold" fill="#ffd166">
              {angle2}°
            </text>
            <text x="60" y="90" fontSize="11" fill="#1d2b53">
              Straight line
            </text>
          </svg>
        </div>

        {/* Slider */}
        <div style={styles.controlsSection}>
          <div style={styles.control}>
            <label style={styles.label}>
              Angle 1 (Purple): <b style={styles.value}>{angle1}°</b>
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
              Angle 2 (Yellow): <b style={styles.value}>{angle2}°</b>
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

        {/* Key Rules */}
        <div style={styles.rulesBox}>
          <h3 style={styles.rulesTitle}>💡 Key Rule:</h3>
          <p style={styles.ruleText}>
            <b style={{ fontSize: "18px", color: "#a06cd5" }}>
              ⭐ Angles in a linear pair ALWAYS add up to 180°
            </b>
          </p>
          <div style={styles.calculation}>
            <p><b>{angle1}° + {angle2}° = {angle1 + angle2}°</b></p>
            <p style={{ marginTop: "5px", fontSize: "14px", color: "#666" }}>
              Because they form a straight line!
            </p>
          </div>
        </div>

        {/* Properties */}
        <div style={styles.propertiesBox}>
          <h3 style={styles.propertiesTitle}>📋 Properties of Linear Pair:</h3>
          <ul style={styles.propertiesList}>
            <li>✓ They are <b>adjacent angles</b> (share a side)</li>
            <li>✓ Their non-common sides form a <b>straight line</b></li>
            <li>✓ Their sum is always <b>180°</b></li>
            <li>✓ If you know one angle, you can find the other!</li>
          </ul>
        </div>

        {/* Example */}
        <div style={styles.exampleBox}>
          <p><b>🎯 Try This:</b> Move the slider and watch how the purple angle grows while the yellow angle shrinks. No matter what values you set, they always add up to 180°!</p>
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
    marginBottom: "20px",
    textAlign: "center"
  },
  rulesTitle: {
    color: "#ff6ec7",
    marginBottom: "15px"
  },
  ruleText: {
    fontSize: "16px",
    color: "#1d2b53",
    marginBottom: "15px"
  },
  calculation: {
    background: "#fff9f0",
    padding: "12px",
    borderRadius: "8px",
    color: "#1d2b53"
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

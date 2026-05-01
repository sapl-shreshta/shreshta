import React, { useState } from "react";

export default function Complementary() {
  const [angle1, setAngle1] = useState(40);
  const angle2 = 90 - angle1;
  const sum = angle1 + angle2;

  const rad1 = (angle1 * Math.PI) / 180;
  const rad2 = (90 * Math.PI) / 180;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>✨ Complementary Angles</h2>

      <div style={styles.content}>
        <p style={styles.description}>
          Two angles are <b>complementary</b> if their <b>sum equals 90°</b>. They don't have to be adjacent!
        </p>

        <div style={styles.diagramSection}>
          {/* Interactive Diagram */}
          <svg viewBox="0 0 200 150" style={styles.svg}>
            {/* Right angle box */}
            <rect x="120" y="50" width="20" height="20" fill="none" stroke="#1d2b53" strokeWidth="2" />

            {/* Base line */}
            <line x1="70" y1="70" x2="150" y2="70" stroke="#1d2b53" strokeWidth="3" />

            {/* Vertical line */}
            <line x1="70" y1="70" x2="70" y2="20" stroke="#1d2b53" strokeWidth="3" />

            {/* Angle 1 (green) */}
            <path
              d={`M 70 70 L 110 70 A 40 40 0 0 1 ${70 + 40 * Math.cos(rad1)} ${70 - 40 * Math.sin(rad1)} Z`}
              fill="#06d6a0"
              opacity="0.6"
            />

            {/* Angle 2 (blue) */}
            <path
              d={`M 70 70 L ${70 + 40 * Math.cos(rad1)} ${70 - 40 * Math.sin(rad1)} A 40 40 0 0 1 70 30 Z`}
              fill="#4cc9f0"
              opacity="0.6"
            />

            {/* Center point */}
            <circle cx="70" cy="70" r="4" fill="#ff6ec7" />

            {/* Labels */}
            <text x="90" y="55" fontSize="14" fontWeight="bold" fill="#06d6a0">
              {angle1}°
            </text>
            <text x="65" y="40" fontSize="14" fontWeight="bold" fill="#4cc9f0">
              {angle2}°
            </text>

            {/* "90°" label near right angle box */}
            <text x="95" y="75" fontSize="12" fontWeight="bold" fill="#1d2b53">
              90°
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
              max="90"
              value={angle1}
              onChange={(e) => setAngle1(Number(e.target.value))}
              style={styles.slider}
            />
          </div>

          <div style={{ ...styles.control, marginBottom: "0" }}>
            <label style={styles.label}>
              Angle 2 (Blue): <b style={styles.value}>{angle2}°</b>
            </label>
            <input
              type="range"
              min="0"
              max="90"
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
              <b>⭐ Complementary Angles ADD UP TO 90°</b>
            </p>
            <div style={styles.calculation}>
              <p style={{ fontSize: "16px" }}>
                <b>{angle1}° + {angle2}° = {sum}°</b>
              </p>
              <p style={{ marginTop: "8px", fontSize: "14px", color: "#666" }}>
                ✓ Verified! These are complementary.
              </p>
            </div>
          </div>
        </div>

        {/* Important Facts */}
        <div style={styles.factsBox}>
          <h3 style={styles.factsTitle}>📝 Important Facts:</h3>
          <ul style={styles.factsList}>
            <li>
              <b>Complementary angles</b> always sum to exactly <b>90°</b>
            </li>
            <li>
              They can be <b>adjacent</b> (next to each other) or <b>not adjacent</b>
            </li>
            <li>
              If you know one angle, you can find the complementary angle: <b>90° - known angle</b>
            </li>
            <li>
              "Complementary" comes from the idea of <b>completing a right angle</b>!
            </li>
          </ul>
        </div>

        {/* Fun fact */}
        <div style={styles.funFactBox}>
          <h3 style={styles.funFactTitle}>🎯 Example Problems:</h3>
          <div style={styles.exampleProblem}>
            <p>If one angle is <b>30°</b>, what's its complement? → <b>90° - 30° = 60°</b></p>
            <p>If one angle is <b>55°</b>, what's its complement? → <b>90° - 55° = 35°</b></p>
            <p>If one angle is <b>0°</b>, what's its complement? → <b>90° - 0° = 90°</b></p>
          </div>
        </div>

        {/* Try it */}
        <div style={styles.exampleBox}>
          <p><b>🎯 Try This:</b> Use the slider to change the green angle. The blue angle automatically becomes its complement! Notice how they always sum to exactly 90°?</p>
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
    width: "320px",
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
  funFactBox: {
    background: "#f0f9ff",
    border: "2px solid #06d6a0",
    borderRadius: "12px",
    padding: "15px",
    marginBottom: "20px"
  },
  funFactTitle: {
    color: "#06d6a0",
    marginBottom: "10px"
  },
  exampleProblem: {
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

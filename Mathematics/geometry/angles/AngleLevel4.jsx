import React, { useState } from "react";
import AdjacentAngles from "./AdjacentAngles";
import LinearPair from "./LinearPair";
import VerticalAngles from "./VerticalAngles";
import Complementary from "./Complementary";
import Supplementary from "./Supplementary";

export default function AngleLevel4() {
  const [tab, setTab] = useState("adjacent");

  const tabs = [
    { id: "adjacent", label: "👫 Adjacent Angles", icon: "👫" },
    { id: "linear", label: "📏 Linear Pair", icon: "📏" },
    { id: "vertical", label: "🔄 Vertical Angles", icon: "🔄" },
    { id: "complementary", label: "✨ Complementary", icon: "✨" },
    { id: "supplementary", label: "➕ Supplementary", icon: "➕" }
  ];

  const renderTab = () => {
    switch (tab) {
      case "adjacent": return <AdjacentAngles />;
      case "linear": return <LinearPair />;
      case "vertical": return <VerticalAngles />;
      case "complementary": return <Complementary />;
      case "supplementary": return <Supplementary />;
      default: return null;
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.emoji}>🔗 📐 🎯</div>
        <h1 style={styles.title}>Level 4: Angle Relationships</h1>
        <p style={styles.subtitle}>Learn how angles relate to each other!</p>
      </header>

      {/* Tabs Navigation */}
      <div style={styles.tabsContainer}>
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              ...styles.tab,
              ...(tab === t.id ? styles.tabActive : styles.tabInactive)
            }}
          >
            <span style={styles.tabIcon}>{t.icon}</span>
            <span style={styles.tabLabel}>{t.label.split(" ")[1]}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={styles.content}>
        {renderTab()}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #fff5e6, #e6f3ff, #f0e6ff)",
    padding: "20px",
    fontFamily: "'Comic Sans MS', 'Chalkboard SE', 'Trebuchet MS', sans-serif",
    color: "#1d2b53"
  },
  header: {
    textAlign: "center",
    marginBottom: "40px"
  },
  emoji: {
    fontSize: "48px",
    marginBottom: "10px",
    letterSpacing: "10px"
  },
  title: {
    fontSize: "clamp(36px, 6vw, 56px)",
    background: "linear-gradient(90deg, #a06cd5, #4cc9f0, #06d6a0)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: "10px"
  },
  subtitle: {
    fontSize: "clamp(18px, 2.5vw, 24px)",
    color: "#4cc9f0",
    fontWeight: "bold"
  },
  tabsContainer: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "30px",
    maxWidth: "1000px",
    margin: "0 auto 30px"
  },
  tab: {
    border: "none",
    borderRadius: "50px",
    padding: "12px 16px",
    fontSize: "14px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "all 0.3s",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
  },
  tabActive: {
    background: "linear-gradient(135deg, #a06cd5, #4cc9f0)",
    color: "white",
    transform: "translateY(-4px)",
    boxShadow: "0 6px 20px rgba(160, 108, 213, 0.4)"
  },
  tabInactive: {
    background: "#ffffff",
    color: "#1d2b53",
    border: "2px solid #a06cd5"
  },
  tabIcon: {
    fontSize: "18px"
  },
  tabLabel: {
    fontSize: "clamp(12px, 2vw, 16px)"
  },
  content: {
    maxWidth: "1000px",
    margin: "0 auto",
    background: "#fff8f0",
    borderRadius: "16px",
    padding: "30px",
    border: "3px solid #a06cd5",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
  }
};

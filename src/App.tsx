import { useMemo, useState } from "react";
import { ProjectTreeExplorer } from "./components/ProjectTreeExplorer";
import { PatternDiagram } from "./components/PatternDiagram";
import { DependenciesView } from "./components/DependenciesView";
import { patterns, type PatternId } from "./patterns";

function App() {
  const [activeId, setActiveId] = useState<PatternId>("n-layered");
  const [activeTab, setActiveTab] = useState<"explorer" | "diagram" | "dependencies">("explorer");
  const [isDarkMode, setIsDarkMode] = useState(true);

  const active = useMemo(
    () => patterns.find((pattern) => pattern.id === activeId) ?? patterns[0],
    [activeId]
  );

  return (
    <div className={isDarkMode ? "page theme-dark" : "page theme-light"}>
      <nav className="navbar">
        <div className="nav-brand">
          <div className="logo-box">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z" />
            </svg>
          </div>
          <h1>Software Patterns Lab</h1>
        </div>
        <div className="search-bar">
          <span>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
          <input type="text" placeholder="Search patterns or docs..." />
        </div>
        <div className="nav-right">
          <div className="theme-toggle">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" style={{ opacity: isDarkMode ? 1 : 0.4 }}>
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
            <label className="switch">
              <input
                type="checkbox"
                checked={!isDarkMode}
                onChange={() => setIsDarkMode(!isDarkMode)}
              />
              <span className="slider"></span>
            </label>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" style={{ opacity: isDarkMode ? 0.4 : 1 }}>
              <circle cx="12" cy="12" r="5" />
            </svg>
          </div>
        </div>
      </nav>

      <div className="main-layout">
        <aside className="sidebar-left">
          <p className="sidebar-label">SOFTWARE PATTERNS</p>
          <ul className="pattern-list">
            {patterns.map((pattern) => (
              <li key={pattern.id}>
                <button
                  type="button"
                  onClick={() => setActiveId(pattern.id)}
                  className={pattern.id === active.id ? "pattern-item active" : "pattern-item"}
                >
                  <span className="pattern-icon text-sm">
                    {pattern.id === "n-layered" && "L"}
                    {pattern.id === "hexagonal" && "H"}
                    {pattern.id === "microservices" && "M"}
                    {pattern.id === "eda" && "E"}
                    {pattern.id === "cqrs" && "C"}
                    {pattern.id === "vertical-slices" && "V"}
                  </span>
                  <span>{pattern.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <main className="content-area">
          <header className="content-header">
            <div className="header-title">
              <h2>{active.name} <span className="tag-badge">{active.tag}</span></h2>
              <p>{active.summary}</p>
            </div>
            <div className="header-actions">
              <button className="btn-primary">Compare With</button>
            </div>
          </header>

          <div className="tabs">
            <button
              className={activeTab === "explorer" ? "tab active" : "tab"}
              onClick={() => setActiveTab("explorer")}
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" style={{ marginRight: '8px', opacity: 0.8 }}>
                <path d="M20 18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z" />
              </svg>
              Explorer
            </button>
            <button
              className={activeTab === "diagram" ? "tab active" : "tab"}
              onClick={() => setActiveTab("diagram")}
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" style={{ marginRight: '8px', opacity: 0.8 }}>
                <path d="M11 2v6h2V2h-2zm0 14v6h2v-6h-2zm-9-5v2h6v-2H2zm14 0v2h6v-2h-6zM7 7v10h10V7H7zm8 8H9V9h6v6z" />
              </svg>
              Diagram
            </button>
            <button
              className={activeTab === "dependencies" ? "tab active" : "tab"}
              onClick={() => setActiveTab("dependencies")}
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" style={{ marginRight: '8px', opacity: 0.8 }}>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 7h2v6h-2V7zm0 8h2v2h-2v-2z" />
              </svg>
              Dependencies
            </button>
          </div>

          <div className="tab-container">
            {activeTab === "explorer" && (
              <>
                {active.treeView ? (
                  <ProjectTreeExplorer
                    title={active.treeView.title}
                    nodes={active.treeView.nodes}
                    initialSelectedNodeId={active.treeView.initialSelectedNodeId}
                    initialExpanded={active.treeView.initialExpanded}
                    layerBadges={active.treeView.layerBadges}
                    layerMeta={active.treeView.layerMeta}
                  />
                ) : (
                  <div className="placeholder-view">
                    <p>Tree view not implemented for this pattern.</p>
                  </div>
                )}

              </>
            )}
            {activeTab === "diagram" && (
              <PatternDiagram pattern={active} />
            )}
            {activeTab === "dependencies" && (
              <DependenciesView pattern={active} />
            )}
          </div>
        </main>

        <aside className="sidebar-right">
          <section className="info-block pros">
            <h3 className="block-title">✅ PROS</h3>
            <ul>
              {active.pros.map((pro, i) => (
                <li key={i}>{pro}</li>
              ))}
            </ul>
          </section>

          <section className="info-block cons">
            <h3 className="block-title">⚠️ CONS</h3>
            <ul>
              {active.cons.map((con, i) => (
                <li key={i}>{con}</li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </div>
  );
}

export default App;

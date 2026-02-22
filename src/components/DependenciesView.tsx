import type { PatternDefinition } from "../patterns/types";

type DependenciesViewProps = {
    pattern: PatternDefinition;
};

export function DependenciesView({ pattern }: DependenciesViewProps) {
    if (!pattern.dependencies) {
        return (
            <div className="placeholder-view">
                <p>Dependency rules not defined for this pattern.</p>
            </div>
        );
    }

    const { rules } = pattern.dependencies;
    const allowedRules = rules.filter((r) => r.status === "allowed");
    const forbiddenRules = rules.filter((r) => r.status === "forbidden");

    return (
        <div className="dependencies-container">
            <div className="rules-column allowed">
                <header className="column-header">
                    <div className="status-indicator allowed"></div>
                    <h3>Allowed Dependencies</h3>
                    <span className="count-badge">{allowedRules.length}</span>
                </header>
                <div className="rules-list">
                    {allowedRules.map((rule, index) => (
                        <div key={index} className="dependency-rule-card">
                            <div className="rule-direction">
                                <span className="layer-name">{rule.from}</span>
                                <span className="arrow-icon allowed">→</span>
                                <span className="layer-name">{rule.to}</span>
                            </div>
                            {rule.reason && <p className="rule-reason">{rule.reason}</p>}
                        </div>
                    ))}
                </div>
            </div>

            <div className="rules-column forbidden">
                <header className="column-header">
                    <div className="status-indicator forbidden"></div>
                    <h3>Forbidden Dependencies</h3>
                    <span className="count-badge">{forbiddenRules.length}</span>
                </header>
                <div className="rules-list">
                    {forbiddenRules.map((rule, index) => (
                        <div key={index} className="dependency-rule-card">
                            <div className="rule-direction">
                                <span className="layer-name">{rule.from}</span>
                                <span className="arrow-icon forbidden">↛</span>
                                <span className="layer-name">{rule.to}</span>
                            </div>
                            {rule.reason && <p className="rule-reason">{rule.reason}</p>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

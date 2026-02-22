import type { PatternDefinition } from "../patterns/types";

type PatternDiagramProps = {
    pattern: PatternDefinition;
};

export function PatternDiagram({ pattern }: PatternDiagramProps) {
    if (!pattern.diagram) {
        return (
            <div className="placeholder-view">
                <p>Diagram not available for this pattern.</p>
            </div>
        );
    }

    const { layers, connections } = pattern.diagram;

    return (
        <div className="diagram-container">
            <div className="diagram-viewport">
                {pattern.diagram.type === "layered" && (
                    <div className="layered-diagram">
                        {layers.map((layer, index) => (
                            <div key={layer.id} className="diagram-layer-wrapper">
                                <div className={`diagram-layer layer-${layer.id}`}>
                                    <div className="layer-title">{layer.name}</div>
                                    <div className="layer-desc">{layer.description}</div>
                                </div>
                                {index < layers.length - 1 && (
                                    <div className="diagram-arrow">
                                        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="12" y1="5" x2="12" y2="19" />
                                            <polyline points="19 12 12 19 5 12" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Placeholder for other diagram types */}
                {pattern.diagram.type !== "layered" && (
                    <div className="placeholder-view">
                        <h3>{pattern.diagram.type.toUpperCase()} DIAGRAM</h3>
                        <p>Visual representation for {pattern.diagram.type} will be added soon.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

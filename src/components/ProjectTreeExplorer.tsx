import { useMemo, useState, type ReactNode } from "react";

export type ProjectTreeNode = {
  id: string;
  name: string;
  kind: "folder" | "file";
  description: string;
  resources: string[];
  icon?: string;
  layer?: string;
  subtitle?: string;
  children?: ProjectTreeNode[];
};

export type ProjectTreeLayerMeta = {
  title: string;
  goal: string;
  objective: string;
};

type ProjectTreeExplorerProps = {
  title: string;
  nodes: ProjectTreeNode[];
  initialSelectedNodeId: string;
  initialExpanded: Record<string, boolean>;
  layerBadges?: Record<string, string>;
  layerMeta?: Record<string, ProjectTreeLayerMeta>;
  titleActions?: string[];
};

function findNode(nodes: ProjectTreeNode[], nodeId: string): ProjectTreeNode | null {
  for (const node of nodes) {
    if (node.id === nodeId) {
      return node;
    }
    if (node.children) {
      const found = findNode(node.children, nodeId);
      if (found) {
        return found;
      }
    }
  }
  return null;
}

function getFileTag(name: string): string {
  const dotIndex = name.lastIndexOf(".");
  if (dotIndex === -1) {
    return "file";
  }
  const ext = name.slice(dotIndex + 1).toLowerCase();
  if (ext === "java") {
    return "java";
  }
  if (ext === "xml") {
    return "xml";
  }
  if (ext === "yml" || ext === "yaml") {
    return "yml";
  }
  if (ext === "md") {
    return "md";
  }
  return "file";
}



export function ProjectTreeExplorer({
  title,
  nodes,
  initialSelectedNodeId,
  initialExpanded,
  layerBadges,
  layerMeta,
  titleActions = ["+", "[]", "..."]
}: ProjectTreeExplorerProps) {
  const [selectedNodeId, setSelectedNodeId] = useState(initialSelectedNodeId);
  const [expanded, setExpanded] = useState<Record<string, boolean>>(initialExpanded);

  const selectedNode = useMemo(
    () => findNode(nodes, selectedNodeId) ?? nodes[0],
    [nodes, selectedNodeId]
  );

  const toggleNode = (nodeId: string) => {
    setExpanded((current) => ({ ...current, [nodeId]: !current[nodeId] }));
  };

  const renderTree = (treeNodes: ProjectTreeNode[], depth = 0): ReactNode[] => {
    return treeNodes.flatMap((node) => {
      const isFolder = node.kind === "folder";
      const isOpen = expanded[node.id];
      const fileTag = isFolder ? "folder" : getFileTag(node.name);

      // Determine icon classes
      const baseIconClass = node.icon || fileTag;
      const folderStateClass = isFolder ? (isOpen ? "open" : "closed") : "";
      const iconClass = `icon ${baseIconClass} ${folderStateClass}`.trim();

      const row = (
        <div key={node.id}>
          <button
            type="button"
            className={node.id === selectedNode.id ? "tree-row active" : "tree-row"}
            style={{ paddingLeft: `${10 + depth * 16}px` }}
            onClick={() => {
              setSelectedNodeId(node.id);
              if (isFolder) {
                toggleNode(node.id);
              }
            }}
          >
            <span className={isOpen ? "arrow open" : "arrow"}>
              {isFolder && (
                <svg viewBox="0 0 16 16" width="12" height="12">
                  <path
                    fill="currentColor"
                    d="M10.88 7.08a.5.5 0 0 1 0 .83l-4.45 3.34A.5.5 0 0 1 5.6 10.9V4.41a.5.5 0 0 1 .83-.4l4.45 3.07Z"
                  />
                </svg>
              )}
            </span>
            <span className={iconClass} />
            <div className="name-wrapper">
              <span className="name">{node.name}</span>
              {node.subtitle && <span className="subtitle">{node.subtitle}</span>}
            </div>
            {node.layer && layerBadges ? (
              <span className={`layer-pill layer-${node.layer}`}>
                {layerBadges[node.layer] ?? node.layer}
              </span>
            ) : null}
          </button>
          {isFolder && isOpen && node.children ? renderTree(node.children, depth + 1) : null}
        </div>
      );
      return [row];
    });
  };

  return (
    <div className="ide-mockup">
      <div className="ide-body">
        <div className="tree-pane">{renderTree(nodes)}</div>
        <div className="node-pane">
          <h3>{selectedNode.name}</h3>
          <p>{selectedNode.description}</p>
          {selectedNode.layer && layerMeta?.[selectedNode.layer] ? (
            <div className="layer-card">
              <small>{layerMeta[selectedNode.layer].title}</small>
              <p>
                <strong>{layerMeta[selectedNode.layer].goal}.</strong>{" "}
                {layerMeta[selectedNode.layer].objective}
              </p>
            </div>
          ) : null}
          <div className="resource-chips">
            {selectedNode.resources.map((resource) => (
              <code key={resource}>{resource}</code>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

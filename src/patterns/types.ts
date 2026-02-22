import type {
  ProjectTreeLayerMeta,
  ProjectTreeNode
} from "../components/ProjectTreeExplorer";

export type PatternId = "n-layered" | "hexagonal" | "microservices" | "eda" | "cqrs";

export type PatternDefinition = {
  id: PatternId;
  name: string;
  tag: string;
  summary: string;
  pros: string[]; // Changed from idealFor
  cons: string[]; // Changed from tradeoffs
  nodes: string[];
  flow: string;
  treeView?: {
    title: string;
    nodes: ProjectTreeNode[];
    initialSelectedNodeId: string;
    initialExpanded: Record<string, boolean>;
    layerBadges?: Record<string, string>;
    layerMeta?: Record<string, ProjectTreeLayerMeta>;
  };
};

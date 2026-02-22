import type { PatternDefinition } from "../types";

export const hexagonalPattern: PatternDefinition = {
  id: "hexagonal",
  name: "Hexagonal Architecture",
  tag: "Ports & Adapters",
  summary:
    "Places the domain at the center and connects the outside world via ports and adapters.",
  pros: [
    "DDD, maintainability, and testing with low coupling.",
    "Easy to swap external technologies (DBs, APIs) without touching business logic."
  ],
  cons: [
    "Higher initial learning curve.",
    "More boilerplate and contracts to maintain."
  ],
  nodes: ["Input Adapter", "Application", "Domain", "Output Port", "Output Adapter"],
  flow: "Input Adapter -> Use Case -> Port -> Output Adapter"
};

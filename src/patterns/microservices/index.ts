import type { PatternDefinition } from "../types";

export const microservicesPattern: PatternDefinition = {
  id: "microservices",
  name: "Microservices Architecture",
  tag: "Distributed",
  summary: "Divides the system into autonomous services deployed independently.",
  pros: [
    "Scaling by domain and autonomous teams.",
    "Technological flexibility (polyglot) and fault isolation."
  ],
  cons: [
    "High operational complexity and overhead.",
    "Observability and distributed consistency challenges."
  ],
  nodes: ["API Gateway", "Service A", "Service B", "Service C", "Event Bus"],
  flow: "Client -> Gateway -> Services <-> Bus"
};

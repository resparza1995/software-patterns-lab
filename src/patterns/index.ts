import { cqrsPattern } from "./cqrs";
import { edaPattern } from "./eda";
import { hexagonalPattern } from "./hexagonal";
import { microservicesPattern } from "./microservices";
import { nLayeredPattern } from "./n-layered";
import { verticalSlicesPattern } from "./vertical-slices";
import type { PatternDefinition } from "./types";

export const patterns: PatternDefinition[] = [
  nLayeredPattern,
  verticalSlicesPattern,
  hexagonalPattern,
  microservicesPattern,
  edaPattern,
  cqrsPattern
];

export type { PatternDefinition, PatternId } from "./types";

import type { PatternDefinition } from "../types";

export const verticalSlicesPattern: PatternDefinition = {
    id: "vertical-slices",
    name: "Vertical Slices",
    tag: "Feature-Oriented",
    summary: "Organizes code by business features rather than technical layers. Each slice is an autonomous module containing everything needed for a specific requirement.",
    pros: [
        "High Cohesion: related code lives together",
        "Low Coupling between features",
        "Scales well with large teams",
        "Easy to add/remove features without side effects",
        "Tailorable: each slice can have its own internal architecture"
    ],
    cons: [
        "Potential code duplication between slices",
        "Requires discipline to avoid cross-slice dependencies",
        "Harder to enforce global technical standards",
        "Initial complexity in defining boundaries"
    ],
    nodes: ["/src", "/src/modules", "/src/modules/orders", "/src/modules/catalog", "/src/shared"],
    flow: "Request -> Feature Slice (All Layers) -> Response",
    treeView: {
        title: "Vertical Slices Structure",
        nodes: [
            {
                id: "root",
                name: "com.example.shop",
                kind: "folder",
                description: "Root package",
                resources: ["modules", "shared"],
                children: [
                    {
                        id: "modules",
                        name: "modules",
                        kind: "folder",
                        description: "Feature modules containing vertical slices",
                        resources: ["orders", "catalog"],
                        children: [
                            {
                                id: "orders",
                                name: "orders",
                                kind: "folder",
                                description: "Checkout and 주문 management feature",
                                resources: ["api", "logic", "data", "model"],
                                children: [
                                    { id: "o-api", name: "OrderController.java", kind: "file", description: "REST API for orders", resources: ["@RestController"] },
                                    { id: "o-logic", name: "PlaceOrderService.java", kind: "file", description: "Business logic for ordering", resources: ["Use Case"] },
                                    { id: "o-data", name: "OrderRepository.java", kind: "file", description: "Persistence for orders", resources: ["JPA"] },
                                    { id: "o-model", name: "Order.java", kind: "file", description: "Order domain entity", resources: ["Entity"] }
                                ]
                            },
                            {
                                id: "catalog",
                                name: "catalog",
                                kind: "folder",
                                description: "Product catalog and inventory management",
                                resources: ["api", "logic", "data"],
                                children: [
                                    { id: "c-api", name: "ProductController.java", kind: "file", description: "REST API for products", resources: ["@RestController"] },
                                    { id: "c-logic", name: "ProductSearchService.java", kind: "file", description: "Product searching logic", resources: ["Service"] },
                                    { id: "c-data", name: "ProductRepository.java", kind: "file", description: "Persistence for products", resources: ["Repository"] }
                                ]
                            }
                        ]
                    },
                    {
                        id: "shared",
                        name: "shared",
                        kind: "folder",
                        description: "Shared kernel with common utilities and auth",
                        resources: ["auth", "utils"],
                        children: [
                            { id: "s-auth", name: "AuthContext.java", kind: "file", description: "Authentication context", resources: ["Security"] },
                            { id: "s-utils", name: "DateUtils.java", kind: "file", description: "Date/Time helpers", resources: ["Utils"] }
                        ]
                    }
                ]
            }
        ],
        initialSelectedNodeId: "orders",
        initialExpanded: { "root": true, "modules": true, "orders": true },
        layerBadges: {
            "orders": "S1",
            "catalog": "S2",
            "shared": "SK"
        },
        layerMeta: {
            "orders": {
                title: "Orders Slice",
                goal: "Encapsulate feature logic",
                objective: "Contains all logic, data access, and API contracts for ordering."
            },
            "catalog": {
                title: "Catalog Slice",
                goal: "Independent product management",
                objective: "Handles product searching and management independently."
            },
            "shared": {
                title: "Shared Kernel",
                goal: "Common utilities",
                objective: "Cross-cutting concerns and shared utilities used by all slices."
            }
        }
    },
    diagram: {
        type: "mesh",
        layers: [
            { id: "slice-a", name: "Order Slice", description: "Full stack feature" },
            { id: "slice-b", name: "Catalog Slice", description: "Full stack feature" },
            { id: "shared", name: "Shared Kernel", description: "Common logic" }
        ],
        connections: [
            { from: "slice-a", to: "shared" },
            { from: "slice-b", to: "shared" }
        ]
    },
    dependencies: {
        layers: ["Orders", "Catalog", "Shared"],
        rules: [
            { from: "Orders", to: "Shared", status: "allowed", reason: "Slices can use infrastructure/common utilities." },
            { from: "Catalog", to: "Shared", status: "allowed", reason: "Shared kernel is accessible to all features." },
            { from: "Orders", to: "Catalog", status: "forbidden", reason: "Slices should be autonomous and decoupled." },
            { from: "Catalog", to: "Orders", status: "forbidden", reason: "Avoid direct dependencies between feature slices." }
        ]
    }
};

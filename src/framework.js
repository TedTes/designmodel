const STORAGE_VERSION = 1;

export const LEVELS = [
  {
    id: "l1",
    number: 1,
    shortName: "External",
    title: "External / System Requirements",
    centralQuestion: "What must the system achieve from the outside?",
    boundary:
      "Stay with observable behavior and constraints. Avoid databases, queues, replicas, locks, machines, concrete protocols, and named technologies.",
    color: "#0f766e",
    lenses: [
      {
        id: "actions",
        title: "Actions",
        question: "What can happen from outside the system?",
        placeholder: "List external triggers, actions, and visible effects."
      },
      {
        id: "actors",
        title: "Actors",
        question: "Who or what initiates or receives each action?",
        placeholder: "Name users, devices, services, scheduled processes, or providers."
      },
      {
        id: "objects",
        title: "Objects / State",
        question: "What are the main things being acted on?",
        placeholder: "Name externally meaningful objects and state."
      },
      {
        id: "invariants",
        title: "Rules / Invariants",
        question: "What must always remain true?",
        placeholder: "State allowed and forbidden outcomes."
      },
      {
        id: "demand",
        title: "Demand / Workload Shape",
        question: "How much activity occurs, how often, and how bursty is it?",
        placeholder: "Capture average, peak, burst, payload, and growth assumptions."
      },
      {
        id: "expectations",
        title: "Service Expectations",
        question: "What external quality is required?",
        placeholder: "Latency, availability, consistency, durability, and freshness needs."
      },
      {
        id: "failure-impact",
        title: "Failure Impact / Tolerance",
        question: "What happens if the system is slow, unavailable, stale, incorrect, or loses acknowledged state?",
        placeholder: "Describe blast radius, business impact, and acceptable failures."
      },
      {
        id: "scope",
        title: "Scope / System Boundary",
        question: "Where does this system responsibility start and end?",
        placeholder: "Separate in-scope behavior from external dependencies."
      },
      {
        id: "priorities",
        title: "Priority / Trade-off Ordering",
        question: "When requirements conflict, which outcome wins?",
        placeholder: "Rank correctness, availability, latency, cost, freshness, and simplicity."
      },
      {
        id: "targets",
        title: "Measurable Targets",
        question: "What measurable target defines good enough?",
        placeholder: "Define SLOs, limits, windows, and success thresholds."
      },
      {
        id: "assumptions",
        title: "Assumptions / Unknowns",
        question: "What is unknown, and which assumption would materially change the design?",
        placeholder: "Separate known facts, assumptions, and unresolved questions."
      },
      {
        id: "synthesis",
        title: "Synthesis - External Contract",
        question: "Can the external contract be stated without mentioning implementation?",
        placeholder: "Summarize the externally observable contract."
      }
    ],
    bannedTerms: [
      "postgres",
      "mysql",
      "mongodb",
      "redis",
      "kafka",
      "rabbitmq",
      "sqs",
      "database",
      "db",
      "queue",
      "cache",
      "replica",
      "replication",
      "lock",
      "wal",
      "shard",
      "partition",
      "server",
      "machine",
      "node",
      "kubernetes",
      "docker",
      "lambda",
      "http",
      "grpc",
      "rest api",
      "thread",
      "cpu",
      "kernel",
      "ssd"
    ]
  },
  {
    id: "l2",
    number: 2,
    shortName: "Logical",
    title: "Logical System Model",
    centralQuestion: "What responsibilities, state, and interactions logically exist inside the system?",
    boundary:
      "Describe responsibilities, state, timing, and conflicts without machines, products, concrete protocols, queues, replicas, locks, WAL, or shards.",
    color: "#2563eb",
    lenses: [
      {
        id: "responsibilities",
        title: "Major Responsibilities",
        question: "What broad responsibilities must exist inside the system?",
        placeholder: "Translate external actions into logical responsibilities."
      },
      {
        id: "state-ownership",
        title: "State Ownership / Information Domains",
        question: "What logical state exists, and which responsibility owns or changes it?",
        placeholder: "Name authoritative state domains and their readers/writers."
      },
      {
        id: "interactions",
        title: "Interaction Paths",
        question: "Which responsibility interacts with which other responsibility, and why?",
        placeholder: "Trace logical work and information flow."
      },
      {
        id: "timing",
        title: "Dependency Timing",
        question: "Does this responsibility need the result immediately, or can the work be deferred?",
        placeholder: "Separate immediate dependencies from deferred work."
      },
      {
        id: "coordination",
        title: "Coordination Boundaries",
        question: "Which operations must behave as one unit, and which can complete independently?",
        placeholder: "Identify logical state changes that must agree together."
      },
      {
        id: "truth",
        title: "Source of Truth",
        question: "For each important fact, which state is the final truth?",
        placeholder: "Name authoritative state and any copied or derived views."
      },
      {
        id: "lifecycle",
        title: "State Lifecycle / Transitions",
        question: "What valid states can an object move through, and what causes each transition?",
        placeholder: "List states, transitions, and invalid transitions."
      },
      {
        id: "critical-path",
        title: "Critical Path vs Side Paths",
        question: "Which responsibilities must succeed before the main action is complete?",
        placeholder: "Separate success-defining work from secondary effects."
      },
      {
        id: "fanout",
        title: "Interaction Shape / Fan-out and Fan-in",
        question: "Does one action touch one, many, or combine many?",
        placeholder: "Describe one-to-one, one-to-many, many-to-one, or many-to-many paths."
      },
      {
        id: "shared-state",
        title: "Shared-State Dependency",
        question: "Can different actions concurrently read or modify the same logical state?",
        placeholder: "Identify independent state and hot shared state."
      },
      {
        id: "propagation",
        title: "Change Propagation Between States",
        question: "When state A changes, what other state must reflect that change?",
        placeholder: "Describe together-now and eventually-reflected changes."
      },
      {
        id: "read-write",
        title: "Read vs Write Dependency",
        question: "For each action, which state is only read and which state is modified?",
        placeholder: "Separate read dependencies from write dependencies."
      },
      {
        id: "visibility",
        title: "Visibility / Freshness",
        question: "How quickly must other actors or responsibilities observe a state change?",
        placeholder: "Define immediate, bounded, and eventual visibility needs."
      },
      {
        id: "conflict",
        title: "Conflict Potential",
        question: "Can two actions produce incompatible changes to the same logical state?",
        placeholder: "Describe incompatible actions and their detection points."
      },
      {
        id: "coupling",
        title: "Independence / Coupling Boundary",
        question: "If one object changes, can it proceed without coordinating with other objects?",
        placeholder: "Name independent and coupled state units."
      },
      {
        id: "derived",
        title: "Derived vs Authoritative State",
        question: "If this state disappears, can it be reconstructed from another source?",
        placeholder: "Mark state as authoritative, derived, temporary, or rebuildable."
      },
      {
        id: "identity",
        title: "Identity / Addressing Boundary",
        question: "What uniquely identifies each important state unit?",
        placeholder: "Name logical IDs and update units."
      },
      {
        id: "retention",
        title: "Retention / History Boundary",
        question: "How long must each state exist, and do previous versions or history matter?",
        placeholder: "Describe expiry, audit history, and current-only state."
      },
      {
        id: "synthesis",
        title: "Synthesis - Logical System Model",
        question: "Can the system be explained as responsibilities, state, and interactions without implementation terms?",
        placeholder: "Summarize the logical model."
      }
    ],
    bannedTerms: [
      "postgres",
      "mysql",
      "mongodb",
      "redis",
      "kafka",
      "rabbitmq",
      "sqs",
      "database",
      "db",
      "queue",
      "cache",
      "replica",
      "replication",
      "lock",
      "wal",
      "shard",
      "server",
      "machine",
      "node",
      "kubernetes",
      "docker",
      "http",
      "grpc",
      "rest api",
      "thread",
      "cpu",
      "kernel"
    ]
  },
  {
    id: "l3",
    number: 3,
    shortName: "Distributed",
    title: "Distributed System Model",
    centralQuestion: "How should responsibility, state, and work behave when they span machines or failure domains?",
    boundary:
      "Reason about placement, partitioning, routing, replication, failure, ordering, and overload. Avoid concrete product choices and component internals.",
    color: "#7c3aed",
    lenses: [
      {
        id: "placement",
        title: "Placement of Responsibility",
        question: "Where should each responsibility execute when the system spans machines?",
        placeholder: "Choose one executor, interchangeable executors, or ownership-based executors."
      },
      {
        id: "partitioning",
        title: "Work / State Partitioning",
        question: "What unit of work or state can be assigned independently?",
        placeholder: "Name partitionable units and grouping rules."
      },
      {
        id: "coordination",
        title: "Coordination Need Across Executors",
        question: "Which operations can execute independently, and which require agreement across executors?",
        placeholder: "Separate independent work from coupled distributed decisions."
      },
      {
        id: "routing",
        title: "Routing / Ownership Resolution",
        question: "Given action for object X, how does the system know where to send it?",
        placeholder: "Describe owner resolution and routing behavior."
      },
      {
        id: "replication",
        title: "Replication Need",
        question: "What needs multiple copies, and why?",
        placeholder: "Tie copies to availability, durability, read scale, or locality."
      },
      {
        id: "consistency",
        title: "Consistency Between Replicas",
        question: "How closely must replicas agree, and is temporary divergence acceptable?",
        placeholder: "Define immediate agreement, bounded lag, or eventual convergence."
      },
      {
        id: "failover",
        title: "Failure Ownership / Failover",
        question: "Who is allowed to take over, and how is ownership transferred?",
        placeholder: "Describe detection, replacement selection, and safe transfer."
      },
      {
        id: "recovery",
        title: "Recovery / State Catch-up",
        question: "How does a replacement reconstruct or catch up on required state?",
        placeholder: "Define replay, sync, catch-up, and readiness."
      },
      {
        id: "delivery",
        title: "Delivery Semantics Between Executors",
        question: "What happens if send or acknowledgement communication fails?",
        placeholder: "Choose loss, retry, duplicate handling, and required effects."
      },
      {
        id: "backpressure",
        title: "Backpressure / Overload Propagation",
        question: "What should happen when producer rate exceeds consumer rate?",
        placeholder: "Define buffer, slow, reject, degrade, or drop behavior."
      },
      {
        id: "isolation",
        title: "Isolation / Blast-radius Boundary",
        question: "How much of the system should one hot tenant, partition, or dependency affect?",
        placeholder: "Define isolation boundaries and contained failure domains."
      },
      {
        id: "geography",
        title: "Geographic Placement / Locality",
        question: "Where should responsibilities and state live?",
        placeholder: "Tie placement to users, data, dependencies, and jurisdictions."
      },
      {
        id: "trust",
        title: "Trust / Security Boundaries",
        question: "Which interactions cross a trust boundary?",
        placeholder: "Define identity, authorization, tenancy, and isolation needs."
      },
      {
        id: "ordering",
        title: "Time / Ordering Assumptions",
        question: "Does correctness depend on time, expiry, sequence, or knowing what happened first?",
        placeholder: "Describe ordering, clock, expiry, and late-arrival semantics."
      },
      {
        id: "membership",
        title: "Membership / Topology Awareness",
        question: "What must each part know about active participants?",
        placeholder: "Track participants, health, and ownership maps."
      },
      {
        id: "global-local",
        title: "Global vs Local Decisions",
        question: "Can this decision be made locally, or must multiple participants agree?",
        placeholder: "Classify local decisions and broader agreement points."
      },
      {
        id: "degradation",
        title: "Degradation Strategy",
        question: "What reduced behavior is still safe and acceptable?",
        placeholder: "Define partial results, stale reads, deferred work, rejected writes, or read-only mode."
      },
      {
        id: "observability",
        title: "Observability / Distributed State Awareness",
        question: "What distributed behavior must be observable?",
        placeholder: "Name lag, backlog, ownership, retry, error, and health signals."
      },
      {
        id: "rebalancing",
        title: "Rebalancing / Topology Change",
        question: "How does ownership or state move while the system remains live?",
        placeholder: "Describe add, remove, replace, overload, and move behavior."
      },
      {
        id: "synthesis",
        title: "Synthesis - Distributed System Model",
        question: "Can distributed behavior preserve the external and logical requirements?",
        placeholder: "Summarize placement, partitioning, replication, coordination, and failure behavior."
      }
    ],
    bannedTerms: [
      "postgres",
      "mysql",
      "mongodb",
      "redis",
      "kafka",
      "rabbitmq",
      "sqs",
      "dynamodb",
      "cassandra",
      "elasticsearch",
      "nginx",
      "kubernetes",
      "docker",
      "wal",
      "btree",
      "b-tree",
      "heap page",
      "buffer pool",
      "latch",
      "syscall",
      "kernel",
      "cpu",
      "ssd",
      "fsync"
    ]
  },
  {
    id: "l4",
    number: 4,
    shortName: "Technology",
    title: "Technology / Component Model",
    centralQuestion: "What implementation families and concrete technologies best realize the distributed model?",
    boundary:
      "Concrete component families and products are allowed. Do not open their internal algorithms, pages, latches, WAL, threads, or hardware mechanics.",
    color: "#b45309",
    lenses: [
      {
        id: "families",
        title: "Choose Component Families",
        question: "What component category is needed for each responsibility or mechanism?",
        placeholder: "Map behavior to database, cache, object store, queue, gateway, search, or similar families."
      },
      {
        id: "access-patterns",
        title: "Match Families to Access Patterns",
        question: "How will this component mostly be used?",
        placeholder: "Point lookup, range query, append, scan, TTL lookup, replay, or blob access."
      },
      {
        id: "guarantees",
        title: "Match Families to Required Guarantees",
        question: "What must this component guarantee?",
        placeholder: "Transactions, durability, ordering, replay, low latency, consistency, or high availability."
      },
      {
        id: "strategies",
        title: "Compare Implementation Strategies",
        question: "Which implementation model best matches workload and guarantees?",
        placeholder: "Compare architecture families before brand names."
      },
      {
        id: "technology",
        title: "Choose Concrete Technology",
        question: "Which concrete technology best fits access pattern, guarantees, scale, operations, cost, and team fit?",
        placeholder: "Select the simplest adequate concrete tools."
      },
      {
        id: "boundaries",
        title: "Define Component Boundaries and Interfaces",
        question: "What does each component own and what operations does it expose?",
        placeholder: "Assign responsibility, state ownership, and API shape."
      },
      {
        id: "data-ownership",
        title: "Define Data Ownership Across Components",
        question: "For each important data item, which component is authoritative, derived, or temporary?",
        placeholder: "Clarify truth, caches, projections, and rebuildable state."
      },
      {
        id: "contracts",
        title: "Define Interaction Contracts",
        question: "What does one component send to another, and what acknowledgement or result is expected?",
        placeholder: "Specify commands, events, responses, acks, retries, and side effects."
      },
      {
        id: "operational",
        title: "Operational Characteristics",
        question: "What important runtime characteristics and limits does this component have?",
        placeholder: "Capture connection limits, lag, memory, retention, concurrency, and safe assumptions."
      },
      {
        id: "failures",
        title: "Component-level Failure Behavior",
        question: "If this component is slow, unavailable, or loses state, what happens to the system?",
        placeholder: "Describe capability loss, state risk, and upstream/downstream effects."
      },
      {
        id: "capacity",
        title: "Capacity Fit per Component",
        question: "Can this component sustain required throughput, concurrency, storage growth, and working set?",
        placeholder: "Map demand to capacity and headroom."
      },
      {
        id: "cost",
        title: "Cost / Operational Burden Fit",
        question: "Is this component still right after capacity, cost, and operations are considered?",
        placeholder: "Call out complexity, managed options, cost drivers, and simplifications."
      },
      {
        id: "synthesis",
        title: "Synthesis - Concrete Component Model",
        question: "Can the full system be explained using concrete components without describing their internals?",
        placeholder: "Summarize components, ownership, interfaces, limits, failure behavior, capacity, and cost."
      }
    ],
    bannedTerms: [
      "wal",
      "btree",
      "b-tree",
      "heap page",
      "buffer pool",
      "latch",
      "page split",
      "compaction algorithm",
      "thread pool",
      "event loop",
      "syscall",
      "kernel",
      "cpu scheduler",
      "page fault",
      "nic",
      "nvme",
      "fsync"
    ]
  },
  {
    id: "l5",
    number: 5,
    shortName: "Internals",
    title: "Component Internals",
    centralQuestion: "How do selected components actually provide the guarantees Level 4 relies on?",
    boundary:
      "Open one chosen component at a time. Internal algorithms, indexes, logs, buffers, concurrency, replication, and maintenance are in scope. OS and hardware mechanics stay in Level 6.",
    color: "#be123c",
    lenses: [
      {
        id: "execution",
        title: "Internal Execution Path",
        question: "When the component receives one operation, what internal stages does it pass through?",
        placeholder: "Trace parsing, planning, lookup, mutation, replication, and result creation."
      },
      {
        id: "structures",
        title: "Internal State Structures",
        question: "What internal data structures represent and find component state?",
        placeholder: "Name indexes, logs, metadata, buffers, segments, maps, or other internal structures."
      },
      {
        id: "concurrency",
        title: "Internal Coordination / Concurrency Control",
        question: "How does the component coordinate multiple operations touching the same internal state?",
        placeholder: "Describe isolation, ordering, latches, locks, serialization, or ownership."
      },
      {
        id: "durability",
        title: "Internal Durability / Recovery Path",
        question: "What makes a state change durable, and how is it recovered?",
        placeholder: "Define durable record, acknowledgement point, crash path, and replay."
      },
      {
        id: "replication",
        title: "Internal Replication / Synchronization",
        question: "How are changes propagated to replicas, and when is replication sufficient?",
        placeholder: "Trace streams, apply paths, lag, and required acknowledgement."
      },
      {
        id: "lookup",
        title: "Internal Indexing / Lookup Path",
        question: "How does a key, row, offset, or object ID locate corresponding data?",
        placeholder: "Map logical IDs to internal locations."
      },
      {
        id: "memory",
        title: "Internal Memory / Cache Management",
        question: "What stays in memory, how is it found, and what happens when memory fills?",
        placeholder: "Describe residency, reuse, eviction, flush, reload, and pressure."
      },
      {
        id: "write",
        title: "Internal Write Path / Mutation Mechanics",
        question: "What changes first in memory or metadata, and what later becomes persistent?",
        placeholder: "Trace mutation, metadata/index update, durability, flush, and replication."
      },
      {
        id: "read",
        title: "Internal Read Path / Retrieval Mechanics",
        question: "What internal structures are checked, in what order, and where does the returned value come from?",
        placeholder: "Trace lookup, cache, persistent read, visibility, validation, and result."
      },
      {
        id: "cleanup",
        title: "Internal Cleanup / Maintenance",
        question: "What background maintenance keeps the component healthy?",
        placeholder: "Describe compaction, vacuum, expiry, retention, checkpoints, merges, and repairs."
      },
      {
        id: "bottlenecks",
        title: "Internal Resource Contention / Bottlenecks",
        question: "What internal resource saturates or contends first?",
        placeholder: "Identify hot keys, hot pages, logs, memory, command CPU, and replication lag."
      },
      {
        id: "observability",
        title: "Internal Observability / Health Signals",
        question: "What metrics reveal saturation, failure, lag, or contention?",
        placeholder: "Name health signals for locks, hit rate, lag, evictions, queues, and errors."
      },
      {
        id: "parallelism",
        title: "Internal Parallelism / Scaling Model",
        question: "What internal unit can be parallelized, partitioned, or replicated?",
        placeholder: "Describe independent units and new coordination costs."
      },
      {
        id: "correctness",
        title: "Internal Correctness Boundaries",
        question: "What internal unit must succeed or remain correct together?",
        placeholder: "Define atomic and consistent internal units."
      },
      {
        id: "ack",
        title: "Commit / Acknowledgement Boundary",
        question: "What must be true before success is acknowledged?",
        placeholder: "Separate processed, committed, durable, replicated, and visible."
      },
      {
        id: "partial-failure",
        title: "Internal Partial-failure Behavior",
        question: "If execution stops halfway, what state remains and can callers observe it?",
        placeholder: "Describe partial progress, visibility, recovery, retry, and discard behavior."
      },
      {
        id: "versioning",
        title: "Internal Versioning / Evolution of State",
        question: "How does the component know which version is newer or valid?",
        placeholder: "Name sequence, version, timestamp, transaction, or offset semantics."
      },
      {
        id: "background",
        title: "Internal Background Coordination / Maintenance Scheduling",
        question: "What background work continuously cleans, synchronizes, compacts, or repairs state?",
        placeholder: "Define maintenance scheduling and coordination."
      },
      {
        id: "admission",
        title: "Internal Admission / Scheduling",
        question: "How does the component queue, limit, or prioritize incoming operations?",
        placeholder: "Describe admission, queueing, prioritization, and rejection behavior."
      },
      {
        id: "synthesis",
        title: "Synthesis - Component-internal Model",
        question: "Can the component internals explain the guarantees relied on above?",
        placeholder: "Summarize execution, state structures, lookup, concurrency, durability, replication, recovery, maintenance, scaling, and observability."
      }
    ],
    bannedTerms: [
      "kernel scheduler",
      "syscall",
      "system call",
      "nic",
      "cpu core",
      "cpu cache",
      "page fault",
      "virtual address",
      "page table",
      "physical ram",
      "nvme",
      "device driver",
      "firmware",
      "interrupt"
    ]
  },
  {
    id: "l6",
    number: 6,
    shortName: "Runtime",
    title: "Machine / Runtime Mechanics",
    centralQuestion: "What concrete OS and hardware activity makes the component internals possible?",
    boundary:
      "Trace process, thread, CPU, memory, kernel, storage, network, queueing, resource contention, local failure, and recovery mechanics.",
    color: "#475569",
    lenses: [
      {
        id: "process",
        title: "Process / Execution Context",
        question: "Which process or runtime instance receives the work and owns runtime state?",
        placeholder: "Name runtime processes and where execution begins."
      },
      {
        id: "threads",
        title: "Thread / Event-loop Model",
        question: "Does it use one thread, many threads, event loop, worker pool, or a mix?",
        placeholder: "Describe concurrency inside the runtime process."
      },
      {
        id: "cpu",
        title: "CPU Scheduling / Execution",
        question: "How does the OS schedule runnable work onto CPU cores?",
        placeholder: "Trace runnable work, scheduling, context switching, and core execution."
      },
      {
        id: "virtual-memory",
        title: "Virtual Memory / Address Space",
        question: "What memory regions are used, and how do virtual addresses map to physical memory?",
        placeholder: "Describe heap, stack, shared memory, mappings, and page tables."
      },
      {
        id: "ram",
        title: "Physical RAM / Cache Residency",
        question: "Which virtual pages are in RAM, and what happens when they are not?",
        placeholder: "Identify resident pages, page faults, reloads, and pressure."
      },
      {
        id: "storage",
        title: "Storage I/O Path",
        question: "What path does data take between process and persistent storage?",
        placeholder: "Trace syscall, filesystem, page cache, block I/O, and storage device."
      },
      {
        id: "network",
        title: "Network I/O Path",
        question: "What happens between writing a socket and remote process receiving bytes?",
        placeholder: "Trace socket, TCP/IP, NIC, network, remote socket, and process."
      },
      {
        id: "kernel",
        title: "Kernel / Syscall Boundary",
        question: "Which operations require entering the kernel?",
        placeholder: "Name reads, writes, fsync, socket operations, memory mapping, and blocking behavior."
      },
      {
        id: "hardware",
        title: "Device / Hardware Execution",
        question: "Which hardware component executes or moves the data?",
        placeholder: "Map work to CPU, RAM, SSD/NVMe, NIC, caches, and memory controller."
      },
      {
        id: "latency",
        title: "Timing / Latency Composition",
        question: "Which stage contributes delay, and which one dominates?",
        placeholder: "Break total latency into scheduling, CPU, memory, storage, network, and queueing."
      },
      {
        id: "throughput",
        title: "Throughput / Resource Saturation",
        question: "Which resource reaches its limit first as concurrency increases?",
        placeholder: "Identify CPU, RAM, disk, network, pools, queues, and bandwidth ceilings."
      },
      {
        id: "queueing",
        title: "Queueing / Waiting Inside the Machine",
        question: "Where can work queue before CPU, disk, network, locks, or workers?",
        placeholder: "Name run queues, device queues, socket buffers, worker backlogs, and waits."
      },
      {
        id: "isolation",
        title: "Resource Isolation / Contention",
        question: "Which resources are shared, and how can one workload hurt another?",
        placeholder: "Describe noisy neighbor, memory pressure, I/O contention, and pauses."
      },
      {
        id: "failure",
        title: "Machine-level Failure Modes",
        question: "What local failures stop execution or destroy volatile state?",
        placeholder: "List process crash, OS crash, power loss, disk failure, NIC failure, OOM, and lost volatile state."
      },
      {
        id: "recovery",
        title: "Recovery Boundary on One Machine",
        question: "After a crash, what can be reconstructed locally and what is permanently lost?",
        placeholder: "Separate replayable persistent state from unrecoverable volatile state."
      },
      {
        id: "profiling",
        title: "Machine-level Observability / Profiling",
        question: "What measurements distinguish CPU, memory, disk, network, scheduler, or queue bottlenecks?",
        placeholder: "Name CPU, run queue, page faults, disk latency, network loss, and backlog metrics."
      },
      {
        id: "synthesis",
        title: "Synthesis - End-to-end Machine Execution",
        question: "Can one operation be traced through network, kernel, process, CPU, memory, storage, and back?",
        placeholder: "Summarize end-to-end runtime execution, resource use, failure, recovery, and observability."
      }
    ],
    bannedTerms: []
  }
];

export const CONCERNS = [
  {
    id: "correctness",
    title: "Correctness",
    lensMap: {
      l1: ["invariants", "failure-impact", "priorities"],
      l2: ["coordination", "truth", "conflict", "derived"],
      l3: ["coordination", "consistency", "global-local", "ordering"],
      l4: ["guarantees", "data-ownership", "contracts"],
      l5: ["concurrency", "correctness", "ack", "partial-failure"],
      l6: ["failure", "recovery"]
    }
  },
  {
    id: "scale",
    title: "Scale",
    lensMap: {
      l1: ["demand", "targets"],
      l2: ["fanout", "shared-state", "coupling"],
      l3: ["placement", "partitioning", "routing", "rebalancing"],
      l4: ["access-patterns", "capacity", "cost"],
      l5: ["bottlenecks", "parallelism", "admission"],
      l6: ["throughput", "queueing", "isolation"]
    }
  },
  {
    id: "latency",
    title: "Latency",
    lensMap: {
      l1: ["expectations", "targets", "priorities"],
      l2: ["timing", "critical-path", "visibility"],
      l3: ["routing", "geography", "backpressure", "degradation"],
      l4: ["access-patterns", "operational", "capacity"],
      l5: ["read", "write", "memory", "admission"],
      l6: ["latency", "network", "storage", "cpu"]
    }
  },
  {
    id: "failure",
    title: "Failure",
    lensMap: {
      l1: ["failure-impact", "priorities", "targets"],
      l2: ["critical-path", "propagation", "retention"],
      l3: ["failover", "recovery", "delivery", "degradation", "observability"],
      l4: ["failures", "contracts", "operational"],
      l5: ["durability", "replication", "partial-failure", "observability"],
      l6: ["failure", "recovery", "profiling"]
    }
  },
  {
    id: "security",
    title: "Security",
    lensMap: {
      l1: ["actors", "scope", "failure-impact"],
      l2: ["state-ownership", "identity", "retention"],
      l3: ["trust", "isolation", "geography"],
      l4: ["boundaries", "data-ownership", "contracts"],
      l5: ["lookup", "versioning", "observability"],
      l6: ["isolation", "network", "profiling"]
    }
  }
];

export const CONSTRAINTS = [
  {
    id: "traffic-spike",
    title: "Traffic jumps 5x in one hour",
    firstLevel: "l1",
    affected: {
      l1: ["demand", "expectations", "targets"],
      l2: ["fanout", "shared-state"],
      l3: ["backpressure", "isolation", "rebalancing"],
      l4: ["capacity", "operational"],
      l5: ["bottlenecks", "admission"],
      l6: ["throughput", "queueing"]
    },
    prompt:
      "Recheck peak shape, hot state, overload policy, component headroom, internal admission, and machine queueing."
  },
  {
    id: "owner-fails",
    title: "The current owner of hot state fails",
    firstLevel: "l3",
    affected: {
      l1: ["failure-impact", "priorities"],
      l2: ["truth", "coordination", "conflict"],
      l3: ["failover", "recovery", "consistency", "membership"],
      l4: ["failures", "contracts"],
      l5: ["replication", "ack", "partial-failure"],
      l6: ["failure", "recovery"]
    },
    prompt:
      "Decide who may take over, how current state is proven safe enough, and what gets rejected while ownership is unclear."
  },
  {
    id: "downstream-slow",
    title: "A downstream dependency slows for 20 minutes",
    firstLevel: "l3",
    affected: {
      l1: ["expectations", "failure-impact"],
      l2: ["timing", "critical-path"],
      l3: ["backpressure", "delivery", "degradation"],
      l4: ["contracts", "failures", "capacity"],
      l5: ["admission", "observability"],
      l6: ["queueing", "latency"]
    },
    prompt:
      "Move non-critical work off the success path where possible and define bounded backlog, retry, and rejection behavior."
  },
  {
    id: "regional-outage",
    title: "One region becomes unavailable",
    firstLevel: "l3",
    affected: {
      l1: ["failure-impact", "scope", "targets"],
      l2: ["truth", "visibility", "retention"],
      l3: ["geography", "failover", "replication", "consistency", "degradation"],
      l4: ["technology", "failures", "cost"],
      l5: ["replication", "recovery"],
      l6: ["network", "failure"]
    },
    prompt:
      "Check geography, jurisdiction, cross-region truth, failover readiness, data-loss windows, and reduced modes."
  },
  {
    id: "lost-ack",
    title: "An acknowledgement is lost during retry",
    firstLevel: "l3",
    affected: {
      l1: ["invariants", "failure-impact"],
      l2: ["identity", "conflict", "coordination"],
      l3: ["delivery", "ordering", "consistency"],
      l4: ["contracts", "data-ownership"],
      l5: ["versioning", "ack", "partial-failure"],
      l6: ["network", "latency"]
    },
    prompt:
      "Add idempotency identity, duplicate handling, acknowledgement boundaries, and retry-visible state."
  },
  {
    id: "new-residency",
    title: "A new data residency rule appears",
    firstLevel: "l1",
    affected: {
      l1: ["scope", "invariants", "failure-impact"],
      l2: ["state-ownership", "retention"],
      l3: ["geography", "trust", "routing"],
      l4: ["technology", "data-ownership", "cost"],
      l5: ["replication", "cleanup"],
      l6: ["storage", "network"]
    },
    prompt:
      "Separate regulated state, route by jurisdiction, and check replication, backups, retention, and operations."
  }
];

export const SCENARIOS = [
  {
    id: "reservation",
    title: "Reservation Platform",
    tagline: "Prevent double allocation under demand spikes.",
    seeds: {
      l1: {
        actions: "Search availability, hold a resource, confirm a reservation, cancel, expire an unpaid hold, view booking status.",
        actors: "Guest, host or inventory owner, support operator, payment provider, scheduled expiration process.",
        objects: "Resource, time slot, hold, confirmed reservation, cancellation, guest account.",
        invariants:
          "A resource and time slot cannot have two active owners. A cancelled or expired hold cannot later become confirmed. Confirmed history remains auditable.",
        demand:
          "Read-heavy browsing with sharp spikes around launches and holidays. Writes cluster on popular resources and scarce time windows.",
        expectations:
          "Availability browsing can tolerate brief staleness. Hold and confirm must preserve correctness. Status reads should feel immediate after a user action.",
        "failure-impact":
          "Double allocation is severe. Losing an acknowledged booking is unacceptable. Temporary rejection is acceptable when correctness is at risk.",
        scope:
          "In scope: availability, holds, confirmations, cancellations, expiration, booking status. Out of scope: payment settlement and host onboarding workflows.",
        priorities:
          "Correctness and durability win over accepting every request. Clear user status wins over optimistic availability.",
        targets:
          "Hold and confirm decisions complete within 900 ms p95 during normal load. Expired holds release capacity within 60 seconds. No acknowledged reservation loss.",
        assumptions:
          "Assume most resources are independent, but a small set becomes hot. Assume one primary market first, with future regional expansion.",
        synthesis:
          "The platform exposes browsing and reservation actions while guaranteeing that scarce resources are never double-booked and acknowledged reservations remain recoverable."
      },
      l2: {
        responsibilities:
          "Availability presentation, reservation decisioning, hold lifecycle management, confirmation handling, cancellation handling, status presentation, audit history.",
        "state-ownership":
          "Reservation decisioning owns current ownership facts. Hold lifecycle owns expiry intent. Status presentation reads current and historical facts.",
        interactions:
          "Availability reads resource state. Hold request checks ownership and creates a hold. Confirmation validates the hold and creates a confirmed booking. Expiry releases stale holds.",
        timing:
          "Hold and confirm require immediate decisioning. Notifications, analytics, and search refresh may happen later.",
        coordination:
          "Creating a hold and marking the resource unavailable must agree as one logical decision. Expiry and confirm for the same hold conflict and need a single winner.",
        truth:
          "Current reservation ownership is the authoritative fact. Availability displays are derived from ownership and resource schedules.",
        lifecycle:
          "Available -> held -> confirmed. Held -> expired or cancelled. Confirmed -> cancelled, but retained in history.",
        "critical-path":
          "For hold: validate request, decide ownership, persist visible status. Side paths include notifications, metrics, and refreshed availability projections.",
        conflict:
          "Two users can request the same resource and time slot. Confirmation can race with expiry or cancellation."
      },
      l3: {
        placement:
          "Browsing can use many interchangeable executors. Reservation decisions need ownership-based execution by resource and time slot.",
        partitioning:
          "The independent unit is resource plus time window. Popular resources may need finer routing, but conflicting decisions for one unit converge on one owner.",
        coordination:
          "Different resource windows proceed independently. Actions touching the same current ownership fact require agreement through the owner.",
        routing:
          "Requests derive the ownership unit from resource ID and requested time window, then route to the participant responsible for that unit.",
        replication:
          "Current ownership needs redundant copies for durability. Availability views can be copied for read scale with bounded lag.",
        consistency:
          "Ownership copies must agree before success is visible. Availability copies may lag as long as final hold decisions recheck the authoritative ownership.",
        failover:
          "A replacement may take over only after proving the previous owner is no longer active and after catching up to accepted decisions.",
        delivery:
          "Retries may duplicate hold or confirm requests, so requests carry stable identities and the owner returns the previously accepted result.",
        backpressure:
          "Hot ownership units may reject or queue briefly instead of allowing unbounded work to pile up."
      },
      l4: {
        families:
          "User-facing API, authoritative transactional store, derived availability read model, delayed work runner, notification integration, observability pipeline.",
        "access-patterns":
          "Reservation writes are point and conditional updates by resource/time. Availability reads are range-oriented by resource/time and location.",
        guarantees:
          "The authoritative store must support durable conditional state transitions and consistent reads for conflicting reservation decisions.",
        strategies:
          "Start with a relational transactional core and derived read projections before adding specialized stores.",
        technology:
          "PostgreSQL for authoritative reservation state, a small worker process for expiry and projections, and object-free static deployment for this prototype.",
        boundaries:
          "The API owns request validation and orchestration. PostgreSQL owns reservation truth. Workers own deferred expiry and projection refresh.",
        "data-ownership":
          "Reservation rows are authoritative. Availability projection rows are derived. Notification records are side-effect tracking."
      },
      l5: {
        execution:
          "For the authoritative store, a hold request parses input, locates the candidate ownership row or range, evaluates the transition, updates state, records history, and commits.",
        structures:
          "Reservation state is located through indexes on resource ID and time range. History is represented as append-style records linked to the reservation identity.",
        concurrency:
          "Concurrent requests for the same resource/time are serialized at the state unit so only one valid transition commits.",
        durability:
          "The commit point must make the new ownership fact and its history recoverable before success is acknowledged.",
        ack:
          "The user sees success only after the authoritative ownership fact is committed and can be read back."
      },
      l6: {
        process:
          "A web process receives the request and calls the storage process. The storage process owns in-memory execution state for the transaction.",
        threads:
          "Concurrent requests are scheduled across process workers while storage coordinates conflicting state internally.",
        latency:
          "End-to-end latency includes network arrival, app scheduling, storage lookup, commit I/O, and response transfer.",
        failure:
          "Process crash loses in-flight volatile work. Committed storage state should survive and be replayable after restart.",
        recovery:
          "After restart, committed reservation state is reconstructed from persistent records; incomplete requests are retried by clients using stable request identities."
      }
    }
  },
  {
    id: "messaging",
    title: "Team Messaging",
    tagline: "Order conversations while delivery can lag.",
    seeds: {
      l1: {
        actions: "Send message, receive new messages, mark read, edit, delete, add member, leave conversation.",
        actors: "Human user, mobile client, web client, notification provider, workspace administrator.",
        objects: "Workspace, conversation, member, message, read status, attachment metadata.",
        invariants:
          "A user can only read conversations they belong to. Messages in one conversation have a stable order. Deleted content should not be shown as active content.",
        demand:
          "Frequent small writes and many reads, with bursts during work hours. Large workspaces create high fan-out for delivery and unread status.",
        expectations:
          "Sending should feel immediate. Delivery can be slightly delayed. Conversation order should be consistent for participants.",
        "failure-impact":
          "Lost acknowledged messages are unacceptable. Delayed notifications are tolerable. Permission leaks are severe.",
        priorities: "Durability and access control > per-device immediacy > notification freshness.",
        targets:
          "Send p95 below 400 ms in-region. Delivered-to-active-clients p95 below 2 seconds. No acknowledged message loss.",
        synthesis:
          "The system lets authorized members exchange ordered messages while preserving durable conversation history and allowing delivery side work to lag."
      },
      l2: {
        responsibilities:
          "Membership validation, message acceptance, conversation ordering, delivery fan-out, read-state tracking, attachment reference handling.",
        "state-ownership":
          "Conversation history owns accepted messages and order. Membership state controls authorization. Delivery state and unread counts are derived per recipient.",
        timing:
          "Message acceptance and ordering are immediate. Push notification and some read-model updates can be deferred.",
        coordination:
          "A message and its conversation order must agree together. Delivery to each recipient can complete independently.",
        truth:
          "Conversation history is authoritative. Unread counts and notification state are derived.",
        fanout:
          "One accepted message fans out to many participants and devices."
      },
      l3: {
        placement:
          "Message acceptance is ownership-based by conversation. Delivery workers are interchangeable and can process recipient-specific work.",
        partitioning:
          "Conversation ID is the primary ordered unit. Recipient delivery state can be partitioned by user or conversation.",
        routing:
          "Send requests route to the owner for the conversation ordering unit.",
        delivery:
          "Delivery work is retryable and may be duplicated, so recipient state treats duplicate delivery attempts as already handled.",
        ordering:
          "Ordering is strict within one conversation. Cross-conversation ordering is not required.",
        degradation:
          "If delivery workers lag, message acceptance can continue and clients can fetch conversation history directly."
      },
      l4: {
        families:
          "API gateway, authoritative message store, durable async work stream, real-time connection service, push notification provider, search projection.",
        technology:
          "PostgreSQL or another transactional store for early conversation history, a durable queue for delivery jobs, and WebSocket-capable app servers for live clients.",
        "data-ownership":
          "Message history is authoritative in the message store. Search and unread counters are derived projections."
      }
    }
  },
  {
    id: "file-processing",
    title: "File Processing Pipeline",
    tagline: "Preserve uploads while transformations run later.",
    seeds: {
      l1: {
        actions: "Upload file, retrieve original, request transformation, view processing status, download result, delete file.",
        actors: "End user, browser client, processing worker, external scanner, support operator.",
        objects: "File, upload session, metadata, processing job, result artifact, deletion request.",
        invariants:
          "An acknowledged upload must remain retrievable until retention expires or deletion completes. A result must reference the exact input version it was produced from.",
        demand:
          "Lower request count but large payloads. Processing can be CPU-heavy and bursty after bulk uploads.",
        expectations:
          "Upload confirmation depends on preserving the original. Transformation completion may take minutes and expose progress.",
        "failure-impact":
          "Losing an acknowledged original is severe. Delayed transformations are tolerable when status is honest.",
        priorities: "Original durability > truthful status > transformation latency.",
        targets:
          "Upload acknowledgement after durable preservation. Status freshness within 10 seconds. Transformation p95 below 5 minutes for standard files."
      },
      l2: {
        responsibilities:
          "Upload acceptance, durable file preservation, metadata tracking, job intent recording, transformation execution, status publication, deletion lifecycle.",
        "critical-path":
          "Upload success requires preserving the original and recording metadata. Transformation and notification are side paths.",
        truth:
          "Original file bytes and metadata are authoritative. Result artifacts are derived from a specific input version.",
        lifecycle:
          "Upload session -> accepted original -> queued for processing -> processing -> completed or failed -> retained or deleted."
      },
      l3: {
        placement:
          "Upload handling can use many interchangeable executors. Processing workers are interchangeable and claim independent jobs.",
        partitioning:
          "File ID is the independent unit. Large tenant batches need fairness boundaries.",
        delivery:
          "Processing jobs are retryable. Duplicate execution must not publish conflicting results for the same input version.",
        backpressure:
          "Uploads can continue while processing backlog grows up to a bounded limit; beyond that the system should slow or reject transformation requests.",
        isolation:
          "One large tenant or pathological file type should not consume all processing capacity."
      },
      l4: {
        families:
          "Object storage for original bytes and result artifacts, metadata database, queue or stream for processing jobs, worker fleet, scanner integration.",
        technology:
          "S3-compatible object storage for bytes, PostgreSQL for metadata and job state, and a managed queue for bounded asynchronous processing.",
        failures:
          "Object store write failure blocks upload success. Queue outage may block new transformations but should not erase preserved originals."
      }
    }
  },
  {
    id: "analytics",
    title: "Product Analytics",
    tagline: "Absorb event volume and expose bounded-fresh dashboards.",
    seeds: {
      l1: {
        actions: "Ingest event, validate schema, query dashboard, define metric, export report, replay historical data.",
        actors: "Application service, tracking client, analyst, product manager, scheduled report process.",
        objects: "Event, identity, schema, metric, aggregation, dashboard, export.",
        invariants:
          "Accepted events should not disappear. Metric definitions must produce repeatable results over the same event set. Tenant data remains isolated.",
        demand:
          "High write volume with strong diurnal bursts. Dashboard reads are fewer but scan large time ranges.",
        expectations:
          "Ingestion prioritizes throughput and durability. Dashboards may lag within a declared freshness window.",
        "failure-impact":
          "Short dashboard lag is tolerable. Silent event loss and tenant leakage are not.",
        priorities: "Durable ingestion and tenant isolation > immediate query freshness > low-cost recomputation.",
        targets:
          "Ingest p95 below 100 ms at target volume. Dashboard freshness within 5 minutes. Acknowledged event loss window is zero or explicitly bounded."
      },
      l2: {
        responsibilities:
          "Event intake, validation, identity association, durable event history, aggregation, metric evaluation, dashboard serving, export generation.",
        truth:
          "Raw accepted events are authoritative. Aggregations, dashboards, and exports are derived.",
        timing:
          "Event acceptance needs immediate durability. Aggregation and dashboard freshness can lag.",
        fanout:
          "Many events contribute to one aggregate; one metric may read many aggregates."
      },
      l3: {
        placement:
          "Ingestion executors are interchangeable. Aggregation can partition by tenant, metric, and time window.",
        partitioning:
          "Tenant plus time bucket is a natural isolation and aggregation unit.",
        consistency:
          "Derived metrics may converge with bounded lag. Raw event history remains the source for replay.",
        backpressure:
          "When aggregation lags, keep ingestion bounded and expose freshness rather than dropping accepted events.",
        observability:
          "Track ingest errors, lag by tenant/time bucket, replay progress, dashboard freshness, and export backlog."
      },
      l4: {
        families:
          "Ingestion API, durable event log or write-optimized store, analytical storage, aggregation workers, dashboard query service.",
        technology:
          "A durable stream or append-oriented store for accepted events, columnar analytical storage for dashboards, and workers for materialized aggregates.",
        cost:
          "Retaining raw events enables replay but drives storage cost; compacted aggregates reduce query cost at the price of rebuild complexity."
      }
    }
  }
];

function emptyAnswers() {
  return Object.fromEntries(
    LEVELS.map((level) => [
      level.id,
      Object.fromEntries(level.lenses.map((lens) => [lens.id, ""]))
    ])
  );
}

export function createEmptyProject(name = "Untitled design") {
  return {
    version: STORAGE_VERSION,
    name,
    scenarioId: null,
    activeLevelId: "l1",
    selectedConcernId: "correctness",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    answers: emptyAnswers(),
    constraints: []
  };
}

export function createProjectFromScenario(scenarioId) {
  const scenario = SCENARIOS.find((item) => item.id === scenarioId);
  if (!scenario) {
    throw new Error(`Unknown scenario: ${scenarioId}`);
  }

  const project = createEmptyProject(scenario.title);
  project.scenarioId = scenario.id;
  project.answers = mergeAnswers(project.answers, scenario.seeds);
  return project;
}

export function mergeAnswers(baseAnswers, nextAnswers = {}) {
  const merged = emptyAnswers();

  for (const level of LEVELS) {
    for (const lens of level.lenses) {
      merged[level.id][lens.id] =
        nextAnswers[level.id]?.[lens.id] ?? baseAnswers?.[level.id]?.[lens.id] ?? "";
    }
  }

  return merged;
}

export function getLevel(levelId) {
  return LEVELS.find((level) => level.id === levelId) ?? LEVELS[0];
}

export function getLens(levelId, lensId) {
  return getLevel(levelId).lenses.find((lens) => lens.id === lensId);
}

export function getConcern(concernId) {
  return CONCERNS.find((concern) => concern.id === concernId) ?? CONCERNS[0];
}

export function getConstraint(constraintId) {
  return CONSTRAINTS.find((constraint) => constraint.id === constraintId) ?? CONSTRAINTS[0];
}

export function lintTextForLevel(levelId, text = "") {
  const level = getLevel(levelId);
  const normalized = text.toLowerCase();
  const findings = [];

  for (const term of level.bannedTerms) {
    const pattern = new RegExp(`(^|[^a-z0-9])${escapeRegExp(term.toLowerCase())}([^a-z0-9]|$)`, "i");
    if (pattern.test(normalized)) {
      findings.push({
        levelId,
        term,
        severity: levelId === "l1" || levelId === "l2" ? "high" : "medium",
        message: `"${term}" may belong below ${level.title}.`
      });
    }
  }

  return findings;
}

export function lintProject(project) {
  const findings = [];

  for (const level of LEVELS) {
    for (const lens of level.lenses) {
      const text = project.answers?.[level.id]?.[lens.id] ?? "";
      const lensFindings = lintTextForLevel(level.id, text).map((finding) => ({
        ...finding,
        lensId: lens.id,
        lensTitle: lens.title
      }));
      findings.push(...lensFindings);
    }
  }

  return findings;
}

export function scoreProject(project) {
  const levelScores = LEVELS.map((level) => {
    const completed = level.lenses.filter((lens) =>
      hasContent(project.answers?.[level.id]?.[lens.id])
    ).length;
    const findings = level.lenses.flatMap((lens) =>
      lintTextForLevel(level.id, project.answers?.[level.id]?.[lens.id] ?? "")
    );
    const ratio = completed / level.lenses.length;
    const boundaryPenalty = Math.min(0.35, findings.length * 0.04);

    return {
      levelId: level.id,
      label: `L${level.number}`,
      title: level.title,
      completed,
      total: level.lenses.length,
      findings: findings.length,
      ratio,
      score: Math.max(0, Math.round((ratio - boundaryPenalty) * 100))
    };
  });

  const totalCompleted = levelScores.reduce((sum, item) => sum + item.completed, 0);
  const totalLenses = levelScores.reduce((sum, item) => sum + item.total, 0);
  const totalFindings = levelScores.reduce((sum, item) => sum + item.findings, 0);
  const completion = totalCompleted / totalLenses;
  const penalty = Math.min(0.3, totalFindings * 0.015);

  return {
    overall: Math.max(0, Math.round((completion - penalty) * 100)),
    completion: Math.round(completion * 100),
    totalCompleted,
    totalLenses,
    totalFindings,
    levelScores
  };
}

export function buildCrossLevelTrace(project, concernId = project.selectedConcernId) {
  const concern = getConcern(concernId);

  return LEVELS.map((level) => {
    const lensIds = concern.lensMap[level.id] ?? [];
    const snippets = lensIds
      .map((lensId) => {
        const lens = getLens(level.id, lensId);
        const text = project.answers?.[level.id]?.[lensId] ?? "";

        return {
          lensId,
          title: lens?.title ?? lensId,
          text: excerpt(text)
        };
      })
      .filter((item) => item.text);

    return {
      levelId: level.id,
      label: `L${level.number}`,
      title: level.title,
      snippets,
      emptyPrompt: `Add ${concern.title.toLowerCase()} notes in ${level.shortName.toLowerCase()} lenses.`
    };
  });
}

export function analyzeConstraint(constraintId) {
  const constraint = getConstraint(constraintId);
  const firstLevel = getLevel(constraint.firstLevel);
  const affected = Object.entries(constraint.affected).map(([levelId, lensIds]) => {
    const level = getLevel(levelId);
    return {
      levelId,
      label: `L${level.number}`,
      title: level.title,
      lenses: lensIds.map((lensId) => getLens(levelId, lensId)?.title ?? lensId)
    };
  });

  return {
    ...constraint,
    firstLevelLabel: `L${firstLevel.number} ${firstLevel.shortName}`,
    affected
  };
}

export function addConstraint(project, constraintId) {
  const constraint = getConstraint(constraintId);
  const applied = {
    id: cryptoSafeId(),
    constraintId: constraint.id,
    title: constraint.title,
    appliedAt: new Date().toISOString()
  };

  return {
    ...project,
    updatedAt: new Date().toISOString(),
    constraints: [applied, ...(project.constraints ?? [])].slice(0, 12)
  };
}

export function generateMarkdown(project) {
  const score = scoreProject(project);
  const lines = [
    `# ${project.name}`,
    "",
    `Scenario: ${project.scenarioId ? SCENARIOS.find((item) => item.id === project.scenarioId)?.title ?? project.scenarioId : "Custom"}`,
    `Design health: ${score.overall}% (${score.totalCompleted}/${score.totalLenses} lenses complete, ${score.totalFindings} boundary flags)`,
    "",
    "## Constraint Log",
    ""
  ];

  if (project.constraints?.length) {
    for (const item of project.constraints) {
      lines.push(`- ${item.title} (${formatDate(item.appliedAt)})`);
    }
  } else {
    lines.push("- No injected constraints yet.");
  }

  for (const level of LEVELS) {
    lines.push("", `## L${level.number} - ${level.title}`, "", `Boundary: ${level.boundary}`, "");
    for (const lens of level.lenses) {
      const text = project.answers?.[level.id]?.[lens.id]?.trim();
      if (text) {
        lines.push(`### ${lens.title}`, "", text, "");
      }
    }
  }

  return lines.join("\n").trimEnd() + "\n";
}

export function serializeProject(project) {
  return JSON.stringify(
    {
      ...project,
      version: STORAGE_VERSION,
      updatedAt: new Date().toISOString(),
      answers: mergeAnswers(project.answers)
    },
    null,
    2
  );
}

export function parseProjectJson(raw) {
  const parsed = JSON.parse(raw);
  validateProjectShape(parsed);

  return {
    ...createEmptyProject(parsed.name || "Imported design"),
    ...parsed,
    version: STORAGE_VERSION,
    activeLevelId: getLevel(parsed.activeLevelId).id,
    selectedConcernId: getConcern(parsed.selectedConcernId).id,
    answers: mergeAnswers(parsed.answers),
    constraints: Array.isArray(parsed.constraints) ? parsed.constraints.slice(0, 20) : [],
    updatedAt: new Date().toISOString()
  };
}

export function validateProjectShape(value) {
  if (!value || typeof value !== "object") {
    throw new Error("Design file must be a JSON object.");
  }

  if (value.answers !== undefined && typeof value.answers !== "object") {
    throw new Error("Design file has an invalid answers object.");
  }

  return true;
}

export function suggestNextLenses(project, limit = 5) {
  const score = scoreProject(project);
  const weakest = [...score.levelScores].sort((a, b) => a.score - b.score)[0];
  const level = getLevel(weakest.levelId);

  return level.lenses
    .filter((lens) => !hasContent(project.answers?.[level.id]?.[lens.id]))
    .slice(0, limit)
    .map((lens) => ({
      levelId: level.id,
      lensId: lens.id,
      title: lens.title,
      question: lens.question
    }));
}

function hasContent(value) {
  return typeof value === "string" && value.trim().length >= 12;
}

function excerpt(value, max = 160) {
  const normalized = String(value || "")
    .replace(/\s+/g, " ")
    .trim();

  if (!normalized) {
    return "";
  }

  if (normalized.length <= max) {
    return normalized;
  }

  return `${normalized.slice(0, max - 1).trim()}...`;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function cryptoSafeId() {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID();
  }

  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function formatDate(value) {
  if (!value) {
    return "unknown date";
  }

  return new Date(value).toISOString().slice(0, 10);
}

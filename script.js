const systems = {
  moltmesh: {
    state: "Open-source project — I designed and built it",
    title: "A mesh where agents can trust the handoff.",
    summary: "A decentralized agent-to-agent protocol: any agent, in any language, discovers peers, delegates tasks with scoped authority, keeps context across hops, and gets an audit log of every interaction — no central server, no API keys. The daemon absorbs all the libp2p complexity; agents just speak gRPC. An early prototype adds agent-to-agent payments. Open source; openmolt.network is the demo network.",
    href: "https://github.com/sahilpohare/MoltMesh",
    link: "Source on GitHub",
    facts: [["Transport", "QUIC + Noise"], ["Discovery", "Kademlia DHT"], ["Authority", "did:key + Ed25519"], ["Payments", "Agent-to-agent (prototype)"]],
    constraint: "Agents written in any language needed one secure, auditable coordination layer without inheriting libp2p complexity."
  },
  thesis: {
    state: "Master's thesis — distributed systems research",
    title: "Compute routed by capability, not location.",
    summary: "BitTorrent for the BEAM: a self-organizing mesh of embedded Erlang/Elixir nodes that advertise what hardware they have and route work to it. Standard OTP primitives — GenServers, task linking, supervision — keep working across the mesh, on tiny devices that drop off the network.",
    href: "https://elixirforum.com/t/looking-for-feedback-on-my-thesis-project-distributed-beam-compute-capability-based-routing-for-nerves/74884",
    link: "Read the architecture",
    facts: [["Runtime", "Elixir + Nerves"], ["Registry", "Horde CRDT"], ["Network", "Partisan + libp2p"], ["Traversal", "mDNS + DCUTR"]],
    constraint: "Standard OTP semantics had to survive across tiny, intermittently connected devices with radically different hardware."
  },
  pinger: {
    state: "Product I founded — live, paying B2B customers",
    title: "Realtime streams that survive the real world.",
    summary: "One SDK for the four things AI products keep rebuilding: permanent threads, token streams that resume mid-generation, durable agent state that survives a worker crash, and guaranteed pub/sub delivery. Built on Elixir/OTP and Rust NIFs. I founded it and run it — 5 B2B customers, 800+ daily users.",
    href: "https://pingerchips.com",
    link: "Visit Pingerchips",
    facts: [["Threads", "Permanent history"], ["Recovery", "Mid-token resume"], ["State", "Durable Objects"], ["Scale", "5 B2B customers"]],
    constraint: "AI teams were rebuilding four systems that never belonged together: SSE, history storage, worker queues, and socket notifications."
  },
  skyfern: {
    state: "Product I founded — decision intelligence for UX research",
    title: "Turn a pile of interviews into a decision.",
    summary: "Skyfern records and transcribes user interviews, clusters the themes with HDBSCAN, and lays them out as affinity maps on a Canvas UI. Chrome agents spawn as K8s jobs to join and record calls live. Validated with 150+ interviews over six months; ran on the kitchen cluster for $8K/month less than the cloud equivalent.",
    href: "https://skyfernai.com",
    link: "Visit Skyfern AI",
    facts: [["Discovery", "150+ interviews"], ["Workflow", "Temporal DAGs"], ["Clustering", "HDBSCAN"], ["Savings", "$8K per month"]],
    constraint: "A founder-led product needed sophisticated AI workflows and live meeting automation without venture-scale infrastructure burn."
  },
  maplify: {
    state: "Studio I own and operate — client engagements",
    title: "Keep the product. Harden the foundation.",
    summary: "My rescue-engineering studio. Founders reach v0.1 fast with AI tools, then find it isn't safe to put in front of customers. I take the engagement, keep the working product live, and fix the security, data model, tests, and deployment underneath it.",
    href: "https://maplifytech.com",
    link: "Visit Maplify Tech",
    facts: [["Entry", "Readiness audit"], ["Delivery", "Senior-only"], ["Scope", "Fixed price"], ["Rescue", "4-8 weeks"]],
    constraint: "The working product surface must survive while critical security, data integrity, architecture, and ownership failures are repaired underneath it."
  },
  mimir: {
    state: "Open-source projects I built at 17 — the P2P work behind MoltMesh",
    title: "Compute and models, shared peer to peer.",
    summary: "Mimir Cloud lets peers submit WASM/JS functions that worker nodes on the network schedule and run. MimirLLM does the same for language models: find the models peers are hosting and talk to them, as a light client or a full node. Both libp2p-based and open source. I built them at 17, years before agent meshes were a category, and wrote two articles on the ideas.",
    href: "https://github.com/sahilpohare/mimir-llm",
    link: "MimirLLM source",
    facts: [["Networking", "libp2p + Kademlia"], ["Compute", "V8 + isolated-VM"], ["Models", "Ollama peers"], ["Built", "Age 17"]],
    constraint: "Sharing compute and models across untrusted peers needed discovery, scheduling, and isolation with no coordinating server — the same problem MoltMesh now solves for agents."
  }
};

const meshLayers = {
  all: ["ALL_LAYERS / ROTATE_TO_INSPECT", "Most AI agents cannot safely find and delegate work to agents outside their own platform. I built MoltMesh so they can, without a central server."],
  identity: ["LAYER_01 / SIGNED_IDENTITY", "Every agent resolves to a signed did:key identity backed by Ed25519, making peer spoofing cryptographically infeasible."],
  delegation: ["LAYER_02 / SCOPED_DELEGATION", "Tasks carry typed lifecycle state and authority boundaries while context survives every agent handoff."],
  isolation: ["LAYER_03 / MICROVM_ISOLATION", "Untrusted agent execution enters a Firecracker microVM with a dedicated TUN/TAP interface and hardware-level boundaries."],
  consensus: ["LAYER_04 / REPLICATED_LOG", "Raft CFT or Tendermint BFT coordinates agent threads through an ordered, inspectable record of every handoff."]
};

const tabs = [...document.querySelectorAll("[data-system]")];
const panel = document.querySelector("#panel-system");

function selectSystem(key) {
  const system = systems[key];
  const activeTab = document.querySelector(`[data-system="${key}"]`);
  if (!system || !activeTab) return;

  tabs.forEach((tab) => {
    const selected = tab === activeTab;
    tab.setAttribute("aria-selected", String(selected));
    tab.tabIndex = selected ? 0 : -1;
  });

  panel.setAttribute("aria-labelledby", activeTab.id);
  document.querySelector("#system-state").textContent = system.state;
  document.querySelector("#system-title").textContent = system.title;
  document.querySelector("#system-summary").textContent = system.summary;
  document.querySelector("#system-constraint").textContent = system.constraint;

  const link = document.querySelector("#system-link");
  link.href = system.href;
  link.firstChild.textContent = `${system.link} `;

  document.querySelector("#system-facts").replaceChildren(...system.facts.map(([term, value]) => {
    const wrapper = document.createElement("div");
    const dt = document.createElement("dt");
    const dd = document.createElement("dd");
    dt.textContent = term;
    dd.textContent = value;
    wrapper.append(dt, dd);
    return wrapper;
  }));
}

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectSystem(tab.dataset.system));
  tab.addEventListener("keydown", (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const direction = ['ArrowRight', 'ArrowDown'].includes(event.key) ? 1 : -1;
    const nextIndex = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + direction + tabs.length) % tabs.length;
    tabs[nextIndex].focus();
    selectSystem(tabs[nextIndex].dataset.system);
  });
});

document.querySelectorAll("[data-scroll-to]").forEach((button) => {
  button.addEventListener("click", () => document.querySelector(`#${button.dataset.scrollTo}`)?.scrollIntoView());
});

const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll("[data-route-link]")];
const routeObserver = new IntersectionObserver((entries) => {
  const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (!visible) return;
  navLinks.forEach((link) => link.classList.toggle("is-active", link.getAttribute("href") === `#${visible.target.id}`));
}, { rootMargin: "-30% 0px -55%", threshold: [0.05, 0.25, 0.5] });
sections.forEach((section) => routeObserver.observe(section));

/* ---------------------------------------------------------------------------
   Hero shipping log
   Prints every milestone into ~/ship.log with a quick per-line reveal, then
   stops — a caret rides the line being written and disappears at the end.
   No loop. All lines are always in the DOM (sized to content, no empty box);
   the animation only unhides them. Reduced motion / hidden tab: shown at once.
--------------------------------------------------------------------------- */
(() => {
  const list = document.querySelector("#ship-log-lines");
  if (!list) return;
  const rm = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const entries = [
    "now      lightwork-ai   shipping production voice agents",
    "2026     moltmesh       decentralized agent-to-agent protocol",
    "2025     skyfern        founded -> 150+ user interviews",
    "2025     kitchen-k8s    prod on a home node -> $8K/mo saved",
    "2024-25  aisentr        0 -> £500K ARR   [employee #1]",
    "2024     pingerchips    founded -> 5 B2B customers",
    "2023     orange-health  YC20 -> +23% acquisition, -25% churn",
    "2022     bot.space      db cost -6K/mo -> -2K/mo  (-70%)",
    "2021     mimir          p2p compute + LLM  [age 17]",
  ];

  // Build every line up front so the panel holds its final height immediately.
  const nodes = entries.map((text) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.className = "ship-text";
    span.textContent = text;
    li.appendChild(span);
    list.appendChild(li);
    return { li, span, text };
  });

  if (rm || document.hidden) return; // already fully rendered

  // Hide, then reveal line by line.
  nodes.forEach((n) => { n.li.style.visibility = "hidden"; });
  let i = 0;
  let caret = null;

  function reveal() {
    if (caret) caret.remove();
    if (i >= nodes.length) return;
    const n = nodes[i];
    n.li.style.visibility = "visible";
    caret = document.createElement("span");
    caret.className = "ship-caret";
    n.li.appendChild(caret);
    i += 1;
    setTimeout(reveal, 140 + Math.random() * 90); // whole log in ~1.6s
  }
  // start once the hero is on screen
  const io = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { io.disconnect(); reveal(); }
  }, { threshold: 0.1 });
  io.observe(list);
})();

const canvas = document.querySelector("#ascii-mesh");
const volume = document.querySelector(".ascii-volume");
const context = canvas.getContext("2d", { alpha: false });
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const layerButtons = [...document.querySelectorAll("[data-mesh-focus]")];
const centers = [
  { key: "identity", label: "IDENTITY", x: -2.15, y: .25, z: .2 },
  { key: "delegation", label: "DELEGATE", x: -.55, y: -.75, z: -.65 },
  { key: "isolation", label: "ISOLATE", x: 1.05, y: .7, z: -.2 },
  { key: "consensus", label: "CONSENSUS", x: 2.3, y: -.2, z: .45 }
];
const edges = [[0,1], [1,2], [2,3], [0,2], [1,3]];
const spherePoints = [];
const ramp = [".", ":", "+", "*", "#", "%", "@"];
let focusLayer = "all";
let rotationX = -.14;
let rotationY = -.34;
let targetX = rotationX;
let targetY = rotationY;
let active = true;
let dragging = false;
let previousPointer = null;
let frame = 0;

centers.forEach((center, centerIndex) => {
  for (let latitude = 1; latitude < 12; latitude += 1) {
    const phi = Math.PI * latitude / 12;
    for (let longitude = 0; longitude < 24; longitude += 1) {
      const theta = Math.PI * 2 * longitude / 24;
      const radius = centerIndex % 2 ? .57 : .67;
      spherePoints.push({
        node: centerIndex,
        x: center.x + radius * Math.sin(phi) * Math.cos(theta),
        y: center.y + radius * Math.cos(phi),
        z: center.z + radius * Math.sin(phi) * Math.sin(theta)
      });
    }
  }
});

function rotate(point) {
  const cosY = Math.cos(rotationY);
  const sinY = Math.sin(rotationY);
  const x1 = point.x * cosY - point.z * sinY;
  const z1 = point.x * sinY + point.z * cosY;
  const cosX = Math.cos(rotationX);
  const sinX = Math.sin(rotationX);
  return { x: x1, y: point.y * cosX - z1 * sinX, z: point.y * sinX + z1 * cosX };
}

function project(point, width, height) {
  const depth = 7.6 + point.z;
  const scale = Math.min(width / 7.4, height / 4.5) * 7.6 / depth;
  return { x: width / 2 + point.x * scale, y: height / 2 + point.y * scale, scale, depth };
}

function drawLine(start, end, width, height, intensity = 1) {
  for (let step = 0; step <= 38; step += 1) {
    const amount = step / 38;
    const point = rotate({
      x: start.x + (end.x - start.x) * amount,
      y: start.y + (end.y - start.y) * amount,
      z: start.z + (end.z - start.z) * amount
    });
    const screen = project(point, width, height);
    context.globalAlpha = (.18 + intensity * .5) * Math.max(.35, 1 - (screen.depth - 6) / 5);
    context.fillText(step % 3 === 0 ? "+" : "·", screen.x, screen.y);
  }
}

function drawMesh(time = 0) {
  const rect = volume.getBoundingClientRect();
  const ratio = Math.min(devicePixelRatio || 1, 2);
  const width = Math.max(1, Math.floor(rect.width));
  const height = Math.max(1, Math.floor(rect.height));
  if (canvas.width !== width * ratio || canvas.height !== height * ratio) {
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
  }
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  context.fillStyle = "#050505";
  context.fillRect(0, 0, width, height);
  context.fillStyle = "#ffffff";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.font = `${width < 600 ? 9 : 11}px ${getComputedStyle(document.documentElement).getPropertyValue('--mono')}`;

  const highlighted = focusLayer === "all" ? -1 : centers.findIndex((center) => center.key === focusLayer);
  edges.forEach(([from, to]) => {
    const connected = highlighted < 0 || from === highlighted || to === highlighted;
    drawLine(centers[from], centers[to], width, height, connected ? 1 : .05);
  });

  const projected = spherePoints.map((point) => ({ ...project(rotate(point), width, height), node: point.node }));
  projected.sort((a, b) => b.depth - a.depth).forEach((point) => {
    const isFocused = highlighted < 0 || point.node === highlighted;
    const depthAmount = Math.max(0, Math.min(1, 1 - (point.depth - 6.2) / 3.5));
    const index = Math.min(ramp.length - 1, Math.floor(depthAmount * ramp.length));
    context.globalAlpha = isFocused ? .32 + depthAmount * .68 : .08;
    context.fillText(isFocused ? ramp[index] : ".", point.x, point.y);
  });

  centers.forEach((center, index) => {
    const screen = project(rotate(center), width, height);
    const isFocused = highlighted < 0 || index === highlighted;
    context.globalAlpha = isFocused ? 1 : .22;
    context.font = `700 ${width < 600 ? 9 : 11}px ${getComputedStyle(document.documentElement).getPropertyValue('--mono')}`;
    context.fillText(`[${String(index + 1).padStart(2, "0")}] ${center.label}`, screen.x, screen.y - screen.scale * .82);
  });

  if (!reducedMotion) {
    const edge = edges[Math.floor(time / 2100) % edges.length];
    const progress = (time % 2100) / 2100;
    const start = centers[edge[0]];
    const end = centers[edge[1]];
    const packet = project(rotate({ x: start.x + (end.x - start.x) * progress, y: start.y + (end.y - start.y) * progress, z: start.z + (end.z - start.z) * progress }), width, height);
    context.globalAlpha = 1;
    context.font = `700 ${width < 600 ? 13 : 16}px ${getComputedStyle(document.documentElement).getPropertyValue('--mono')}`;
    context.fillText("◆", packet.x, packet.y);
  }
  context.globalAlpha = 1;
}

function animate(time) {
  if (!active || document.hidden) return;
  if (!dragging) targetY += .0008;
  rotationX += (targetX - rotationX) * .055;
  rotationY += (targetY - rotationY) * .055;
  drawMesh(time);
  frame = requestAnimationFrame(animate);
}

function updatePointer(event) {
  const rect = volume.getBoundingClientRect();
  targetY = ((event.clientX - rect.left) / rect.width - .5) * 1.15;
  targetX = -((event.clientY - rect.top) / rect.height - .5) * .58;
}

volume.addEventListener("pointerdown", (event) => {
  if (event.target.closest("button, a")) return;
  event.preventDefault();               // stop the drag becoming a text selection
  dragging = true;
  previousPointer = { x: event.clientX, y: event.clientY };
  try { volume.setPointerCapture(event.pointerId); } catch (_) {}
});
volume.addEventListener("pointermove", (event) => {
  if (!dragging) {
    updatePointer(event);
    return;
  }
  targetY += (event.clientX - previousPointer.x) * .008;
  targetX += (event.clientY - previousPointer.y) * .006;
  previousPointer = { x: event.clientX, y: event.clientY };
  if (reducedMotion) {
    rotationX = targetX;
    rotationY = targetY;
    drawMesh();
  }
});
volume.addEventListener("pointerup", () => { dragging = false; });
volume.addEventListener("pointercancel", () => { dragging = false; });

layerButtons.forEach((button) => {
  button.addEventListener("click", () => {
    focusLayer = button.dataset.meshFocus;
    layerButtons.forEach((candidate) => {
      const selected = candidate === button;
      candidate.classList.toggle("is-active", selected);
      candidate.setAttribute("aria-pressed", String(selected));
    });
    document.querySelector("#mesh-readout").textContent = meshLayers[focusLayer][0];
    document.querySelector("#mesh-description").textContent = meshLayers[focusLayer][1];
    if (reducedMotion) drawMesh();
  });
});

const volumeObserver = new IntersectionObserver(([entry]) => {
  active = entry.isIntersecting;
  cancelAnimationFrame(frame);
  if (active) {
    if (reducedMotion) drawMesh();
    else frame = requestAnimationFrame(animate);
  }
}, { threshold: .01 });
volumeObserver.observe(volume);
document.addEventListener("visibilitychange", () => {
  cancelAnimationFrame(frame);
  if (!document.hidden && active && !reducedMotion) frame = requestAnimationFrame(animate);
});
window.addEventListener("resize", () => drawMesh());
drawMesh();

if (!reducedMotion) {
  const revealGroups = [
    { selector: ".ascii-banner", className: "reveal-scan" },
    { selector: ".technical-focus, .kitchen-model-shell, .explorer-shell, .stream-terminal, .rescue-diff, .ledger-table", className: "reveal-depth" },
    { selector: ".about-grid article, .about-proof p, .skill-axes button, .kitchen-outcomes > div, .pinger-primitives > div, .rescue-stages li, .ledger-row:not(.ledger-header), .note-ticket, .history-line li", className: "reveal-item" }
  ];
  const revealElements = [];
  revealGroups.forEach(({ selector, className }) => {
    document.querySelectorAll(selector).forEach((element, index) => {
      element.classList.add(className);
      element.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 70}ms`);
      revealElements.push(element);
    });
  });
  document.documentElement.classList.add("motion-ready");
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const hasEnteredReadingPath = entry.isIntersecting || entry.boundingClientRect.top < window.innerHeight * .92;
      if (!hasEnteredReadingPath) return;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -8%", threshold: .08 });
  revealElements.forEach((element) => revealObserver.observe(element));
}

const skillsCanvas = document.querySelector("#skills-4d-canvas");
const skillsStage = document.querySelector(".skills-4d-stage");
const skillsContext = skillsCanvas.getContext("2d", { alpha: false });
const skillButtons = [...document.querySelectorAll("[data-skill-axis]")];
const skillDimensions = { go: 0, next: 1, infra: 2, beam: 3 };
const skillLabels = { beam: "AXIS_W / ELIXIR + BEAM + OTP", go: "AXIS_X / GOLANG", next: "AXIS_Y / NEXT.JS + REACT", infra: "AXIS_Z / INFRASTRUCTURE + PYTHON" };
const hyperVertices = Array.from({ length: 16 }, (_, index) => [0, 1, 2, 3].map((dimension) => ((index >> dimension) & 1) ? 1 : -1));
const hyperEdges = [];
for (let from = 0; from < hyperVertices.length; from += 1) {
  for (let dimension = 0; dimension < 4; dimension += 1) {
    const to = from ^ (1 << dimension);
    if (from < to) hyperEdges.push({ from, to, dimension });
  }
}
let selectedSkill = "beam";
let skillsFrame = 0;
let skillsVisible = true;

function rotatePlane(vector, first, second, angle) {
  const cosine = Math.cos(angle);
  const sine = Math.sin(angle);
  const a = vector[first];
  const b = vector[second];
  vector[first] = a * cosine - b * sine;
  vector[second] = a * sine + b * cosine;
}

function transform4d(vertex, time) {
  const vector = [...vertex];
  const speed = reducedMotion ? 0 : time * .00018;
  rotatePlane(vector, 0, 3, .58 + speed);
  rotatePlane(vector, 1, 3, -.32 + speed * .71);
  rotatePlane(vector, 0, 2, .36 + speed * .43);
  rotatePlane(vector, 1, 2, -.24 + speed * .29);
  const fourScale = 3.2 / (4.2 - vector[3]);
  return { x: vector[0] * fourScale, y: vector[1] * fourScale, z: vector[2] * fourScale, w: vector[3] };
}

function projectSkill(point, width, height) {
  const depth = 4.8 + point.z;
  const scale = Math.min(width, height) * .54 / depth;
  return { x: width / 2 + point.x * scale * 3.7, y: height / 2 + point.y * scale * 3.7, z: point.z, w: point.w };
}

function drawSkills4d(time = 0) {
  const rect = skillsStage.getBoundingClientRect();
  const ratio = Math.min(devicePixelRatio || 1, 2);
  const width = Math.max(1, Math.floor(rect.width));
  const height = Math.max(1, Math.floor(rect.height));
  if (skillsCanvas.width !== width * ratio || skillsCanvas.height !== height * ratio) {
    skillsCanvas.width = width * ratio;
    skillsCanvas.height = height * ratio;
    skillsCanvas.style.width = `${width}px`;
    skillsCanvas.style.height = `${height}px`;
  }
  skillsContext.setTransform(ratio, 0, 0, ratio, 0, 0);
  skillsContext.fillStyle = "#050505";
  skillsContext.fillRect(0, 0, width, height);
  skillsContext.fillStyle = "#ffffff";
  skillsContext.textAlign = "center";
  skillsContext.textBaseline = "middle";
  const projected = hyperVertices.map((vertex) => projectSkill(transform4d(vertex, time), width, height));
  const activeDimension = skillDimensions[selectedSkill];

  hyperEdges.sort((a, b) => {
    const depthA = projected[a.from].z + projected[a.to].z;
    const depthB = projected[b.from].z + projected[b.to].z;
    return depthA - depthB;
  }).forEach((edge) => {
    const start = projected[edge.from];
    const end = projected[edge.to];
    const activeEdge = edge.dimension === activeDimension;
    const steps = activeEdge ? 18 : 12;
    skillsContext.font = `${activeEdge ? 13 : 10}px ${getComputedStyle(document.documentElement).getPropertyValue('--mono')}`;
    for (let step = 0; step <= steps; step += 1) {
      const amount = step / steps;
      const x = start.x + (end.x - start.x) * amount;
      const y = start.y + (end.y - start.y) * amount;
      const depth = start.z + (end.z - start.z) * amount;
      skillsContext.globalAlpha = activeEdge ? .95 : Math.max(.12, .35 + depth * .14);
      skillsContext.fillText(activeEdge ? (step % 2 ? "#" : "=") : (step % 3 ? "." : "+"), x, y);
    }
  });

  projected.forEach((point, index) => {
    skillsContext.globalAlpha = .9;
    skillsContext.font = `700 11px ${getComputedStyle(document.documentElement).getPropertyValue('--mono')}`;
    skillsContext.fillText(index.toString(16).toUpperCase(), point.x, point.y);
  });
  skillsContext.globalAlpha = 1;
}

function animateSkills(time) {
  if (!skillsVisible || document.hidden || reducedMotion) return;
  drawSkills4d(time);
  skillsFrame = requestAnimationFrame(animateSkills);
}

skillButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedSkill = button.dataset.skillAxis;
    skillButtons.forEach((candidate) => {
      const selected = candidate === button;
      candidate.classList.toggle("is-active", selected);
      candidate.setAttribute("aria-pressed", String(selected));
    });
    document.querySelector("#skills-axis-readout").textContent = skillLabels[selectedSkill];
    drawSkills4d(performance.now());
  });
});

const skillsObserver = new IntersectionObserver(([entry]) => {
  skillsVisible = entry.isIntersecting;
  cancelAnimationFrame(skillsFrame);
  if (skillsVisible) {
    if (reducedMotion) drawSkills4d();
    else skillsFrame = requestAnimationFrame(animateSkills);
  }
}, { threshold: .01 });
skillsObserver.observe(skillsStage);
document.addEventListener("visibilitychange", () => {
  cancelAnimationFrame(skillsFrame);
  if (!document.hidden && skillsVisible && !reducedMotion) skillsFrame = requestAnimationFrame(animateSkills);
});
window.addEventListener("resize", () => drawSkills4d(performance.now()));
drawSkills4d();

const kitchenCanvas = document.querySelector("#kitchen-3d-canvas");
const kitchenStage = document.querySelector(".kitchen-model-shell");
const kitchenContext = kitchenCanvas.getContext("2d", { alpha: false });
const kitchenButtons = [...document.querySelectorAll("[data-kitchen-view]")];
const kitchenViews = {
  local: ["HOME_K8S / PHYSICAL KITCHEN NODE", "The kitchen node carries normal production compute and serves real B2B traffic without a standing cloud compute bill."],
  tunnel: ["INGRESS / CLOUDFLARE TUNNEL", "Cloudflare tunnels expose the service without opening inbound ports on the home network."],
  master: ["CONTROL_PLANE / FREE AZURE MASTER", "A free Azure master controls scheduling and cluster state while the workload normally runs at home."],
  failover: ["FAILOVER / PAYG PODS ON DEMAND", "If the kitchen node disappears, cloud pods spin up only for the outage and shut down when home returns."],
  critical: ["CRITICAL_PATH / VERCEL + SERVERLESS", "Transactions and mission-critical operations stay on managed serverless infrastructure, isolated from home availability."]
};
const kitchenObjects = [
  { key: "counter", label: "KITCHEN_COUNTER", x: 0, y: -1.45, z: 0, width: 4.2, height: .35, depth: 2.1 },
  { key: "local", label: "HOME_K8S", x: 0, y: -.25, z: 0, width: 1.5, height: 2.05, depth: 1.15 },
  { key: "master", label: "AZURE_MASTER_FREE", x: -.25, y: 2.05, z: -1.05, width: 1.75, height: .55, depth: .7 },
  { key: "failover", label: "PAYG_PODS", x: 2.65, y: .2, z: -.75, width: 1.65, height: 1.15, depth: .9 },
  { key: "critical", label: "VERCEL_SERVERLESS", x: 2.35, y: -1.05, z: 1.35, width: 1.9, height: .6, depth: .75 }
];
const kitchenLinks = [
  { key: "tunnel", from: { x: -3.6, y: .25, z: .75 }, to: { x: -.75, y: 0, z: .35 }, label: "CF_TUNNEL" },
  { key: "master", from: { x: -.25, y: 1.8, z: -.85 }, to: { x: 0, y: .78, z: -.35 }, label: "CONTROL" },
  { key: "failover", from: { x: .75, y: 0, z: -.35 }, to: { x: 1.85, y: .2, z: -.65 }, label: "ON_FAILURE" },
  { key: "critical", from: { x: -3.6, y: -.45, z: 1.1 }, to: { x: 1.4, y: -.9, z: 1.25 }, label: "TX_PATH" }
];
let kitchenView = "local";
let kitchenRotationX = -.18;
let kitchenRotationY = -.52;
let kitchenTargetX = kitchenRotationX;
let kitchenTargetY = kitchenRotationY;
let kitchenDragging = false;
let kitchenPointer = null;
let kitchenVisible = true;
let kitchenFrame = 0;

function kitchenRotate(point) {
  const cosY = Math.cos(kitchenRotationY);
  const sinY = Math.sin(kitchenRotationY);
  const x1 = point.x * cosY - point.z * sinY;
  const z1 = point.x * sinY + point.z * cosY;
  const cosX = Math.cos(kitchenRotationX);
  const sinX = Math.sin(kitchenRotationX);
  return { x: x1, y: point.y * cosX - z1 * sinX, z: point.y * sinX + z1 * cosX };
}

function kitchenProject(point, width, height) {
  const depth = 8.4 + point.z;
  const scale = Math.min(width / 8.2, height / 5.8) * 8.4 / depth;
  return { x: width / 2 + point.x * scale, y: height / 2 - point.y * scale, z: point.z };
}

function cubeCorners(cube) {
  const corners = [];
  [-1, 1].forEach((x) => [-1, 1].forEach((y) => [-1, 1].forEach((z) => corners.push({
    x: cube.x + x * cube.width / 2,
    y: cube.y + y * cube.height / 2,
    z: cube.z + z * cube.depth / 2
  }))));
  return corners;
}

const cubeEdgePairs = [];
for (let first = 0; first < 8; first += 1) {
  for (let second = first + 1; second < 8; second += 1) {
    if ((first ^ second) === 1 || (first ^ second) === 2 || (first ^ second) === 4) cubeEdgePairs.push([first, second]);
  }
}

function drawKitchenSegment(start, end, width, height, activeLine, character = ".") {
  const from = kitchenProject(kitchenRotate(start), width, height);
  const to = kitchenProject(kitchenRotate(end), width, height);
  const steps = activeLine ? 22 : 14;
  kitchenContext.font = `${activeLine ? 12 : 9}px ${getComputedStyle(document.documentElement).getPropertyValue('--mono')}`;
  for (let step = 0; step <= steps; step += 1) {
    const amount = step / steps;
    kitchenContext.globalAlpha = activeLine ? .95 : .22;
    kitchenContext.fillText(activeLine && step % 3 === 0 ? "#" : character, from.x + (to.x - from.x) * amount, from.y + (to.y - from.y) * amount);
  }
}

function drawKitchen(time = 0) {
  const rect = kitchenStage.getBoundingClientRect();
  const ratio = Math.min(devicePixelRatio || 1, 2);
  const width = Math.max(1, Math.floor(rect.width));
  const height = Math.max(1, Math.floor(rect.height));
  if (kitchenCanvas.width !== width * ratio || kitchenCanvas.height !== height * ratio) {
    kitchenCanvas.width = width * ratio;
    kitchenCanvas.height = height * ratio;
    kitchenCanvas.style.width = `${width}px`;
    kitchenCanvas.style.height = `${height}px`;
  }
  kitchenContext.setTransform(ratio, 0, 0, ratio, 0, 0);
  kitchenContext.fillStyle = "#050505";
  kitchenContext.fillRect(0, 0, width, height);
  kitchenContext.fillStyle = "#ffffff";
  kitchenContext.textAlign = "center";
  kitchenContext.textBaseline = "middle";

  for (let grid = -4; grid <= 4; grid += 1) {
    drawKitchenSegment({ x: grid, y: -1.7, z: -2.6 }, { x: grid, y: -1.7, z: 2.6 }, width, height, false, ".");
    drawKitchenSegment({ x: -4, y: -1.7, z: grid * .65 }, { x: 4, y: -1.7, z: grid * .65 }, width, height, false, ".");
  }

  kitchenObjects.forEach((cube) => {
    const activeCube = kitchenView === "local" ? ["counter", "local"].includes(cube.key) : cube.key === kitchenView;
    const corners = cubeCorners(cube);
    cubeEdgePairs.forEach(([from, to]) => drawKitchenSegment(corners[from], corners[to], width, height, activeCube, activeCube ? "=" : "."));
    const labelPoint = kitchenProject(kitchenRotate({ x: cube.x, y: cube.y + cube.height / 2 + .28, z: cube.z }), width, height);
    kitchenContext.globalAlpha = activeCube ? 1 : .3;
    kitchenContext.font = `700 ${width < 600 ? 8 : 10}px ${getComputedStyle(document.documentElement).getPropertyValue('--mono')}`;
    kitchenContext.fillText(`[${cube.label}]`, labelPoint.x, labelPoint.y);
  });

  kitchenLinks.forEach((link) => {
    const activeLink = kitchenView === link.key;
    drawKitchenSegment(link.from, link.to, width, height, activeLink, activeLink ? "~" : ":");
    const midpoint = { x: (link.from.x + link.to.x) / 2, y: (link.from.y + link.to.y) / 2 + .22, z: (link.from.z + link.to.z) / 2 };
    const labelPoint = kitchenProject(kitchenRotate(midpoint), width, height);
    kitchenContext.globalAlpha = activeLink ? 1 : .25;
    kitchenContext.font = `700 9px ${getComputedStyle(document.documentElement).getPropertyValue('--mono')}`;
    kitchenContext.fillText(link.label, labelPoint.x, labelPoint.y);
  });

  const activeLink = kitchenLinks.find((link) => link.key === kitchenView) || kitchenLinks[0];
  if (!reducedMotion) {
    const progress = (time % 2300) / 2300;
    const packet = {
      x: activeLink.from.x + (activeLink.to.x - activeLink.from.x) * progress,
      y: activeLink.from.y + (activeLink.to.y - activeLink.from.y) * progress,
      z: activeLink.from.z + (activeLink.to.z - activeLink.from.z) * progress
    };
    const point = kitchenProject(kitchenRotate(packet), width, height);
    kitchenContext.globalAlpha = 1;
    kitchenContext.font = `700 16px ${getComputedStyle(document.documentElement).getPropertyValue('--mono')}`;
    kitchenContext.fillText("◆", point.x, point.y);
  }
  kitchenContext.globalAlpha = 1;
}

function animateKitchen(time) {
  if (!kitchenVisible || document.hidden || reducedMotion) return;
  if (!kitchenDragging) kitchenTargetY += .00045;
  kitchenRotationX += (kitchenTargetX - kitchenRotationX) * .06;
  kitchenRotationY += (kitchenTargetY - kitchenRotationY) * .06;
  drawKitchen(time);
  kitchenFrame = requestAnimationFrame(animateKitchen);
}

kitchenStage.addEventListener("pointerdown", (event) => {
  if (event.target.closest("button, a")) return;
  event.preventDefault();               // stop the drag becoming a text selection
  kitchenDragging = true;
  kitchenPointer = { x: event.clientX, y: event.clientY };
  try { kitchenStage.setPointerCapture(event.pointerId); } catch (_) {}
});
kitchenStage.addEventListener("pointermove", (event) => {
  if (!kitchenDragging) return;
  kitchenTargetY += (event.clientX - kitchenPointer.x) * .008;
  kitchenTargetX += (event.clientY - kitchenPointer.y) * .006;
  kitchenPointer = { x: event.clientX, y: event.clientY };
  if (reducedMotion) {
    kitchenRotationX = kitchenTargetX;
    kitchenRotationY = kitchenTargetY;
    drawKitchen();
  }
});
kitchenStage.addEventListener("pointerup", () => { kitchenDragging = false; });
kitchenStage.addEventListener("pointercancel", () => { kitchenDragging = false; });

kitchenButtons.forEach((button) => {
  button.addEventListener("click", () => {
    kitchenView = button.dataset.kitchenView;
    kitchenButtons.forEach((candidate) => {
      const selected = candidate === button;
      candidate.classList.toggle("is-active", selected);
      candidate.setAttribute("aria-pressed", String(selected));
    });
    document.querySelector("#kitchen-readout").textContent = kitchenViews[kitchenView][0];
    document.querySelector("#kitchen-description").textContent = kitchenViews[kitchenView][1];
    drawKitchen(performance.now());
  });
});

const kitchenObserver = new IntersectionObserver(([entry]) => {
  kitchenVisible = entry.isIntersecting;
  cancelAnimationFrame(kitchenFrame);
  if (kitchenVisible) {
    if (reducedMotion) drawKitchen();
    else kitchenFrame = requestAnimationFrame(animateKitchen);
  }
}, { threshold: .01 });
kitchenObserver.observe(kitchenStage);
document.addEventListener("visibilitychange", () => {
  cancelAnimationFrame(kitchenFrame);
  if (!document.hidden && kitchenVisible && !reducedMotion) kitchenFrame = requestAnimationFrame(animateKitchen);
});
window.addEventListener("resize", () => drawKitchen(performance.now()));
drawKitchen();

/* ---------------------------------------------------------------------------
   Liquid inversion field
   A mercury-like mass of connected fluid nodes trails the pointer on a fixed
   full-viewport canvas. Each node is a lobed opaque polygon; consecutive nodes
   are bridged with a quad so the mass stays one continuous SOLID body, while
   the trailing lag and the rim's noise warp make it read as LIQUID.
   `mix-blend-mode: difference` turns everything it covers into the page's
   photographic negative.
   It follows the bare cursor at a small ambient size and swells while an ASCII
   volume is dragged. It paints only while the pointer is moving (or during the
   short dissipation once it stops); a resting cursor leaves no mark and the
   canvas clears to zero cost.
   Reduced motion: a hard inverted disc snaps to the pointer, no trail, no
   ripple. Capture mode: the canvas is hidden by CSS and never armed.
--------------------------------------------------------------------------- */
(() => {
  const field = document.querySelector("#drag-field");
  if (!field) return;
  const fieldCtx = field.getContext("2d");
  // A fullscreen `difference`-blend canvas re-composites the page each frame;
  // keep the backing store modest so that stays cheap.
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

  const NODES = 7;
  const chain = [];            // {x,y} trail samples, head = pointer
  // The mercury mass is speed-driven: a small bead when the cursor is slow or
  // still, swelling toward R_MAX as it moves faster. A volume drag raises the
  // floor so it stays substantial while you rotate.
  const R_MIN = 30;
  const R_DRAG_FLOOR = 150;
  const R_MAX = 250;
  const SPEED_TO_R = 6.5;      // px of radius per px/frame of pointer speed
  let speedEMA = 0;            // smoothed pointer speed
  const IDLE_HIDE = 900;       // ms of pointer stillness before it dissipates
  let radius = 0, radiusTarget = 0;
  let wob = Math.random() * 6.28;
  let held = 0;                // volumes currently grabbed
  let lastMoveAt = 0;
  let raf = 0;
  let running = false;
  let seeded = false;

  // The canvas is a compact roaming tile, not the whole viewport: only its own
  // footprint pays the `difference` composite cost. It is repositioned each
  // frame so it hugs the mass; drawing happens in tile-local coordinates.
  const TILE = 840;                       // CSS px; chain span is clamped to fit
  let tileX = 0, tileY = 0;               // tile's top-left in viewport CSS px
  field.width = Math.round(TILE * dpr);
  field.height = Math.round(TILE * dpr);
  field.style.width = TILE + "px";
  field.style.height = TILE + "px";
  fieldCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

  function seed(x, y) {
    chain.length = 0;
    for (let i = 0; i < NODES; i += 1) chain.push({ x, y });
  }

  function start() {
    if (running) return;
    running = true;
    field.classList.add("is-live");
    raf = requestAnimationFrame(tick);
  }

  function stop() {
    running = false;
    cancelAnimationFrame(raf);
    field.classList.remove("is-live");
    fieldCtx.clearRect(0, 0, TILE, TILE);
  }

  function metaball() {
    // Recentre the tile on the mass's bounding box and park it via transform,
    // clamped to the viewport so it never introduces scroll.
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    const rad = [];
    for (let i = 0; i < chain.length; i += 1) {
      const taper = 1 - (i / chain.length) * 0.62;
      const swell = 1 + Math.sin(wob * 1.6 + i * 1.4) * 0.12;
      const r = Math.max(5, radius * taper * swell);
      rad[i] = r;
      minX = Math.min(minX, chain[i].x - r);
      minY = Math.min(minY, chain[i].y - r);
      maxX = Math.max(maxX, chain[i].x + r);
      maxY = Math.max(maxY, chain[i].y + r);
    }
    const cx = (minX + maxX) / 2;
    const cy = (minY + maxY) / 2;
    tileX = Math.round(cx - TILE / 2);
    tileY = Math.round(cy - TILE / 2);
    field.style.transform = `translate(${tileX}px, ${tileY}px)`;

    // Full clear of the tile every frame — no residual trail. Draw in
    // tile-local coordinates (viewport coord minus tile origin).
    fieldCtx.clearRect(0, 0, TILE, TILE);
    fieldCtx.fillStyle = "#fff";
    const P = chain.map((n) => ({ x: n.x - tileX, y: n.y - tileY }));

    // 1. Bridge consecutive nodes with a filled quad along the perpendicular
    //    of the segment — keeps the mass a single continuous solid, no gaps
    //    between lobes even at speed.
    for (let i = 0; i < P.length - 1; i += 1) {
      const a = P[i];
      const b = P[i + 1];
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const len = Math.hypot(dx, dy) || 1;
      const nx = -dy / len;
      const ny = dx / len;
      fieldCtx.beginPath();
      fieldCtx.moveTo(a.x + nx * rad[i], a.y + ny * rad[i]);
      fieldCtx.lineTo(b.x + nx * rad[i + 1], b.y + ny * rad[i + 1]);
      fieldCtx.lineTo(b.x - nx * rad[i + 1], b.y - ny * rad[i + 1]);
      fieldCtx.lineTo(a.x - nx * rad[i], a.y - ny * rad[i]);
      fieldCtx.closePath();
      fieldCtx.fill();
    }

    // 2. A lobed opaque polygon at each node. Hard edge by construction; a
    //    two-term noise warp on the rim is the liquid ripple. Solid body,
    //    liquid boundary.
    for (let i = 0; i < P.length; i += 1) {
      const node = P[i];
      const r = rad[i];
      fieldCtx.beginPath();
      const segs = 30;
      for (let s = 0; s <= segs; s += 1) {
        const ang = (s / segs) * 6.283185;
        const warp = 1
          + Math.sin(ang * 3 + wob * 2 + i) * 0.06
          + Math.sin(ang * 6 - wob * 1.5 + i * 2) * 0.03;
        const rr = r * warp;
        const px = node.x + Math.cos(ang) * rr;
        const py = node.y + Math.sin(ang) * rr;
        if (s === 0) fieldCtx.moveTo(px, py);
        else fieldCtx.lineTo(px, py);
      }
      fieldCtx.closePath();
      fieldCtx.fill();
    }
  }

  function tick() {
    if (!running) return;

    if (reducedMotion) {
      // Static hard disc snapped to the pointer, no trail, no ripple.
      fieldCtx.clearRect(0, 0, TILE, TILE);
      if (radiusTarget > 0 && chain[0]) {
        tileX = Math.round(chain[0].x - TILE / 2);
        tileY = Math.round(chain[0].y - TILE / 2);
        field.style.transform = `translate(${tileX}px, ${tileY}px)`;
        fieldCtx.fillStyle = "#fff";
        fieldCtx.beginPath();
        fieldCtx.arc(TILE / 2, TILE / 2, R_DRAG_FLOOR, 0, 6.283185);
        fieldCtx.fill();
        raf = requestAnimationFrame(tick);
      } else {
        stop();
      }
      return;
    }

    // Each node chases the one ahead, and is clamped so the gap to its leader
    // never exceeds a bound — the mass stretches under a fast drag but stays
    // continuous AND stays within the roaming tile (no clip, no blob tearing).
    const maxGap = Math.min(radius * 0.6, (TILE * 0.9) / chain.length);
    for (let i = 1; i < chain.length; i += 1) {
      const lead = chain[i - 1];
      const node = chain[i];
      node.x += (lead.x - node.x) * 0.42;
      node.y += (lead.y - node.y) * 0.42;
      const dx = node.x - lead.x;
      const dy = node.y - lead.y;
      const d = Math.hypot(dx, dy);
      if (d > maxGap && d > 0) {
        const pull = (d - maxGap) / d;
        node.x -= dx * pull;
        node.y -= dy * pull;
      }
    }
    // Between pointer samples, bleed the smoothed speed toward zero so the
    // mass shrinks the moment the cursor slows — size tracks live velocity.
    speedEMA *= 0.86;
    if (held === 0) {
      const still = performance.now() - lastMoveAt;
      if (still > IDLE_HIDE) radiusTarget = 0;
      else radiusTarget = Math.max(R_MIN, Math.min(R_MIN + speedEMA * SPEED_TO_R, R_MAX));
    }
    radius += (radiusTarget - radius) * 0.16;
    wob += 0.05;

    if (radius > 1) {
      metaball();
      raf = requestAnimationFrame(tick);
    } else {
      stop();
    }
  }

  // Pointer moved anywhere on the page: the mercury mass follows it, its size
  // set by how fast the cursor is travelling.
  function point(clientX, clientY, speed) {
    lastMoveAt = performance.now();
    if (!seeded || !running) {
      seed(clientX, clientY);
      seeded = true;
      radius = radius > 1 ? radius : R_MIN;
    }
    chain[0].x = clientX;
    chain[0].y = clientY;
    speedEMA += ((speed || 0) - speedEMA) * 0.35;
    const floor = held > 0 ? R_DRAG_FLOOR : R_MIN;
    radiusTarget = Math.max(floor, Math.min(R_MIN + speedEMA * SPEED_TO_R, R_MAX));
    start();
  }
  // A volume was grabbed / released: the mass swells while held, and the OS
  // cursor is hidden page-wide so the mass alone stands in for the pointer.
  function grab() {
    held += 1;
    document.body.classList.add("field-dragging");
  }
  function release() {
    held = Math.max(0, held - 1);
    if (held === 0) {
      radiusTarget = R_MIN;
      document.body.classList.remove("field-dragging");
    }
  }

  window.__dragField = { point, grab, release };

  // Ambient driver: every pointer move on the document feeds the mass.
  let last = null;
  window.addEventListener("pointermove", (event) => {
    if (event.pointerType === "touch") return; // touch drives via volume only
    const speed = last ? Math.hypot(event.clientX - last.x, event.clientY - last.y) : 0;
    last = { x: event.clientX, y: event.clientY };
    point(event.clientX, event.clientY, speed);
  }, { passive: true });
})();

// A volume drag swells the mass; the ambient driver already tracks position.
(() => {
  const f = window.__dragField;
  if (!f) return;

  function bind(el) {
    if (!el) return;
    let active = false;
    const start = (event) => {
      if (event.target.closest("button, a") || event.pointerType === "touch") return;
      active = true;
      f.grab();
      f.point(event.clientX, event.clientY, 0);
    };
    const end = () => { if (active) { active = false; f.release(); } };
    el.addEventListener("pointerdown", start);
    el.addEventListener("pointermove", (event) => {
      if (event.pointerType === "touch" || !active) return;
      f.point(event.clientX, event.clientY, 0);
    });
    el.addEventListener("pointerup", end);
    el.addEventListener("pointercancel", end);
    el.addEventListener("lostpointercapture", end);
  }

  bind(document.querySelector(".ascii-volume"));
  bind(document.querySelector(".kitchen-model-shell"));
})();

"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { sections } from "@/data/sections";

type DepthStageProps = {
  activeIndex: number;
  accentColor: string;
  reduced?: boolean | null;
};

type SceneNode = {
  mesh: THREE.Mesh<THREE.BoxGeometry, THREE.MeshStandardMaterial>;
  halo: THREE.Mesh<THREE.RingGeometry, THREE.MeshBasicMaterial>;
  base: THREE.Vector3;
  sectionIndex: number;
};

type StarField = {
  geometry: THREE.BufferGeometry;
  material: THREE.PointsMaterial;
  points: THREE.Points;
  speeds: Float32Array;
};

type AccentMaterial =
  | THREE.LineBasicMaterial
  | THREE.MeshBasicMaterial
  | THREE.MeshStandardMaterial;

export function DepthStage({
  activeIndex,
  accentColor,
  reduced = false,
}: DepthStageProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const latestRef = useRef({
    activeIndex,
    accentColor,
    reduced: Boolean(reduced),
    pointerX: 0,
    pointerY: 0,
  });

  useEffect(() => {
    latestRef.current.activeIndex = activeIndex;
    latestRef.current.accentColor = accentColor;
    latestRef.current.reduced = Boolean(reduced);
  }, [activeIndex, accentColor, reduced]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    if (!canCreateWebGLContext()) return;

    let animationFrame = 0;
    const isSmallScreen = window.innerWidth < 768;
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x02030a, 0.027);

    const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 90);
    camera.position.set(-0.85, 0.05, 11);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        preserveDrawingBuffer: false,
      });
    } catch {
      return;
    }
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.dataset.depthStage = "true";
    mount.appendChild(renderer.domElement);

    const root = new THREE.Group();
    scene.add(root);

    const accent = new THREE.Color(latestRef.current.accentColor);
    const ambient = new THREE.AmbientLight(0x7a88a8, 0.38);
    const keyLight = new THREE.PointLight(accent, 6.2, 24);
    keyLight.position.set(4.4, 2.6, 6);
    const rimLight = new THREE.PointLight(0xffffff, 1.8, 20);
    rimLight.position.set(-4, -2, 4);
    scene.add(ambient, keyLight, rimLight);

    const accentMaterials: AccentMaterial[] = [];
    const starField = createStarField(scene, isSmallScreen ? 80 : 220);
    const workspace = createProductWorkspace(root, accent, accentMaterials);
    const focusFrames = createFocusFrames(root, accent, accentMaterials);
    const nodes = createProjectNodes(root);

    function resize() {
      const { innerWidth, innerHeight, devicePixelRatio } = window;
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(devicePixelRatio, 1.25));
      renderer.setSize(innerWidth, innerHeight);
    }

    function handlePointerMove(event: PointerEvent) {
      latestRef.current.pointerX = event.clientX / window.innerWidth - 0.5;
      latestRef.current.pointerY = event.clientY / window.innerHeight - 0.5;
    }

    function handleContextLost(event: Event) {
      event.preventDefault();
      window.cancelAnimationFrame(animationFrame);
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    renderer.domElement.addEventListener("webglcontextlost", handleContextLost);

    let lastFrameTime = performance.now();
    let elapsedTime = 0;

    function animate() {
      const now = performance.now();
      const delta = Math.min((now - lastFrameTime) / 1000, 0.05);
      lastFrameTime = now;
      elapsedTime += delta;
      const latest = latestRef.current;
      const nextAccent = new THREE.Color(latest.accentColor);
      accent.lerp(nextAccent, 0.08);

      keyLight.color.copy(accent);
      keyLight.intensity = THREE.MathUtils.lerp(
        keyLight.intensity,
        latest.reduced ? 3.4 : 6.2,
        0.05
      );

      for (const material of accentMaterials) {
        material.color.lerp(accent, 0.08);
      }

      const activeDepth = latest.activeIndex * 0.74;
      const pointerX = latest.reduced ? 0 : latest.pointerX;
      const pointerY = latest.reduced ? 0 : latest.pointerY;

      camera.position.x = THREE.MathUtils.lerp(
        camera.position.x,
        (isSmallScreen ? 0 : -0.8) + pointerX * 1.15,
        0.035
      );
      camera.position.y = THREE.MathUtils.lerp(
        camera.position.y,
        -pointerY * 0.85,
        0.035
      );
      camera.position.z = THREE.MathUtils.lerp(
        camera.position.z,
        10.9 - Math.min(latest.activeIndex, 6) * 0.08,
        0.028
      );
      camera.lookAt(0.35 + pointerX * 0.45, -0.05 - pointerY * 0.3, -5);

      root.position.z = THREE.MathUtils.lerp(root.position.z, activeDepth, 0.03);
      root.rotation.x = THREE.MathUtils.lerp(
        root.rotation.x,
        pointerY * 0.05,
        0.04
      );
      root.rotation.y = THREE.MathUtils.lerp(
        root.rotation.y,
        pointerX * 0.08 + latest.activeIndex * 0.012,
        0.04
      );

      workspace.rotation.y = THREE.MathUtils.lerp(
        workspace.rotation.y,
        -0.08 + pointerX * 0.045,
        0.035
      );
      workspace.position.y = THREE.MathUtils.lerp(
        workspace.position.y,
        pointerY * 0.16,
        0.035
      );
      focusFrames.rotation.y = THREE.MathUtils.lerp(
        focusFrames.rotation.y,
        -0.18 + pointerX * 0.1,
        0.04
      );
      focusFrames.rotation.x = THREE.MathUtils.lerp(
        focusFrames.rotation.x,
        0.04 - pointerY * 0.08,
        0.04
      );

      animateStars(starField, delta, latest.reduced);
      animateNodes(nodes, latest.activeIndex, elapsedTime, latest.reduced);

      renderer.render(scene, camera);
      animationFrame = window.requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      renderer.domElement.removeEventListener(
        "webglcontextlost",
        handleContextLost
      );
      mount.removeChild(renderer.domElement);
      disposeScene(scene);
      renderer.dispose();
      renderer.forceContextLoss();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 z-[2] pointer-events-none opacity-45 md:opacity-100"
      style={{
        maskImage:
          "linear-gradient(to right, rgba(0,0,0,0.58), rgba(0,0,0,1) 30%, rgba(0,0,0,1))",
        WebkitMaskImage:
          "linear-gradient(to right, rgba(0,0,0,0.58), rgba(0,0,0,1) 30%, rgba(0,0,0,1))",
      }}
      aria-hidden="true"
    />
  );
}

function createStarField(scene: THREE.Scene, count: number): StarField {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const speeds = new Float32Array(count);

  for (let i = 0; i < count; i += 1) {
    const stride = i * 3;
    positions[stride] = randomBetween(-18, 18);
    positions[stride + 1] = randomBetween(-10, 10);
    positions[stride + 2] = randomBetween(-52, 8);
    speeds[i] = randomBetween(0.02, 0.12);
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const material = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.024,
    transparent: true,
    opacity: 0.32,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const points = new THREE.Points(geometry, material);
  scene.add(points);

  return { geometry, material, points, speeds };
}

function createProductWorkspace(
  root: THREE.Group,
  accent: THREE.Color,
  accentMaterials: AccentMaterial[]
) {
  const workspace = new THREE.Group();
  workspace.position.set(0.72, -0.08, -4.1);
  root.add(workspace);

  const gridPoints: number[] = [];
  for (let x = -5; x <= 6; x += 1) {
    gridPoints.push(x, -2.38, 2.2, x, -2.38, -14);
  }
  for (let z = 2; z >= -14; z -= 1) {
    gridPoints.push(-5.4, -2.38, z, 6.4, -2.38, z);
  }
  const gridGeometry = new THREE.BufferGeometry();
  gridGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(gridPoints, 3)
  );
  const gridMaterial = new THREE.LineBasicMaterial({
    color: accent,
    transparent: true,
    opacity: 0.055,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const grid = new THREE.LineSegments(gridGeometry, gridMaterial);
  grid.rotation.x = -0.04;
  workspace.add(grid);
  accentMaterials.push(gridMaterial);

  for (let i = 0; i < 5; i += 1) {
    const panel = new THREE.Group();
    panel.position.set(1.5 + i * 0.18, 0.18 - i * 0.04, -1.4 - i * 1.24);
    panel.rotation.y = -0.18;
    panel.rotation.x = 0.025;

    const fillMaterial = new THREE.MeshBasicMaterial({
      color: 0x07111d,
      transparent: true,
      opacity: 0.09 - i * 0.009,
      depthWrite: false,
    });
    const fill = new THREE.Mesh(new THREE.BoxGeometry(4.45, 2.54, 0.035), fillMaterial);
    panel.add(fill);

    const edgeMaterial = new THREE.LineBasicMaterial({
      color: accent,
      transparent: true,
      opacity: 0.18 - i * 0.018,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const edge = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.BoxGeometry(4.45, 2.54, 0.035)),
      edgeMaterial
    );
    panel.add(edge);

    const detailMaterial = new THREE.MeshBasicMaterial({
      color: accent,
      transparent: true,
      opacity: 0.12 - i * 0.011,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    addInterfaceBar(panel, detailMaterial, -1.72, 0.88, 0.72, 0.055);
    addInterfaceBar(panel, detailMaterial, -1.72, 0.68, 1.15, 0.035);
    addInterfaceBar(panel, detailMaterial, -0.35, 0.68, 1.35, 0.035);
    addInterfaceBar(panel, detailMaterial, -1.72, 0.28, 0.88, 0.32);
    addInterfaceBar(panel, detailMaterial, -0.58, 0.28, 0.88, 0.32);
    addInterfaceBar(panel, detailMaterial, 0.56, 0.28, 0.88, 0.32);
    addInterfaceBar(panel, detailMaterial, -1.72, -0.34, 2.8, 0.055);
    addInterfaceBar(panel, detailMaterial, -1.72, -0.56, 2.25, 0.04);

    workspace.add(panel);
    accentMaterials.push(edgeMaterial, detailMaterial);
  }

  for (let i = 0; i < 6; i += 1) {
    const y = 1.38 - i * 0.42;
    const z = -0.5 - i * 1.18;
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(
        [-3.1, y, z, -0.6, y + 0.04, z - 0.42, 2.7, y - 0.02, z - 0.84],
        3
      )
    );
    const material = new THREE.MeshBasicMaterial({
      color: accent,
      transparent: true,
      opacity: 0.11,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const lineMaterial = new THREE.LineBasicMaterial({
      color: accent,
      transparent: true,
      opacity: 0.13,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const line = new THREE.Line(geometry, lineMaterial);
    workspace.add(line);

    const pulse = new THREE.Mesh(new THREE.SphereGeometry(0.035, 12, 12), material);
    pulse.position.set(-0.6, y + 0.04, z - 0.42);
    workspace.add(pulse);
    accentMaterials.push(material);
    accentMaterials.push(lineMaterial);
  }

  return workspace;
}

function addInterfaceBar(
  panel: THREE.Group,
  material: THREE.MeshBasicMaterial,
  x: number,
  y: number,
  width: number,
  height: number
) {
  const bar = new THREE.Mesh(new THREE.BoxGeometry(width, height, 0.045), material);
  bar.position.set(x + width / 2, y, 0.04);
  panel.add(bar);
}

function createFocusFrames(
  root: THREE.Group,
  accent: THREE.Color,
  accentMaterials: AccentMaterial[]
) {
  const frames = new THREE.Group();
  frames.position.set(3.42, -0.04, -1.25);
  root.add(frames);

  for (let i = 0; i < 5; i += 1) {
    const geometry = new THREE.BoxGeometry(3.72 + i * 0.28, 2.18 + i * 0.16, 0.04);
    const edges = new THREE.EdgesGeometry(geometry);
    const material = new THREE.LineBasicMaterial({
      color: accent,
      transparent: true,
      opacity: 0.17 - i * 0.021,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const line = new THREE.LineSegments(edges, material);
    line.position.z = -i * 0.64;
    line.position.x = i * 0.05;
    line.rotation.z = i * 0.006;
    frames.add(line);
    accentMaterials.push(material);
  }

  return frames;
}

function createProjectNodes(root: THREE.Group) {
  const nodesGroup = new THREE.Group();
  nodesGroup.position.set(0.6, 0, -2.5);
  root.add(nodesGroup);

  const nodes: SceneNode[] = sections.map((section, index) => {
    const column = index % 2;
    const row = index - 3.5;
    const base = new THREE.Vector3(
      3.05 + column * 0.58,
      -row * 0.36,
      -1.2 - index * 0.78
    );

    const material = new THREE.MeshStandardMaterial({
      color: section.accentColor,
      roughness: 0.36,
      metalness: 0.28,
      transparent: true,
      opacity: 0.64,
    });
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.32, 0.045), material);
    mesh.position.copy(base);
    mesh.rotation.y = -0.24;
    mesh.rotation.x = 0.05;

    const haloMaterial = new THREE.MeshBasicMaterial({
      color: section.accentColor,
      transparent: true,
      opacity: 0.065,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    });
    const halo = new THREE.Mesh(new THREE.RingGeometry(0.36, 0.39, 32), haloMaterial);
    halo.position.copy(base);
    halo.rotation.y = -0.24;
    halo.rotation.x = 0.05;

    nodesGroup.add(halo, mesh);

    return { mesh, halo, base, sectionIndex: index };
  });

  return nodes;
}

function animateStars(starField: StarField, delta: number, reduced: boolean) {
  if (reduced) return;

  const position = starField.geometry.getAttribute(
    "position"
  ) as THREE.BufferAttribute;

  for (let i = 0; i < starField.speeds.length; i += 1) {
    const z = position.getZ(i) + starField.speeds[i] * delta * 18;
    position.setZ(i, z > 9 ? -52 : z);
  }

  position.needsUpdate = true;
}

function animateNodes(
  nodes: SceneNode[],
  activeIndex: number,
  elapsed: number,
  reduced: boolean
) {
  for (const node of nodes) {
    const distance = Math.abs(node.sectionIndex - activeIndex);
    const isActive = node.sectionIndex === activeIndex;
    const float = reduced ? 0 : Math.sin(elapsed * 0.65 + node.sectionIndex) * 0.045;
    const target = node.base.clone();
    target.z += (activeIndex - node.sectionIndex) * 0.42;
    target.y += float;

    node.mesh.position.lerp(target, 0.055);
    node.halo.position.lerp(target, 0.055);

    const activeScale = isActive ? 1.72 : Math.max(0.7, 1 - distance * 0.075);
    const haloScale = isActive ? 2.1 : Math.max(0.72, 1.1 - distance * 0.06);
    node.mesh.scale.setScalar(
      THREE.MathUtils.lerp(node.mesh.scale.x, activeScale, 0.06)
    );
    node.halo.scale.setScalar(
      THREE.MathUtils.lerp(node.halo.scale.x, haloScale, 0.06)
    );

    node.mesh.rotation.z = THREE.MathUtils.lerp(
      node.mesh.rotation.z,
      isActive ? Math.sin(elapsed * 0.75) * 0.03 : 0,
      0.04
    );
    node.halo.rotation.z += reduced ? 0 : 0.008;
    node.mesh.material.opacity = THREE.MathUtils.lerp(
      node.mesh.material.opacity,
      isActive ? 0.88 : Math.max(0.2, 0.5 - distance * 0.07),
      0.06
    );
    node.halo.material.opacity = THREE.MathUtils.lerp(
      node.halo.material.opacity,
      isActive ? 0.13 : Math.max(0.018, 0.055 - distance * 0.008),
      0.06
    );
  }
}

function disposeScene(scene: THREE.Scene) {
  scene.traverse((object) => {
    const mesh = object as THREE.Mesh;
    if (mesh.geometry) {
      mesh.geometry.dispose();
    }

    const material = mesh.material;
    if (Array.isArray(material)) {
      material.forEach((item) => item.dispose());
    } else if (material) {
      material.dispose();
    }
  });
}

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function canCreateWebGLContext() {
  try {
    const canvas = document.createElement("canvas");
    const context =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    return Boolean(context);
  } catch {
    return false;
  }
}

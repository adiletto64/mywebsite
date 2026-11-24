import * as THREE from "three";

const IS_MOBILE =
  window.matchMedia("(max-width: 768px)").matches ||
  window.matchMedia("(pointer: coarse)").matches;

// Use crisp 2K texture (361KB) on mobile to save GPU VRAM & keep 60fps; full 8K on desktop
const EARTH_TEXTURE_URL = IS_MOBILE ? "./assets/earth-2k.jpg" : "./assets/earth-8k.jpg";
const EARTH_BUMP_URL = "https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png";

// Axial tilt of Earth / classic desktop globe (23.4 degrees)
const AXIAL_TILT_RAD = THREE.MathUtils.degToRad(23.4);
const GLOBE_RADIUS = 1.32;
const TABLE_TOP_Y = -2.06;

function latLonToVector3(latDeg, lonDeg, radius) {
  const phi = THREE.MathUtils.degToRad(90 - latDeg);
  const theta = THREE.MathUtils.degToRad(lonDeg + 180);
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

function createFallbackEarthTexture() {
  const w = 512;
  const h = 256;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#e7e4dc";
  ctx.fillRect(0, 0, w, h);

  ctx.strokeStyle = "rgba(30, 30, 28, 0.14)";
  ctx.lineWidth = 1;
  for (let x = 0; x <= w; x += w / 24) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = 0; y <= h; y += h / 12) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function buildDesktopGlobeAssembly(maxAnisotropy) {
  const root = new THREE.Group();

  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x3b2d23,
    roughness: 0.62,
    metalness: 0.08
  });

  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xa68a5b,
    roughness: 0.36,
    metalness: 0.72
  });

  // 0. 3D Tabletop Cube/Slab under the globe (finite front & back edges, visible front cube face)
  const slabWidth = 10.5;
  const slabHeight = 0.78;
  const slabDepth = 3.85;
  const slabMaterials = [
    new THREE.MeshStandardMaterial({ color: 0xe2dfd8, roughness: 0.92 }),
    new THREE.MeshStandardMaterial({ color: 0xe2dfd8, roughness: 0.92 }),
    new THREE.MeshStandardMaterial({ color: 0xfcfcfb, roughness: 0.94 }),
    new THREE.MeshStandardMaterial({ color: 0xd6d3cb, roughness: 0.95 }),
    new THREE.MeshStandardMaterial({ color: 0xe5e3dc, roughness: 0.90 }),
    new THREE.MeshStandardMaterial({ color: 0xdad7cf, roughness: 0.92 })
  ];
  const tableSlab = new THREE.Mesh(
    new THREE.BoxGeometry(slabWidth, slabHeight, slabDepth),
    slabMaterials
  );
  tableSlab.position.set(0, TABLE_TOP_Y - slabHeight / 2, 0);
  root.add(tableSlab);

  const frontEdgeStrip = new THREE.Mesh(
    new THREE.BoxGeometry(slabWidth, 0.015, 0.015),
    new THREE.MeshBasicMaterial({ color: 0xd8d5cd })
  );
  frontEdgeStrip.position.set(0, TABLE_TOP_Y, slabDepth / 2);
  root.add(frontEdgeStrip);

  // 1. Soft contact shadow on the tabletop surface directly under the globe's base
  const shadowCanvas = document.createElement("canvas");
  shadowCanvas.width = 128;
  shadowCanvas.height = 128;
  const sCtx = shadowCanvas.getContext("2d");
  const grad = sCtx.createRadialGradient(64, 64, 9, 64, 64, 61);
  grad.addColorStop(0, "rgba(15, 14, 12, 0.36)");
  grad.addColorStop(0.55, "rgba(15, 14, 12, 0.14)");
  grad.addColorStop(1, "rgba(15, 14, 12, 0)");
  sCtx.fillStyle = grad;
  sCtx.fillRect(0, 0, 128, 128);

  const shadowPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(3.2, 3.2),
    new THREE.MeshBasicMaterial({
      map: new THREE.CanvasTexture(shadowCanvas),
      transparent: true,
      depthWrite: false
    })
  );
  shadowPlane.rotation.x = -Math.PI / 2;
  shadowPlane.position.y = TABLE_TOP_Y + 0.004;
  root.add(shadowPlane);

  // 2. Turned Wooden Pedestal Base (x=0, z=0 — aligned with center header)
  const baseProfile = [
    new THREE.Vector2(0.0, TABLE_TOP_Y),
    new THREE.Vector2(0.92, TABLE_TOP_Y),
    new THREE.Vector2(0.94, TABLE_TOP_Y + 0.10),
    new THREE.Vector2(0.82, TABLE_TOP_Y + 0.18),
    new THREE.Vector2(0.70, TABLE_TOP_Y + 0.25),
    new THREE.Vector2(0.40, TABLE_TOP_Y + 0.31),
    new THREE.Vector2(0.21, TABLE_TOP_Y + 0.40),
    new THREE.Vector2(0.14, TABLE_TOP_Y + 0.56),
    new THREE.Vector2(0.12, TABLE_TOP_Y + 0.64),
    new THREE.Vector2(0.0, TABLE_TOP_Y + 0.64)
  ];
  const latheSegs = IS_MOBILE ? 28 : 44;
  const pedestal = new THREE.Mesh(new THREE.LatheGeometry(baseProfile, latheSegs), woodMat);
  root.add(pedestal);

  const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.18, 0.1, 24), brassMat);
  collar.position.y = TABLE_TOP_Y + 0.66;
  root.add(collar);

  // 3. Tilted Meridian Cradle + Globe Group (real 23.4° axial tilt)
  const cradleGroup = new THREE.Group();
  cradleGroup.rotation.z = -AXIAL_TILT_RAD;
  root.add(cradleGroup);

  const arcRadius = GLOBE_RADIUS + 0.14;
  const meridianArc = new THREE.Mesh(
    new THREE.TorusGeometry(arcRadius, 0.036, 12, IS_MOBILE ? 44 : 64, Math.PI * 1.06),
    brassMat
  );
  meridianArc.rotation.z = -Math.PI * 0.53;
  cradleGroup.add(meridianArc);

  const axleRod = new THREE.Mesh(
    new THREE.CylinderGeometry(0.022, 0.022, arcRadius * 2 + 0.14, 12),
    brassMat
  );
  cradleGroup.add(axleRod);

  const northFinial = new THREE.Mesh(new THREE.SphereGeometry(0.055, 12, 12), brassMat);
  northFinial.position.y = arcRadius + 0.05;
  cradleGroup.add(northFinial);

  const southFinial = new THREE.Mesh(new THREE.SphereGeometry(0.055, 12, 12), brassMat);
  southFinial.position.y = -(arcRadius + 0.05);
  cradleGroup.add(southFinial);

  const bracket = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.055, 0.36, 12), brassMat);
  bracket.position.set(0.08, TABLE_TOP_Y + 0.68, 0);
  bracket.rotation.z = 0.22;
  root.add(bracket);

  // 4. Spinning Earth Sphere (mobile-optimized subdivisions)
  const earthSpinGroup = new THREE.Group();
  cradleGroup.add(earthSpinGroup);

  const fallbackTex = createFallbackEarthTexture();
  const globeMat = new THREE.MeshStandardMaterial({
    map: fallbackTex,
    roughness: 0.68,
    metalness: 0.04
  });

  const sphereSegs = IS_MOBILE ? 48 : 80;
  const earthMesh = new THREE.Mesh(
    new THREE.SphereGeometry(GLOBE_RADIUS, sphereSegs, sphereSegs),
    globeMat
  );
  earthSpinGroup.add(earthMesh);

  const graticule = new THREE.Mesh(
    new THREE.SphereGeometry(GLOBE_RADIUS + 0.003, 24, 12),
    new THREE.MeshBasicMaterial({
      color: 0x22201d,
      wireframe: true,
      transparent: true,
      opacity: 0.06
    })
  );
  earthSpinGroup.add(graticule);

  const loader = new THREE.TextureLoader();
  loader.setCrossOrigin("anonymous");
  loader.load(EARTH_TEXTURE_URL, (tex) => {
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = maxAnisotropy;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.magFilter = THREE.LinearFilter;
    globeMat.map = tex;
    globeMat.needsUpdate = true;
  });

  // Skip bump map on mobile to reduce GPU memory bandwidth & shader cost
  if (!IS_MOBILE) {
    loader.load(EARTH_BUMP_URL, (bump) => {
      globeMat.bumpMap = bump;
      globeMat.bumpScale = 0.028;
      globeMat.needsUpdate = true;
    });
  }

  // 5. 3D Red Pushpin on Kyrgyzstan (41.5°N, 74.7°E)
  const kgPos = latLonToVector3(41.5, 74.7, GLOBE_RADIUS);
  const kgNormal = kgPos.clone().normalize();
  const pinGroup = new THREE.Group();
  pinGroup.position.copy(kgPos);
  pinGroup.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), kgNormal);

  const needle = new THREE.Mesh(
    new THREE.CylinderGeometry(0.009, 0.004, 0.1, 8),
    new THREE.MeshStandardMaterial({ color: 0x444444, metalness: 0.8, roughness: 0.3 })
  );
  needle.position.y = 0.05;
  pinGroup.add(needle);

  const pinHead = new THREE.Mesh(
    new THREE.SphereGeometry(0.042, 12, 12),
    new THREE.MeshStandardMaterial({ color: 0xd92d20, roughness: 0.3, metalness: 0.08 })
  );
  pinHead.position.y = 0.115;
  pinGroup.add(pinHead);

  const pinHitTarget = new THREE.Mesh(
    new THREE.SphereGeometry(0.14, 10, 10),
    new THREE.MeshBasicMaterial({ visible: false })
  );
  pinHitTarget.position.y = 0.08;
  pinGroup.add(pinHitTarget);

  earthSpinGroup.add(pinGroup);

  const initialSpinY = THREE.MathUtils.degToRad(-165);
  earthSpinGroup.rotation.y = initialSpinY;

  return { root, earthSpinGroup, initialSpinY, pinHitTarget };
}

function initScrollGlobeExperience() {
  const track = document.getElementById("deskScrollTrack");
  const stickyViewport = track?.querySelector(".desk-sticky-viewport");
  const tableWrap = document.getElementById("tablePerspectiveWrap");
  const globeWrap = document.getElementById("globeStageWrap");
  const canvasHost = document.getElementById("globeCanvasHost");
  const globeHud = document.getElementById("globeHud");
  const globePinTooltip = document.getElementById("globePinTooltip");
  const spotlightOverlay = document.getElementById("spotlightOverlay");

  if (!track || !tableWrap || !globeWrap || !canvasHost) return;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    36,
    canvasHost.clientWidth / Math.max(1, canvasHost.clientHeight),
    0.1,
    100
  );

  const renderer = new THREE.WebGLRenderer({
    antialias: !IS_MOBILE,
    alpha: true,
    powerPreference: "high-performance"
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, IS_MOBILE ? 1.5 : 2));
  renderer.setSize(canvasHost.clientWidth, canvasHost.clientHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.06;
  canvasHost.appendChild(renderer.domElement);

  const hemiLight = new THREE.HemisphereLight(0xfffdf8, 0xd8d2c6, 1.3);
  scene.add(hemiLight);

  const keyLight = new THREE.DirectionalLight(0xfffaf0, 1.45);
  keyLight.position.set(1.5, 6.2, 4.2);
  scene.add(keyLight);

  const rimLight = new THREE.DirectionalLight(0xeef2f7, 0.55);
  rimLight.position.set(-4.0, 2.5, -3.5);
  scene.add(rimLight);

  const maxAnisotropy = IS_MOBILE ? 4 : Math.min(16, renderer.capabilities.getMaxAnisotropy());
  const { root: globeRoot, earthSpinGroup, initialSpinY, pinHitTarget } =
    buildDesktopGlobeAssembly(maxAnisotropy);
  globeRoot.position.set(11.5, 0.25, 0);
  scene.add(globeRoot);

  const raycaster = new THREE.Raycaster();
  const pointerNdc = new THREE.Vector2();

  let targetScrollProgress = 0;
  let smoothProgress = 0;
  let lastDomP = -1;
  let isTrackInView = true;

  let userSpinOffset = 0;
  let spinVelocity = 0;
  let userLatTilt = 0;
  let isPointerDown = false;
  let lastPointerX = 0;
  let lastPointerY = 0;

  // Pause WebGL rendering completely when scrolled past the 3D desk section (e.g. viewing Kyrgyzstan map)
  if ("IntersectionObserver" in window) {
    const trackObserver = new IntersectionObserver(
      (entries) => {
        isTrackInView = entries[0]?.isIntersecting ?? true;
      },
      { rootMargin: "100px 0px" }
    );
    trackObserver.observe(track);
  }

  function updateTargetScroll() {
    const rect = track.getBoundingClientRect();
    const scrollable = Math.max(1, track.offsetHeight - window.innerHeight);
    const scrolled = -rect.top;
    targetScrollProgress = THREE.MathUtils.clamp(scrolled / scrollable, 0, 1);
  }

  window.addEventListener("scroll", updateTargetScroll, { passive: true });
  window.addEventListener("resize", () => {
    const w = canvasHost.clientWidth || window.innerWidth;
    const h = canvasHost.clientHeight || window.innerHeight;
    camera.aspect = w / Math.max(1, h);
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    updateTargetScroll();
  });

  function hidePinTooltip() {
    if (!globePinTooltip) return;
    globePinTooltip.classList.remove("visible");
    globePinTooltip.setAttribute("aria-hidden", "true");
  }

  canvasHost.addEventListener("pointerdown", (e) => {
    if (smoothProgress < 0.55) return;
    isPointerDown = true;
    lastPointerX = e.clientX;
    lastPointerY = e.clientY;
    spinVelocity = 0;
    hidePinTooltip();
    canvasHost.classList.add("is-spinning");
    canvasHost.setPointerCapture(e.pointerId);
  });

  canvasHost.addEventListener("pointermove", (e) => {
    if (isPointerDown) {
      const dx = e.clientX - lastPointerX;
      const dy = e.clientY - lastPointerY;
      lastPointerX = e.clientX;
      lastPointerY = e.clientY;

      const deltaSpin = dx * 0.0075;
      userSpinOffset += deltaSpin;
      spinVelocity = deltaSpin;

      userLatTilt = THREE.MathUtils.clamp(userLatTilt + dy * 0.0045, -0.32, 0.55);
      return;
    }

    // Raycast hover only on desktop/fine pointers
    if (!IS_MOBILE && smoothProgress > 0.58 && globePinTooltip) {
      const rect = canvasHost.getBoundingClientRect();
      pointerNdc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointerNdc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointerNdc, camera);
      const hits = raycaster.intersectObject(pinHitTarget, false);

      if (hits.length > 0) {
        globePinTooltip.style.left = `${e.clientX}px`;
        globePinTooltip.style.top = `${e.clientY}px`;
        globePinTooltip.classList.add("visible");
        globePinTooltip.setAttribute("aria-hidden", "false");
        canvasHost.style.cursor = "pointer";
      } else {
        hidePinTooltip();
        canvasHost.style.cursor = "";
      }
    }
  });

  canvasHost.addEventListener("pointerleave", () => {
    hidePinTooltip();
    canvasHost.style.cursor = "";
  });

  const endSpin = (e) => {
    if (!isPointerDown) return;
    isPointerDown = false;
    canvasHost.classList.remove("is-spinning");
    if (canvasHost.hasPointerCapture(e.pointerId)) {
      canvasHost.releasePointerCapture(e.pointerId);
    }
  };

  canvasHost.addEventListener("pointerup", endSpin);
  canvasHost.addEventListener("pointercancel", endSpin);

  const easeInOutCubic = (t) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  updateTargetScroll();

  function animate() {
    requestAnimationFrame(animate);

    if (!isTrackInView) return;

    smoothProgress += (targetScrollProgress - smoothProgress) * 0.095;
    const p = smoothProgress;

    const pChanged = Math.abs(p - lastDomP) > 0.0004;
    if (pChanged) {
      lastDomP = p;

      const tiltT = easeInOutCubic(THREE.MathUtils.clamp(p / 0.45, 0, 1));
      const panT = easeInOutCubic(THREE.MathUtils.clamp((p - 0.14) / 0.86, 0, 1));

      if (stickyViewport) {
        const bgR = Math.round(THREE.MathUtils.lerp(252, 234, tiltT));
        const bgG = Math.round(THREE.MathUtils.lerp(252, 231, tiltT));
        const bgB = Math.round(THREE.MathUtils.lerp(251, 224, tiltT));
        stickyViewport.style.backgroundColor = `rgb(${bgR}, ${bgG}, ${bgB})`;
      }

      // Dynamic spotlight shift (100% GPU-composited transform, zero gradient repaints!)
      // Moves from center-left overhead on the poster table to upper-right angled beam on the Northern Hemisphere
      if (spotlightOverlay) {
        const lightShiftX = THREE.MathUtils.lerp(0, 7.5, panT);
        const lightShiftY = THREE.MathUtils.lerp(0, -10.5, panT);
        const lightScaleX = THREE.MathUtils.lerp(1, 0.88, tiltT);
        const lightScaleY = THREE.MathUtils.lerp(1, 1.06, tiltT);
        spotlightOverlay.style.transform = `translate3d(${lightShiftX.toFixed(2)}%, ${lightShiftY.toFixed(2)}%, 0) scale(${lightScaleX.toFixed(3)}, ${lightScaleY.toFixed(3)})`;
      }

      const rotX = tiltT * 68;
      const slideX = panT * -130;
      const tableScale = 1 - tiltT * 0.12;

      tableWrap.style.transform = `translate3d(${slideX.toFixed(2)}vw, 0, 0) rotateX(${rotX.toFixed(2)}deg) scale(${tableScale.toFixed(3)})`;
      tableWrap.style.pointerEvents = p > 0.12 ? "none" : "auto";

      globeWrap.classList.toggle("is-interactive", p > 0.58);
      if (globeHud) {
        globeHud.classList.toggle("visible", p > 0.74);
      }
      if (p <= 0.58) hidePinTooltip();
    }

    // Skip Three.js rendering completely when the globe is off-screen to the right (p < 0.08)
    if (p < 0.08) return;

    const panT = easeInOutCubic(THREE.MathUtils.clamp((p - 0.14) / 0.86, 0, 1));
    const zoomT = easeInOutCubic(THREE.MathUtils.clamp((p - 0.34) / 0.66, 0, 1));

    if (!isPointerDown) {
      userSpinOffset += spinVelocity;
      spinVelocity *= 0.94;
      if (Math.abs(spinVelocity) < 0.0001 && p > 0.72) {
        userSpinOffset += 0.00075;
      }
    }

    earthSpinGroup.rotation.y = initialSpinY + userSpinOffset;

    globeRoot.position.x = THREE.MathUtils.lerp(11.5, 0.0, panT);
    globeRoot.position.y = 0.25;

    // 3D Key Light shifts dynamically in sync with the 2D spotlight overlay
    keyLight.position.set(
      THREE.MathUtils.lerp(1.2, 4.8, panT),
      THREE.MathUtils.lerp(6.4, 4.2, panT),
      THREE.MathUtils.lerp(4.0, 3.2, panT)
    );
    keyLight.intensity = THREE.MathUtils.lerp(1.35, 1.7, zoomT);

    const camX = THREE.MathUtils.lerp(0.35, 0.0, zoomT);
    const camY = THREE.MathUtils.lerp(1.35, 1.52 + userLatTilt, zoomT);
    const camZ = THREE.MathUtils.lerp(5.8, 3.35 - userLatTilt * 0.22, zoomT);
    camera.position.set(camX, camY, camZ);

    const lookY = THREE.MathUtils.lerp(-0.25, 0.28, zoomT);
    camera.lookAt(0, lookY, 0);

    renderer.render(scene, camera);
  }

  animate();
}

document.addEventListener("DOMContentLoaded", initScrollGlobeExperience);

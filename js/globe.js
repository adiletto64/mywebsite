import * as THREE from "three";

// Local 8K high-resolution Earth daymap texture (downloaded into assets/)
const EARTH_TEXTURE_URL = "./assets/earth-8k.jpg";
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
  const w = 1024;
  const h = 512;
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

  // 0. 3D Tabletop Cube/Slab under the globe (finite front & back edges, visible front cube face!)
  // Top surface sits at y = TABLE_TOP_Y; front edge at +Z, back edge at -Z.
  const slabWidth = 10.5;
  const slabHeight = 0.78;
  const slabDepth = 3.85;
  const slabMaterials = [
    new THREE.MeshStandardMaterial({ color: 0xe2dfd8, roughness: 0.92 }), // +X right side
    new THREE.MeshStandardMaterial({ color: 0xe2dfd8, roughness: 0.92 }), // -X left side
    new THREE.MeshStandardMaterial({ color: 0xfcfcfb, roughness: 0.94 }), // +Y top surface (matches paper-bg)
    new THREE.MeshStandardMaterial({ color: 0xd6d3cb, roughness: 0.95 }), // -Y bottom
    new THREE.MeshStandardMaterial({ color: 0xe5e3dc, roughness: 0.90 }), // +Z front vertical cube face
    new THREE.MeshStandardMaterial({ color: 0xdad7cf, roughness: 0.92 })  // -Z back face
  ];
  const tableSlab = new THREE.Mesh(
    new THREE.BoxGeometry(slabWidth, slabHeight, slabDepth),
    slabMaterials
  );
  tableSlab.position.set(0, TABLE_TOP_Y - slabHeight / 2, 0);
  root.add(tableSlab);

  // Subtle crisp bevel shadow line along front top edge of the table cube
  const frontEdgeStrip = new THREE.Mesh(
    new THREE.BoxGeometry(slabWidth, 0.015, 0.015),
    new THREE.MeshBasicMaterial({ color: 0xd8d5cd })
  );
  frontEdgeStrip.position.set(0, TABLE_TOP_Y, slabDepth / 2);
  root.add(frontEdgeStrip);

  // 1. Soft contact shadow on the tabletop surface directly under the globe's base
  const shadowCanvas = document.createElement("canvas");
  shadowCanvas.width = 256;
  shadowCanvas.height = 256;
  const sCtx = shadowCanvas.getContext("2d");
  const grad = sCtx.createRadialGradient(128, 128, 18, 128, 128, 122);
  grad.addColorStop(0, "rgba(15, 14, 12, 0.36)");
  grad.addColorStop(0.55, "rgba(15, 14, 12, 0.14)");
  grad.addColorStop(1, "rgba(15, 14, 12, 0)");
  sCtx.fillStyle = grad;
  sCtx.fillRect(0, 0, 256, 256);

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

  // 2. Turned Wooden Pedestal Base (standing directly on TABLE_TOP_Y at x=0, z=0 — same X axis as header)
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
  const pedestal = new THREE.Mesh(new THREE.LatheGeometry(baseProfile, 48), woodMat);
  root.add(pedestal);

  const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.18, 0.1, 32), brassMat);
  collar.position.y = TABLE_TOP_Y + 0.66;
  root.add(collar);

  // 3. Tilted Meridian Cradle + Globe Group (real 23.4° axial tilt)
  const cradleGroup = new THREE.Group();
  cradleGroup.rotation.z = -AXIAL_TILT_RAD;
  root.add(cradleGroup);

  const arcRadius = GLOBE_RADIUS + 0.14;
  const meridianArc = new THREE.Mesh(
    new THREE.TorusGeometry(arcRadius, 0.036, 16, 72, Math.PI * 1.06),
    brassMat
  );
  meridianArc.rotation.z = -Math.PI * 0.53;
  cradleGroup.add(meridianArc);

  const axleRod = new THREE.Mesh(
    new THREE.CylinderGeometry(0.022, 0.022, arcRadius * 2 + 0.14, 16),
    brassMat
  );
  cradleGroup.add(axleRod);

  const northFinial = new THREE.Mesh(new THREE.SphereGeometry(0.055, 16, 16), brassMat);
  northFinial.position.y = arcRadius + 0.05;
  cradleGroup.add(northFinial);

  const southFinial = new THREE.Mesh(new THREE.SphereGeometry(0.055, 16, 16), brassMat);
  southFinial.position.y = -(arcRadius + 0.05);
  cradleGroup.add(southFinial);

  const bracket = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.055, 0.36, 16), brassMat);
  bracket.position.set(0.08, TABLE_TOP_Y + 0.68, 0);
  bracket.rotation.z = 0.22;
  root.add(bracket);

  // 4. High-Resolution Spinning Earth Sphere (96x96 subdivisions + 8K texture)
  const earthSpinGroup = new THREE.Group();
  cradleGroup.add(earthSpinGroup);

  const fallbackTex = createFallbackEarthTexture();
  const globeMat = new THREE.MeshStandardMaterial({
    map: fallbackTex,
    roughness: 0.68,
    metalness: 0.04
  });

  const earthMesh = new THREE.Mesh(
    new THREE.SphereGeometry(GLOBE_RADIUS, 96, 96),
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
  loader.load(EARTH_BUMP_URL, (bump) => {
    globeMat.bumpMap = bump;
    globeMat.bumpScale = 0.028;
    globeMat.needsUpdate = true;
  });

  // 5. 3D Red Pushpin on Kyrgyzstan (41.5°N, 74.7°E) + invisible generous hover target
  const kgPos = latLonToVector3(41.5, 74.7, GLOBE_RADIUS);
  const kgNormal = kgPos.clone().normalize();
  const pinGroup = new THREE.Group();
  pinGroup.position.copy(kgPos);
  pinGroup.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), kgNormal);

  const needle = new THREE.Mesh(
    new THREE.CylinderGeometry(0.009, 0.004, 0.1, 10),
    new THREE.MeshStandardMaterial({ color: 0x444444, metalness: 0.8, roughness: 0.3 })
  );
  needle.position.y = 0.05;
  pinGroup.add(needle);

  const pinHead = new THREE.Mesh(
    new THREE.SphereGeometry(0.042, 16, 16),
    new THREE.MeshStandardMaterial({ color: 0xd92d20, roughness: 0.3, metalness: 0.08 })
  );
  pinHead.position.y = 0.115;
  pinGroup.add(pinHead);

  const pinHitTarget = new THREE.Mesh(
    new THREE.SphereGeometry(0.14, 12, 12),
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

  if (!track || !tableWrap || !globeWrap || !canvasHost) return;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    36,
    canvasHost.clientWidth / Math.max(1, canvasHost.clientHeight),
    0.1,
    100
  );

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(canvasHost.clientWidth, canvasHost.clientHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.06;
  canvasHost.appendChild(renderer.domElement);

  const hemiLight = new THREE.HemisphereLight(0xfffdf8, 0xd8d2c6, 1.35);
  scene.add(hemiLight);

  const keyLight = new THREE.DirectionalLight(0xfffaf0, 1.45);
  keyLight.position.set(3.5, 5.5, 4.5);
  scene.add(keyLight);

  const rimLight = new THREE.DirectionalLight(0xeef2f7, 0.55);
  rimLight.position.set(-4.0, 2.5, -3.5);
  scene.add(rimLight);

  const maxAnisotropy = Math.min(16, renderer.capabilities.getMaxAnisotropy());
  const { root: globeRoot, earthSpinGroup, initialSpinY, pinHitTarget } =
    buildDesktopGlobeAssembly(maxAnisotropy);
  globeRoot.position.set(11.5, 0.25, 0);
  scene.add(globeRoot);

  const raycaster = new THREE.Raycaster();
  const pointerNdc = new THREE.Vector2();

  let targetScrollProgress = 0;
  let smoothProgress = 0;

  let userSpinOffset = 0;
  let spinVelocity = 0;
  let userLatTilt = 0;
  let isPointerDown = false;
  let lastPointerX = 0;
  let lastPointerY = 0;

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

      // Clamp vertical viewing strictly to Northern Hemisphere
      userLatTilt = THREE.MathUtils.clamp(userLatTilt + dy * 0.0045, -0.32, 0.55);
      return;
    }

    // Raycast hover over the 3D red pushpin on Kyrgyzstan
    if (smoothProgress > 0.58 && globePinTooltip) {
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

    smoothProgress += (targetScrollProgress - smoothProgress) * 0.085;
    const p = smoothProgress;

    // -------------------------------------------------------------
    // 1. SAME FINITE 3D TABLE (ENDS AT FRONT & BACK LIKE A CUBE):
    //    As table tilts (0° -> 68°), room backdrop behind & below the
    //    finite front/back edges subtly deepens so the cube edges pop.
    // -------------------------------------------------------------
    const tiltT = easeInOutCubic(THREE.MathUtils.clamp(p / 0.45, 0, 1));
    const panT = easeInOutCubic(THREE.MathUtils.clamp((p - 0.14) / 0.86, 0, 1));

    if (stickyViewport) {
      // Blend room backdrop from pure paper (#fcfcfb) to soft gallery wall (#eae7e0) as table tilts
      const bgR = Math.round(THREE.MathUtils.lerp(252, 234, tiltT));
      const bgG = Math.round(THREE.MathUtils.lerp(252, 231, tiltT));
      const bgB = Math.round(THREE.MathUtils.lerp(251, 224, tiltT));
      stickyViewport.style.backgroundColor = `rgb(${bgR}, ${bgG}, ${bgB})`;
    }

    const rotX = tiltT * 68;
    const slideX = panT * -130; // posters physically slide off to the left (vw)
    const tableScale = 1 - tiltT * 0.12;

    tableWrap.style.transform = `translate3d(${slideX.toFixed(2)}vw, 0, 0) rotateX(${rotX.toFixed(2)}deg) scale(${tableScale.toFixed(3)})`;
    tableWrap.style.opacity = "1";
    tableWrap.style.pointerEvents = p > 0.12 ? "none" : "auto";

    // -------------------------------------------------------------
    // 2. 3D GLOBE + ITS 3D CUBE TABLETOP SLIDE IN RIGHT-TO-LEFT:
    //    The globe's base sits at x = 0 (exact same X center as the
    //    "Books, Movies, Series" header) and z = 0 (center of the table
    //    depth), resting directly on the finite 3D tabletop cube.
    // -------------------------------------------------------------
    globeWrap.classList.toggle("is-interactive", p > 0.58);
    if (globeHud) {
      globeHud.classList.toggle("visible", p > 0.74);
    }
    if (p <= 0.58) hidePinTooltip();

    if (!isPointerDown) {
      userSpinOffset += spinVelocity;
      spinVelocity *= 0.94;
      if (Math.abs(spinVelocity) < 0.0001 && p > 0.72) {
        userSpinOffset += 0.00075;
      }
    }

    earthSpinGroup.rotation.y = initialSpinY + userSpinOffset;

    // Globe + finite tabletop slab physically travel right-to-left from +11.5 (off right) to 0.0 (exact center X)
    globeRoot.position.x = THREE.MathUtils.lerp(11.5, 0.0, panT);
    globeRoot.position.y = 0.25;

    // Camera keeps x = 0 at rest so the globe's leg stands dead-center on the exact same X as the header,
    // while zooming in toward the Northern Hemisphere with both front & back table edges visible
    const zoomT = easeInOutCubic(THREE.MathUtils.clamp((p - 0.34) / 0.66, 0, 1));
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

import * as THREE from "three";

const EARTH_TEXTURE_URL = "https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-day.jpg";
const EARTH_BUMP_URL = "https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png";

// Axial tilt of Earth / classic desktop globe (23.4 degrees)
const AXIAL_TILT_RAD = THREE.MathUtils.degToRad(23.4);
const GLOBE_RADIUS = 1.38;

// Convert lat/lon (degrees) to 3D point on sphere of radius R (Three.js SphereGeometry UV mapping)
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

  // Subtle archival graticule grid
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

  // Equator highlight
  ctx.strokeStyle = "rgba(30, 30, 28, 0.28)";
  ctx.beginPath();
  ctx.moveTo(0, h / 2);
  ctx.lineTo(w, h / 2);
  ctx.stroke();

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function buildDesktopGlobeAssembly() {
  const root = new THREE.Group();

  // Materials: warm walnut wood base, brushed antique brass meridian arc, soft contact shadow
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

  // 1. Soft contact shadow on the desk surface
  const shadowCanvas = document.createElement("canvas");
  shadowCanvas.width = 256;
  shadowCanvas.height = 256;
  const sCtx = shadowCanvas.getContext("2d");
  const grad = sCtx.createRadialGradient(128, 128, 18, 128, 128, 122);
  grad.addColorStop(0, "rgba(15, 14, 12, 0.34)");
  grad.addColorStop(0.55, "rgba(15, 14, 12, 0.14)");
  grad.addColorStop(1, "rgba(15, 14, 12, 0)");
  sCtx.fillStyle = grad;
  sCtx.fillRect(0, 0, 256, 256);

  const shadowPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(3.4, 3.4),
    new THREE.MeshBasicMaterial({
      map: new THREE.CanvasTexture(shadowCanvas),
      transparent: true,
      depthWrite: false
    })
  );
  shadowPlane.rotation.x = -Math.PI / 2;
  shadowPlane.position.y = -2.18;
  root.add(shadowPlane);

  // 2. Turned Wooden Pedestal Base (LatheGeometry standing on the desk)
  const baseProfile = [
    new THREE.Vector2(0.0, -2.18),
    new THREE.Vector2(0.96, -2.18),
    new THREE.Vector2(0.98, -2.08),
    new THREE.Vector2(0.86, -2.00),
    new THREE.Vector2(0.74, -1.93),
    new THREE.Vector2(0.42, -1.87),
    new THREE.Vector2(0.22, -1.78),
    new THREE.Vector2(0.14, -1.60),
    new THREE.Vector2(0.12, -1.52),
    new THREE.Vector2(0.0, -1.52)
  ];
  const pedestal = new THREE.Mesh(new THREE.LatheGeometry(baseProfile, 48), woodMat);
  root.add(pedestal);

  // Brass collar ring atop pedestal
  const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.18, 0.1, 32), brassMat);
  collar.position.y = -1.50;
  root.add(collar);

  // 3. Tilted Meridian Cradle + Globe Group (real 23.4° axial tilt)
  const cradleGroup = new THREE.Group();
  cradleGroup.rotation.z = -AXIAL_TILT_RAD;
  root.add(cradleGroup);

  // Classic C-shaped Semi-Circular Meridian Ring (brass arc)
  const arcRadius = GLOBE_RADIUS + 0.14;
  const meridianArc = new THREE.Mesh(
    new THREE.TorusGeometry(arcRadius, 0.036, 16, 72, Math.PI * 1.06),
    brassMat
  );
  // Orient arc cleanly from South Pole to North Pole along the right side
  meridianArc.rotation.z = -Math.PI * 0.53;
  cradleGroup.add(meridianArc);

  // Top & Bottom Polar Axle Pins + Finials
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

  // Connecting brass bracket from pedestal up to the meridian arc
  const bracket = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.055, 0.36, 16), brassMat);
  bracket.position.set(0.08, -1.50, 0);
  bracket.rotation.z = 0.22;
  root.add(bracket);

  // 4. Spinning Earth Sphere Group (rotates around tilted polar Y-axis)
  const earthSpinGroup = new THREE.Group();
  cradleGroup.add(earthSpinGroup);

  const fallbackTex = createFallbackEarthTexture();
  const globeMat = new THREE.MeshStandardMaterial({
    map: fallbackTex,
    roughness: 0.72,
    metalness: 0.05
  });

  const earthMesh = new THREE.Mesh(
    new THREE.SphereGeometry(GLOBE_RADIUS, 64, 64),
    globeMat
  );
  earthSpinGroup.add(earthMesh);

  // Subtle cartographic graticule lines over the sphere
  const graticule = new THREE.Mesh(
    new THREE.SphereGeometry(GLOBE_RADIUS + 0.004, 24, 12),
    new THREE.MeshBasicMaterial({
      color: 0x22201d,
      wireframe: true,
      transparent: true,
      opacity: 0.07
    })
  );
  earthSpinGroup.add(graticule);

  // Load real Earth day texture + elevation bump map asynchronously
  const loader = new THREE.TextureLoader();
  loader.setCrossOrigin("anonymous");
  loader.load(EARTH_TEXTURE_URL, (tex) => {
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    globeMat.map = tex;
    globeMat.needsUpdate = true;
  });
  loader.load(EARTH_BUMP_URL, (bump) => {
    globeMat.bumpMap = bump;
    globeMat.bumpScale = 0.035;
    globeMat.needsUpdate = true;
  });

  // 5. Tiny 3D Red Pushpin right on Kyrgyzstan (41.5°N, 74.7°E)
  const kgPos = latLonToVector3(41.5, 74.7, GLOBE_RADIUS);
  const kgNormal = kgPos.clone().normalize();
  const pinGroup = new THREE.Group();
  pinGroup.position.copy(kgPos);
  pinGroup.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), kgNormal);

  const needle = new THREE.Mesh(
    new THREE.CylinderGeometry(0.008, 0.004, 0.09, 10),
    new THREE.MeshStandardMaterial({ color: 0x444444, metalness: 0.8, roughness: 0.3 })
  );
  needle.position.y = 0.045;
  pinGroup.add(needle);

  const pinHead = new THREE.Mesh(
    new THREE.SphereGeometry(0.038, 16, 16),
    new THREE.MeshStandardMaterial({ color: 0xd92d20, roughness: 0.32, metalness: 0.08 })
  );
  pinHead.position.y = 0.105;
  pinGroup.add(pinHead);

  earthSpinGroup.add(pinGroup);

  // Initial spin angle so Kyrgyzstan & Northern Eurasia face the camera cleanly
  // (lon 74.7°E -> orient toward +Z front)
  const initialSpinY = THREE.MathUtils.degToRad(-165);
  earthSpinGroup.rotation.y = initialSpinY;

  return { root, earthSpinGroup, initialSpinY };
}

function initScrollGlobeExperience() {
  const track = document.getElementById("deskScrollTrack");
  const tableWrap = document.getElementById("tablePerspectiveWrap");
  const globeWrap = document.getElementById("globeStageWrap");
  const canvasHost = document.getElementById("globeCanvasHost");
  const globeHud = document.getElementById("globeHud");

  if (!track || !tableWrap || !globeWrap || !canvasHost) return;

  // Set up Three.js scene
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

  // Soft archival daylight + directional key light matching the page's circular spotlight
  const hemiLight = new THREE.HemisphereLight(0xfffdf8, 0xd8d2c6, 1.35);
  scene.add(hemiLight);

  const keyLight = new THREE.DirectionalLight(0xfffaf0, 1.45);
  keyLight.position.set(3.5, 5.5, 4.5);
  scene.add(keyLight);

  const rimLight = new THREE.DirectionalLight(0xeef2f7, 0.55);
  rimLight.position.set(-4.0, 2.5, -3.5);
  scene.add(rimLight);

  const { root: globeRoot, earthSpinGroup, initialSpinY } = buildDesktopGlobeAssembly();
  globeRoot.position.set(0, 0.15, 0);
  scene.add(globeRoot);

  // Scroll & interactive spin state
  let targetScrollProgress = 0;
  let smoothProgress = 0;

  // User spin state (Northern Hemisphere focus only!)
  let userSpinOffset = 0;
  let spinVelocity = 0;
  let userLatTilt = 0; // clamped so camera stays strictly on the Northern Hemisphere
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

  // Pointer drag to spin the 3D globe (horizontal 360° spin + vertical clamped to Northern Hemisphere)
  canvasHost.addEventListener("pointerdown", (e) => {
    if (smoothProgress < 0.48) return;
    isPointerDown = true;
    lastPointerX = e.clientX;
    lastPointerY = e.clientY;
    spinVelocity = 0;
    canvasHost.classList.add("is-spinning");
    canvasHost.setPointerCapture(e.pointerId);
  });

  canvasHost.addEventListener("pointermove", (e) => {
    if (!isPointerDown) return;
    const dx = e.clientX - lastPointerX;
    const dy = e.clientY - lastPointerY;
    lastPointerX = e.clientX;
    lastPointerY = e.clientY;

    const deltaSpin = dx * 0.0075;
    userSpinOffset += deltaSpin;
    spinVelocity = deltaSpin;

    // Allow gentle vertical tilt strictly within the Northern Hemisphere
    userLatTilt = THREE.MathUtils.clamp(userLatTilt + dy * 0.0045, -0.32, 0.55);
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

  // Smooth cubic easing helper
  const easeInOutCubic = (t) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  updateTargetScroll();

  function animate() {
    requestAnimationFrame(animate);

    // Smoothly interpolate scroll progress so camera transition is always silky
    smoothProgress += (targetScrollProgress - smoothProgress) * 0.085;
    const p = smoothProgress;

    // -------------------------------------------------------------
    // 1. TABLE 3D TRANSITION (top-down -> side-angled desk surface)
    // -------------------------------------------------------------
    const tableT = easeInOutCubic(THREE.MathUtils.clamp(p / 0.62, 0, 1));
    const rotX = tableT * 68;         // tilts from flat top-down to side-view desk
    const rotZ = tableT * -7.5;       // subtle side sweep
    const transX = tableT * -14;      // sweeps sideways (vw)
    const transY = tableT * 24;       // drops toward desk floor (vh)
    const tableScale = 1 - tableT * 0.18;
    const tableOpacity = 1 - THREE.MathUtils.clamp((p - 0.22) / 0.34, 0, 1);

    tableWrap.style.transform = `translate3d(${transX.toFixed(2)}vw, ${transY.toFixed(2)}vh, 0) rotateX(${rotX.toFixed(2)}deg) rotateZ(${rotZ.toFixed(2)}deg) scale(${tableScale.toFixed(3)})`;
    tableWrap.style.opacity = tableOpacity.toFixed(3);
    tableWrap.style.pointerEvents = p > 0.22 ? "none" : "auto";

    // -------------------------------------------------------------
    // 2. 3D GLOBE SIDE-CAMERA APPROACH & ZOOM TO NORTHERN HEMISPHERE
    // -------------------------------------------------------------
    const globeFade = THREE.MathUtils.clamp((p - 0.14) / 0.34, 0, 1);
    globeWrap.style.opacity = globeFade.toFixed(3);
    globeWrap.classList.toggle("is-interactive", p > 0.52);

    if (globeHud) {
      globeHud.classList.toggle("visible", p > 0.72);
    }

    // Only render WebGL when globe is visible
    if (globeFade > 0.005) {
      const approachT = easeInOutCubic(THREE.MathUtils.clamp((p - 0.14) / 0.86, 0, 1));

      // Apply gentle inertia when user releases spin, plus subtle idle drift
      if (!isPointerDown) {
        userSpinOffset += spinVelocity;
        spinVelocity *= 0.94;
        if (Math.abs(spinVelocity) < 0.0001 && p > 0.65) {
          userSpinOffset += 0.00075; // calm, slow museum-globe rotation
        }
      }

      // Spin globe gently into place during approach + user spin
      const introSpin = (1 - approachT) * -0.9;
      earthSpinGroup.rotation.y = initialSpinY + introSpin + userSpinOffset;

      // Camera swoops in from the SIDE (high X, low-mid Y) and zooms into the Northern Hemisphere!
      // Start (side view): (6.4, 0.85, 4.8) -> End (close Northern Hemisphere focus): (0.28, 1.55, 2.72)
      const camX = THREE.MathUtils.lerp(6.4, 0.28, approachT);
      const camY = THREE.MathUtils.lerp(0.85, 1.55 + userLatTilt, approachT);
      const camZ = THREE.MathUtils.lerp(4.8, 2.72 - userLatTilt * 0.22, approachT);
      camera.position.set(camX, camY, camZ);

      // Look target smoothly shifts from whole globe side-profile up to the Northern Hemisphere (y = 0.62)
      const lookX = THREE.MathUtils.lerp(-0.45, 0.0, approachT);
      const lookY = THREE.MathUtils.lerp(-0.25, 0.62, approachT);
      camera.lookAt(lookX, lookY, 0);

      renderer.render(scene, camera);
    }
  }

  animate();
}

document.addEventListener("DOMContentLoaded", initScrollGlobeExperience);

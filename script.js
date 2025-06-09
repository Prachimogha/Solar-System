const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
);
camera.position.z = 50;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("canvasContainer").appendChild(renderer.domElement);

// Add lights
scene.add(new THREE.AmbientLight(0xffffff, 0.5));
scene.add(new THREE.PointLight(0xffffff, 2));

// Add Sun
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(5, 32, 32),
  new THREE.MeshBasicMaterial({ color: 0xffff00 })
);
scene.add(sun);

// Add one planet (Earth)
const planet = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  new THREE.MeshStandardMaterial({ color: 0x3399ff })
);
scene.add(planet);

// Setup control panel
let speed = 0.01;
const controlPanel = document.getElementById("controlPanel");
controlPanel.innerHTML = `
  <label>Earth Speed: <span id="speedVal">0.01</span></label><br>
  <input type="range" id="speedSlider" min="0.001" max="0.05" step="0.001" value="0.01" />
`;

document.getElementById("speedSlider").addEventListener("input", (e) => {
  speed = parseFloat(e.target.value);
  document.getElementById("speedVal").textContent = speed.toFixed(3);
});

const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const time = clock.getElapsedTime();
  planet.position.set(
    Math.cos(time * speed) * 20,
    0,
    Math.sin(time * speed) * 20
  );
  renderer.render(scene, camera);
}

animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, preserveDrawingBuffer: true });
renderer.setSize(1024, 1024);
renderer.setPixelRatio(1);
renderer.setClearColor(0x000000, 0);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;
document.body.append(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-1.7, 1.7, 1.7, -1.7, 0.1, 30);
camera.position.set(0, 0, 6);
camera.lookAt(0, 0, 0);
const studio = new THREE.Scene();
studio.background = new THREE.Color(0x080808);
const panelGeometry = new THREE.PlaneGeometry(1, 1);
const panels: [number, number, number, number, number, number][] = [
  [-3.5, 4.5, 6, 6, 7, 7],
  [-5, 0.5, 1, 1.3, 7, 5],
  [2, 5, -1, 5, 1.5, 8],
  [5, 0, 2, 0.65, 5, 3],
  [0, -4, 3, 5, 0.7, 1.5],
];
const panelMaterials: THREE.MeshBasicMaterial[] = [];
for (const [x, y, z, width, height, intensity] of panels) {
  const material = new THREE.MeshBasicMaterial({ color: new THREE.Color().setScalar(intensity), side: THREE.DoubleSide });
  panelMaterials.push(material);
  const panel = new THREE.Mesh(panelGeometry, material);
  panel.position.set(x, y, z);
  panel.scale.set(width, height, 1);
  panel.lookAt(0, 0, 0);
  studio.add(panel);
}
const generator = new THREE.PMREMGenerator(renderer);
const environment = generator.fromScene(studio, 0.04, 0.1, 30);
generator.dispose();
panelGeometry.dispose();
for (const material of panelMaterials) material.dispose();
scene.environment = environment.texture;

const chrome = new THREE.MeshStandardMaterial({ color: 0xe8e8e8, metalness: 1, roughness: 0.17, envMapIntensity: 1.25 });
const dark = new THREE.MeshStandardMaterial({ color: 0x353535, metalness: 1, roughness: 0.28, envMapIntensity: 1.25 });
const laptop = new THREE.Group();
scene.add(laptop);

function box(width: number, height: number, depth: number, radius: number, x: number, y: number, z: number, material: THREE.Material) {
  const mesh = new THREE.Mesh(new RoundedBoxGeometry(width, height, depth, 5, radius), material);
  mesh.position.set(x, y, z);
  laptop.add(mesh);
}
function stroke(points: [number, number, number][], radius: number) {
  const path = new THREE.CatmullRomCurve3(points.map(point => new THREE.Vector3(...point)), false, 'catmullrom', 0.08);
  laptop.add(new THREE.Mesh(new THREE.TubeGeometry(path, 30, radius, 12, false), chrome));
}

box(1.9, 1.25, 0.095, 0.06, 0, 0.37, -0.1, chrome);
box(1.72, 1.05, 0.025, 0.04, 0, 0.37, -0.04, new THREE.MeshBasicMaterial({ color: 0x050505 }));
box(1.9, 0.11, 1.2, 0.05, 0, -0.29, 0.46, chrome);
box(1.6, 0.018, 0.58, 0.035, 0, -0.22, 0.37, dark);
box(0.56, 0.02, 0.3, 0.025, 0, -0.22, 0.86, dark);
for (let row = 0; row < 4; row++) {
  for (let column = 0; column < 11; column++) {
    box(0.112, 0.018, 0.085, 0.015, -0.83 + column * 0.14, -0.2, 0.17 + row * 0.12, chrome);
  }
}
stroke([[-0.47, 0.4, 0.012], [-0.69, 0.21, 0.012], [-0.47, 0.02, 0.012]], 0.038);
stroke([[0.09, 0.4, 0.012], [-0.01, 0.02, 0.012]], 0.031);
stroke([[0.31, 0.4, 0.012], [0.53, 0.21, 0.012], [0.31, 0.02, 0.012]], 0.038);
laptop.rotation.set(0.3, -0.42, 0.025);
laptop.position.y = 0.08;
renderer.render(scene, camera);

declare global {
  interface Window {
    renderLaptop: () => string;
  }
}
window.renderLaptop = () => renderer.domElement.toDataURL('image/png');

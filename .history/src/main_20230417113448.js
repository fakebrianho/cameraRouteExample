import './style.css'
import * as THREE from 'three'
import { sizes, camera } from './camera'
import addLight from './lights'
import { addMeshes, addShader } from './addMeshes'
import { PARAMS, pane, orbit } from './controls'
import { resize } from './eventListeners'

let renderer, scene
renderer = new THREE.WebGLRenderer()
scene = new THREE.Scene()
const clock = new THREE.Clock()
const meshes = {}
const lights = {}

init()
function init() {
	renderer.setSize(sizes.width, sizes.height)
	document.body.appendChild(renderer.domElement)
	meshes.default = addMeshes()
	meshes.shader = addShader()
	lights.default = addLight()
	scene.add(meshes.default)
	scene.add(meshes.shader)
	scene.add(lights.default)
	console.log(meshes.default)
	resize(camera, renderer, sizes)
	orbit(camera, renderer)
	animate()
}

function updateCamera() {
	const time = clock.getElapsedTime()
	const looptime = 20
	const t = (time % looptime) / looptime
	const t2 = ((time + 0.1) % looptime) / looptime
	const pos = meshes.default.geometry.parameters.path.getPointAt(t)
	const pos2 = meshes.default.geometry.parameters.path.getPointAt(t2)
	camera.position.copy(pos)
	camera.lookAt(pos2)
}

function animate() {
	requestAnimationFrame(animate)
	meshes.shader.material.uniforms.uTime.value += 0.1
	meshes.shader.material.uniforms.displacementStrength.value =
		PARAMS.displacementStrength
	meshes.shader.rotation.y -= 0.01
	meshes.shader.rotation.z += 0.01
	updateCamera()
	renderer.render(scene, camera)
}

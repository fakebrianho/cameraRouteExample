import {
	BoxGeometry,
	MeshStandardMaterial,
	Mesh,
	ShaderMaterial,
	Vector2,
	Vector4,
	DoubleSide,
	MeshBasicMaterial,
	TubeGeometry,
	QuadraticBezierCurve,
} from 'three'
import * as THREE from 'three'
import vertexShader from '/@/shaders/vertex.glsl'
import fragmentShader from '/@/shaders/fragment.glsl'
import { GrannyKnot } from 'three/examples/jsm/curves/CurveExtras'

export const addMeshes = () => {
	const curve = new THREE.CatmullRomCurve3([
		new THREE.Vector3(-10, 0, 10),
		new THREE.Vector3(-5, 5, 5),
		new THREE.Vector3(0, 0, 0),
		new THREE.Vector3(5, -5, 5),
		new THREE.Vector3(10, 0, 10),
	])

	const points = curve.getPoints(50)
	const curve2 = new GrannyKnot()
	const geometry = new THREE.TubeGeometry(curve2, 50, 2, 8, true)
	const material = new MeshBasicMaterial({
		color: 0xffffff,
		wireframe: true,
		side: DoubleSide,
	})

	const tube = new Mesh(geometry, material)
	tube.position.set(-2, 0, 0)
	return tube
	// const curve = new THREE.SplineCurve([
	// 	new THREE.Vector2(-10, 0),
	// 	new THREE.Vector2(-5, 5),
	// 	new THREE.Vector2(0, 0),
	// 	new THREE.Vector2(5, -5),
	// 	new THREE.Vector2(10, 0),
	// ])

	// const points = curve.getPoints(50)
	// const geometry = new THREE.TubeGeometry().setFromPoints(points)

	// const material = new THREE.LineBasicMaterial({ color: 0xff0000 })

	// // Create the final object to add to the scene
	// const splineObject = new THREE.Line(geometry, material)
	// return splineObject
}

export const addShader = () => {
	const geometry = new BoxGeometry(1, 1, 1)
	const material = new ShaderMaterial({
		extensions: {
			derivatives: '#extension GL_OES_standard_derivatives : enable',
		},
		side: DoubleSide,
		uniforms: {
			uTime: { type: 'f', value: 0 },
			resolution: { type: 'v4', value: new Vector4() },
			uvRate1: {
				value: new Vector2(1, 1),
			},
			displacementStrength: { type: 'f', value: 0.5 },
		},
		// wireframe: true,
		// transparent: true,
		vertexShader: vertexShader,
		fragmentShader: fragmentShader,
	})
	const mesh = new Mesh(geometry, material)
	mesh.position.set(2, 0, 0)
	return mesh
}

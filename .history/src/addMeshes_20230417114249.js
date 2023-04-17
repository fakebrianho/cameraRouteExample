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
	/*------------------------------
	Custom Curve and Path you need to create a curve using one of the vector3 curves. Spline curve is generally vec2 and 2D points.
	------------------------------*/
	const curve = new THREE.CatmullRomCurve3([
		new THREE.Vector3(-10, 0, 10),
		new THREE.Vector3(-5, 5, 5),
		new THREE.Vector3(0, 0, 0),
		new THREE.Vector3(5, -5, 5),
		new THREE.Vector3(10, 0, 10),
	])
	/*------------------------------
	To do it like the examples you just need to import the GrannyKnot from the CurveExtras.js and also instead of TubeBufferGeometry it's just TubeGeometry now.
	------------------------------*/

	const curve2 = new GrannyKnot()
	const geometry = new THREE.TubeGeometry(curve, 50, 2, 8, true)
	const material = new MeshBasicMaterial({
		color: 0xffffff,
		wireframe: true,
		side: DoubleSide,
	})

	const tube = new Mesh(geometry, material)
	tube.position.set(-2, 0, 0)
	return tube
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

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
export const addMeshes = () => {
	class CustomSinCurve extends THREE.Curve {
		constructor(scale = 1) {
			super()

			this.scale = scale
		}

		getPoint(t, optionalTarget = new THREE.Vector3()) {
			const tx = t * 3 - 1.5
			const ty = Math.sin(2 * Math.PI * t)
			const tz = 0

			return optionalTarget.set(tx, ty, tz).multiplyScalar(this.scale)
		}
	}

	const path = new CustomSinCurve(10)
	const geometry = new TubeGeometry(path, 100, 2, 8, true)
	const material = new MeshBasicMaterial({
		color: 0x000000,
		wireframe: false,
		side: DoubleSide,
	})

	const tube = new Mesh(geometry, material)
	console.log(tube)
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

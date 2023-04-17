import {
	BoxGeometry,
	MeshStandardMaterial,
	Mesh,
	ShaderMaterial,
	Vector2,
	Vector4,
	DoubleSide,
} from 'three'
import vertexShader from '/@/shaders/vertex.glsl'
import fragmentShader from '/@/shaders/fragment.glsl'
export const addMeshes = () => {
	const curve = new THREE.QuadraticBezierCurve(
		new THREE.Vector2(-10, 0),
		new THREE.Vector2(20, 15),
		new THREE.Vector2(10, 0)
	)
	const geometry = new THREE.TubeBufferGeometry(curve, 100, 2, 8, true)
	const material = new THREE.MeshBasicMaterial({
		color: 0x000000,
		wireframe: true,
		side: THREE.DoubleSide,
	})

	const tube = new THREE.Mesh(geometry, material)
	// const geometry = new BoxGeometry(1, 1, 1)
	// const material = new MeshStandardMaterial({ color: 0xff0000 })
	// const mesh = new Mesh(geometry, material)
	// mesh.position.set(-2, 0, 0)
	return mesh
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

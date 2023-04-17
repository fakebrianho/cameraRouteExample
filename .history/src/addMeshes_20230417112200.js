import {
	BoxGeometry,
	MeshStandardMaterial,
	Mesh,
	ShaderMaterial,
	Vector2,
	Vector4,
	DoubleSide,
	Vector2,
	DoubleSide,
	MeshBasicMaterial,
	TubeGeometry,
	QuadraticBezierCurve,
} from 'three'
import vertexShader from '/@/shaders/vertex.glsl'
import fragmentShader from '/@/shaders/fragment.glsl'
export const addMeshes = () => {
	const curve = new QuadraticBezierCurve(
		new Vector2(-10, 0),
		new Vector2(20, 15),
		new Vector2(10, 0)
	)
	const geometry = new TubeGeometry(curve, 100, 2, 8, true)
	const material = new MeshBasicMaterial({
		color: 0x000000,
		wireframe: true,
		side: DoubleSide,
	})

	const tube = new Mesh(geometry, material)
	// const geometry = new BoxGeometry(1, 1, 1)
	// const material = new MeshStandardMaterial({ color: 0xff0000 })
	// const mesh = new Mesh(geometry, material)
	// mesh.position.set(-2, 0, 0)
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
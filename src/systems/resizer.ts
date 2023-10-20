/**
 * 缩放类
 */
export default class Resizer {
  constructor(container: Element, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer) {
    this.setSize(container, camera, renderer)

    window.addEventListener('resize', () => {
      this.setSize(container, camera, renderer)

      // this.onResize()
    })
  }

  /**
   * 自定义操作
   */
  onResize() {}

  setSize(container: Element, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer) {
    const { clientWidth, clientHeight } = container

    camera.aspect = clientWidth / clientHeight

    camera.updateProjectionMatrix()

    renderer.setSize(clientWidth, clientHeight)

    renderer.setPixelRatio(window.devicePixelRatio)
  }
}

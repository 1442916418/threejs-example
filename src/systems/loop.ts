import { Clock } from 'three'

const clock = new Clock()

/**
 * 更新类
 */
export default class Loop {
  private renderer: THREE.WebGLRenderer
  private loopRenderer: () => void

  /** 可更新的 */
  public updatables: Set<any>

  constructor(renderer: THREE.WebGLRenderer, loopRenderer: () => void) {
    this.renderer = renderer
    this.loopRenderer = loopRenderer

    this.updatables = new Set<any>()
  }

  public start() {
    this.renderer.setAnimationLoop(() => {
      this.tick()

      this.loopRenderer()
    })
  }

  public stop() {
    this.renderer.setAnimationLoop(null)
  }

  private tick() {
    const delta = clock.getDelta()

    for (const object of this.updatables.values()) {
      object.tick(delta)
    }
  }
}

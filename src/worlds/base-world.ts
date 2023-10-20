import { createCamera } from '@components/camera'
import { createScene } from '@components/scene'
import { createAxesHelper } from '@components/helpers'
import { createStats } from '@components/stats'
import { createLights } from '@components/lights'
import { createLightsGUI } from '@components/gui'

import { createRenderer } from '@systems/renderer'
import Resizer from '@systems/resizer'
import Loop from '@systems/loop'
import { createControls } from '@systems/controls'

import { load } from '@containers/birds'

import { Vector3 } from 'three'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'

import type { PerspectiveCamera, WebGLRenderer, Scene } from 'three'
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * 世界类
 */
export default class BaseWorld {
  /** 摄像机 */
  public camera: PerspectiveCamera
  /** 摄像机默认位置 */
  public defaultCameraPosition = new Vector3(-1, 1.5, 6.5)
  /** 渲染器 */
  public renderer: WebGLRenderer
  /** 场景 */
  public scene: Scene
  /** 控制器 */
  public controls: OrbitControls
  /** 控制器默认位置 */
  public defaultControlsPosition = new Vector3(0, 0, 0)
  /** 挂载元素 */
  public el: HTMLDivElement
  /** 循环类 */
  public loop: Loop
  /** 调试类 */
  public gui: GUI

  /** 性能监视 */
  private stats?: Stats

  /** 是否为生产模式 */
  public isProd: boolean

  constructor(element: HTMLDivElement, isProd = false) {
    this.isProd = isProd

    this.gui = new GUI()
    this.camera = createCamera({ position: this.defaultCameraPosition })
    this.renderer = createRenderer()
    this.scene = createScene()
    this.controls = createControls({
      camera: this.camera,
      canvas: this.renderer.domElement,
      target: this.defaultControlsPosition
    })
    this.el = element
    this.loop = new Loop(this.renderer, () => this.render())

    element.append(this.renderer.domElement)

    const { directionalLight, hemisphereLight } = createLights()

    this.scene.add(directionalLight, hemisphereLight)

    this.loop.updatables.add(this.controls)

    new Resizer(element, this.camera, this.renderer)

    if (!isProd) {
      this.stats = createStats('tl')
      this.scene.add(createAxesHelper(500))
      this.loop.updatables.add(this.handleStats())

      createLightsGUI(this.gui, hemisphereLight, directionalLight)
    } else {
      this.gui.hide()
    }
  }

  public async init() {
    const { scene, renderer, loop } = this

    await load.loadAllModels({ scene, renderer, loop })
  }

  public render() {
    this.renderer.render(this.scene, this.camera)
  }

  public start() {
    this.loop.start()
  }

  public stop() {
    this.loop.stop()
  }

  private handleStats() {
    return {
      tick: () => this.stats?.update()
    }
  }
}

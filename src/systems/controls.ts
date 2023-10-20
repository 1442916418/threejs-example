import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import type { TCreateControls } from '@types'

/**
 * 创建控制器
 */
export const createControls = (options: TCreateControls) => {
  const { camera, canvas, target } = options
  const controls = new OrbitControls(camera, canvas)

  controls.target.set(target.x, target.y, target.z)

  // 启用阻尼
  controls.enableDamping = true
  controls.dampingFactor = 0.5

  // @ts-ignore
  controls.tick = () => controls.update()

  return controls
}

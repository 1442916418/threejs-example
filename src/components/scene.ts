import { Scene, Color } from 'three'

import type { TCreateScene } from '@types'

/**
 * 创建场景
 */
export const createScene = (options: TCreateScene = { background: new Color('skyblue') }) => {
  const scene = new Scene()

  scene.background = options.background ?? scene.background

  return scene
}

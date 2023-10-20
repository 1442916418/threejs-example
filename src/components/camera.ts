import { PerspectiveCamera, Vector3 } from 'three'

import type { TCreateCamera } from '@types'

/**
 * 创建相机
 */
export const createCamera = (options: TCreateCamera = { position: new Vector3(0, 10, 10) }) => {
  const { position } = options
  const camera = new PerspectiveCamera(45, 1, 1, 1000)

  if (position?.x) {
    camera.position.set(position.x, position.y, position.z)
  }

  return camera
}

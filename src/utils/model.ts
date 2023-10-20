import { Vector3 } from 'three'

import type { TGetModelWorldPosition, TGetNameModel } from '@types'

/**
 * 获取世界坐标
 * @description
 *   获取前先更新场景矩阵 scene.updateMatrixWorld(true)
 */
export const getModelWorldPosition = ({ model }: TGetModelWorldPosition) => {
  const worldPosition = new Vector3()
  model.getWorldPosition(worldPosition)

  return worldPosition
}

/**
 * 获取指定名称模型
 */
export const getNameModel = ({ name, scene }: TGetNameModel) => {
  return scene.children.find((f) => f.name === name)
}

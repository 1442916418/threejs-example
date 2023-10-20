import { handleIterateLoaderModel } from '@utils/loader-model'
import { AnimationMixer, Vector3 } from 'three'

import type { TLoaderModel, THandleModelEffect, TLoadAllModels } from '@types'
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'

/**
 * 加载全部模型
 */
export const loadAllModels = (options: TLoadAllModels) => {
  const floorLoadList: TLoaderModel[] = [
    {
      name: '鹦鹉',
      type: 'glb',
      url: 'src/assets/3d/models/birds/Parrot.glb',
      dracoUrl: 'src/assets/3d/draco/',
      onLoad: <T extends GLTF>(value1: T) => handleFModelEffect(value1, options, 'PARROT')
    },
    {
      name: '鹳',
      type: 'glb',
      url: 'src/assets/3d/models/birds/Stork.glb',
      dracoUrl: 'src/assets/3d/draco/',
      onLoad: <T extends GLTF>(value1: T) => handleFModelEffect(value1, options, 'STORK')
    },
    {
      name: '火烈鸟',
      type: 'glb',
      url: 'src/assets/3d/models/birds/Flamingo.glb',
      dracoUrl: 'src/assets/3d/draco/',
      onLoad: <T extends GLTF>(value1: T) => handleFModelEffect(value1, options, 'FLAMINGO')
    }
  ]

  return new Promise<boolean>((resolve, reject) => {
    try {
      handleIterateLoaderModel({
        list: floorLoadList,
        onAllLoad: () => {
          resolve(true)
        },
        onAllProgress(event, index) {
          // 计算加载进度百分比
          const progress = (event.loaded / event.total) * 100

          console.log('🚀 ~ onAllProgress ~ progress:', progress)
        }
      })
    } catch (error) {
      console.log('🚀 ~ loadAllModels ~ error:', error)
      reject(error)
    }
  })
}

const stupeModel = (data: GLTF) => {
  if (!data || !data.scene) return void 0

  const model = data.scene.children[0]
  const clip = data.animations[0]

  const mixer = new AnimationMixer(model)
  const action = mixer.clipAction(clip)

  action.reset().play()

  // @ts-ignore
  model.tick = (delta: number) => {
    mixer.update(delta)
  }

  return model
}

/**
 * 处理模型效果
 */
export const handleFModelEffect = (
  value: GLTF,
  options: THandleModelEffect,
  type: 'PARROT' | 'STORK' | 'FLAMINGO'
) => {
  const { scene, loop } = options

  if (!scene || !loop) return

  const model = stupeModel(value)

  if (!model) return

  const defPosition = {
    PARROT: new Vector3(0, 0, 0.25),
    STORK: new Vector3(7.5, 0, -10),
    FLAMINGO: new Vector3(0, 2.5, -10)
  }
  const pos = defPosition[type]

  model.position.set(pos.x, pos.y, pos.z)

  scene.add(model)
  loop.updatables.add(model)
}

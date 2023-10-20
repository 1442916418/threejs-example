import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

import type { TLoaderModel, THandleIterateLoaderModel } from '@types'

let gltfLoader: GLTFLoader | undefined = void 0

/**
 * 加载模型
 * @param options 参数
 */
export const handleLoaderModel = async (options: TLoaderModel) => {
  switch (options.type) {
    case 'glb':
    case 'gltf':
      if (!gltfLoader) {
        gltfLoader = new GLTFLoader()

        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath(options.dracoUrl)

        gltfLoader.setDRACOLoader(dracoLoader)
      }

      gltfLoader.load(options.url, (gltf) => options.onLoad(gltf), options.onProgress, options.onError)
      break
    default:
      throw new Error('handleLoaderModel() 无法加载当前类型的模型')
      break
  }
}

/**
 * 迭代加载模型
 * @param options 参数
 */
export const handleIterateLoaderModel = (options: THandleIterateLoaderModel) => {
  const { list, onAllLoad, onAllProgress } = options
  let fileIndex = 0

  const iterateLoadForIt = () => {
    const item = list[fileIndex]

    handleLoaderModel({
      name: item.name,
      type: item.type,
      dracoUrl: item.dracoUrl,
      url: item.url,
      onLoad: (value1, value2) => {
        item.onLoad && item.onLoad(value1, value2)

        fileIndex++

        if (fileIndex < list.length) {
          iterateLoadForIt()
        } else {
          onAllLoad && onAllLoad()
        }
      },
      onProgress: (e) => {
        item.onProgress && item.onProgress(e)

        onAllProgress && onAllProgress(e, fileIndex)
      }
    })
  }

  iterateLoadForIt()
}

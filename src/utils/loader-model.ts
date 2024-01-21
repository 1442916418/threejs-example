import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import type { TLoaderModel, THandleIterateLoaderModel } from '@types'

export default class ModelLoader {
  private static gltfLoader?: GLTFLoader
  private static rgbeLoader?: RGBELoader
  private static fbxLoader?: FBXLoader
  private static dracoLoader?: DRACOLoader

  public static handleLoaderModel(options: TLoaderModel) {
    switch (options.type) {
      case 'glb':
      case 'gltf':
        if (!this.gltfLoader) {
          this.gltfLoader = new GLTFLoader()

          if (options?.dracoUrl && !this.dracoLoader) {
            this.dracoLoader = new DRACOLoader()
            this.dracoLoader.setDecoderPath(options.dracoUrl)
          }
        }

        if (this.dracoLoader) {
          this.gltfLoader.setDRACOLoader(this.dracoLoader)
        }

        this.gltfLoader?.load(
          options.url,
          (gltf: any) => options.onLoad(gltf),
          options.onProgress,
          options.onError
        )
        break
      case 'rgbe':
        if (!this.rgbeLoader) {
          this.rgbeLoader = new RGBELoader()
        }

        this.rgbeLoader?.load(
          options.url,
          (dataTexture: any, texData: any) => options.onLoad(dataTexture, texData),
          options.onProgress,
          options.onError
        )
        break
      case 'fbx':
        if (!this.fbxLoader) {
          this.fbxLoader = new FBXLoader()
        }

        this.fbxLoader?.load(
          options.url,
          (object: any) => options.onLoad(object),
          options.onProgress,
          options.onError
        )
        break

      default:
        console.warn('ModelLoader.handleLoaderModel() 无法加载当前类型的模型')
        break
    }
  }

  public static handleIterateLoaderModel(options: THandleIterateLoaderModel): void {
    const { list, onAllLoad, onAllProgress } = options
    let fileIndex = 0

    const iterateLoadForIt = () => {
      const item = list[fileIndex]

      this.handleLoaderModel({
        name: item.name,
        type: item.type,
        dracoUrl: item?.dracoUrl ?? '',
        url: item.url,
        onLoad: (...values) => {
          item.onLoad && item.onLoad(...values)

          fileIndex++

          if (fileIndex < list.length) {
            iterateLoadForIt()
          } else {
            onAllLoad && onAllLoad()
          }
        },
        onProgress: (e: any) => {
          item.onProgress && item.onProgress(e)
          onAllProgress && onAllProgress(e, fileIndex)
        }
      })
    }

    iterateLoadForIt()
  }
}

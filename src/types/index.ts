import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import type { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'

import Loop from '@systems/loop'

export interface TCreateCamera {
  position?: THREE.Vector3
}

export interface TCreateScene {
  background?: THREE.Color | THREE.Texture | THREE.CubeTexture | null
}

export interface TTweenAnimation {
  /** 飞行时间 */
  duration?: number
  /** 飞行动画 */
  easing?: any
  /** 开始完成执行函数 */
  onStart?: () => void
  /** 结束完成执行函数 */
  onDone?: () => void
  /** 更新完成执行函数 */
  onUpdate?: (tween: any) => void
  /** 暂停执行函数 */
  onStop?: () => void
}

/**
 * Three.js 相机和控制器飞行动效
 */
export interface TCameraAndControlsFlightAnimation extends TTweenAnimation {
  /** 相机原位置 */
  cameraPosition: THREE.Vector3
  /** 控制器原位置 */
  controlsPosition: THREE.Vector3
  /** 相机新位置 */
  cameraNewPosition: THREE.Vector3
  /** 控制器新位置 */
  controlsNewPosition: THREE.Vector3
}

/**
 * Three.js 处理楼层飞行动效
 */
export interface THandleBuildingLayersAnimation extends TTweenAnimation {
  /** 原位置 */
  position: THREE.Vector3
  /** 新位置 */
  newPosition: THREE.Vector3
}

/**
 * 获取世界坐标
 */
export interface TGetModelWorldPosition {
  model: THREE.Object3D
}

/**
 * 获取指定名称模型
 */
export interface TGetNameModel {
  name: string
  scene: THREE.Scene
}

/**
 * 加载模型
 */
export interface TLoaderModel {
  /** 模型名称 */
  name: string
  /** 模型简称 */
  abbr?: string
  /** 模型类型 */
  type: 'gltf' | 'glb' | 'rgbe' | 'fbx' | 'hdr'
  /** 模型路径 */
  url: string
  /** 模型解码路径 */
  dracoUrl?: string
  onLoad: (...item: any) => void
  onProgress?: (event: ProgressEvent) => void
  onError?: (event: unknown) => void
}

/**
 * 迭代加载模型
 */
export interface THandleIterateLoaderModel {
  list: TLoaderModel[]
  onAllLoad: () => void
  onAllProgress?: (event: ProgressEvent, index: number) => void
}

/**
 * 创建控制器
 */
export interface TCreateControls {
  camera: THREE.PerspectiveCamera
  canvas: HTMLCanvasElement
  target: THREE.Vector3
}

/**
 * 基础参数
 */
export interface TWoldsControlsManage {
  /** 挂载元素 */
  el?: HTMLDivElement
  /** 摄像机 */
  camera?: THREE.PerspectiveCamera
  /** 控制器 */
  controls?: OrbitControls
  /** 场景 */
  scene?: THREE.Scene
  /** 渲染器 */
  renderer?: THREE.WebGLRenderer
  /** GUI */
  gui?: GUI
  /** 循环类 */
  loop?: Loop
}

export interface TLoadAllModels extends TWoldsControlsManage {}

export interface THandleModelEffect extends TWoldsControlsManage {}

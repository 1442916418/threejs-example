import { WebGLRenderer } from 'three'

/**
 * 创建渲染器
 */
export const createRenderer = () => {
  const renderer = new WebGLRenderer({ antialias: true, alpha: true })

  renderer.setPixelRatio(window.devicePixelRatio)

  return renderer
}

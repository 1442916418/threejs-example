import Stats from 'three/examples/jsm/libs/stats.module.js'

/**
 * 创建性能监视
 * @description
 *   FPS: 最后一秒渲染的 FPS 帧。数字越高越好。
 *   MS: 渲染一帧所需的毫秒数。数字越低越好。
 *   MB: MB 已分配内存的兆字节数。
 */
export const createStats = (position: 'tl' | 'tr' | 'bl' | 'br' = 'bl') => {
  const stats = new Stats()

  stats.showPanel(0)

  const positions = {
    tl: { top: '0px', right: 'auto', bottom: 'auto', left: '0px' },
    tr: { top: '0px', right: '0px', bottom: 'auto', left: 'auto' },
    bl: { top: 'auto', right: 'auto', bottom: '0px', left: '0px' },
    br: { top: 'auto', right: '0px', bottom: '0px', left: 'auto' }
  }

  Object.assign(stats.dom.style, {
    position: 'absolute',
    ...positions[position]
  })

  document.body.appendChild(stats.dom)

  return stats
}
